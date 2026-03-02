/// # COOKIE Token - Robot Treats!
///
/// A simple token for feeding robots. Each COOKIE lets you queue one action.
///
/// ## What This Module Teaches
/// - Creating a custom token on Sui
/// - The One-Time Witness (OTW) pattern
/// - TreasuryCap for controlled minting
/// - Shared objects for global access
///
/// ## Key Concepts
///
/// ### One-Time Witness (OTW)
/// A special type that can only be created ONCE, during module initialization.
/// It proves that the token is being created by the module itself.
/// The type name must match the module name in UPPERCASE.
///
/// ### TreasuryCap
/// A capability object that controls minting of tokens.
/// Whoever owns TreasuryCap can mint new tokens.
/// We wrap it in MintCap to add rate limiting.
///
/// ### Shared Objects
/// Objects that anyone can access and modify.
/// Our MintCap is shared so anyone can request tokens from the faucet.
#[allow(deprecated_usage)]
module robot_tokenomics::cookie;

use sui::coin::{Self, Coin, TreasuryCap};
use sui::url;

// ============================================
// CONSTANTS
// ============================================

/// Maximum total supply of COOKIE tokens
/// This creates scarcity - only 10,000 COOKIEs will ever exist
const MAX_SUPPLY: u64 = 10_000;

// ============================================
// ERROR CODES
// ============================================

/// Tried to mint more than the maximum supply allows
const ESupplyExceeded: u64 = 0;

// ============================================
// ONE-TIME WITNESS
// ============================================

/// The One-Time Witness for COOKIE token.
///
/// IMPORTANT: The name MUST be the module name in UPPERCASE.
/// This is how Sui knows this is a valid OTW.
///
/// The `drop` ability allows it to be consumed during initialization.
public struct COOKIE has drop {}

// ============================================
// MINT CAPABILITY
// ============================================

/// Wraps TreasuryCap with additional controls.
///
/// By wrapping TreasuryCap, we can:
/// 1. Add a maximum supply limit
/// 2. Make minting public but controlled
/// 3. Track total supply easily
///
/// This is a common pattern in Sui token design.
public struct MintCap has key {
    id: UID,
    /// The actual capability to mint tokens
    treasury_cap: TreasuryCap<COOKIE>,
    /// Maximum tokens that can ever be minted
    max_supply: u64,
}

// ============================================
// INITIALIZATION
// ============================================

/// Module initializer - runs exactly once when the module is published.
///
/// This function:
/// 1. Receives the One-Time Witness (proves we're in init)
/// 2. Creates the COOKIE currency with metadata
/// 3. Wraps the TreasuryCap in our MintCap
/// 4. Shares the MintCap so anyone can use the faucet
///
/// ## Why Share the MintCap?
/// If we transferred it to an address, only that address could mint.
/// By sharing it, anyone can call functions that use it (like the faucet).
/// But we still control HOW tokens are minted through our functions.
fun init(otw: COOKIE, ctx: &mut TxContext) {
    // Create the currency - this is where the magic happens!
    // coin::create_currency requires an OTW to prove authenticity
    let (treasury_cap, metadata) = coin::create_currency(
        otw, // The one-time witness (consumed here)
        0, // Decimals: 0 means whole tokens only (no fractions)
        b"COOKIE", // Symbol shown in wallets
        b"Robot Cookie", // Human-readable name
        b"Tokens for feeding robot pets. 1 COOKIE = 1 robot action!",
        option::some(url::new_unsafe_from_bytes(b"https://example.com/cookie.png")),
        ctx,
    );

    // Freeze metadata so it can never be changed
    // This is important for trust - users know the token info won't change
    transfer::public_freeze_object(metadata);

    // Wrap TreasuryCap in our MintCap with supply limit
    let mint_cap = MintCap {
        id: object::new(ctx),
        treasury_cap,
        max_supply: MAX_SUPPLY,
    };

    // Share the MintCap globally
    // Now anyone can use it through our public functions
    transfer::share_object(mint_cap);
}

// ============================================
// MINTING FUNCTIONS
// ============================================

/// Mint new COOKIE tokens. Only callable from within this package.
///
/// We use `public(package)` visibility which means:
/// - Other modules in this package can call this (like faucet.move)
/// - External packages/users CANNOT call this directly
///
/// This lets us control minting through our faucet module.
///
/// ## Parameters
/// - `mint_cap`: The shared MintCap object
/// - `amount`: How many tokens to mint
/// - `recipient`: Address to receive the tokens
/// - `ctx`: Transaction context
public(package) fun mint(
    mint_cap: &mut MintCap,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    // Check we won't exceed max supply
    let current_supply = mint_cap.treasury_cap.total_supply();
    assert!(current_supply + amount <= mint_cap.max_supply, ESupplyExceeded);

    // Mint and transfer in one operation
    // This is cleaner than minting then transferring separately
    mint_cap.treasury_cap.mint_and_transfer(amount, recipient, ctx);
}

// ============================================
// BURN FUNCTIONS
// ============================================

/// Burn COOKIE tokens, removing them from circulation.
///
/// Uses `public(package)` so only modules in this package (like robot_pet)
/// can burn tokens. This is the correct way to destroy coins — it reduces
/// the total supply tracked by TreasuryCap, unlike sending to address 0x0.
public(package) fun burn(
    mint_cap: &mut MintCap,
    coin: Coin<COOKIE>,
) {
    mint_cap.treasury_cap.burn(coin);
}

// ============================================
// VIEW FUNCTIONS
// ============================================

/// Get the current total supply of COOKIE tokens.
///
/// Useful for UIs to show how many tokens exist.
public fun total_supply(mint_cap: &MintCap): u64 {
    mint_cap.treasury_cap.total_supply()
}

/// Get the maximum possible supply.
public fun max_supply(mint_cap: &MintCap): u64 {
    mint_cap.max_supply
}

/// Get the remaining mintable supply.
///
/// This tells users how many tokens can still be created.
public fun remaining_supply(mint_cap: &MintCap): u64 {
    mint_cap.max_supply - mint_cap.treasury_cap.total_supply()
}

// ============================================
// TEST HELPERS
// ============================================

#[test_only]
/// Test helper to initialize the module in tests
public fun init_for_testing(ctx: &mut TxContext) {
    init(COOKIE {}, ctx);
}
