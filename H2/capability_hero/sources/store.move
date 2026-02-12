module capability_hero::store;

use sui::balance::{Self, Balance};
use sui::coin::Coin;
use sui::sui::SUI;
use sui::table::{Self, Table};

public struct Armor has copy, drop, store {}
public struct Weapon has copy, drop, store {}

const ENotAuthorized: u64 = 0;
const EEmptyStore: u64 = 1;
const ENotEnoughFunds: u64 = 2;

public struct StoreAdminCap has key {
    id: UID,
    `for`: ID,
}

public fun new_armor(): Armor {
    Armor {}
}

public fun new_weapon(): Weapon {
    Weapon {}
}

public struct HeroStore<phantom T: store> has key, store {
    id: UID,
    items: Table<u64, T>,
    item_price: u64,
    funds: Balance<SUI>,
}

public fun build_store<T: store>(item_price: u64, ctx: &mut TxContext) {
    let store = HeroStore<T> {
        id: object::new(ctx),
        items: table::new(ctx),
        item_price,
        funds: balance::zero(),
    };
    let store_admin_cap = StoreAdminCap {
        id: object::new(ctx),
        `for`: store.id.to_inner(),
    };
    transfer::transfer(store_admin_cap, ctx.sender());
    transfer::share_object(store)
}

public fun add_item<T: store>(store: &mut HeroStore<T>, admin_cap: &StoreAdminCap, item: T) {
    assert!(admin_cap.`for` == store.id.to_inner(), ENotAuthorized);

    let items = &mut store.items;
    let len = items.length();
    table::add(items, len, item);
}

public fun collect_funds<T: store>(
    store: &mut HeroStore<T>,
    admin_cap: &StoreAdminCap,
    ctx: &mut TxContext,
): Coin<SUI> {
    assert!(admin_cap.`for` == store.id.to_inner(), ENotAuthorized);

    let funds = store.funds.withdraw_all();
    funds.into_coin(ctx)
}

public fun buy_item<T: store>(store: &mut HeroStore<T>, coin: Coin<SUI>): T {
    assert!(coin.value() >= store.item_price, ENotEnoughFunds);
    assert!(!store.items.is_empty(), EEmptyStore);
    store.funds.join(coin.into_balance());
    let items = &mut store.items;
    let len = items.length();
    let item = table::remove(items, len - 1);
    item
}

public fun item_price<T: store>(store: &HeroStore<T>): u64 {
    store.item_price
}
