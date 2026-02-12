/// A treasure chest example demonstrating Sui's on-chain randomness.
///
/// In this game, a hero visits a blacksmith and opens a treasure chest to receive
/// a random sword. The sword type is determined by on-chain randomness, ensuring
/// fair and unpredictable rewards.
module treasure_chest::treasure_chest;
use std::string::String;
use sui::event::emit;
use sui::random::{Random, new_generator};
#[test_only]
use sui::test_scenario;

// Sword type IDs (for demonstration purposes)
const SWORD_WOODEN: u64 = 1;
const SWORD_IRON: u64 = 2;
const SWORD_STEEL: u64 = 3;
const SWORD_LEGENDARY: u64 = 4;

/// A treasure chest at the blacksmith's shop
public struct TreasureChest has key, store {
    id: UID,
    chest_type: String,
}

/// A sword received from opening a treasure chest
public struct Sword has key, store {
    id: UID,
    type_id: u64,
    name: String,
    power: u64,
}

/// Emitted when a treasure chest is opened and a sword is received.
public struct ChestOpened has copy, drop {
    chest_id: ID,
    player: address,
    sword_type_id: u64,
    sword_name: String,
    power: u64,
}

/// Create a new treasure chest (would be called by blacksmith/admin in production
/// and could be guarded by some sort of access control like the Capability Pattern).
public fun create_chest(chest_type: String, ctx: &mut TxContext): TreasureChest {
    TreasureChest {
        id: object::new(ctx),
        chest_type,
    }
}

/// Open a treasure chest and receive a random sword.
///
/// Uses Sui's native on-chain randomness via the `Random` object (0x8).
///
/// Security notes:
/// - Marked as `entry` to prevent composition with other PTB commands
/// - Generator is created internally (not accepted as parameter)
/// - Sui automatically rejects PTBs with non-transfer commands after Random-consuming calls
entry fun open_chest(chest: TreasureChest, random: &Random, ctx: &mut TxContext) {
    let TreasureChest { id, chest_type: _ } = chest;
    let chest_id = id.to_inner(); // Hold for event emission
    id.delete();

    // Create random generator
    let mut generator = new_generator(random, ctx);

    // Determine sword type (weighted randomness)
    // 50% Wooden Sword, 30% Iron Sword, 15% Steel Sword, 5% Legendary Sword
    let roll = generator.generate_u8_in_range(1, 100);
    let (type_id, name) = if (roll <= 50) {
        (SWORD_WOODEN, b"Wooden Sword".to_string())
    } else if (roll <= 80) {
        (SWORD_IRON, b"Iron Sword".to_string())
    } else if (roll <= 95) {
        (SWORD_STEEL, b"Steel Sword".to_string())
    } else {
        (SWORD_LEGENDARY, b"Legendary Sword".to_string())
    };

    // Determine power (rarer swords have higher power)
    let power = if (type_id == SWORD_WOODEN) {
        generator.generate_u64_in_range(1, 10)
    } else if (type_id == SWORD_IRON) {
        generator.generate_u64_in_range(10, 25)
    } else if (type_id == SWORD_STEEL) {
        generator.generate_u64_in_range(25, 50)
    } else {
        generator.generate_u64_in_range(50, 100)
    };

    // Create the sword
    let sword = Sword {
        id: object::new(ctx),
        type_id,
        name,
        power,
    };

    emit(ChestOpened {
        chest_id,
        player: ctx.sender(),
        sword_type_id: type_id,
        sword_name: sword.name,
        power,
    });

    transfer::transfer(sword, ctx.sender());
}

#[test]
fun test_create_chest() {
    let mut scenario = test_scenario::begin(@0xCAFE);
    let chest = create_chest(b"basic".to_string(), scenario.ctx());

    assert!(chest.chest_type == b"basic".to_string());

    // Clean up
    let TreasureChest { id, chest_type: _ } = chest;
    id.delete();
    scenario.end();
}

#[test]
fun test_open_chest() {
    let system = @0x0;
    let player = @0xCAFE;

    let mut scenario = test_scenario::begin(system);

    // Create the Random object (must be done by system address @0x0)
    sui::random::create_for_testing(scenario.ctx());

    // Player creates and opens a chest
    scenario.next_tx(player);
    let random = scenario.take_shared<sui::random::Random>();
    let chest = create_chest(b"basic".to_string(), scenario.ctx());

    // Open the chest using the Random object
    open_chest(chest, &random, scenario.ctx());

    test_scenario::return_shared(random);

    // Verify player received a Sword
    scenario.next_tx(player);
    let sword = scenario.take_from_sender<Sword>();

    assert!(sword.type_id >= SWORD_WOODEN && sword.type_id <= SWORD_LEGENDARY);
    assert!(sword.power >= 1);

    // Clean up
    let Sword { id, type_id: _, name: _, power: _ } = sword;
    id.delete();

    scenario.end();
}
