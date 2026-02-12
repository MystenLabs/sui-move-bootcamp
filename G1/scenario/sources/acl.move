module scenario::acl;

use sui::package;

/// Tried to add an admin address already there.
const EAdminAlreadyExists: u64 = 0;
/// Tried to remove an admin address not included.
const EAdminDoesNotExist: u64 = 1;
/// Transaction sender is not an admin.
const ENotAuthorized: u64 = 2;

public struct ACL() has drop;

/// In charge of adding/removing admins.
public struct AdminCap has key, store {
    id: UID,
}

/// Admins can mint Heroes and XPTomes
public struct Admins has key {
    id: UID,
    inner: vector<address>
}

/// Init function for claiming `Publisher`, creating shared `Admins` object and
/// transferring `AdminCap` to the publisher.
fun init(otw: ACL, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
    transfer::public_transfer(AdminCap { id: object::new(ctx) }, ctx.sender());
    transfer::share_object(Admins {
        id: object::new(ctx),
        inner: vector[ctx.sender()]
    });
}

/// `AdminCap` holder can add address to `Admins`.
public fun add_admin(self: &mut Admins, _cap: &AdminCap, new_admin: address) {
    assert!(!self.inner.contains(&new_admin), EAdminAlreadyExists);
    self.inner.push_back(new_admin);
}

/// `AdminCap` holder can remove address from `Admins`.
public fun remove_admin(self: &mut Admins, _cap: &AdminCap, old_admin: address) {
    let (found, i) = self.inner.index_of(&old_admin);
    assert!(found, EAdminDoesNotExist);
    self.inner.remove(i);
}

/// Use this function to authorize an admin.
public(package) fun authorize(self: &Admins, ctx: &TxContext) {
    assert!(self.inner.contains(&ctx.sender()), ENotAuthorized);
}

#[test]
fun test_add_admin() {
    let new_admin = @0x22222;
    let mut ctx = tx_context::dummy();

    let cap = AdminCap { id: object::new(&mut ctx) };
    let mut admins = Admins {
        id: object::new(&mut ctx),
        inner: vector::empty()
    };

    admins.add_admin(&cap, new_admin);

    let Admins { id, inner } = admins;
    assert!(inner.contains(&new_admin));
    id.delete();

    let AdminCap { id } = cap;
    id.delete();
}

#[test_only]
public fun new_admins_for_testing(admin: address): Admins {
    Admins {
        id: object::new(&mut tx_context::dummy()),
        inner: vector::singleton(admin)
    }
}

#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(ACL(), ctx);
}

