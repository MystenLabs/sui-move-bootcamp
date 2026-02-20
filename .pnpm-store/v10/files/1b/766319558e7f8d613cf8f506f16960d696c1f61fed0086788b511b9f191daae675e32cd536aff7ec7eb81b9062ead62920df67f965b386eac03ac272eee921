//#region src/bcs/types.d.ts

/**
 * Kind of a TypeTag which is represented by a Move type identifier.
 */
type StructTag = {
  address: string;
  module: string;
  name: string;
  typeParams: TypeTag[];
};
/**
 * Sui TypeTag object. A decoupled `0x...::module::Type<???>` parameter.
 */
type TypeTag = {
  bool: null | true;
} | {
  u8: null | true;
} | {
  u64: null | true;
} | {
  u128: null | true;
} | {
  address: null | true;
} | {
  signer: null | true;
} | {
  vector: TypeTag;
} | {
  struct: StructTag;
} | {
  u16: null | true;
} | {
  u32: null | true;
} | {
  u256: null | true;
};
//#endregion
export { TypeTag };
//# sourceMappingURL=types.d.mts.map