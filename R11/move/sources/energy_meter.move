/// # Energy Meter
///
/// Shared meter objects emit immutable readings that off-chain services can
/// index or reward.
module depin_energy_monitor::energy_meter;

use std::string::String;
use sui::clock::Clock;
use sui::event;

/// Reading exceeds the module's plausible wattage range.
const EReadingOutOfRange: u64 = 0;
/// kWh total must be monotonic.
const ENonMonotonicKwh: u64 = 1;
/// Only the meter owner can report directly in the base module.
const EUnauthorizedReporter: u64 = 2;

const MAX_WATTS: u64 = 50_000;

public struct Meter has key {
    id: UID,
    meter_id: String,
    owner: address,
    last_timestamp_ms: u64,
    last_kwh_milli: u64,
    last_watts: u64,
}

public struct EnergyReadingRecorded has copy, drop {
    meter_id: String,
    watts: u64,
    total_kwh_milli: u64,
    timestamp_ms: u64,
    reporter: address,
}

public fun create_meter(meter_id: String, ctx: &mut TxContext) {
    let meter = Meter {
        id: object::new(ctx),
        meter_id,
        owner: ctx.sender(),
        last_timestamp_ms: 0,
        last_kwh_milli: 0,
        last_watts: 0,
    };

    transfer::share_object(meter);
}

public fun record_reading(
    meter: &mut Meter,
    watts: u64,
    total_kwh_milli: u64,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    let reporter = ctx.sender();
    assert!(reporter == meter.owner, EUnauthorizedReporter);
    assert!(watts <= MAX_WATTS, EReadingOutOfRange);
    assert!(total_kwh_milli >= meter.last_kwh_milli, ENonMonotonicKwh);

    let timestamp_ms = clock.timestamp_ms();
    meter.last_timestamp_ms = timestamp_ms;
    meter.last_kwh_milli = total_kwh_milli;
    meter.last_watts = watts;

    event::emit(EnergyReadingRecorded {
        meter_id: meter.meter_id,
        watts,
        total_kwh_milli,
        timestamp_ms,
        reporter,
    });
}

public fun owner(meter: &Meter): address {
    meter.owner
}

public fun meter_id(meter: &Meter): String {
    meter.meter_id
}

public fun last_kwh_milli(meter: &Meter): u64 {
    meter.last_kwh_milli
}

public fun last_watts(meter: &Meter): u64 {
    meter.last_watts
}
