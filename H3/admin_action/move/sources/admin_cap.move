/// Module: admin_cap
/// A module implementing capability-based authorization.
/// This module uses a capability token to control access to privileged operations.
module admin_action::admin_cap;

use sui::package;

/// A one-time witness type used for module initialization.
public struct ADMIN_CAP() has drop;

/// A capability token that grants admin privileges.
/// Only holders of this token can perform privileged operations.
public struct AdminCap has key, store {
    id: UID
}

/// A Hero NFT representing a character with health and stamina attributes.
/// This is a transferable asset that can be minted by authorized admins.
public struct Hero has key {
    id: UID,
    health: u64,
    stamina: u64,
}

/// Initializes the admin capability module.
/// Creates and transfers an AdminCap to the deployer.
/// The deployer becomes the initial admin with minting privileges.
fun init(otw: ADMIN_CAP, ctx: &mut TxContext) {
    package::claim_and_keep(otw,ctx);
    transfer::public_transfer(AdminCap {
        id: object::new(ctx),
    }, ctx.sender());
}

/// Mints a new Hero NFT.
/// This function should be called by holders of the AdminCap.
/// Creates a new Hero with specified health and stamina attributes and transfers it to the recipient.
public fun mint(
    _: &AdminCap,
    health: u64,
    stamina: u64,
    recipient: address,
    ctx: &mut TxContext
) {
    transfer::transfer(Hero {
        id: object::new(ctx),
        health,
        stamina
    }, recipient);
}
