module capability_hero::hero;
use capability_hero::store::{HeroStore, Weapon, Armor};
use std::string::String;
use sui::coin::Coin;
use sui::sui::SUI;

public struct Hero has key, store {
    id: UID,
    name: String,
    weapon: Option<Weapon>,
    armor: Option<Armor>,
}

public fun mint_hero(name: String, ctx: &mut TxContext): Hero {
    Hero {
        id: object::new(ctx),
        name,
        weapon: option::none(),
        armor: option::none(),
    }
}

public fun buy_weapon(hero: &mut Hero, store: &mut HeroStore<Weapon>, coin: Coin<SUI>) {
    let weapon = store.buy_item<Weapon>(coin);
    hero.weapon = option::some(weapon);
}

public fun buy_armor(hero: &mut Hero, store: &mut HeroStore<Armor>, coin: Coin<SUI>) {
    let armor = store.buy_item<Armor>(coin);
    hero.armor = option::some(armor);
}

// Test Only

#[test_only]
use capability_hero::store::{Self, ENotAuthorized, StoreAdminCap};
#[test_only]
use sui::coin;
#[test_only]
use sui::{test_scenario as ts};
#[test_only]
use std::unit_test::assert_eq;

#[test_only]
const WEAPON_STORE_OWNER: address = @0xAA;
#[test_only]
const ARMOR_STORE_OWNER: address = @0xBB;
#[test_only]
const HERO_USER: address = @0xCC;

#[test, expected_failure(abort_code = ENotAuthorized)]
fun test_cannot_buy_from_empty_store_on_unauthorized_equip_attempt() {
    let mut ts = ts::begin(HERO_USER);
    {
        let hero = mint_hero(b"hero".to_string(), ts.ctx());
        transfer::public_transfer(hero, HERO_USER);
    };

    ts.next_tx(WEAPON_STORE_OWNER);
    {
        store::build_store<Weapon>(100, ts.ctx());
    };

    ts.next_tx(ARMOR_STORE_OWNER);
    {
        store::build_store<Armor>(50, ts.ctx());
    };

    ts.next_tx(ARMOR_STORE_OWNER);
    {
        let admin_cap = ts.take_from_sender<StoreAdminCap>();
        let mut weapon_store = ts.take_shared<HeroStore<Weapon>>();

        let weapon = store::new_weapon();
        weapon_store.add_item<Weapon>(&admin_cap, weapon);

        abort (1337)
    }
}

#[test]
fun test_can_buy_from_non_empty_stores() {
    let mut ts = ts::begin(HERO_USER);
    {
        let hero = mint_hero(b"hero".to_string(), ts.ctx());
        transfer::public_transfer(hero, HERO_USER);
    };

    ts.next_tx(WEAPON_STORE_OWNER);
    {
        store::build_store<Weapon>(100, ts.ctx());
    };

    ts.next_tx(WEAPON_STORE_OWNER);
    {
        let admin_cap = ts.take_from_sender<StoreAdminCap>();
        let mut weapon_store = ts.take_shared<HeroStore<Weapon>>();

        let weapon = store::new_weapon();
        weapon_store.add_item<Weapon>(&admin_cap, weapon);

        ts.return_to_sender(admin_cap);
        ts::return_shared(weapon_store);
    };

    ts.next_tx(ARMOR_STORE_OWNER);
    {
        store::build_store<Armor>(50, ts.ctx());
    };

    ts.next_tx(ARMOR_STORE_OWNER);
    {
        let admin_cap = ts.take_from_sender<StoreAdminCap>();
        let mut armor_store = ts.take_shared<HeroStore<Armor>>();

        let armor = store::new_armor();
        armor_store.add_item<Armor>(&admin_cap, armor);

        ts.return_to_sender(admin_cap);
        ts::return_shared(armor_store);
    };

    ts.next_tx(HERO_USER);
    {
        let mut hero = ts.take_from_sender<Hero>();

        assert_eq!(hero.weapon.is_none(), true);
        assert_eq!(hero.armor.is_none(), true);

        let mut weapon_store = ts.take_shared<HeroStore<Weapon>>();
        let mut armor_store = ts.take_shared<HeroStore<Armor>>();

        let weapon_coin = coin::mint_for_testing(weapon_store.item_price(), ts.ctx());
        let armor_coin = coin::mint_for_testing(armor_store.item_price(), ts.ctx());

        buy_weapon(&mut hero, &mut weapon_store, weapon_coin);
        buy_armor(&mut hero, &mut armor_store, armor_coin);

        assert_eq!(hero.weapon.is_some(), true);
        assert_eq!(hero.armor.is_some(), true);

        ts.return_to_sender(hero);
        ts::return_shared(weapon_store);
        ts::return_shared(armor_store);
    };

    ts.end();
}
