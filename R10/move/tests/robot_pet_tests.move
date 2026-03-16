/// Tests for the Robot Pet module
#[test_only]
module robot_rental_platform::robot_pet_tests;

use robot_rental_platform::robot_pet::{Self, RobotPet};
use robot_rental_platform::treat::{Self, TREAT, Faucet};
use sui::clock;
use sui::coin::Coin;
use sui::test_scenario as ts;

#[test]
fun test_create_robot() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let robot = scenario.take_shared<RobotPet>();
        assert!(robot_pet::name(&robot) == b"Bittle".to_string());
        assert!(robot_pet::queue_length(&robot) == 0);
        assert!(robot_pet::admin(&robot) == admin);
        assert!(robot_pet::total_queued(&robot) == 0);
        assert!(robot_pet::total_processed(&robot) == 0);
        assert!(robot_pet::total_treats(&robot) == 0);
        assert!(robot_pet::is_admin(&robot, admin));
        assert!(!robot_pet::is_admin(&robot, @0xB));
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_feed_robot() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    // User requests tokens from faucet
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    // User feeds robot
    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        let mut payment = scenario.take_from_sender<Coin<TREAT>>();
        let payment_coin = payment.split(1, scenario.ctx());

        robot_pet::feed(&mut robot, payment_coin, b"wave".to_string(), &test_clock, scenario.ctx());

        assert!(robot_pet::queue_length(&robot) == 1);
        assert!(robot_pet::total_queued(&robot) == 1);
        assert!(robot_pet::total_treats(&robot) == 1);

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_pop_action() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let mut payment = scenario.take_from_sender<Coin<TREAT>>();
        let payment_coin = payment.split(1, scenario.ctx());

        robot_pet::feed(&mut robot, payment_coin, b"sit".to_string(), &test_clock, scenario.ctx());

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    // Admin pops action
    scenario.next_tx(admin);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());

        assert!(robot_pet::queue_length(&robot) == 0);
        assert!(robot_pet::total_processed(&robot) == 1);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_pet::ENotAdmin)]
fun test_pop_not_admin() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let mut payment = scenario.take_from_sender<Coin<TREAT>>();
        let payment_coin = payment.split(1, scenario.ctx());

        robot_pet::feed(&mut robot, payment_coin, b"sit".to_string(), &test_clock, scenario.ctx());

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    // Non-admin tries to pop (should fail)
    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_pet::EQueueEmpty)]
fun test_pop_empty_queue() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());

        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_action_cost() {
    assert!(robot_pet::action_cost() == 1);
}

#[test]
fun test_valid_actions() {
    let actions = robot_pet::valid_actions();
    assert!(actions.length() > 0);
    assert!(actions.contains(&b"sit"));
    assert!(actions.contains(&b"wave"));
    assert!(actions.contains(&b"stand"));
    assert!(actions.contains(&b"walk_forward"));
    assert!(actions.contains(&b"walk_backward"));
    assert!(actions.contains(&b"jump"));
    assert!(actions.contains(&b"rest"));
}

