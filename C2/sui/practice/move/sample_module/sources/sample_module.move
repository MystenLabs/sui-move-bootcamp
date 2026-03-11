/// Module: sample_module
/// 
/// Educational module for comparing gas costs in Sui Move.
/// Use with `sui client call --dry-run` to measure gas consumption.
module sample_module::sample_module;

use sui::table::{Self, Table};

// ============================================================================
// STORAGE STRUCTURES
// ============================================================================

/// Container with Vector (inline storage, O(n) lookup)
public struct VectorStore has key {
    id: UID,
    items: vector<u64>,
}

/// Container with Table (dynamic fields, O(1) lookup)
public struct TableStore has key {
    id: UID,
    items: Table<u64, u64>,
}

// ============================================================================
// INTEGER SIZE - Storage Cost Comparison (u8 vs u256)
// ============================================================================

/// Container with vector<u8> - small integers, 1 byte each
public struct SmallVectorObject has key {
    id: UID,
    items: vector<u8>,
}

/// Container with vector<u256> - large integers, 32 bytes each
public struct BigVectorObject has key {
    id: UID,
    items: vector<u256>,
}

/// Create SmallVectorObject with n items (vector<u8>)
public fun create_small_vector(n: u64, ctx: &mut TxContext): SmallVectorObject {
    let mut items = vector::empty<u8>();
    let mut i = 0u64;
    while (i < n) {
        items.push_back((i % 256) as u8); // Wrap around for u8
        i = i + 1;
    };
    SmallVectorObject { id: object::new(ctx), items }
}

/// Create BigVectorObject with n items (vector<u256>)
public fun create_big_vector(n: u64, ctx: &mut TxContext): BigVectorObject {
    let mut items = vector::empty<u256>();
    let mut i = 0u64;
    while (i < n) {
        items.push_back(i as u256);
        i = i + 1;
    };
    BigVectorObject { id: object::new(ctx), items }
}

/// Entry: Create and transfer SmallVectorObject
entry fun new_small_vector(n: u64, ctx: &mut TxContext) {
    transfer::transfer(create_small_vector(n, ctx), ctx.sender());
}

/// Entry: Create and transfer BigVectorObject
entry fun new_big_vector(n: u64, ctx: &mut TxContext) {
    transfer::transfer(create_big_vector(n, ctx), ctx.sender());
}

/// Delete SmallVectorObject - get storage rebate
public fun delete_small_vector(store: SmallVectorObject) {
    let SmallVectorObject { id, items: _ } = store;
    object::delete(id);
}

/// Delete BigVectorObject - get storage rebate
public fun delete_big_vector(store: BigVectorObject) {
    let BigVectorObject { id, items: _ } = store;
    object::delete(id);
}

/// Read all values from SmallVectorObject - O(n) iteration
public fun read_small_vector(store: &SmallVectorObject): u64 {
    let mut sum = 0u64;
    let len = store.items.length();
    let mut i = 0u64;
    while (i < len) {
        sum = sum + (*store.items.borrow(i) as u64);
        i = i + 1;
    };
    sum
}

/// Read all values from BigVectorObject - O(n) iteration
public fun read_big_vector(store: &BigVectorObject): u256 {
    let mut sum = 0u256;
    let len = store.items.length();
    let mut i = 0u64;
    while (i < len) {
        sum = sum + *store.items.borrow(i);
        i = i + 1;
    };
    sum
}

/// Edit all values in SmallVectorObject using borrow_mut - O(n) iteration
public fun edit_small_vector(store: &mut SmallVectorObject) {
    let len = store.items.length();
    let mut i = 0u64;
    while (i < len) {
        let val = store.items.borrow_mut(i);
        // Increment with wrap-around to avoid overflow
        if (*val < 255u8) {
            *val = *val + 1;
        } else {
            *val = 0;
        };
        i = i + 1;
    };
}

/// Edit all values in BigVectorObject using borrow_mut - O(n) iteration
public fun edit_big_vector(store: &mut BigVectorObject) {
    let len = store.items.length();
    let mut i = 0u64;
    while (i < len) {
        let val = store.items.borrow_mut(i);
        *val = *val + 1; // Increment each value
        i = i + 1;
    };
}

// ============================================================================
// LOOP COMPLEXITY - O(n) vs O(n²) Cost Comparison
// ============================================================================

/// Simple loop - O(n) complexity
public fun loop_linear(n: u64) {
    let mut sum = 0u64;
    let mut i = 0u64;
    while (i < n) {
        sum = sum + i;
        i = i + 1;
    };
    let _ = sum;
}

