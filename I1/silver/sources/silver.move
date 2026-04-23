/// Module: silver
///
/// Demonstrates the modern `coin_registry` pattern for creating fungible tokens on Sui.
///
/// ## coin_registry vs Legacy coin::create_currency
///
/// The `coin_registry` module (introduced in Sui 2024) replaces the legacy
/// `coin::create_currency` approach with a more flexible builder pattern:
///
/// - **Legacy**: `coin::create_currency` returns (TreasuryCap, CoinMetadata) directly
/// - **Modern**: `coin_registry::new_currency_with_otw` returns (CurrencyInitializer, TreasuryCap)
///   allowing configuration before finalization
///
/// The builder pattern enables:
/// - Setting metadata before the currency is finalized
/// - Configuring supply constraints (fixed, capped, or unlimited)
/// - Better separation of concerns between minting and metadata management
///
/// ## One-Time Witness (OTW) Pattern
///
/// The `SILVER` struct is a One-Time Witness - a type that can only be created once
/// during module initialization. Requirements:
/// - Named after the module in UPPERCASE
/// - Has only `drop` ability
/// - Created automatically by Sui runtime and passed to `init`
/// - Consumed during currency creation to guarantee uniqueness
module silver::silver;

use sui::coin::TreasuryCap;
use sui::coin_registry;

/// One-Time Witness for the SILVER currency.
/// This type guarantees that only one SILVER currency can ever be created.
public struct SILVER has drop {}

const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"Silver";
const SYMBOL: vector<u8> = b"SILVER";
const DESCRIPTION: vector<u8> = b"Silver, commonly used by heroes to purchase necessary adventure equipment";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/cWTbHE-yC4z3JLmEYWDXM6uhQ1nxu-R0GOLReRwQcH4";

/// Initializes the SILVER currency during module publication.
///
/// This function:
/// 1. Creates the currency using the OTW to guarantee uniqueness
/// 2. Finalizes the registration, which creates the CoinMetadata object
/// 3. Transfers TreasuryCap (for minting/burning) to the publisher
/// 4. Transfers MetadataCap (for updating metadata) to the publisher
///
/// Note: `finalize()` must be called to complete the currency registration.
/// This creates the on-chain CoinMetadata and returns a MetadataCap for future updates.
fun init(otw: SILVER, ctx: &mut TxContext) {
    let (builder, tcap) = create_currency(otw, ctx);
    // Finalize registration - this creates the CoinMetadata object on-chain
    // and returns a MetadataCap for future metadata updates
    let metadata_cap = builder.finalize(ctx);
    transfer::public_transfer(tcap, ctx.sender());
    transfer::public_transfer(metadata_cap, ctx.sender());
}

/// Creates the SILVER currency with the coin_registry builder pattern.
///
/// Returns a tuple of:
/// - `CurrencyInitializer`: Builder for configuring supply constraints before finalization
/// - `TreasuryCap`: Capability for minting and burning coins
///
/// The OTW is consumed here, ensuring this can only happen once per module.
fun create_currency(
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

/// Mints new SILVER coins.
///
/// # Arguments
/// * `tcap` - Mutable reference to the TreasuryCap (proves minting authority)
/// * `amount` - Number of tokens to mint (in smallest units, considering decimals)
/// * `ctx` - Transaction context
///
/// # Returns
/// A new Coin<SILVER> object with the specified amount
public fun mint(
    tcap: &mut TreasuryCap<SILVER>,
    amount: u64,
    ctx: &mut TxContext,
): sui::coin::Coin<SILVER> {
    tcap.mint(amount, ctx)
}

#[test_only]
use std::unit_test;

#[test]
/// Verifies that a newly created currency starts with zero total supply.
fun test_create_currency_returns_zero_supply() {
    let (builder, tcap) = create_currency(SILVER {}, &mut tx_context::dummy());
    assert!(tcap.total_supply() == 0);
    unit_test::destroy(builder);
    unit_test::destroy(tcap);
}

#[test]
/// Verifies that minting increases both the coin value and total supply.
fun test_mint_increases_supply_and_coin_value() {
    let amount = 10_000_000_000;
    let mut ctx = tx_context::dummy();
    let (builder, mut tcap) = create_currency(SILVER {}, &mut ctx);

    let coin = mint(&mut tcap, amount, &mut ctx);

    assert!(coin.value() == amount);
    assert!(tcap.total_supply() == amount);

    unit_test::destroy(builder);
    unit_test::destroy(coin);
    unit_test::destroy(tcap);
}

#[test]
/// Verifies that burning coins reduces the total supply back to zero.
fun test_burn_reduces_supply_to_zero() {
    let amount = 10_000_000_000;
    let mut ctx = tx_context::dummy();
    let (builder, mut tcap) = create_currency(SILVER {}, &mut ctx);

    let coin = mint(&mut tcap, amount, &mut ctx);
    tcap.burn(coin);

    assert!(tcap.total_supply() == 0);

    unit_test::destroy(builder);
    unit_test::destroy(tcap);
}
