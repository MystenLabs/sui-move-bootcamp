// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use crate::common::IntentMessage;
use crate::common::{to_signed_response, ProcessDataRequest, ProcessedDataResponse};
use crate::AppState;
use crate::EnclaveError;
use axum::extract::State;
use axum::Json;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use serde_repr::{Deserialize_repr, Serialize_repr};
use std::sync::Arc;

/// ====================================================
/// Core Nautilus server logic, replace it with your own
/// relavant structs and process_data endpoint.
/// ====================================================
/// Intent scope enum for your application. Each intent message signed by the enclave ephemeral key
/// should have its own intent scope.
#[derive(Serialize_repr, Deserialize_repr, Debug)]
#[repr(u8)]
pub enum IntentScope {
    ProcessData = 0,
}
/// Inner type T for IntentMessage<T>
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WeatherResponse {
    pub location: String,
    pub temperature: u64,
}

/// Inner type T for ProcessDataRequest<T>
#[derive(Debug, Serialize, Deserialize)]
pub struct WeatherRequest {
    pub location: String,
}

pub async fn process_data(
    State(state): State<Arc<AppState>>,
    Json(request): Json<ProcessDataRequest<WeatherRequest>>,
) -> Result<Json<ProcessedDataResponse<IntentMessage<WeatherResponse>>>, EnclaveError> {
    let url = format!(
        "https://api.weatherapi.com/v1/current.json?key={}&q={}",
        state.api_key, request.payload.location
    );
    let response = reqwest::get(url.clone())
        .await
        .map_err(|e| EnclaveError::GenericError(format!("Failed to get weather response: {e}")))?;
    let json = response.json::<Value>().await.map_err(|e| {
        EnclaveError::GenericError(format!("Failed to parse weather response: {e}"))
    })?;
    let location = json["location"]["name"].as_str().unwrap_or("Unknown");
    let temperature = json["current"]["temp_c"].as_f64().unwrap_or(0.0) as u64;
    let last_updated_epoch = json["current"]["last_updated_epoch"].as_u64().unwrap_or(0);
    let last_updated_timestamp_ms = last_updated_epoch * 1000_u64;
    let current_timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map_err(|e| EnclaveError::GenericError(format!("Failed to get current timestamp: {e}")))?
        .as_millis() as u64;

    // 1 hour in milliseconds = 60 * 60 * 1000 = 3_600_000
    if last_updated_timestamp_ms + 3_600_000 < current_timestamp {
        return Err(EnclaveError::GenericError(
            "Weather API timestamp is too old".to_string(),
        ));
    }

    Ok(Json(to_signed_response(
        &state.eph_kp,
        WeatherResponse {
            location: location.to_string(),
            temperature,
        },
        last_updated_timestamp_ms,
        IntentScope::ProcessData as u8,
    )))
}
