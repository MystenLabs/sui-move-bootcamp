import { EnumInputShape, EnumOutputShape, InferBcsInput, InferBcsType, JoinString } from "./types.mjs";
import { BcsEnum, BcsStruct, BcsTuple, BcsType, BcsTypeOptions } from "./bcs-type.mjs";

//#region src/bcs.d.ts
declare function fixedArray<T extends BcsType<any>, Name extends string = string>(size: number, type: T, options?: BcsTypeOptions<InferBcsType<T>[], Iterable<InferBcsInput<T>> & {
  length: number;
}, Name>): BcsType<InferBcsType<T>[], Iterable<InferBcsInput<T>> & {
  length: number;
}, Name>;
declare function fixedArray<T, Input, Name extends string = string>(size: number, type: BcsType<T, Input>, options?: BcsTypeOptions<T[], Iterable<Input> & {
  length: number;
}, Name>): BcsType<T[], Iterable<Input> & {
  length: number;
}, Name>;
declare function option<T extends BcsType<any>>(type: T): BcsType<InferBcsType<T> | null, InferBcsInput<T> | null | undefined, `Option<${T['name']}>`>;
declare function option<T, Input, Name extends string = string>(type: BcsType<T, Input, Name>): BcsType<T | null, Input | null | undefined>;
declare function vector<T extends BcsType<any>, Name extends string = `vector<${T['name']}>`>(type: T, options?: BcsTypeOptions<InferBcsType<T>[], Iterable<InferBcsInput<T>> & {
  length: number;
}, Name>): BcsType<InferBcsType<T>[], Iterable<InferBcsInput<T>> & {
  length: number;
}, Name>;
declare function vector<T, Input, Name extends string = string>(type: BcsType<T, Input, Name>, options?: BcsTypeOptions<T[], Iterable<Input> & {
  length: number;
}, `vector<${Name}>`>): BcsType<T[], Iterable<Input> & {
  length: number;
}, `vector<${Name}>`>;
/**
 * Compares two byte arrays using lexicographic ordering.
 * This matches Rust's Ord implementation for Vec<u8>/[u8] which is used for BTreeMap key ordering.
 * Comparison is done byte-by-byte first, then by length if all compared bytes are equal.
 */
