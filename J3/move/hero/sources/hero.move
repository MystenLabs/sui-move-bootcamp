/// Module: hero
module hero::hero;

use std::string::String;
use sui::package;

/// Constants.
const EUnauthorized: u64 = 1;

public struct HERO() has drop;

public struct Hero has key, store {
    id: UID,
    name: String,
}

public struct HeroRegistry has key {
    id: UID,
    allowed_minters: vector<address>,
    counter: u64,
}

fun init(otw: HERO, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
    transfer::share_object(HeroRegistry {
        id: object::new(ctx),
        allowed_minters: vector::singleton(ctx.sender()),
        counter: 0,
    })
}

public fun mint(name: String, registry: &mut HeroRegistry, ctx: &mut TxContext): Hero {
    assert!(registry.allowed_minters.contains(&ctx.sender()), EUnauthorized);
    registry.counter = registry.counter + 1;
    Hero {
        id: object::new(ctx),
        name,
    }
}
