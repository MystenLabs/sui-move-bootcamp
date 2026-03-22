/// # Billing Session
///
/// Simple pay-per-kWh escrow built on the `WATT` coin.
module depin_energy_monitor::billing;

use depin_energy_monitor::watt::WATT;
use std::string::String;
use sui::balance::Balance;
use sui::coin::{Self, Coin};
use sui::event;

/// Only customer or operator may manage the session.
const ENotAuthorized: u64 = 0;
/// Session has already been drained or closed.
const ESessionInactive: u64 = 1;
/// Escrow cannot cover the requested settlement amount.
const EInsufficientEscrow: u64 = 2;
/// Only the operator can settle meter usage in the base module.
const EOperatorOnly: u64 = 3;

public struct BillingSession has key {
    id: UID,
    meter_id: String,
    customer: address,
    operator: address,
    price_per_kwh: u64,
    escrow: Balance<WATT>,
    consumed_kwh_milli: u64,
    total_charged: u64,
    is_active: bool,
}

public struct BillingSessionOpened has copy, drop {
    session_id: ID,
    customer: address,
    operator: address,
    escrowed_watt: u64,
}

public struct BillingSessionSettled has copy, drop {
    session_id: ID,
    additional_kwh_milli: u64,
    amount_charged: u64,
    remaining_escrow: u64,
}

public struct BillingSessionClosed has copy, drop {
    session_id: ID,
    total_charged: u64,
    refunded: u64,
}

public fun open_session(
    operator: address,
    meter_id: String,
    price_per_kwh: u64,
    deposit: Coin<WATT>,
    ctx: &mut TxContext,
) {
    let escrowed_watt = deposit.value();
    let session = BillingSession {
        id: object::new(ctx),
        meter_id,
        customer: ctx.sender(),
        operator,
        price_per_kwh,
        escrow: coin::into_balance(deposit),
        consumed_kwh_milli: 0,
        total_charged: 0,
        is_active: true,
    };

    event::emit(BillingSessionOpened {
        session_id: object::id(&session),
        customer: session.customer,
        operator: session.operator,
        escrowed_watt,
    });

    transfer::share_object(session);
}

public fun settle_usage(
    session: &mut BillingSession,
    additional_kwh_milli: u64,
    ctx: &mut TxContext,
) {
    assert!(session.is_active, ESessionInactive);
    assert!(ctx.sender() == session.operator, EOperatorOnly);

    let amount_charged = ((additional_kwh_milli * session.price_per_kwh) + 999) / 1000;
    assert!(session.escrow.value() >= amount_charged, EInsufficientEscrow);

    session.consumed_kwh_milli = session.consumed_kwh_milli + additional_kwh_milli;
    session.total_charged = session.total_charged + amount_charged;

    if (amount_charged > 0) {
        let payout = coin::from_balance(session.escrow.split(amount_charged), ctx);
        transfer::public_transfer(payout, session.operator);
    };

    if (session.escrow.value() == 0) {
        session.is_active = false;
    };

    event::emit(BillingSessionSettled {
        session_id: object::id(session),
        additional_kwh_milli,
        amount_charged,
        remaining_escrow: session.escrow.value(),
    });
}

public fun close_session(session: BillingSession, ctx: &mut TxContext) {
    assert!(ctx.sender() == session.customer || ctx.sender() == session.operator, ENotAuthorized);

    let refunded = session.escrow.value();
    event::emit(BillingSessionClosed {
        session_id: object::id(&session),
        total_charged: session.total_charged,
        refunded,
    });

    let BillingSession {
        id,
        meter_id: _,
        customer,
        operator: _,
        price_per_kwh: _,
        escrow,
        consumed_kwh_milli: _,
        total_charged: _,
        is_active: _,
    } = session;

    if (refunded > 0) {
        let refund_coin = coin::from_balance(escrow, ctx);
        transfer::public_transfer(refund_coin, customer);
    } else {
        escrow.destroy_zero();
    };

    id.delete();
}

public fun meter_id(session: &BillingSession): String {
    session.meter_id
}

public fun remaining_escrow(session: &BillingSession): u64 {
    session.escrow.value()
}

public fun total_charged(session: &BillingSession): u64 {
    session.total_charged
}

public fun is_active(session: &BillingSession): bool {
    session.is_active
}
