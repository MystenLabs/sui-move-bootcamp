module package_upgrade::version;

use sui::package::Publisher;

/// Shared object with `version` which updates on every upgrade.
/// Used as input to force the end-user to use the latest contract version.
public struct Version has key {
    id: UID,
    version: u64
}

const EInvalidPackageVersion: u64 = 0;
const EInvalidPublisher: u64 = 1;

// Task: Update version to 2
const VERSION: u64 = 2;

fun init(ctx: &mut TxContext) {
    transfer::share_object(Version { id: object::new(ctx), version: VERSION })
}

/// Function checking that the package-version matches the `Version` object.
public fun check_is_valid(self: &Version) {
    assert!(self.version == VERSION, EInvalidPackageVersion);
}

public fun migrate(pub: &Publisher, version: &mut Version) {
    assert!(pub.from_package<Version>(), EInvalidPublisher);
    version.version = VERSION;
}

#[test_only]
public fun init_for_testing(ctx: &mut TxContext) {
    init(ctx);
}
