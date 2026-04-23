/// Module: king_credits
///
/// Demonstrates creating a regulated token using Sui's Token standard with custom rules.
///
/// ## Token vs Coin
///
/// While `Coin<T>` is freely transferable, `Token<T>` enables programmable transfer
/// policies. This module shows how to:
/// - Create a token with the coin_registry pattern
/// - Attach a TokenPolicy with custom rules
/// - Restrict transfers to approved council members only
///
/// ## One-Time Witness (OTW) Pattern
///
/// `KING_CREDITS` is the OTW that guarantees only one such token type exists.
/// Requirements:
/// - Named after the module in UPPERCASE (with underscores allowed)
/// - Has only `drop` ability
/// - Automatically created and passed to `init` by the Sui runtime
///
/// ## Token Policy Architecture
///
/// The token uses a `TokenPolicy` with the `CrownCouncilRule`:
/// - Only addresses in the Crown Council whitelist can transfer tokens
/// - The policy is shared so anyone can read the rules
/// - PolicyCap holder can modify the council membership
module king_credits::king_credits;

use sui::coin_registry;
use sui::token;

use king_credits::crown_council_rule::{Self, CrownCouncilRule};

// === Constants ===

const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"King's Credits";
const SYMBOL: vector<u8> = b"KING_CREDITS";
const DESCRIPTION: vector<u8> = b"Awarded to citizens for heroic actions.";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/uh8f-t66vVmQLtZEhO024rvHOVskOrLq_Wb2BHJRKBw";

/// One-Time Witness for the KING_CREDITS token.
/// Note: Underscores are allowed in OTW names (must match module name in uppercase).
public struct KING_CREDITS has drop {}

// === Initialization ===

/// Initializes the KING_CREDITS token with a regulated transfer policy.
///
/// This function demonstrates the complete setup for a regulated token:
/// 1. Create the currency using coin_registry (same as Coin)
/// 2. Create a TokenPolicy to enforce transfer rules
/// 3. Add the CrownCouncilRule to restrict who can transfer
/// 4. Share the policy and distribute capabilities
///
/// After initialization:
/// - TokenPolicy is shared (publicly readable)
/// - Publisher receives: TreasuryCap, TokenPolicyCap, MetadataCap
fun init(otw: KING_CREDITS, ctx: &mut TxContext) {
    // Step 1: Create currency with coin_registry (standard pattern)
    let (builder, tcap) = coin_registry::new_currency_with_otw(
        otw,
        DECIMALS,
        SYMBOL.to_string(),
        NAME.to_string(),
        DESCRIPTION.to_string(),
        ICON_URL.to_string(),
        ctx,
    );

    // Step 2: Create a TokenPolicy from the TreasuryCap
    // This enables programmable transfer rules for this token type
    let (mut policy, policy_cap) = token::new_policy(&tcap, ctx);

    // Step 3: Add CrownCouncilRule for the "transfer" action
    // This means all transfers must satisfy the CrownCouncilRule
    token::add_rule_for_action<KING_CREDITS, CrownCouncilRule>(
        &mut policy,
        &policy_cap,
        token::transfer_action(),
        ctx,
    );

    // Step 4: Configure the rule with an empty initial council
    // Council members can be added later via add_council_member()
    crown_council_rule::add_rule_config(&mut policy, &policy_cap, vector[], ctx);

    // Step 5: Finalize currency registration
    let metadata_cap = builder.finalize(ctx);

    // Step 6: Share policy and transfer capabilities to publisher
    token::share_policy(policy);
    transfer::public_transfer(policy_cap, ctx.sender());
    transfer::public_transfer(tcap, ctx.sender());
    transfer::public_transfer(metadata_cap, ctx.sender());
}

// === Test Helpers ===

#[test_only]
use sui::{
    coin::TreasuryCap,
    test_scenario,
    token::{Token, TokenPolicy, TokenPolicyCap}
};

// === Tests ===

#[test]
/// Verifies that only Crown Council members can transfer KING_CREDITS tokens.
///
/// Test flow:
/// 1. Initialize the token with an empty council
/// 2. Add a council member to the whitelist
/// 3. Mint tokens to the council member (using TreasuryCap bypass)
/// 4. Council member transfers to a recipient (must prove council membership)
/// 5. Verify the transfer succeeded
fun test_transfer_requires_council_member_approval() {
    let publisher = @0x11111;
    let council_member = @0x22222;
    let recipient = @0x33333;

    let mut scenario = test_scenario::begin(publisher);

    // --- Section 1: Initialize the KING_CREDITS token ---
    {
        init(KING_CREDITS {}, scenario.ctx());
    };

    // --- Section 2: Add council_member to the Crown Council whitelist ---
    // Only the PolicyCap holder (publisher) can modify the council
    scenario.next_tx(publisher);
    {
        let policy_cap = scenario.take_from_sender<TokenPolicyCap<KING_CREDITS>>();
        let mut policy = scenario.take_shared<TokenPolicy<KING_CREDITS>>();
        crown_council_rule::add_council_member(&mut policy, &policy_cap, council_member);
        test_scenario::return_shared(policy);
        scenario.return_to_sender(policy_cap);
    };

    // --- Section 3: Mint tokens to council_member ---
    // Note: TreasuryCap holder can bypass policy rules when minting/transferring
    scenario.next_tx(publisher);
    {
        let mut tcap = scenario.take_from_sender<TreasuryCap<KING_CREDITS>>();
        let token = token::mint(&mut tcap, 100_000_000_000_000, scenario.ctx());
        let request = token::transfer(token, council_member, scenario.ctx());
        // confirm_with_treasury_cap bypasses policy rules (admin privilege)
        token::confirm_with_treasury_cap(&mut tcap, request, scenario.ctx());
        scenario.return_to_sender(tcap);
    };

    // --- Section 4: Council member transfers to recipient ---
    // This transfer MUST satisfy the CrownCouncilRule (prove membership)
    scenario.next_tx(council_member);
    let id;
    {
        let policy = scenario.take_shared<TokenPolicy<KING_CREDITS>>();
        let token = scenario.take_from_sender<Token<KING_CREDITS>>();
        id = object::id(&token);

        // Initiate transfer and get an ActionRequest
        let mut request = token::transfer(token, recipient, scenario.ctx());

        // Prove council membership to satisfy the CrownCouncilRule
        crown_council_rule::prove(&mut request, &policy, scenario.ctx());

        // Confirm the request against the policy (all rules must be satisfied)
        token::confirm_request(&policy, request, scenario.ctx());
        test_scenario::return_shared(policy)
    };

    // --- Section 5: Verify transfer succeeded ---
    let transfer_effects = scenario.end();
    let transferred = transfer_effects.transferred_to_account();
    assert!(transferred.contains(&id));
}
