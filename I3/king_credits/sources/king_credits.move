/// Module: king_credits
module king_credits::king_credits;

use sui::coin;
use sui::token;
use sui::url;

use king_credits::crown_council_rule::{Self, CrownCouncilRule};
const DECIMALS: u8 = 9;
const NAME: vector<u8> = b"King's Credits";
const SYMBOL: vector<u8> = b"KING_CREDITS";
const DESCRIPTION: vector<u8> = b"Awarded to citizens for heroic actions.";
const ICON_URL: vector<u8> = b"https://aggregator.walrus-testnet.walrus.space/v1/blobs/uh8f-t66vVmQLtZEhO024rvHOVskOrLq_Wb2BHJRKBw";

public struct KING_CREDITS() has drop;

fun init(otw: KING_CREDITS, ctx: &mut TxContext) {
    let (tcap, metadata) = coin::create_currency(
        otw,
        DECIMALS,
        SYMBOL,
        NAME,
        DESCRIPTION,
        option::some(url::new_unsafe_from_bytes(ICON_URL)),
        ctx
    );

    let (mut policy, policy_cap) = token::new_policy(&tcap, ctx);

    token::add_rule_for_action<KING_CREDITS, CrownCouncilRule>(
        &mut policy,
        &policy_cap,
        token::transfer_action(),
        ctx
    );
    crown_council_rule::add_rule_config(&mut policy, &policy_cap, vector[], ctx);

    token::share_policy(policy);
    transfer::public_transfer(policy_cap, ctx.sender());
    transfer::public_transfer(tcap, ctx.sender());
    transfer::public_transfer(metadata, ctx.sender());
}

#[test_only]
use sui::{
    coin::TreasuryCap,
    test_scenario,
    token::{Token, TokenPolicy, TokenPolicyCap}
};

#[test]
fun test_transfer() {
    let publisher = @0x11111;
    let council_member = @0x22222;
    let recipient = @0x33333;

    let mut scenario = test_scenario::begin(publisher);
    // Initialize package
    {
        init(KING_CREDITS(), scenario.ctx());
    };

    // Edit Policy rules
    scenario.next_tx(publisher);
    {
        let policy_cap = scenario.take_from_sender<TokenPolicyCap<KING_CREDITS>>();
        let mut policy = scenario.take_shared<TokenPolicy<KING_CREDITS>>();
        crown_council_rule::add_council_member(&mut policy, &policy_cap, council_member);
        test_scenario::return_shared(policy);
        scenario.return_to_sender(policy_cap);
    };

    // Mint tokens to council_member
    scenario.next_tx(publisher);
    {
        let mut tcap = scenario.take_from_sender<TreasuryCap<KING_CREDITS>>();
        let token = token::mint(&mut tcap, 100_000_000_000_000, scenario.ctx());
        let request = token::transfer(token, council_member, scenario.ctx());
        token::confirm_with_treasury_cap(&mut tcap, request, scenario.ctx());
        scenario.return_to_sender(tcap);
    };

    scenario.next_tx(council_member);
    let id;
    {
        let policy = scenario.take_shared<TokenPolicy<KING_CREDITS>>();
        let token = scenario.take_from_sender<Token<KING_CREDITS>>();
        id = object::id(&token);
        let mut request = token::transfer(token, recipient, scenario.ctx());
        crown_council_rule::prove(&mut request, &policy, scenario.ctx());
        token::confirm_request(&policy, request, scenario.ctx());
        test_scenario::return_shared(policy)
    };

    let transfer_effects = scenario.end();
    let transferred = transfer_effects.transferred_to_account();
    assert!(transferred.contains(&id));
}
