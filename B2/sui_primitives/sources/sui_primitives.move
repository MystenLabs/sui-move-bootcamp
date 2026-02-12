module sui_primitives::sui_primitives;
#[test_only]
use sui::dynamic_field;
#[test_only]
use sui::dynamic_object_field;
#[test_only]
use std::string::{String};
#[test_only]
use sui::test_scenario;

#[test]
fun test_numbers() {
    let a = 50;
    let b = 50;
    assert!(a == b, 601);

    let c = a + b;
    assert!(c == 100, 602);

    let d = c - a;
    assert!(d == 50, 603);
}

#[test]
fun test_overflow() {
    let a: u16 = 500;
    let b: u16 = 500;

    let c: u16 = a + b;
    assert!(c == 1000u16, 604);
}

#[test]
fun test_addition() {
    let a = 500;
    let b = 500;

    let c = a + b;
    std::debug::print(&c);
}

#[test]
fun test_mutability() {
    let mut a = 100;
    a = a - 10;
    assert!(a == 90, 605);
}

#[test]
fun test_boolean() {
    let a = 500;
    let b = 1000;
    let greater = b > a;
    assert!(greater == true, 606);
}

#[test]
fun test_loop() {
    let fact = 5;
    let mut result: u256 = 1;
    let mut i = 2;
    while (i <= fact) {
        result = result * i;
        i = i + 1;
    };
    std::debug::print(&result);
    assert!(result == 120, 607);
}

#[test]
fun test_vector() {
    let mut myVec: vector<u8> = vector[10, 20, 30];

    assert!(myVec.length() == 3, 11);
    assert!(!myVec.is_empty(), 12);

    myVec.push_back(40);
    let last_value = myVec.pop_back();

    assert!(last_value == 40, 13);

    while (myVec.length() > 0) {
        myVec.pop_back();
    };
    assert!(myVec.is_empty(), 14);
}

#[test]
fun test_vectors() {
    let mut myVec: vector<u8> = vector[10];
    myVec.push_back(20);
    std::debug::print(&myVec.length());
    std::debug::print(&myVec.pop_back());
}

#[test]
fun test_string() {
    let myString: String = b"Hello".to_string();
    let myStringArr: vector<u8> = b"Hello";

    std::debug::print(&myStringArr.length());
    std::debug::print(&myString);
    std::debug::print(&myStringArr);

    assert!(myString.length() == myStringArr.length(), 41);
    assert!(myString == myStringArr.to_string(), 42);
}

#[test]
fun test_string2() {
    let myStringArr = b"Hello, World!";
    let mut i: u64 = 0;
    let mut indexOfW: u64 = 0;
    while (i < myStringArr.length()) {
        indexOfW = if (myStringArr[i] == 87) { i } else { indexOfW };
        i = i + 1;
    };
    assert!(indexOfW == 7);
}

public struct Container has key {
    id: UID,
}

public struct Item has key, store {
    id: UID,
    value: u64,
}

#[test]
fun test_dynamic_fields() {
    let mut test_scenario = test_scenario::begin(@0xCAFE);
    let mut container = Container {
        id: object::new(test_scenario.ctx()),
    };

    // PART 1: Dynamic Fields
    dynamic_field::add(&mut container.id, b"score", 100u64);
    let score = dynamic_field::borrow(&container.id, b"score");
    assert!(score == 100, 123);
    dynamic_field::remove<vector<u8>, u64>(&mut container.id, b"score");
    assert!(!dynamic_field::exists_(&container.id, b"score"), 124);

    // PART 2: Dynamic Object Fields
    let item = Item {
        id: object::new(test_scenario.ctx()),
        value: 500,
    };
    dynamic_object_field::add(&mut container.id, b"item", item);
    let item_ref = dynamic_object_field::borrow<vector<u8>, Item>(&container.id, b"item");
    assert!(item_ref.value == 500, 125);
    let item = dynamic_object_field::remove<vector<u8>, Item>(&mut container.id, b"item");
    assert!(!dynamic_object_field::exists_(&container.id, b"item"), 126);
    let Item { id, value: _ } = item;
    object::delete(id);

    // Clean up
    let Container {
        id,
    } = container;
    object::delete(id);
    test_scenario.end();
}
