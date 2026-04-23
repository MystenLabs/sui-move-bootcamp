/// Module: crown_council_rule
///
/// Implements a custom TokenPolicy rule that restricts token transfers to whitelisted addresses.
///
/// ## How Token Rules Work
///
/// Sui's Token standard allows attaching rules to specific actions (transfer, spend, etc.).
/// Each rule must:
/// 1. Define a witness type (here: `CrownCouncilRule`)
/// 2. Store configuration in the policy (here: `Config` with member addresses)
/// 3. Provide a `prove()` function that adds approval to an ActionRequest
///
/// ## CrownCouncilRule
///
/// This rule maintains a whitelist of "Crown Council" members. Only these addresses
/// can successfully transfer tokens - they must call `prove()` which verifies
/// membership and adds the rule's approval stamp to the transfer request.
///
/// ## Usage Flow
///
/// 1. Token creator adds this rule to their TokenPolicy via `add_rule_for_action`
/// 2. Creator configures the rule with `add_rule_config` (initial members list)
/// 3. Creator manages membership with `add_council_member` / `remove_council_member`
/// 4. Token holders must call `prove()` during transfers to satisfy this rule
module king_credits::crown_council_rule;

use sui::token::{Self, ActionRequest, TokenPolicy, TokenPolicyCap};
use sui::vec_set::{Self, VecSet};

// === Error Codes ===

/// Attempted to exceed the maximum allowed council members.
const EMaxCouncilMembers: u64 = 0;
/// Caller is not a member of the Crown Council.
const ENotACouncilMember: u64 = 1;

// === Constants ===

/// Maximum number of addresses allowed in the Crown Council.
const MAX_CROWN_COUNCIL_MEMBERS: u64 = 100;

// === Types ===

/// Witness type for the Crown Council rule.
/// This empty struct with `drop` serves as a unique identifier for this rule.
/// The `()` syntax creates a "marker" struct with no fields.
public struct CrownCouncilRule() has drop;

/// Configuration stored in the TokenPolicy for this rule.
/// Contains the set of addresses authorized to transfer tokens.
public struct Config has store {
    members: VecSet<address>
}

// === Admin Functions ===

/// Initializes the Crown Council rule configuration in a TokenPolicy.
///
/// Must be called after `token::add_rule_for_action` to provide the rule's config.
///
/// # Arguments
/// * `policy` - The TokenPolicy to configure
/// * `cap` - Proves admin authority over the policy
/// * `initial_members` - Addresses to whitelist immediately (can be empty)
/// * `ctx` - Transaction context
public fun add_rule_config<T>(
    policy: &mut TokenPolicy<T>,
    cap: &TokenPolicyCap<T>,
    initial_members: vector<address>,
    ctx: &mut TxContext,
) {
    assert!(initial_members.length() <= MAX_CROWN_COUNCIL_MEMBERS, EMaxCouncilMembers);
    let mut members = vec_set::empty();
    initial_members.destroy!(|addr| members.insert(addr));
    token::add_rule_config(
        CrownCouncilRule(),
        policy,
        cap,
        Config { members },
        ctx,
    );
}

/// Adds a new address to the Crown Council whitelist.
///
/// # Arguments
/// * `policy` - The TokenPolicy containing the rule config
/// * `cap` - Proves admin authority over the policy
/// * `member_addr` - Address to add to the council
///
/// # Aborts
/// * `EMaxCouncilMembers` - If adding would exceed MAX_CROWN_COUNCIL_MEMBERS
public fun add_council_member<T>(
    policy: &mut TokenPolicy<T>,
    cap: &TokenPolicyCap<T>,
    member_addr: address,
) {
    let config: &mut Config = token::rule_config_mut(
        CrownCouncilRule(),
        policy,
        cap
    );
    assert!(config.members.length() < MAX_CROWN_COUNCIL_MEMBERS, EMaxCouncilMembers);
    config.members.insert(member_addr);
}

/// Removes an address from the Crown Council whitelist.
///
/// # Arguments
/// * `policy` - The TokenPolicy containing the rule config
/// * `cap` - Proves admin authority over the policy
/// * `member_addr` - Address to remove from the council
public fun remove_council_member<T>(
    policy: &mut TokenPolicy<T>,
    cap: &TokenPolicyCap<T>,
    member_addr: address,
) {
    let config: &mut Config = token::rule_config_mut(
        CrownCouncilRule(),
        policy,
        cap
    );
    config.members.remove(&member_addr);
}

// === Rule Verification ===

/// Proves that the request sender is a Crown Council member.
///
/// This function must be called by token holders during transfers to satisfy
/// the CrownCouncilRule. It:
/// 1. Reads the council membership from the policy config
/// 2. Verifies the request sender is in the whitelist
/// 3. Stamps the request with this rule's approval
///
/// # Arguments
/// * `request` - The ActionRequest to approve (mutated to add approval stamp)
/// * `policy` - The TokenPolicy containing the council membership list
/// * `ctx` - Transaction context
///
/// # Aborts
/// * `ENotACouncilMember` - If the request sender is not in the council
public fun prove<T>(request: &mut ActionRequest<T>, policy: &TokenPolicy<T>, ctx: &mut TxContext) {
    let config: &Config = token::rule_config(
        CrownCouncilRule(),
        policy,
    );
    assert!(config.members.contains(&request.sender()), ENotACouncilMember);
    token::add_approval(CrownCouncilRule(), request, ctx);
}

// === Tests ===

#[test_only]
/// Test-only OTW for creating a test token policy.
public struct CROWN_COUNCIL_RULE() has drop;

#[test]
/// Verifies that council members can be added and removed correctly.
///
/// Tests the full lifecycle of council membership management.
fun test_add_and_remove_council_members() {
    let council_member_1 = @0x11111;
    let council_member_2 = @0x22222;
    let mut dummy_ctx = tx_context::dummy();

    // --- Setup: Create a test policy with one initial member ---
    let (mut policy, cap) = token::new_policy_for_testing<CROWN_COUNCIL_RULE>(&mut dummy_ctx);
    add_rule_config<CROWN_COUNCIL_RULE>(&mut policy, &cap, vector[council_member_1], &mut dummy_ctx);

    // --- Verify: Rule config was added correctly ---
    assert!(policy.has_rule_config_with_type<CROWN_COUNCIL_RULE, CrownCouncilRule, Config>());
    let config: &Config = token::rule_config(CrownCouncilRule(), &policy);
    assert!(config.members.contains(&council_member_1));

    // --- Test: Add a second council member ---
    add_council_member(&mut policy, &cap, council_member_2);
    let config: &Config = token::rule_config(CrownCouncilRule(), &policy);
    assert!(config.members.contains(&council_member_2));
    assert!(config.members.length() == 2);

    // --- Test: Remove the first council member ---
    remove_council_member(&mut policy, &cap, council_member_1);
    let config: &Config = token::rule_config(CrownCouncilRule(), &policy);
    assert!(!config.members.contains(&council_member_1));
    assert!(config.members.length() == 1);

    // --- Cleanup ---
    policy.burn_policy_for_testing(cap);
}

