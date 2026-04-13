/// Module: silver (fixed supply variant)
///
/// Demonstrates creating a fixed-supply token using the `coin_registry` pattern.
///
/// ## Fixed Supply Pattern
///
/// This module shows how to create a token where the total supply is permanently
/// fixed at creation time. This is useful for:
/// - Governance tokens with a known maximum supply
/// - Collectible currencies
/// - Tokens where scarcity is a core property
///
/// ## Key Differences from Unlimited Supply (I1/silver)
///
/// 1. **Total supply minted at init**: All tokens are created during `init()`
/// 2. **TreasuryCap is consumed**: `make_supply_fixed()` destroys the TreasuryCap
/// 3. **No future minting/burning**: Without TreasuryCap, supply cannot change
///
/// ## One-Time Witness (OTW) Pattern
///
/// Like all Sui currencies, this uses an OTW to guarantee uniqueness.
/// See I1/silver for detailed OTW documentation.
module fixed_supply::silver;

use sui::coin::TreasuryCap;
use sui::coin_registry;

/// One-Time Witness for the SILVER currency.
public struct SILVER has drop {}

const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"Silver";
const SYMBOL: vector<u8> = b"SILVER";
const DESCRIPTION: vector<u8> = b"Silver, commonly used by heroes to purchase necessary adventure equipment";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/cWTbHE-yC4z3JLmEYWDXM6uhQ1nxu-R0GOLReRwQcH4";
const TOTAL_SUPPLY: u64 = 10_000_000_000_000_000_000;

/// Initializes the fixed-supply SILVER currency during module publication.
///
/// This function demonstrates the fixed supply pattern:
/// 1. Create the currency with coin_registry
/// 2. Mint the entire supply upfront
/// 3. Lock the supply by consuming the TreasuryCap
/// 4. Finalize to create on-chain metadata
///
/// After this function completes, no more SILVER can ever be minted or burned.
fun init(otw: SILVER, ctx: &mut TxContext) {
    let (mut builder, mut tcap) = create_silver_currency(otw, ctx);

    // Step 1: Mint the total supply and transfer to sender.
    // This must happen BEFORE make_supply_fixed since that consumes the TreasuryCap.
    tcap.mint_and_transfer(TOTAL_SUPPLY, ctx.sender(), ctx);

    // Step 2: Lock the supply as fixed.
    // IMPORTANT: make_supply_fixed() CONSUMES the TreasuryCap (takes ownership).
    // This permanently prevents any future minting or burning operations.
    // The TreasuryCap is destroyed inside this call, making the supply immutable.
    builder.make_supply_fixed(tcap);

    // Step 3: Finalize registration to create CoinMetadata on-chain.
    // Only MetadataCap is returned (no TreasuryCap since it was consumed above).
    let metadata_cap = builder.finalize(ctx);
    transfer::public_transfer(metadata_cap, ctx.sender());
}

/// Creates the SILVER currency using the coin_registry builder pattern.
///
/// Returns a tuple of:
/// - `CurrencyInitializer`: Builder for configuring supply (will call make_supply_fixed)
/// - `TreasuryCap`: Capability for minting (will be consumed to fix supply)
fun create_silver_currency(
    otw: SILVER,
    ctx: &mut TxContext,
): (coin_registry::CurrencyInitializer<SILVER>, TreasuryCap<SILVER>) {
    coin_registry::new_currency_with_otw(
        otw,
        DECIMALS,
        SYMBOL.to_string(),
        NAME.to_string(),
        DESCRIPTION.to_string(),
        ICON_URL.to_string(),
        ctx,
    )
}

#[test_only]
use std::unit_test;

#[test]
/// Verifies that init() mints the total supply and fixes it permanently.
///
/// After init:
/// - Publisher receives a Coin with TOTAL_SUPPLY value
/// - Publisher receives MetadataCap (but NOT TreasuryCap - it was consumed)
/// - No further minting is possible
fun test_init_mints_total_supply_and_fixes_it() {
    let publisher = @0x11111;

    // --- Setup: Begin test scenario ---
    let mut scenario = sui::test_scenario::begin(publisher);
    init(SILVER {}, scenario.ctx());

    // --- Verification: Check publisher received the full supply ---
    scenario.next_tx(publisher);
    {
        // Verify the minted coin has the full total supply
        let coin = scenario.take_from_sender<sui::coin::Coin<SILVER>>();
        assert!(coin.value() == TOTAL_SUPPLY);
        scenario.return_to_sender(coin);

        // Verify MetadataCap was transferred (TreasuryCap was consumed, not transferred)
        let metadata_cap = scenario.take_from_sender<coin_registry::MetadataCap<SILVER>>();
        unit_test::destroy(metadata_cap);
    };

    // --- Cleanup ---
    scenario.end();
}
