## Sui & Move Bootcamp

### Sui Move Modules: Publisher and Capability Patterns

#### Publisher Module
The publisher module demonstrates access control using Sui's Publisher object:

- **OTW (One-Time Witness)**: Uses a `HERO` struct with `drop` ability as the one-time witness that uniquely identifies this module at publish time.

- **Publisher object with claim_and_keep on release**: 
  ```move
  fun init(otw: HERO, ctx: &mut TxContext) {
      package::claim_and_keep(otw, ctx);
  }
  ```
  This creates a Publisher object during package initialization and transfers it to the publisher's address.

- **Functions gating with the Publisher object**: Functions like `create_hero` and `transfer_hero` require a Publisher object as an argument to authorize operations.

- **Manual assertion of the rightful publisher object**:
  ```move
  assert!(publisher.from_module<HERO>(), EWrongPublisher);
  ```
  Verifies that the provided Publisher object belongs to this specific module.

- **Tests with the correct Publisher**: Includes tests demonstrating successful usage with the correct Publisher object.

- **New test module to demonstrate wrong publisher object**: Separate test module shows that a Publisher from another module cannot be used to call functions in this module.

- **Publisher being a singleton due to OTW**: Only one Publisher object for the HERO module can exist in the system, ensuring there can be only one hero minter for this module.

#### Capability Module
The capability module demonstrates access control using a capability pattern:

- **Admin cap pattern based on object ownership**: Uses an `AdminCap` struct that only the module creator receives initially.

- **No need to check for module**: The AdminCap is tied to the specific module by design, so no explicit module verification is needed.

- **Hero minters can co-exist**: Multiple admin capabilities can exist in the system through the `new_admin` function:
  ```move
  public fun new_admin(_: &AdminCap, to: address, ctx: &mut TxContext) {
      let admin_cap = AdminCap {
          id: object::new(ctx),
      };
      transfer::transfer(admin_cap, to);
  }
  ```

- **Initial AdminCap distribution**: Only the package publisher receives the initial AdminCap during initialization:
  ```move
  fun init(ctx: &mut TxContext) {
      let admin_cap = AdminCap {
          id: object::new(ctx),
      };
      transfer::transfer(admin_cap, ctx.sender());
  }
  ```

- **Permission by capability reference**: Functions like `create_hero` and `transfer_hero` take a reference to the AdminCap to authorize operations.

- **Delegation model**: Existing admins can create new admins, creating a delegation pattern for authorization.

## Key Differences

- The Publisher pattern ensures a **singleton** authority tied to the module publisher.
- The Capability pattern allows for **multiple** authorized entities through delegation.
- Publisher requires verification of module origin, while Capability relies on object ownership.