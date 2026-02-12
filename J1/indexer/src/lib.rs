use std::sync::Arc;

use diesel::prelude::*;
use diesel_async::RunQueryDsl;
use diesel_migrations::{embed_migrations, EmbeddedMigrations};
use serde::{Deserialize, Serialize};
use sui_indexer_alt_framework::db::{Connection, Db};
use sui_indexer_alt_framework::pipeline::{concurrent::Handler, Processor};
use sui_indexer_alt_framework::types::base_types::SuiAddress;
use sui_indexer_alt_framework::types::effects::TransactionEffectsAPI;
use sui_indexer_alt_framework::types::full_checkpoint_content::CheckpointData;
use sui_indexer_alt_framework::types::storage::WriteKind;
use sui_indexer_alt_framework::types::transaction::TransactionDataAPI;
use sui_indexer_alt_framework::FieldCount;
use sui_indexer_alt_framework::Result;
use sui_indexer_alt_framework::{
    cluster::{self, IndexerCluster},
    pipeline::concurrent::ConcurrentConfig,
};
use url::Url;

use crate::schema::fees_events;
use crate::schema::heroes;

pub mod schema;

pub use schema::fees_events::dsl::fees_events as fees_events_table;
pub use schema::heroes::dsl::heroes as heroes_table;

pub const PACKAGE_ID: &str = "0x21e8decabb4a4e84a8e2a9b81237f73dee259781ef2d248bf700b08103b9e399";
pub const MODULE_NAME: &str = "hero";
pub const FUNCTION_NAME: &str = "mint_hero";
pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

#[derive(Insertable, Debug, FieldCount, Queryable, Selectable)]
#[diesel(table_name = heroes)]
pub struct StoredHero {
    pub hero_id: Vec<u8>,
    pub owner: String,
    pub trx_digest: String,
    pub gas_fee: i64,
}

#[derive(Insertable, Debug, FieldCount, Clone, Queryable)]
#[diesel(table_name = fees_events)]
pub struct Fee {
    pub event_type: String,
    pub treasury_id: String,
    pub amount: i64,
    pub admin: String,
    pub timestamp: i64,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, Clone)]
struct FeeData {
    treasury_id: SuiAddress,
    amount: u64,
    admin: SuiAddress,
    timestamp: u64,
}

pub struct HeroPipeline;
pub struct FeeCollecPipeline;

impl Processor for HeroPipeline {
    const NAME: &'static str = "heroes";

    type Value = StoredHero;

    // Example without utilizing events
    fn process(&self, checkpoint: &Arc<CheckpointData>) -> Result<Vec<Self::Value>> {
        let CheckpointData {
            transactions,
            checkpoint_summary,
            ..
        } = checkpoint.as_ref();
        println!(
            "Processing checkpoint: {:?}",
            checkpoint_summary.sequence_number
        );

        Ok(transactions
            .into_iter()
            .filter(|tx| {
                let calls = tx.transaction.data().transaction_data().move_calls();
                calls.iter().any(|call| {
                    call.0.to_string() == PACKAGE_ID
                        && call.1 == MODULE_NAME
                        && call.2 == FUNCTION_NAME
                })
            })
            .map(|tx| {
                let hero_id = tx
                    .effects
                    .all_changed_objects()
                    .iter()
                    .find(|(_, _, kind)| *kind == WriteKind::Create)
                    .map(|(obj, _, _)| obj.0.to_vec())
                    .unwrap_or_default();
                let owner = tx.transaction.sender_address().to_string();
                let trx_digest = tx.transaction.digest().to_string();
                let gas_fee = tx.effects.gas_cost_summary().net_gas_usage();
                return StoredHero {
                    hero_id,
                    owner,
                    trx_digest,
                    gas_fee,
                };
            })
            .collect())
    }
}

#[async_trait::async_trait]
impl Handler for HeroPipeline {
    type Store = Db;

    async fn commit<'a>(values: &[Self::Value], conn: &mut Connection<'a>) -> Result<usize> {
        diesel::insert_into(heroes::table)
            .values(values)
            .on_conflict_do_nothing()
            .execute(conn)
            .await
            .map_err(Into::into)
    }
}

impl Processor for FeeCollecPipeline {
    const NAME: &'static str = "fees";

    type Value = Fee;

    // Example with utilizing events
    fn process(&self, checkpoint: &Arc<CheckpointData>) -> Result<Vec<Self::Value>> {
        Ok(checkpoint
            .transactions
            .iter()
            .flat_map(|tx| {
                tx.events
                    .as_ref()
                    .map(|events| events.data.iter())
                    .into_iter()
                    .flatten()
                    .filter(|event| {
                        event.package_id.to_string() == PACKAGE_ID
                            && event.type_.name.as_str() == "TakeFeesEvent"
                    })
                    .map(|event| {
                        let fee_data = bcs::from_bytes::<FeeData>(&event.contents).unwrap();
                        Fee {
                            event_type: event.type_.name.to_string(),
                            treasury_id: fee_data.treasury_id.to_string(),
                            amount: fee_data.amount as i64,
                            admin: fee_data.admin.to_string(),
                            timestamp: fee_data.timestamp as i64,
                        }
                    })
            })
            .collect())
    }
}

#[async_trait::async_trait]
impl Handler for FeeCollecPipeline {
    type Store = Db;

    async fn commit<'a>(values: &[Self::Value], conn: &mut Connection<'a>) -> Result<usize> {
        let values: Vec<_> = values.iter().cloned().collect();
        diesel::insert_into(fees_events::table)
            .values(values)
            .on_conflict_do_nothing()
            .execute(conn)
            .await
            .map_err(|e| {
                println!("Database error: {:?}", e);
                e.into()
            })
    }
}

pub async fn create_indexer(
    database_url: Url,
    cluster_args: cluster::Args,
) -> Result<IndexerCluster> {
    let mut indexer = IndexerCluster::new(database_url, cluster_args, Some(&MIGRATIONS)).await?;
    
    // Add pipelines
    indexer
        .concurrent_pipeline(FeeCollecPipeline, ConcurrentConfig::default())
        .await?;

    indexer
        .concurrent_pipeline(HeroPipeline, ConcurrentConfig::default())
        .await?;

    Ok(indexer)
}
