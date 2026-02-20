//#region src/utils/sui-types.d.ts
/** Returns whether the tx digest is valid based on the serialization format */
declare function isValidTransactionDigest(value: string): value is string;
declare const SUI_ADDRESS_LENGTH = 32;
declare function isValidSuiAddress(value: string): value is string;
declare function isValidSuiObjectId(value: string): boolean;
declare function isValidStructTag(type: string): boolean;
type StructTag = {
  address: string;
  module: string;
  name: string;
  typeParams: (string | StructTag)[];
};
declare function parseStructTag(type: string): StructTag;
declare function normalizeStructTag(type: string | StructTag): string;
/**
 * Perform the following operations:
 * 1. Make the address lower case
 * 2. Prepend `0x` if the string does not start with `0x`.
 * 3. Add more zeros if the length of the address(excluding `0x`) is less than `SUI_ADDRESS_LENGTH`
 *
 * WARNING: if the address value itself starts with `0x`, e.g., `0x0x`, the default behavior
 * is to treat the first `0x` not as part of the address. The default behavior can be overridden by
 * setting `forceAdd0x` to true
 *
 */
declare function normalizeSuiAddress(value: string, forceAdd0x?: boolean): string;
declare function normalizeSuiObjectId(value: string, forceAdd0x?: boolean): string;
//#endregion
export { SUI_ADDRESS_LENGTH, isValidStructTag, isValidSuiAddress, isValidSuiObjectId, isValidTransactionDigest, normalizeStructTag, normalizeSuiAddress, normalizeSuiObjectId, parseStructTag };
//# sourceMappingURL=sui-types.d.mts.map