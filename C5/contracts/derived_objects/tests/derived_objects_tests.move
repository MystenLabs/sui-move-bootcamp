#[test_only]
module derived_objects::derived_objects_tests;

use derived_objects::objects;
use derived_objects::parent;
use std::unit_test::destroy;
use sui::derived_object;
use sui::test_scenario;

const SENDER: address = @0x1;

#[random_test]
/// dev: Using random test for deeper checks and coverage
fun test_derived_incremental(mut times: u64) {
    // setup loop vars and bound the times for the loop to (1 <= times <= 5)
    times = (times % 5) + 1;
    let mut i = 0;

    // init scenario and parent object
    let mut scenario = test_scenario::begin(SENDER);
    let mut parent = parent::create_parent_object(scenario.ctx());

    while (i < times) {
        // create key and determine derived address
        let key = parent.get_incremental_counter();
        let expected_derived_object_address = derived_object::derive_address(object::id(&parent), key);

        // create derived object
        let obj = objects::new_derived_incremental(&mut parent);

        // assert: derived object's ID == expected (checking address)
        assert!(object::id(&obj).to_address() == expected_derived_object_address);

        // destroy derived object
        destroy(obj);

        // increment loop var and jump scenario to next tx
        i = i + 1;
        scenario.next_tx(SENDER);
    };

    // destroy parent object
    destroy(parent);

    // end scenario
    scenario.end();
}

#[test]
fun test_derived_address() {
    // init scenario and parent object
    let mut scenario = test_scenario::begin(SENDER);
    let mut parent = parent::create_parent_object(scenario.ctx());

    // create key and determine derived address
    let key: address = @0xA;
    let expected_derived_object_address = derived_object::derive_address(object::id(&parent), key);

    // create derived object
    let obj = objects::new_derived_address(&mut parent, key);

    // assert: derived object's ID == expected (checking address)
    assert!(object::id(&obj).to_address() == expected_derived_object_address);

    // destroy objects used for the test
    destroy(obj);
    destroy(parent);

    // end scenario
    scenario.end();
}

#[test]
fun test_derived_string() {
    // init scenario and parent object
    let mut scenario = test_scenario::begin(SENDER);
    let mut parent = parent::create_parent_object(scenario.ctx());

    // create key and determine derived address
    let key = b"my_string".to_string();
    let expected_derived_object_address = derived_object::derive_address(object::id(&parent), key);

    // create derived object
    let obj = objects::new_derived_string(&mut parent, key);

    // assert: derived object's ID == expected (checking address)
    assert!(object::id(&obj).to_address() == expected_derived_object_address);

    // destroy objects used for the test
    destroy(obj);
    destroy(parent);

    // end scenario
    scenario.end();
}

#[test]
fun test_derived_struct() {
    // init scenario and parent object
    let mut scenario = test_scenario::begin(SENDER);
    let mut parent = parent::create_parent_object(scenario.ctx());

    // create key and determine derived address
    let key = objects::create_derived_struct_key(@0xB);
    let expected_derived_object_address = derived_object::derive_address(object::id(&parent), key);

    // create derived object
    let obj = objects::new_derived_struct(&mut parent, @0xB);

    // assert: derived object's ID == expected (checking address)
    assert!(object::id(&obj).to_address() == expected_derived_object_address);

    // destroy objects used for the test
    destroy(obj);
    destroy(parent);

    // end scenario
    scenario.end();
}
