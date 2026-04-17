/// Module: enoki_example
/// A simple counter contract demonstrating increment and decrement operations
/// with event history for use with Enoki sponsored transactions.
module enoki_example::counter;

use std::string::String;

// === Errors ===
#[error]
const ECannotDecrementBelowZero: vector<u8> = b"Cannot decrement counter below zero";
#[error]
const ENotImplementedYet: vector<u8> = b"Exercise TODO is not implemented yet";

// === Structs ===

/// A simple counter object that tracks a value
public struct Counter has key {
  id: UID,
  value: u64,
}

// === Events ===

/// Emitted when the counter is incremented
public struct Incremented has copy, drop {
  /// The address that performed the increment
  by: address,
  /// The note attached to the operation
  note: String,
  /// The new value after incrementing
  new_value: u64,
}

/// Emitted when the counter is decremented
public struct Decremented has copy, drop {
  /// The address that performed the decrement
  by: address,
  /// The note attached to the operation
  note: String,
  /// The new value after decrementing
  new_value: u64,
}

// === Init ===

/// Creates and shares a single counter on module publish
/// TODO (Milestone 1):
/// 1) Create the Counter object with value 0
/// 2) Share it so all users can access the same shared counter
fun init(_ctx: &mut TxContext) {
  abort ENotImplementedYet
}

// === Public Functions ===

/// Increments the counter by 1 with an optional note
/// Emits an Incremented event with the sender, note, and new value
/// TODO (Milestone 2):
/// 1) Increment the value by exactly 1
/// 2) Emit Incremented with:
///    - by: ctx.sender()
///    - note: the provided note
///    - new_value: updated value
public fun increment(counter: &mut Counter, note: String, ctx: &TxContext) {
  let _ = counter;
  let _ = note;
  let _ = ctx;
  abort ENotImplementedYet
}

/// Decrements the counter by 1 with an optional note
/// Emits a Decremented event with the sender, note, and new value
/// Aborts if the counter value is already 0
/// TODO (Milestone 3):
/// 1) Guard against decrementing below zero (reuse ECannotDecrementBelowZero)
/// 2) Decrement by exactly 1
/// 3) Emit Decremented with sender, note, and new_value
public fun decrement(counter: &mut Counter, note: String, ctx: &TxContext) {
  let _ = counter;
  let _ = note;
  let _ = ctx;
  abort ENotImplementedYet
}

// === Getter Functions ===

/// Returns the current value of the counter
public fun value(counter: &Counter): u64 {
  counter.value
}

// === Test Functions ===

#[test_only]
use sui::test_scenario::{Self as ts, Scenario};

#[test_only]
const ADMIN: address = @0xAD;

#[test_only]
const USER: address = @0xB0B;

#[test_only]
fun setup_counter(scenario: &mut Scenario) {
  ts::next_tx(scenario, ADMIN);
  {
    init(ts::ctx(scenario));
  };
}

#[test]
fun milestone_1_init_creates_shared_counter() {
  let mut scenario = ts::begin(ADMIN);

  // Milestone 1: init should create and share a counter.
  setup_counter(&mut scenario);

  ts::next_tx(&mut scenario, ADMIN);
  {
    let counter = ts::take_shared<Counter>(&scenario);
    assert!(value(&counter) == 0);
    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
fun milestone_2_increment_updates_value() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    assert!(value(&counter) == 0);

    increment(&mut counter, b"First increment".to_string(), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1);

    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
fun milestone_3_decrement_updates_value() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    increment(&mut counter, b"Setup".to_string(), ts::ctx(&mut scenario));
    increment(&mut counter, b"Setup".to_string(), ts::ctx(&mut scenario));
    assert!(value(&counter) == 2);

    decrement(&mut counter, b"Going down".to_string(), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1);

    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test, expected_failure(abort_code = ECannotDecrementBelowZero)]
fun milestone_3_decrement_below_zero_fails() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    assert!(value(&counter) == 0);
    decrement(&mut counter, b"This should fail".to_string(), ts::ctx(&mut scenario));
    ts::return_shared(counter);
  };
  ts::end(scenario);
}

#[test]
fun milestone_4_multiple_users_share_one_counter() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    increment(&mut counter, b"User increment".to_string(), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1);
    ts::return_shared(counter);
  };

  ts::next_tx(&mut scenario, ADMIN);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    increment(&mut counter, b"Admin increment".to_string(), ts::ctx(&mut scenario));
    assert!(value(&counter) == 2);
    ts::return_shared(counter);
  };

  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    decrement(&mut counter, b"User decrement".to_string(), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1);
    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
fun milestone_4_operation_sequence() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);

    assert!(value(&counter) == 0);

    increment(&mut counter, b"One".to_string(), ts::ctx(&mut scenario));
    increment(&mut counter, b"Two".to_string(), ts::ctx(&mut scenario));
    decrement(&mut counter, b"Back".to_string(), ts::ctx(&mut scenario));
    increment(&mut counter, b"Again".to_string(), ts::ctx(&mut scenario));
    assert!(value(&counter) == 2);

    ts::return_shared(counter);
  };

  ts::end(scenario);
}