/// Nested loop - O(n²) complexity, gas grows quadratically
public fun loop_quadratic(n: u64) {
    let mut sum = 0u64;
    let mut i = 0u64;
    while (i < n) {
        let mut j = 0u64;
        while (j < n) {
            sum = sum + 1;
            j = j + 1;
        };
        i = i + 1;
    };
    let _ = sum;
}

// ============================================================================
// STORAGE REBATE - Create & delete objects to see gas rebate
// ============================================================================

/// Create VectorStore with N items
public fun create_vector_store(n: u64, ctx: &mut TxContext): VectorStore {
    let mut items = vector::empty<u64>();
    let mut i = 0u64;
    while (i < n) {
        items.push_back(i);
        i = i + 1;
    };
    VectorStore { id: object::new(ctx), items }
}

/// Create TableStore with N items
public fun create_table_store(n: u64, ctx: &mut TxContext): TableStore {
    let mut items = table::new<u64, u64>(ctx);
    let mut i = 0u64;
    while (i < n) {
        items.add(i, i);
        i = i + 1;
    };
    TableStore { id: object::new(ctx), items }
}

/// Entry: Create and transfer VectorStore
entry fun new_vector_store(n: u64, ctx: &mut TxContext) {
    transfer::transfer(create_vector_store(n, ctx), ctx.sender());
}

/// Entry: Create and transfer TableStore
entry fun new_table_store(n: u64, ctx: &mut TxContext) {
    transfer::transfer(create_table_store(n, ctx), ctx.sender());
}

/// Delete VectorStore - get storage rebate
public fun delete_vector_store(store: VectorStore) {
    let VectorStore { id, items: _ } = store;
    object::delete(id);
}

/// Delete TableStore - must remove all items first
public fun delete_table_store(mut store: TableStore, n: u64) {
    let mut i = 0u64;
    while (i < n) {
        if (store.items.contains(i)) {
            store.items.remove(i);
        };
        i = i + 1;
    };
    let TableStore { id, items } = store;
    items.destroy_empty();
    object::delete(id);
}

// ============================================================================
// LOOKUP COMPARISON - Vector O(n) vs Table O(1)
// ============================================================================

/// Find a value in vector - O(n) linear search
/// Must iterate through elements to find the target
public fun find_in_vector(items: &vector<u64>, target: u64): u64 {
    let len = items.length();
    let mut i = 0u64;
    while (i < len) {
        if (*items.borrow(i) == target) {
            return *items.borrow(i)
        };
        i = i + 1;
    };
    0
}

/// Find a value in table - O(1) direct lookup
/// Direct key access, constant time
public fun find_in_table(items: &Table<u64, u64>, target: u64): u64 {
    if (items.contains(target)) {
        *items.borrow(target)
    } else {
        0
    }
}

/// Find in VectorStore - entry-compatible wrapper for PTB calls
public fun find_in_vector_store(store: &VectorStore, target: u64): u64 {
    find_in_vector(&store.items, target)
}

/// Find in TableStore - entry-compatible wrapper for PTB calls
public fun find_in_table_store(store: &TableStore, target: u64): u64 {
    find_in_table(&store.items, target)
}

// ============================================================================
// TESTS
// ============================================================================

#[test]
fun test_create_small_vector() {
    let mut ctx = tx_context::dummy();
    
    let store20 = create_small_vector(20, &mut ctx);
    delete_small_vector(store20);
    
    let store50 = create_small_vector(50, &mut ctx);
    delete_small_vector(store50);
    
    let store100 = create_small_vector(100, &mut ctx);
    delete_small_vector(store100);
}

#[test]
fun test_create_big_vector() {
    let mut ctx = tx_context::dummy();
    
    let store20 = create_big_vector(20, &mut ctx);
    delete_big_vector(store20);
    
    let store50 = create_big_vector(50, &mut ctx);
    delete_big_vector(store50);
    
    let store100 = create_big_vector(100, &mut ctx);
    delete_big_vector(store100);
}

#[test]
fun test_read_small_vector() {
    let mut ctx = tx_context::dummy();
    
    let store = create_small_vector(10, &mut ctx);
    let sum = read_small_vector(&store);
    // Sum of 0..9 = 45
    assert!(sum == 45);
    delete_small_vector(store);
}

#[test]
fun test_read_big_vector() {
    let mut ctx = tx_context::dummy();
    
    let store = create_big_vector(10, &mut ctx);
    let sum = read_big_vector(&store);
    // Sum of 0..9 = 45
    assert!(sum == 45);
    delete_big_vector(store);
}

