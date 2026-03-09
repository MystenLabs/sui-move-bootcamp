module package_upgrade::training_ground;

use package_upgrade::hero::Hero;

const VERSION: u64 = 1;
const XP_PER_TRAINING: u64 = 50;

const EInvalidPackageVersion: u64 = 0;
const ENotEnoughXp: u64 = 1;

/// Shared object that tracks the package version and holds game
/// configuration. Every public entry point checks its version so
/// that, after an upgrade, calls through the old package address
/// are rejected.
public struct TrainingGround has key {
    id: UID,
    version: u64,
    xp_per_level: u64,
}

fun init(ctx: &mut TxContext) {
    transfer::share_object(TrainingGround {
        id: object::new(ctx),
        version: VERSION,
        xp_per_level: 100,
    })
}

/// Aborts if the package version does not match the shared object.
public fun check_is_valid(self: &TrainingGround) {
    assert!(self.version == VERSION, EInvalidPackageVersion);
}

/// Train a hero, granting XP.
public fun train(self: &TrainingGround, hero: &mut Hero) {
    self.check_is_valid();
    hero.add_xp(XP_PER_TRAINING);
}

/// Level up a hero. Requires enough accumulated XP.
public fun level_up(self: &TrainingGround, hero: &mut Hero) {
    self.check_is_valid();
    let current_xp = hero.xp();
    let req_xp = hero.xp_2_lvl_up();
    let current_lvl = hero.lvl();
    assert!(current_xp >= req_xp, ENotEnoughXp);
    hero.set_xp(current_xp - req_xp);
    let new_lvl = current_lvl + 1;
    hero.set_lvl(new_lvl);
    hero.set_xp_2_lvl_up(new_lvl * self.xp_per_level);
}
