/// Module: armory
module armory::armory;

use sui::table::{Self, Table};

const EUnclaimedStorageRebate: u64 = 0;

public struct Sword has key, store {
    id: UID,
    attack: u64
}

// Task 2: Resolve max object size limit
public struct Armory has key, store {
    id: UID,
    swords: Table<u64, ID>,
    index: u64,
}

public fun new_armory(ctx: &mut TxContext): Armory {
    // Task 2: Resolve max object size limit
    Armory {
        id: object::new(ctx),
        swords: table::new(ctx),
        index: 0,
    }
}

#[allow(lint(self_transfer))]
public fun mint_swords(self: &mut Armory, n_swords: u64, attack: u64, ctx: &mut TxContext) {
    // Task 2: Resolve max object size limit
    self.index.range_do!(self.index + n_swords, |i| {
        let sword = Sword {
            id: object::new(ctx),
            attack
        };
        self.swords.add(i, object::id(&sword));
        transfer::public_transfer(sword, ctx.sender());
    });
    self.index = self.index + n_swords;
}

// Aborts if a sword in the range is already destroyed
public fun destroy_sword_entries(self: &mut Armory, start_index: u64, end_index: u64) {
    // Task 4: Get the storage rebate for the swords table.
    start_index.range_do!(end_index, |i| self.swords.remove(i));
}

public fun destroy(self: Armory) {
    // Task 2: Resolve max object size limit
    let Armory {
        id,
        swords,
        ..
    } = self;
    id.delete();
    assert!(swords.length() == 0, EUnclaimedStorageRebate);
    swords.drop();
}
