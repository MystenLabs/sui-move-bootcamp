/// Module: enoki_example
/// A simple counter contract demonstrating increment and decrement operations
/// with event history for use with Enoki sponsored transactions.
module enoki_example::counter;

use std::string::String;

// === Errors ===
#[error]
const ECannotDecrementBelowZero: vector<u8> = b"Cannot decrement counter below zero";

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
fun init(ctx: &mut TxContext) {
  let counter = Counter {
    id: object::new(ctx),
    value: 0,
  };
  transfer::share_object(counter);
}

// === Public Functions ===

/// Increments the counter by 1 with an optional note
/// Emits an Incremented event with the sender, note, and new value
public fun increment(counter: &mut Counter, note: String, ctx: &TxContext) {
  counter.value = counter.value + 1;

  sui::event::emit(Incremented {
    by: ctx.sender(),
    note,
    new_value: counter.value,
  });
}

/// Decrements the counter by 1 with an optional note
/// Emits a Decremented event with the sender, note, and new value
/// Aborts if the counter value is already 0
public fun decrement(counter: &mut Counter, note: String, ctx: &TxContext) {
  assert!(counter.value > 0, ECannotDecrementBelowZero);
  counter.value = counter.value - 1;

  sui::event::emit(Decremented {
    by: ctx.sender(),
    note,
    new_value: counter.value,
  });
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
fun test_init_creates_counter() {
  let mut scenario = ts::begin(ADMIN);

  // Init creates counter
  setup_counter(&mut scenario);

  // Verify counter was created with value 0
  ts::next_tx(&mut scenario, ADMIN);
  {
    let counter = ts::take_shared<Counter>(&scenario);
    assert!(value(&counter) == 0, 0);
    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
fun test_increment_with_note() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  // Increment the counter with a note
  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    assert!(value(&counter) == 0, 0);

    increment(&mut counter, std::string::utf8(b"First increment!"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1, 1);

    increment(&mut counter, std::string::utf8(b"Second increment"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 2, 2);

    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
fun test_decrement_with_note() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  // First increment to have something to decrement
  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    increment(&mut counter, std::string::utf8(b"Setup"), ts::ctx(&mut scenario));
    increment(&mut counter, std::string::utf8(b"Setup"), ts::ctx(&mut scenario));
    increment(&mut counter, std::string::utf8(b"Setup"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 3, 0);
    ts::return_shared(counter);
  };

  // Decrement the counter with notes
  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);

    decrement(&mut counter, std::string::utf8(b"Going down!"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 2, 1);

    decrement(&mut counter, std::string::utf8(b"Almost there"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1, 2);

    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
#[expected_failure(abort_code = ECannotDecrementBelowZero)]
fun test_decrement_below_zero_fails() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  // Try to decrement counter that is at 0 - should fail
  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    assert!(value(&counter) == 0, 0);

    // This should abort with ECannotDecrementBelowZero
    decrement(&mut counter, std::string::utf8(b"This will fail"), ts::ctx(&mut scenario));

    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
fun test_increment_with_empty_note() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  // Increment with empty note
  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);

    increment(&mut counter, std::string::utf8(b""), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1, 0);

    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
fun test_multiple_users_can_access() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  // User 1 increments
  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    increment(&mut counter, std::string::utf8(b"User 1 was here"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1, 0);
    ts::return_shared(counter);
  };

  // Admin increments
  ts::next_tx(&mut scenario, ADMIN);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    increment(&mut counter, std::string::utf8(b"Admin joined"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 2, 1);
    ts::return_shared(counter);
  };

  // User 1 decrements
  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);
    decrement(&mut counter, std::string::utf8(b"User 1 decrements"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 1, 2);
    ts::return_shared(counter);
  };

  ts::end(scenario);
}

#[test]
fun test_increment_and_decrement_sequence() {
  let mut scenario = ts::begin(ADMIN);
  setup_counter(&mut scenario);

  // Test a sequence of operations
  ts::next_tx(&mut scenario, USER);
  {
    let mut counter = ts::take_shared<Counter>(&scenario);

    // Start at 0
    assert!(value(&counter) == 0, 0);

    // Increment 3 times: 0 -> 1 -> 2 -> 3
    increment(&mut counter, std::string::utf8(b"One"), ts::ctx(&mut scenario));
    increment(&mut counter, std::string::utf8(b"Two"), ts::ctx(&mut scenario));
    increment(&mut counter, std::string::utf8(b"Three"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 3, 1);

    // Decrement once: 3 -> 2
    decrement(&mut counter, std::string::utf8(b"Back to two"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 2, 2);

    // Increment twice: 2 -> 3 -> 4
    increment(&mut counter, std::string::utf8(b"Up again"), ts::ctx(&mut scenario));
    increment(&mut counter, std::string::utf8(b"Final"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 4, 3);

    // Decrement to 0: 4 -> 3 -> 2 -> 1 -> 0
    decrement(&mut counter, std::string::utf8(b"4"), ts::ctx(&mut scenario));
    decrement(&mut counter, std::string::utf8(b"3"), ts::ctx(&mut scenario));
    decrement(&mut counter, std::string::utf8(b"2"), ts::ctx(&mut scenario));
    decrement(&mut counter, std::string::utf8(b"1"), ts::ctx(&mut scenario));
    assert!(value(&counter) == 0, 4);

    ts::return_shared(counter);
  };

  ts::end(scenario);
}