// ============================================
// NEW TESTS FOR IMPROVED COVERAGE
// ============================================

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_pet::EUnsupportedAction)]
fun test_unsupported_action() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let mut payment = scenario.take_from_sender<Coin<TREAT>>();
        let payment_coin = payment.split(1, scenario.ctx());

        // "fly" is not a valid action
        robot_pet::feed(&mut robot, payment_coin, b"fly".to_string(), &test_clock, scenario.ctx());

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test, expected_failure(abort_code = ::robot_rental_platform::robot_pet::EInsufficientPayment)]
fun test_insufficient_payment() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 1, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let mut payment = scenario.take_from_sender<Coin<TREAT>>();

        // Split 0 TREAT — insufficient payment
        let payment_coin = payment.split(0, scenario.ctx());

        robot_pet::feed(&mut robot, payment_coin, b"wave".to_string(), &test_clock, scenario.ctx());

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_multiple_actions_fifo_order() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    // Queue three actions
    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        let mut payment = scenario.take_from_sender<Coin<TREAT>>();

        let coin1 = payment.split(1, scenario.ctx());
        robot_pet::feed(&mut robot, coin1, b"sit".to_string(), &test_clock, scenario.ctx());

        let coin2 = payment.split(1, scenario.ctx());
        robot_pet::feed(&mut robot, coin2, b"wave".to_string(), &test_clock, scenario.ctx());

        let coin3 = payment.split(1, scenario.ctx());
        robot_pet::feed(&mut robot, coin3, b"jump".to_string(), &test_clock, scenario.ctx());

        assert!(robot_pet::queue_length(&robot) == 3);
        assert!(robot_pet::total_queued(&robot) == 3);
        assert!(robot_pet::total_treats(&robot) == 3);

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    // Pop first action — should be "sit" (FIFO)
    scenario.next_tx(admin);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        // Peek before pop
        let peeked = robot_pet::peek_next_action(&robot);
        assert!(peeked.is_some());
        let action = peeked.borrow();
        assert!(robot_pet::action_name(action) == b"sit".to_string());
        assert!(robot_pet::action_sender(action) == user);

        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());
        assert!(robot_pet::queue_length(&robot) == 2);

        // Next should be "wave"
        let peeked2 = robot_pet::peek_next_action(&robot);
        assert!(peeked2.is_some());
        let action2 = peeked2.borrow();
        assert!(robot_pet::action_name(action2) == b"wave".to_string());

        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());
        assert!(robot_pet::queue_length(&robot) == 1);

        // Next should be "jump"
        let peeked3 = robot_pet::peek_next_action(&robot);
        assert!(peeked3.is_some());
        let action3 = peeked3.borrow();
        assert!(robot_pet::action_name(action3) == b"jump".to_string());

        robot_pet::pop_action(&mut robot, &test_clock, scenario.ctx());
        assert!(robot_pet::queue_length(&robot) == 0);
        assert!(robot_pet::total_processed(&robot) == 3);

        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_peek_next_action_empty_queue() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let robot = scenario.take_shared<RobotPet>();

        let peeked = robot_pet::peek_next_action(&robot);
        assert!(peeked.is_none());

        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_action_timestamp() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 5, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let mut test_clock = clock::create_for_testing(scenario.ctx());
        clock::set_for_testing(&mut test_clock, 42_000);

        let mut payment = scenario.take_from_sender<Coin<TREAT>>();
        let payment_coin = payment.split(1, scenario.ctx());

        robot_pet::feed(&mut robot, payment_coin, b"sit".to_string(), &test_clock, scenario.ctx());

        // Verify timestamp on the queued action
        let peeked = robot_pet::peek_next_action(&robot);
        assert!(peeked.is_some());
        let action = peeked.borrow();
        assert!(robot_pet::action_timestamp(action) == 42_000);

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_robot_id() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    {
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    scenario.next_tx(admin);
    {
        let robot = scenario.take_shared<RobotPet>();

        // id() should return the same as object::id
        let rid = robot_pet::id(&robot);
        assert!(rid == object::id(&robot));

        ts::return_shared(robot);
    };

    scenario.end();
}

#[test]
fun test_all_valid_actions_accepted() {
    let admin = @0xA;
    let user = @0xB;
    let mut scenario = ts::begin(admin);

    {
        treat::init_for_testing(scenario.ctx());
        robot_pet::create_robot(b"Bittle".to_string(), scenario.ctx());
    };

    // Request enough tokens for all 16 actions
    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 10, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    scenario.next_tx(user);
    {
        let mut faucet = scenario.take_shared<Faucet>();
        let test_clock = clock::create_for_testing(scenario.ctx());
        treat::request_tokens(&mut faucet, 6, &test_clock, scenario.ctx());
        clock::destroy_for_testing(test_clock);
        ts::return_shared(faucet);
    };

    // Feed all 16 valid actions (merging two coins)
    scenario.next_tx(user);
    {
        let mut robot = scenario.take_shared<RobotPet>();
        let test_clock = clock::create_for_testing(scenario.ctx());

        // Take and merge coins
        let mut coin1 = scenario.take_from_sender<Coin<TREAT>>();
        let coin2 = scenario.take_from_sender<Coin<TREAT>>();
        coin1.join(coin2);
        let mut payment = coin1;

        let actions: vector<vector<u8>> = vector[
            b"sit",
            b"stand",
            b"wave",
            b"walk_forward",
            b"walk_backward",
            b"turn_left",
            b"turn_right",
            b"jump",
            b"balance",
            b"rest",
            b"push_up",
            b"play_dead",
            b"stretch",
            b"greeting",
            b"sniff",
            b"pee",
        ];

        let mut i = 0u64;
        while (i < actions.length()) {
            let c = payment.split(1, scenario.ctx());
            robot_pet::feed(
                &mut robot,
                c,
                std::string::utf8(actions[i]),
                &test_clock,
                scenario.ctx(),
            );
            i = i + 1;
        };

        assert!(robot_pet::queue_length(&robot) == 16);
        assert!(robot_pet::total_treats(&robot) == 16);

        transfer::public_transfer(payment, user);
        clock::destroy_for_testing(test_clock);
        ts::return_shared(robot);
    };

    scenario.end();
}
