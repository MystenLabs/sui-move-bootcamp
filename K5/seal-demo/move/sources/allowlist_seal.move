/// Allowlist Seal access policy: only addresses on the list can decrypt.
/// The identity `id` encodes the allowlist object ID.
module seal_demo::allowlist_seal;

const ENoAccess: u64 = 0;
const EInvalidId: u64 = 1;

/// Shared allowlist object — admin can add/remove members without re-encrypting.
public struct Allowlist has key {
    id: UID,
    admin: address,
    members: vector<address>,
}

/// Admin capability returned on creation.
public struct AdminCap has key {
    id: UID,
    allowlist_id: ID,
}

/// Create a new allowlist. Returns an AdminCap to the caller.
public fun create(ctx: &mut TxContext) {
    let allowlist = Allowlist {
        id: object::new(ctx),
        admin: ctx.sender(),
        members: vector[],
    };
    let cap = AdminCap {
        id: object::new(ctx),
        allowlist_id: object::id(&allowlist),
    };
    transfer::share_object(allowlist);
    transfer::transfer(cap, ctx.sender());
}

/// Add a member to the allowlist.
public fun add_member(allowlist: &mut Allowlist, _cap: &AdminCap, member: address) {
    if (!allowlist.members.contains(&member)) {
        allowlist.members.push_back(member);
    };
}

/// Remove a member from the allowlist.
public fun remove_member(allowlist: &mut Allowlist, _cap: &AdminCap, member: address) {
    let (found, idx) = allowlist.members.index_of(&member);
    if (found) {
        allowlist.members.remove(idx);
    };
}

/// Key servers call this via dry-run.
/// `id` = allowlist object ID bytes ++ optional nonce
entry fun seal_approve(id: vector<u8>, allowlist: &Allowlist, ctx: &TxContext) {
    // The id must start with the allowlist's object ID (32 bytes)
    let allowlist_id_bytes = object::id(allowlist).to_bytes();
    assert!(is_prefix(allowlist_id_bytes, id), EInvalidId);
    assert!(allowlist.members.contains(&ctx.sender()), ENoAccess);
}

/// Check if `prefix` is a prefix of `data`.
fun is_prefix(prefix: vector<u8>, data: vector<u8>): bool {
    if (prefix.length() > data.length()) return false;
    let mut i = 0;
    while (i < prefix.length()) {
        if (prefix[i] != data[i]) return false;
        i = i + 1;
    };
    true
}
