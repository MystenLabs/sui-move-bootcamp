// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module app::weather {
    use enclave::enclave::{Self, Enclave};
    use std::string::String;

    /// ====
    /// Core onchain app logic, replace it with your own.
    /// ====
    ///

    const WEATHER_INTENT: u8 = 0;
    const EInvalidSignature: u64 = 1;

    public struct WeatherNFT has key, store {
        id: UID,
        location: String,
        temperature: u64,
        timestamp_ms: u64,
    }

    /// Should match the inner struct T used for IntentMessage<T> in Rust.
    public struct WeatherResponse has copy, drop {
        location: String,
        temperature: u64,
    }

    public struct WEATHER has drop {}

    fun init(otw: WEATHER, ctx: &mut TxContext) {
        let cap = enclave::new_cap(otw, ctx);

        cap.create_enclave_config(
            b"weather enclave".to_string(),
            x"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", // pcr0
            x"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", // pcr1
            x"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", // pcr2
            ctx,
        );

        transfer::public_transfer(cap, ctx.sender())
    }

    public fun update_weather<T>(
        location: String,
        temperature: u64,
        timestamp_ms: u64,
        sig: &vector<u8>,
        enclave: &Enclave<T>,
        ctx: &mut TxContext,
    ): WeatherNFT {
        let res = enclave.verify_signature(
            WEATHER_INTENT,
            timestamp_ms,
            WeatherResponse { location, temperature },
            sig,
        );
        assert!(res, EInvalidSignature);
        // Mint NFT, replace it with your own logic.
        WeatherNFT {
            id: object::new(ctx),
            location,
            temperature,
            timestamp_ms,
        }
    }
}