declare function compareBcsBytes(a: Uint8Array, b: Uint8Array): number;
declare function map<K$1 extends BcsType<any>, V extends BcsType<any>>(keyType: K$1, valueType: V): BcsType<Map<InferBcsType<K$1>, InferBcsType<V>>, Map<InferBcsInput<K$1>, InferBcsInput<V>>, `Map<${K$1['name']}, ${V['name']}>`>;
declare function map<K$1, V, InputK = K$1, InputV = V>(keyType: BcsType<K$1, InputK>, valueType: BcsType<V, InputV>): BcsType<Map<K$1, V>, Map<InputK, InputV>, `Map<${string}, ${string}>`>;
declare const bcs: {
  /**
   * Creates a BcsType that can be used to read and write an 8-bit unsigned integer.
   * @example
   * bcs.u8().serialize(255).toBytes() // Uint8Array [ 255 ]
   */
  u8(options?: BcsTypeOptions<number>): BcsType<number, number, "u8">;
  /**
   * Creates a BcsType that can be used to read and write a 16-bit unsigned integer.
   * @example
   * bcs.u16().serialize(65535).toBytes() // Uint8Array [ 255, 255 ]
   */
  u16(options?: BcsTypeOptions<number>): BcsType<number, number, "u16">;
  /**
   * Creates a BcsType that can be used to read and write a 32-bit unsigned integer.
   * @example
   * bcs.u32().serialize(4294967295).toBytes() // Uint8Array [ 255, 255, 255, 255 ]
   */
  u32(options?: BcsTypeOptions<number>): BcsType<number, number, "u32">;
  /**
   * Creates a BcsType that can be used to read and write a 64-bit unsigned integer.
   * @example
   * bcs.u64().serialize(1).toBytes() // Uint8Array [ 1, 0, 0, 0, 0, 0, 0, 0 ]
   */
  u64(options?: BcsTypeOptions<string, number | bigint | string>): BcsType<string, string | number | bigint, "u64">;
  /**
   * Creates a BcsType that can be used to read and write a 128-bit unsigned integer.
   * @example
   * bcs.u128().serialize(1).toBytes() // Uint8Array [ 1, ..., 0 ]
   */
  u128(options?: BcsTypeOptions<string, number | bigint | string>): BcsType<string, string | number | bigint, "u128">;
  /**
   * Creates a BcsType that can be used to read and write a 256-bit unsigned integer.
   * @example
   * bcs.u256().serialize(1).toBytes() // Uint8Array [ 1, ..., 0 ]
   */
  u256(options?: BcsTypeOptions<string, number | bigint | string>): BcsType<string, string | number | bigint, "u256">;
  /**
   * Creates a BcsType that can be used to read and write boolean values.
   * @example
   * bcs.bool().serialize(true).toBytes() // Uint8Array [ 1 ]
   */
  bool(options?: BcsTypeOptions<boolean>): BcsType<boolean, boolean, "bool">;
  /**
   * Creates a BcsType that can be used to read and write unsigned LEB encoded integers
   * @example
   *
   */
  uleb128(options?: BcsTypeOptions<number>): BcsType<number, number, string>;
  /**
   * Creates a BcsType representing a fixed length byte array
   * @param size The number of bytes this types represents
   * @example
   * bcs.bytes(3).serialize(new Uint8Array([1, 2, 3])).toBytes() // Uint8Array [1, 2, 3]
   */
  bytes<T extends number>(size: T, options?: BcsTypeOptions<Uint8Array, Iterable<number>>): BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, `bytes[${T}]`>;
  /**
   * Creates a BcsType representing a variable length byte array
   *
   * @example
   * bcs.byteVector().serialize([1, 2, 3]).toBytes() // Uint8Array [3, 1, 2, 3]
   */
  byteVector(options?: BcsTypeOptions<Uint8Array, Iterable<number>>): BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
  /**
   * Creates a BcsType that can ser/de string values.  Strings will be UTF-8 encoded
   * @example
   * bcs.string().serialize('a').toBytes() // Uint8Array [ 1, 97 ]
   */
  string(options?: BcsTypeOptions<string>): BcsType<string, string, "string">;
  /**
   * Creates a BcsType that represents a fixed length array of a given type
   * @param size The number of elements in the array
   * @param type The BcsType of each element in the array
   * @example
   * bcs.fixedArray(3, bcs.u8()).serialize([1, 2, 3]).toBytes() // Uint8Array [ 1, 2, 3 ]
   */
  fixedArray: typeof fixedArray;
  /**
   * Creates a BcsType representing an optional value
   * @param type The BcsType of the optional value
   * @example
   * bcs.option(bcs.u8()).serialize(null).toBytes() // Uint8Array [ 0 ]
   * bcs.option(bcs.u8()).serialize(1).toBytes() // Uint8Array [ 1, 1 ]
   */
  option: typeof option;
  /**
   * Creates a BcsType representing a variable length vector of a given type
   * @param type The BcsType of each element in the vector
   *
   * @example
   * bcs.vector(bcs.u8()).toBytes([1, 2, 3]) // Uint8Array [ 3, 1, 2, 3 ]
   */
  vector: typeof vector;
  /**
   * Creates a BcsType representing a tuple of a given set of types
   * @param types The BcsTypes for each element in the tuple
   *
   * @example
   * const tuple = bcs.tuple([bcs.u8(), bcs.string(), bcs.bool()])
   * tuple.serialize([1, 'a', true]).toBytes() // Uint8Array [ 1, 1, 97, 1 ]
   */
  tuple<const T extends readonly BcsType<any, any>[], const Name extends string = `(${JoinString<{ [K in keyof T]: T[K] extends BcsType<any, any, infer T_1 extends string> ? T_1 : never }, ", ">})`>(fields: T, options?: BcsTypeOptions<{ -readonly [K_1 in keyof T]: T[K_1] extends BcsType<infer T_1, any> ? T_1 : never }, { [K_1 in keyof T]: T[K_1] extends BcsType<any, infer T_1> ? T_1 : never }, Name>): BcsTuple<T, Name>;
  /**
   * Creates a BcsType representing a struct of a given set of fields
   * @param name The name of the struct
   * @param fields The fields of the struct. The order of the fields affects how data is serialized and deserialized
   *
   * @example
   * const struct = bcs.struct('MyStruct', {
   *  a: bcs.u8(),
   *  b: bcs.string(),
   * })
   * struct.serialize({ a: 1, b: 'a' }).toBytes() // Uint8Array [ 1, 1, 97 ]
   */
  struct<T extends Record<string, BcsType<any>>, const Name extends string = string>(name: Name, fields: T, options?: Omit<BcsTypeOptions<{ [K in keyof T]: T[K] extends BcsType<infer U, any> ? U : never }, { [K in keyof T]: T[K] extends BcsType<any, infer U> ? U : never }>, "name">): BcsStruct<T, string>;
  /**
   * Creates a BcsType representing an enum of a given set of options
   * @param name The name of the enum
   * @param values The values of the enum. The order of the values affects how data is serialized and deserialized.
   * null can be used to represent a variant with no data.
   *
   * @example
   * const enum = bcs.enum('MyEnum', {
   *   A: bcs.u8(),
   *   B: bcs.string(),
   *   C: null,
   * })
   * enum.serialize({ A: 1 }).toBytes() // Uint8Array [ 0, 1 ]
   * enum.serialize({ B: 'a' }).toBytes() // Uint8Array [ 1, 1, 97 ]
   * enum.serialize({ C: true }).toBytes() // Uint8Array [ 2 ]
   */
  enum<T extends Record<string, BcsType<any> | null>, const Name extends string = string>(name: Name, fields: T, options?: Omit<BcsTypeOptions<EnumOutputShape<{ [K in keyof T]: T[K] extends BcsType<infer U, any, any> ? U : true }>, EnumInputShape<{ [K in keyof T]: T[K] extends BcsType<any, infer U, any> ? U : boolean | object | null }>, Name>, "name">): BcsEnum<T, Name>;
  /**
   * Creates a BcsType representing a map of a given key and value type
   * @param keyType The BcsType of the key
   * @param valueType The BcsType of the value
   * @example
   * const map = bcs.map(bcs.u8(), bcs.string())
   * map.serialize(new Map([[2, 'a']])).toBytes() // Uint8Array [ 1, 2, 1, 97 ]
   */
  map: typeof map;
  /**
   * Creates a BcsType that wraps another BcsType which is lazily evaluated. This is useful for creating recursive types.
   * @param cb A callback that returns the BcsType
   */
  lazy<T extends BcsType<any>>(cb: () => T): T;
};
//#endregion
export { bcs, compareBcsBytes };
//# sourceMappingURL=bcs.d.mts.map