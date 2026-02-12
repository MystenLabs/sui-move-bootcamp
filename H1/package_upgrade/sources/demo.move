module package_upgrade::my_module {
    use sui::balance::{Self, Balance};
    use sui::coin::Coin;
    use sui::sui::SUI;

    const VERSION: u64 = 1;

    const EDeprecated: u64 = 1;

    // @0xaaaaa::my_module::SharedBalancePool
    public struct SharedBalancePool has key {
        id: UID,
        balance: Balance<SUI>,
        version: u64
    }

    fun init(ctx: &mut TxContext) {
        transfer::share_object(SharedBalancePool {
            id: object::new(ctx),
            balance: balance::zero(),
            version: VERSION
        });
    }

    // @aaaaaa::my_module::important_function
    public fun important_function(pool: &mut SharedBalancePool): Coin<SUI> {
        assert!(pool.version == VERSION, EDeprecated);
        // Buggy code means the pool is exploitable
        // Buggy code means the pool is exploitable
        // Buggy code means the pool is exploitable
        // Buggy code means the pool is exploitable
        abort(0)
    }
}

// Imagine my_module as module name. We just use a different one to appease the compiler.
module package_upgrade::same_my_module {
    use sui::balance::Balance;
    use sui::coin::Coin;
    use sui::sui::SUI;

    const VERSION: u64 = 2;

    const EDeprecated: u64 = 1;

    // @0xaaaaa::my_module::SharedBalancePool
    public struct SharedBalancePool has key {
        id: UID,
        balance: Balance<SUI>,
        version: u64
    }

    public fun migrate(pool: &mut SharedBalancePool) {
        pool.version = VERSION;
    }

    // @bbbbbb::my_module::important_function
    public fun important_function(pool: &mut SharedBalancePool): Coin<SUI> {
        assert!(pool.version == VERSION, EDeprecated);
        // Code without the bug
        // Code without the bug
        // Code without the bug
        // Code without the bug
        abort(0)
    }
}
