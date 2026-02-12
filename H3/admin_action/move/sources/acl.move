/// Module: acl
/// A module implementing Access Control List (ACL) based authorization.
/// This module manages a list of admin addresses that have special privileges.
module admin_action::acl;

use sui::package;

const ENotAuthorizedToMint: u64 = 0;

/// A one-time witness type used for module initialization.
public struct ACL() has drop;

/// A shared object that maintains a list of admin addresses.
/// Only addresses listed in this object have admin privileges.
public struct AccessControlList has key {
    id: UID,
    admins: vector<address>
}

/// A Hero NFT representing a character with health and stamina attributes.
/// This is a transferable asset that can be minted by authorized admins.
public struct Hero has key {
    id: UID,
    health: u64,
    stamina: u64,
}

/// Initializes the ACL module.
/// Creates a new AccessControlList with the deployer as the first admin.
/// The ACL is shared with all users but only listed admins can perform privileged actions.
fun init(otw: ACL, ctx: &mut TxContext) {
    package::claim_and_keep(otw,ctx);
    transfer::share_object(AccessControlList {
        id: object::new(ctx),
        admins: vector[ctx.sender()]
    });
}

/// Mints a new Hero NFT.
/// This function should be called by authorized admins only.
/// Creates a new Hero with specified health and stamina attributes and transfers it to the recipient.
public fun mint(
    acl: &AccessControlList,
    health: u64,
    stamina: u64,
    recipient: address,
    ctx: &mut TxContext
) {
    assert!(acl.admins.contains(&ctx.sender()), ENotAuthorizedToMint);
    transfer::transfer(Hero {
        id: object::new(ctx),
        health,
        stamina
    }, recipient);
}
