module king_credits::crown_council_rule;

use sui::token::{Self, ActionRequest, TokenPolicy, TokenPolicyCap};
use sui::vec_set::{Self, VecSet};

/// Max `MAX_CROWN_COUNCIL_MEMBERS` members in the council.
const EMaxCouncilMembers: u64 = 0;
/// Only Crown Council members can prove this rule.
const ENotACouncilMember: u64 = 1;


const MAX_CROWN_COUNCIL_MEMBERS: u64 = 100;

public struct CrownCouncilRule() has drop;

public struct Config has store {
    members: VecSet<address>
}

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
    assert!(config.members.size() < MAX_CROWN_COUNCIL_MEMBERS, EMaxCouncilMembers);
    config.members.insert(member_addr);
}

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

public fun prove<T>(request: &mut ActionRequest<T>, policy: &TokenPolicy<T>, ctx: &mut TxContext) {
    let config: &Config = token::rule_config(
        CrownCouncilRule(),
        policy,
    );
    assert!(config.members.contains(&request.sender()), ENotACouncilMember);
    token::add_approval(CrownCouncilRule(), request, ctx);
}

#[test_only]
public struct CROWN_COUNCIL_RULE() has drop;

#[test]
fun test_edit_council() {
    let council_member_1 = @0x11111;
    let council_member_2 = @0x22222;
    let mut dummy_ctx = tx_context::dummy();
    let (mut policy, cap) = token::new_policy_for_testing<CROWN_COUNCIL_RULE>(&mut dummy_ctx);
    add_rule_config<CROWN_COUNCIL_RULE>(&mut policy, &cap, vector[council_member_1], &mut dummy_ctx);
    assert!(policy.has_rule_config_with_type<CROWN_COUNCIL_RULE, CrownCouncilRule, Config>());

    let config: &Config = token::rule_config(CrownCouncilRule(), &policy);
    assert!(config.members.contains(&council_member_1));

    add_council_member(&mut policy, &cap, council_member_2);
    let config: &Config = token::rule_config(CrownCouncilRule(), &policy);
    assert!(config.members.contains(&council_member_2));
    assert!(config.members.size() == 2);

    remove_council_member(&mut policy, &cap, council_member_1);
    let config: &Config = token::rule_config(CrownCouncilRule(), &policy);
    assert!(!config.members.contains(&council_member_1));
    assert!(config.members.size() == 1);
    policy.burn_policy_for_testing(cap);
}

