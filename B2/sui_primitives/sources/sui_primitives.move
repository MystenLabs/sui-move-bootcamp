module sui_primitives::sui_primitives;

#[test]
fun test_numbers() {
    let a = 50;
    let b = 50;
    assert!(a == b, 601);
}

#[test]
fun test_as() {
    let a: u8 = 255;
    let b: u8 = 1;
    assert!((a as u16) + (b as u16) == 256u16, 602);
}

#[test, expected_failure]
fun test_overflow() {
    let a: u8 = 255;
    let b: u8 = 1;
    // This will raise an error
    let _c = a + b;
}

// You can fill in 603 directly, but there will be a warning
// #[test, expected_failure(abort_code = 603)]
const ENotEqualBoolean: u64 = 603;
#[test, expected_failure(abort_code = ENotEqualBoolean)]
fun test_boolean() {
    let a = true;
    let b = false;
    assert!(a == b, ENotEqualBoolean);
}

#[test]
#[allow(unused_assignment)]
fun test_mutability() {
    let mut a = 1;
    a = 2;
    assert!(a == 2, 604);

    // This will raise an error
    // let a = 1;
    // a = 2;
}

#[test]
fun test_loop() {
    let mut sum = 0;

    // while
    let mut i = 0;
    while (i <= 10) {
        sum = sum + i;
        i = i + 1;
    };
    assert!(sum == 55, 605);

    // loop
    loop {
        sum = sum + i;
        i = i + 1;
        if (i > 20) {
            break
        };
    };
    assert!(sum == 210, 606)
}

#[test]
fun test_vector() {
    let mut v: vector<u8> = vector[10, 20, 30];
    assert!(!v.is_empty(), 607);
    assert!(v.remove(1) == 20, 608);
    assert!(v.length() == 2, 609);
    assert!(v[1] == 30, 610);
    v.push_back(40);
    let last_value = v.pop_back();
    assert!(last_value == 40, 611);
}

use std::ascii::string;
use std::string::utf8;

#[test]
fun test_string() {
    let stringArr: vector<u8> = b"Hello, World!";
    let asciiString = string(stringArr);
    let string = utf8(stringArr);
    assert!(asciiString.to_string() == string, 612);
    assert!(string.into_bytes() == stringArr, 613);
}