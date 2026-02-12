module weapon::weapon;
use std::ascii::String;
use std::type_name;
use sui::package::{Self, Publisher};
use sui::table::{Self, Table};

const EInvalidCaller: u64 = 0;
const EInvalidPublisher: u64 = 1;
const EAlreadyWhitelisted: u64 = 2;
const EAlreadyBlackListed: u64 = 3;

public struct WEAPON has drop {}

public struct AllowList has key {
    id: UID,
    witness_types: Table<String, bool>,
}

public struct Weapon has key, store {
    id: UID,
    name: String,
}

fun init(otw: WEAPON, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
    let allow_list = AllowList {
        id: object::new(ctx),
        witness_types: table::new(ctx),
    };
    transfer::share_object(allow_list);
}

public fun mint_weapon<W: drop>(
    _: W,
    name: String,
    allow_list: &AllowList,
    ctx: &mut TxContext,
): Weapon {
    let caller_witness = type_name::with_original_ids<W>().into_string();
    assert!(
        allow_list.witness_types.contains(caller_witness) &&
        *allow_list.witness_types.borrow(caller_witness),
        EInvalidCaller,
    );

    Weapon {
        id: object::new(ctx),
        name,
    }
}

public fun name(weapon: &Weapon): String {
    weapon.name
}

entry fun whitelist_witness<T>(p: &Publisher, allow_list: &mut AllowList) {
    assert!(p.from_module<WEAPON>(), EInvalidPublisher);
    let witness_type = type_name::with_original_ids<T>().into_string();
    let (already_exists, already_whitelisted) = contains_and_is_whitelisted(
        witness_type,
        allow_list,
    );
    assert!(!(already_exists && already_whitelisted), EAlreadyWhitelisted);

    if (!already_exists) {
        allow_list.witness_types.add(witness_type, true);
    } else {
        *allow_list.witness_types.borrow_mut(witness_type) = true;
    };
}

entry fun blacklist_witness<T>(p: &Publisher, allow_list: &mut AllowList) {
    assert!(p.from_module<WEAPON>(), EInvalidPublisher);
    let witness_type = type_name::with_original_ids<T>().into_string();
    let (already_exists, already_whitelisted) = contains_and_is_whitelisted(
        witness_type,
        allow_list,
    );
    assert!(already_exists && !already_whitelisted, EAlreadyBlackListed);

    if (!already_exists) {
        allow_list.witness_types.add(witness_type, false);
    } else {
        *allow_list.witness_types.borrow_mut(witness_type) = false;
    };
}

fun contains_and_is_whitelisted(witness_type: String, allow_list: &AllowList): (bool, bool) {
    let exists = allow_list.witness_types.contains(witness_type);
    let whitelisted = exists && !*allow_list.witness_types.borrow(witness_type);
    (exists, whitelisted)
}

#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(WEAPON {}, ctx);
}