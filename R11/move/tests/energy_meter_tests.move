#[test_only]
module depin_energy_monitor::energy_meter_tests;

use depin_energy_monitor::energy_meter::{Self, Meter};
use sui::clock;
use sui::test_scenario as ts;

#[test]
fun test_create_meter() {
    let owner = @0xA;
    let mut scenario = ts::begin(owner);

    {
        energy_meter::create_meter(b"meter-lab-01".to_string(), scenario.ctx());
    };

    scenario.next_tx(owner);
    {
        let meter = scenario.take_shared<Meter>();
        assert!(energy_meter::owner(&meter) == owner);
        assert!(energy_meter::meter_id(&meter) == b"meter-lab-01".to_string());
        assert!(energy_meter::last_kwh_milli(&meter) == 0);
        ts::return_shared(meter);
    };

    scenario.end();
}

#[test]
fun test_record_reading_updates_meter() {
    let owner = @0xA;
    let mut scenario = ts::begin(owner);

    {
        energy_meter::create_meter(b"meter-lab-01".to_string(), scenario.ctx());
    };

    scenario.next_tx(owner);
    {
        let mut meter = scenario.take_shared<Meter>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1_000);

        energy_meter::record_reading(&mut meter, 750, 12, &test_clock, scenario.ctx());

        assert!(energy_meter::last_watts(&meter) == 750);
        assert!(energy_meter::last_kwh_milli(&meter) == 12);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(meter);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::depin_energy_monitor::energy_meter::ENonMonotonicKwh)]
fun test_record_reading_rejects_non_monotonic_kwh() {
    let owner = @0xA;
    let mut scenario = ts::begin(owner);

    {
        energy_meter::create_meter(b"meter-lab-01".to_string(), scenario.ctx());
    };

    scenario.next_tx(owner);
    {
        let mut meter = scenario.take_shared<Meter>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 1_000);

        energy_meter::record_reading(&mut meter, 750, 20, &test_clock, scenario.ctx());
        energy_meter::record_reading(&mut meter, 751, 10, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(meter);
    };

    scenario.end();
}
