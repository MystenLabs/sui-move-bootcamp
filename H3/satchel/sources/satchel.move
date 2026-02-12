/// Module: satchel
/// A module for managing a shared collection of magical scrolls.
/// This module provides functionality to create, add, remove, and borrow scrolls from a shared satchel.
module satchel::satchel;

use std::string::String;

/// Error code indicating that no scroll with the specified ID exists in the satchel.
const ENoScrollWithThisID: u64 = 0;
/// Error code indicating invalid authorization for satchel editing.
const ENotYourSatchel: u64 = 1;
/// Error code indicating an invalid return of a borrowed scroll.
const EInvalidReturn: u64 = 2;
/// Error code indicating that the test was expected to fail earlier.
const EExpectedFailure: u64 = 0xff;

/// A magical scroll that can be stored in the satchel.
/// Each scroll has a unique ID, a name, and a list of magical effects.
public struct Scroll has key, store {
    id: UID,
    name: String,
    effects: vector<String>,
}

/// A shared container that holds a collection of scrolls.
/// This is a shared object that can be accessed by multiple users.
public struct SharedSatchel has key {
    id: UID,
    scrolls: vector<Scroll>
}

/// A capability token that grants permission to modify the shared satchel.
/// Only holders of this capability can add or remove scrolls from the satchel.
public struct SatchelCap has key, store {
    id: UID,
    satchel_id: ID,
}

/// A marker type used to track borrowed scrolls.
/// This ensures that borrowed scrolls are properly returned to the satchel.
public struct Borrow {
    satchel_id: ID,
    scroll_id: ID
}

/// Creates a new shared satchel and returns a capability token to manage it.
/// The satchel is initialized empty and is shared with all users.
public fun new(ctx: &mut TxContext): (SharedSatchel, SatchelCap) {
    let satchel = SharedSatchel { id: object::new(ctx), scrolls: vector[] };
    let cap = SatchelCap { id: object::new(ctx), satchel_id: object::id(&satchel) };

    (satchel, cap)
}

public fun share(self: SharedSatchel) {
    transfer::share_object(self)
}

/// Adds a new scroll to the shared satchel.
/// Requires the satchel capability to ensure only authorized users can add scrolls.
public fun add_scroll(self: &mut SharedSatchel, cap: &SatchelCap, scroll: Scroll) {
    assert!(object::id(self) == cap.satchel_id, ENotYourSatchel);
    self.scrolls.push_back(scroll);
}

/// Removes a scroll from the shared satchel by its ID.
/// Requires the satchel capability and returns the removed scroll.
/// Aborts if no scroll with the given ID exists.
public fun remove_scroll(self: &mut SharedSatchel, cap: &SatchelCap, scroll_id: ID): Scroll {
    assert!(object::id(self) == cap.satchel_id, ENotYourSatchel);
    let mut idx = self.scrolls.find_index!(|scroll| object::id(scroll) == scroll_id);
    assert!(idx.is_some(), ENoScrollWithThisID);
    let idx = idx.extract();
    self.scrolls.remove(idx)
}

/// Borrows a scroll from the shared satchel by its ID.
/// Returns both the scroll and a borrow token that must be used to return the scroll.
/// Aborts if no scroll with the given ID exists.
public fun borrow_scroll(self: &mut SharedSatchel, scroll_id: ID): (Scroll, Borrow) {
    let mut idx = self.scrolls.find_index!(|scroll| object::id(scroll) == scroll_id);
    assert!(idx.is_some(), ENoScrollWithThisID);
    let idx = idx.extract();
    let borrow = Borrow {
        satchel_id: object::id(self),
        scroll_id
    };
    (
        self.scrolls.remove(idx),
        borrow
    )
}

/// Returns a borrowed scroll to the shared satchel.
/// Requires both the scroll and its corresponding borrow token to ensure proper return.
public fun return_scroll(self: &mut SharedSatchel, scroll: Scroll, borrow: Borrow) {
    let Borrow {
        satchel_id,
        scroll_id
    } = borrow;
    assert!(object::id(self) == satchel_id, EInvalidReturn);
    assert!(object::id(&scroll) == scroll_id, EInvalidReturn);
    self.scrolls.push_back(scroll);
}

#[test]
#[expected_failure(abort_code=ENotYourSatchel)]
fun test_satchel_editing() {
    let mut ctx = tx_context::dummy();

    let scroll = Scroll {
        id: object::new(&mut ctx),
        name: b"Scroll of Healing".to_string(),
        effects: vector[b"Heals 10 HP".to_string()],
    };

    let (_satchel1, cap1) = new(&mut ctx);
    let (mut satchel2, _cap2) = new(&mut ctx);

    satchel2.add_scroll(&cap1, scroll);

    abort(EExpectedFailure)
}

#[test]
#[expected_failure(abort_code=EInvalidReturn)]
fun test_satchel_return() {

    let mut ctx = tx_context::dummy();

    let scroll = Scroll {
        id: object::new(&mut ctx),
        name: b"Scroll of Healing".to_string(),
        effects: vector[b"Heals 10 HP".to_string()],
    };
    let scroll_id = object::id(&scroll);

    let (mut satchel1, cap1) = new(&mut ctx);
    satchel1.add_scroll(&cap1, scroll);

    let (scroll, borrow) = satchel1.borrow_scroll(scroll_id);

    let (mut satchel2, _cap2) = new(&mut ctx);

    satchel2.return_scroll(scroll, borrow);

    abort(EExpectedFailure)
}

#[test]
#[expected_failure(abort_code=EInvalidReturn)]
fun test_scroll_swap() {

    let mut ctx = tx_context::dummy();

    let scroll1 = Scroll {
        id: object::new(&mut ctx),
        name: b"Scroll of Healing".to_string(),
        effects: vector[b"Heals 10 HP".to_string()],
    };
    let scroll2 = Scroll {
        id: object::new(&mut ctx),
        name: b"Scroll of Stamina".to_string(),
        effects: vector[b"Gives 10 STA".to_string()],
    };
    let scroll1_id = object::id(&scroll1);
    let scroll2_id = object::id(&scroll2);

    let (mut satchel1, cap1) = new(&mut ctx);
    let (mut satchel2, cap2) = new(&mut ctx);
    satchel1.add_scroll(&cap1, scroll1);
    satchel2.add_scroll(&cap2, scroll2);

    let (scroll1, borrow1) = satchel1.borrow_scroll(scroll1_id);
    let (scroll2, borrow2) = satchel2.borrow_scroll(scroll2_id);

    satchel1.return_scroll(scroll2, borrow1);
    satchel2.return_scroll(scroll1, borrow2);

    abort(EExpectedFailure)
}
