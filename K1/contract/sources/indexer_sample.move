module indexer_sample::indexer_sample;
use std::string::String;
use sui::event;

public struct UsersCounter has key {
    id: UID,
    count: u64,
}
public struct UserRegistered has copy, drop {
    owner: address,
    name: String,
    user_id: u64,
}

fun init(ctx: &mut TxContext) {
    let users_counter = UsersCounter {
        id: object::new(ctx),
        count: 0,
    };
    transfer::share_object(users_counter);
}

public fun register_user(name: String, users_counter: &mut UsersCounter, ctx: &mut TxContext) {
    let user_registered = UserRegistered {
        owner: tx_context::sender(ctx),
        name,
        user_id: users_counter.count,
    };
    users_counter.count = users_counter.count + 1;
    event::emit(user_registered);
}
