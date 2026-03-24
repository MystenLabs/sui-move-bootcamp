/// Simplest Seal access policy: only the owner (caller) can decrypt.
/// The identity `id` encodes the owner's address via BCS.
module seal_demo::private_seal;

use sui::bcs;

const ENoAccess: u64 = 0;

/// Key servers call this via dry-run. If it doesn't abort, access is granted.
/// `id` = bcs::to_bytes(&owner_address)
entry fun seal_approve(id: vector<u8>, ctx: &TxContext) {
    assert!(id == bcs::to_bytes(&ctx.sender()), ENoAccess);
}
