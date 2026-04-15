/// Module: Parent
/// Contains the parent object and functions to create and manage it
module derived_objects::parent;

/// Parent Object: the object used to derive objects IDs from
public struct ParentObject has key {
    id: UID,
    incremental_counter: u64, // incremental counter for incremental derived objects only, lastIndex = counter - 1
}

/// Initializer: create and share a new ParentObject for simplicity
fun init(ctx: &mut TxContext) {
    transfer::share_object(ParentObject {
        id: object::new(ctx),
        incremental_counter: 0,
    });
}

/// Create a new parent object
public fun create_parent_object(ctx: &mut TxContext): ParentObject {
    ParentObject {
        id: object::new(ctx),
        incremental_counter: 0,
    }
}

/// Package function to get a mutable reference to the parent object's UID, will be used to derive objects IDs
public(package) fun uid_mut_ref(self: &mut ParentObject): &mut UID {
    &mut self.id
}

/// Package function to increment the parent object's incremental counter
public(package) fun increment_counter(self: &mut ParentObject) {
    self.incremental_counter = self.incremental_counter + 1;
}

/// Function to expose the parent object's incremental counter
public fun get_incremental_counter(self: &ParentObject): u64 {
    self.incremental_counter
}
