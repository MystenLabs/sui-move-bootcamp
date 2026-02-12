# G3: Advanced Data Structures in Sui

This section explores three powerful data structures in Sui: Tables, Dynamic Fields, and Dynamic Object Fields.

## 1. Tables

Tables in Sui provide a way to store homogeneous collections with two distinct approaches:

### Fixed Key Range Tables
- Uses an enum to define a fixed set of possible keys
- Provides type safety and compile-time checking
- Example: A table with predefined categories (e.g., `Attribute::Fire`, `Attribute::Water`)

### Open Key Range Tables
- Uses `TypeName` for keys, allowing any type to be used as a key
- More flexible but requires careful handling
- Example: A table where keys can be any string or custom type

## 2. Dynamic Fields

Dynamic Fields allow attaching additional data to objects at runtime:

### Move Implementation
- `attach` and `remove` operations for managing dynamic fields
- Requires maintaining a separate structure to track keys

### TypeScript SDK Usage
- Can query dynamic fields of an object
- Once attached, the object becomes inaccessible off-chain through the TS SDK

## 3. Dynamic Object Fields (DOF)

Dynamic Object Fields provide more flexibility than simple dynamic fields:

### Move Implementation
- Similar `attach` and `remove` operations

### TypeScript SDK Usage
- Objects remain accessible off-chain even after attachment
- Parent object deletion can leave DOF objects orphaned

## Key Differences

1. **Accessibility**:
   - Dynamic Fields: Objects become inaccessible off-chain when attached
   - DOF: Objects remain accessible even after attachment

2. **Orphaned Objects**:
   - Table: Ensures that the table cannot be deleted if it contains attached fields
   - DF/DOF: Can become orphaned if parent is deleted