#[test]
fun test_edit_small_vector() {
    let mut ctx = tx_context::dummy();
    
    let mut store = create_small_vector(10, &mut ctx);
    let sum_before = read_small_vector(&store);
    edit_small_vector(&mut store);
    let sum_after = read_small_vector(&store);
    // Each value incremented by 1, so sum increases by 10
    assert!(sum_after == sum_before + 10);
    delete_small_vector(store);
}

#[test]
fun test_edit_big_vector() {
    let mut ctx = tx_context::dummy();
    
    let mut store = create_big_vector(10, &mut ctx);
    let sum_before = read_big_vector(&store);
    edit_big_vector(&mut store);
    let sum_after = read_big_vector(&store);
    // Each value incremented by 1, so sum increases by 10
    assert!(sum_after == sum_before + 10);
    delete_big_vector(store);
}

#[test]
fun test_loop_linear() {
    loop_linear(20);
    loop_linear(50);
    loop_linear(100);
}

#[test]
fun test_loop_quadratic() {
    loop_quadratic(20);
    loop_quadratic(50);
    loop_quadratic(100);
}

#[test]
fun test_create_and_delete_vector_store() {
    let mut ctx = tx_context::dummy();
    
    let store20 = create_vector_store(20, &mut ctx);
    delete_vector_store(store20);
    
    let store50 = create_vector_store(50, &mut ctx);
    delete_vector_store(store50);
    
    let store100 = create_vector_store(100, &mut ctx);
    delete_vector_store(store100);
}

#[test]
fun test_create_and_delete_table_store() {
    let mut ctx = tx_context::dummy();
    
    let store20 = create_table_store(20, &mut ctx);
    delete_table_store(store20, 20);
    
    let store50 = create_table_store(50, &mut ctx);
    delete_table_store(store50, 50);
    
    let store100 = create_table_store(100, &mut ctx);
    delete_table_store(store100, 100);
}

#[test]
fun test_find_in_vector() {
    // Test with n = 20, 50, 100
    // Search for last element (worst case O(n))
    let mut items20 = vector::empty<u64>();
    let mut i = 0u64;
    while (i < 20) { items20.push_back(i); i = i + 1; };
    assert!(find_in_vector(&items20, 19) == 19);
    
    let mut items50 = vector::empty<u64>();
    i = 0;
    while (i < 50) { items50.push_back(i); i = i + 1; };
    assert!(find_in_vector(&items50, 49) == 49);
    
    let mut items100 = vector::empty<u64>();
    i = 0;
    while (i < 100) { items100.push_back(i); i = i + 1; };
    assert!(find_in_vector(&items100, 99) == 99);
}

#[test]
fun test_find_in_table() {
    let mut ctx = tx_context::dummy();
    
    // Test with n = 20, 50, 100
    // Search for last element (still O(1))
    let mut items20 = table::new<u64, u64>(&mut ctx);
    let mut i = 0u64;
    while (i < 20) { items20.add(i, i); i = i + 1; };
    assert!(find_in_table(&items20, 19) == 19);
    i = 0; while (i < 20) { items20.remove(i); i = i + 1; };
    items20.destroy_empty();
    
    let mut items50 = table::new<u64, u64>(&mut ctx);
    i = 0;
    while (i < 50) { items50.add(i, i); i = i + 1; };
    assert!(find_in_table(&items50, 49) == 49);
    i = 0; while (i < 50) { items50.remove(i); i = i + 1; };
    items50.destroy_empty();
    
    let mut items100 = table::new<u64, u64>(&mut ctx);
    i = 0;
    while (i < 100) { items100.add(i, i); i = i + 1; };
    assert!(find_in_table(&items100, 99) == 99);
    i = 0; while (i < 100) { items100.remove(i); i = i + 1; };
    items100.destroy_empty();
}

/// Compare vector vs table lookup - same data, different performance
#[test]
fun test_vector_vs_table_lookup() {
    let mut ctx = tx_context::dummy();
    
    // Create both with 100 items
    let mut vec = vector::empty<u64>();
    let mut tab = table::new<u64, u64>(&mut ctx);
    let mut i = 0u64;
    while (i < 100) {
        vec.push_back(i);
        tab.add(i, i);
        i = i + 1;
    };
    
    // Vector: O(n) - must scan to find last element
    let vec_result = find_in_vector(&vec, 99);
    
    // Table: O(1) - direct access
    let tab_result = find_in_table(&tab, 99);
    
    assert!(vec_result == tab_result);
    
    // Cleanup table
    i = 0;
    while (i < 100) { tab.remove(i); i = i + 1; };
    tab.destroy_empty();
}
