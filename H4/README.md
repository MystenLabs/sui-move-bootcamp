# Transaction, Object Limits and Table rebate

## What You Will Learn

In this section, you will learn how to work within Sui protocol limits when designing and implementing smart contracts. You will:

- Understand key protocol limits such as maximum objects per transaction, object size, and dynamic field access.
- Learn batching techniques to efficiently mint and manage large numbers of objects.
- Replace vectors with Tables to overcome object size constraints and leverage dynamic fields.
- Respect cache limits by structuring transactions appropriately.
- Implement proper destruction logic to reclaim storage rebates when using Tables and dynamic fields.

By the end, you will be able to design scalable Move modules that efficiently handle large collections of objects while respecting Sui's protocol constraints.

## Project Structure

This exercise centers around the `Armory` module, which manages a collection of `Sword` objects. The main logic is implemented in:
- `armory.move`: Contains the `Armory` struct and functions for minting, storing, and destroying swords, as well as handling batching and storage rebates.
- Accompanying test files: Validate your implementation against protocol limits and correct rebate handling.

Each task builds on the previous, guiding you through practical solutions to real-world scalability and storage challenges in Sui Move.

The exercise starts with an `Armory` module that uses a `vector` to store `Sword` objects.

To see various protocol limits one can visit [snapshots directory in sui-protocol-config crate](https://github.com/MystenLabs/sui/blob/main/crates/sui-protocol-config/src/snapshots),
[eg. Testnet v82](https://github.com/MystenLabs/sui/blob/main/crates/sui-protocol-config/src/snapshots/sui_protocol_config__test__Testnet_version_82.snap)

## Tasks

### Task 1: Batch Minting
The first test attempts to mint all 6000 swords in a single transaction, which will fail due to the maximum number of new objects per transaction limit.
It fails because the maximum number of objects created in a transaction
```yaml
max_num_new_move_object_ids: 2048
```

Modify the minting process to work in batches of 2048 swords per transaction.

### Task 2: Replace Vector with Table
After respecting max-new-objects limit, the test will still fail because storing 6000 IDs in a vector will hit the maximum object size limit.
```yaml
max_move_object_size: 256000
```

Replace the `vector` with a `Table` in the `Armory` struct.
In Sui, `Table` doesn't affect the "parent" object size as it stores its entries as new objects (dynamic-fields) linked to the parent.
This will need editing the `armory::new_armory`, `armory::mint_swords`, and `armory::destroy` Move function.

Tip: Use an extra field (eg. `index`) to store the next index to assign to a new sword.

Extra Info: Another common limit when mass-minting might be the max number of events emitted:
```yaml
max_num_event_emit: 1024
```

### Task 3: Respect max cache-objects ie. dynamic field accessing inside a single Transaction
After using table, we will come accross another limit. Someone can use dynamic fields to store any amount of data they want,
but they need to be careful to respect the amount of dynamic field accessing they can do in a single transaction.
```yaml
object_runtime_max_num_cached_objects: 1000
```

Modify the minting process to work in batches of 1000 swords per transaction.

### Task 4: Implement Proper Destruction with Storage Rebates
Now that we are using a `Table`, when we use `swords.drop()` we are actually only destroying the table fields, but not its actual entries.
This means that we are not getting a lot of storage-rebate from the storage space these entries take up.

To properly handle storage rebates with a `Table`, you need to:
   - Empty the table first by removing all entries
   - Do this in batches to respect the maximum dynamic field iteration limit
   - Only then destroy the table and the armory object
   - [optional] Also add an assertion on `armory::destroy` to ensude the table is empty, or use `table::destroy_empty`

After implementing `destroy_sword_entries` uncomment the 2nd typescript test and see it pass!

## Useful Links

- [Docs mention](https://docs.sui.io/concepts/transactions#limits-on-transactions-objects-and-data)
- [sui-protocol-config crate snapshots](https://github.com/MystenLabs/sui/tree/main/crates/sui-protocol-config/src/snapshots)
