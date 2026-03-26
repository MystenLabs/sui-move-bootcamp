/// Module: Objects
/// Collection of different derived objects types and helper functions
/// dev: `derivation_id`: optional field in every object to improve offchain operations(e.g. indexing) -
/// and additional security checks in future
/// dev: We use `key, store` abilities to allow public transfers
module derived_objects::objects;

use derived_objects::parent::ParentObject;
use std::string::String;
use sui::derived_object;

// ================================ Derived Objects Structs ================================

/// Derived Object Incremental (u64): will be derived from (parent + u64), incremental
public struct DerivedObjectIncremental has key, store {
    id: UID,
    derivation_id: ID,
}

/// Derived Object Address: will be derived from (parent + address), e.g. sender address
public struct DerivedObjectAddress has key, store {
    id: UID,
    derivation_id: ID,
}

/// Derived Object String: will be derived from (parent + String)
public struct DerivedObjectString has key, store {
    id: UID,
    derivation_id: ID,
}

/// Derived Object Struct Key: should ALWAYS have copy, drop and store abilities
/// We use unnamed (index) fields as we do for DFs
public struct DerivedObjectStructKey(address) has copy, drop, store;

/// Derived Object Struct: will be derived from (parent + Struct(type))
public struct DerivedObjectStruct has key, store {
    id: UID,
    derivation_id: ID,
    addr: address, // same address as the key, optional but used for possible future checks
}

// ================================ Derived Objects Creation ================================

/// Create a new `DerivedObjectIncremental` derived object: ID = (parent ID + index(u64))
public fun new_derived_incremental(parent: &mut ParentObject): DerivedObjectIncremental {
    // get derived item ID (an index(u64) in this case, as it's an incremental derived object)
    let item_index = parent.get_incremental_counter();

    // generate the derived object's ID
    // dev: derived_id cannot be returned from a separate function as the compiler won't read it as "fresh"
    // thus, in every function that creates an derived object, the derived_id must be claimed in itself
    let derived_id = derived_object::claim(parent.uid_mut_ref(), item_index);

    // increment the parent's incremental counter for next items
    parent.increment_counter();

    // create the derived object
    DerivedObjectIncremental {
        id: derived_id,
        derivation_id: object::id(parent),
    }
}

/// Create a new `DerivedObjectAddress` derived object: ID = (parent ID + address), e.g. sender address
public fun new_derived_address(parent: &mut ParentObject, key: address): DerivedObjectAddress {
    // generate the derived object's ID
    let derived_id = derived_object::claim(parent.uid_mut_ref(), key);

    // create the derived object
    DerivedObjectAddress {
        id: derived_id,
        derivation_id: object::id(parent),
    }
}

/// Create a new `DerivedObjectString` derived object: ID = (parent ID + String)
public fun new_derived_string(parent: &mut ParentObject, key: String): DerivedObjectString {
    // generate the derived object's ID
    let derived_id = derived_object::claim(parent.uid_mut_ref(), key);

    // create the derived object
    DerivedObjectString {
        id: derived_id,
        derivation_id: object::id(parent),
    }
}

/// Create a new `DerivedObjectStruct` derived object: ID = (parent ID + Struct(type))
public fun new_derived_struct(parent: &mut ParentObject, addr: address): DerivedObjectStruct {
    // generate the derived object's ID
    let derived_id = derived_object::claim(parent.uid_mut_ref(), create_derived_struct_key(addr));

    // create the derived object
    DerivedObjectStruct {
        id: derived_id,
        derivation_id: object::id(parent),
        addr: addr,
    }
}

/// Helper function to create a `DerivedObjectStructKey` from an address
/// Used for deterministic operations on `DerivedObjectStruct` derived objects creation and retrieval
public fun create_derived_struct_key(addr: address): DerivedObjectStructKey {
    DerivedObjectStructKey(addr)
}

// ================================ Derived Objects Getters ================================

/// Get the derived object's derivation ID
public fun get_derivation_id(self: &DerivedObjectIncremental): ID {
    self.derivation_id
}

/// Get the address part of the key for `DerivedObjectStruct` derived objects
public fun get_derived_struct_address(self: &DerivedObjectStruct): address {
    self.addr
}
