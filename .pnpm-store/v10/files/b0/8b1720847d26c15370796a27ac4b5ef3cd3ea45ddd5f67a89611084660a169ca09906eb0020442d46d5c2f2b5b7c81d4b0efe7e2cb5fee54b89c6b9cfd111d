import { BcsReader } from "./reader.mjs";
import { EnumInputShape, EnumOutputShape, JoinString } from "./types.mjs";
import { BcsWriter, BcsWriterOptions } from "./writer.mjs";

//#region src/bcs-type.d.ts
interface BcsTypeOptions<T, Input = T, Name extends string = string> {
  name?: Name;
  validate?: (value: Input) => void;
}
declare class BcsType<T, Input = T, const Name extends string = string> {
  #private;
  $inferType: T;
  $inferInput: Input;
  name: Name;
  read: (reader: BcsReader) => T;
  serializedSize: (value: Input, options?: BcsWriterOptions) => number | null;
  validate: (value: Input) => void;
  constructor(options: {
    name: Name;
    read: (reader: BcsReader) => T;
    write: (value: Input, writer: BcsWriter) => void;
    serialize?: (value: Input, options?: BcsWriterOptions) => Uint8Array<ArrayBuffer>;
    serializedSize?: (value: Input) => number | null;
    validate?: (value: Input) => void;
  } & BcsTypeOptions<T, Input, Name>);
  write(value: Input, writer: BcsWriter): void;
  serialize(value: Input, options?: BcsWriterOptions): SerializedBcs<T, Input>;
  parse(bytes: Uint8Array): T;
  fromHex(hex: string): T;
  fromBase58(b64: string): T;
  fromBase64(b64: string): T;
  transform<T2 = T, Input2 = Input, NewName extends string = Name>({
    name,
    input,
    output,
    validate
  }: {
    input?: (val: Input2) => Input;
    output?: (value: T) => T2;
  } & BcsTypeOptions<T2, Input2, NewName>): BcsType<T2, Input2, NewName>;
}
declare const SERIALIZED_BCS_BRAND: never;
declare function isSerializedBcs(obj: unknown): obj is SerializedBcs<unknown>;
declare class SerializedBcs<T, Input = T> {
  #private;
  [SERIALIZED_BCS_BRAND]: boolean;
  constructor(schema: BcsType<T, Input>, bytes: Uint8Array<ArrayBuffer>);
  toBytes(): Uint8Array<ArrayBuffer>;
  toHex(): string;
  toBase64(): string;
  toBase58(): string;
  parse(): T;
}
declare function fixedSizeBcsType<T, Input = T, const Name extends string = string>({
  size,
  ...options
}: {
  name: Name;
  size: number;
  read: (reader: BcsReader) => T;
  write: (value: Input, writer: BcsWriter) => void;
} & BcsTypeOptions<T, Input, Name>): BcsType<T, Input, Name>;
declare function uIntBcsType<const Name extends string = string>({
  readMethod,
  writeMethod,
  ...options
}: {
  name: Name;
  size: number;
  readMethod: `read${8 | 16 | 32}`;
  writeMethod: `write${8 | 16 | 32}`;
  maxValue: number;
} & BcsTypeOptions<number, number, Name>): BcsType<number, number, Name>;
declare function bigUIntBcsType<const Name extends string = string>({
  readMethod,
  writeMethod,
  ...options
}: {
  name: Name;
  size: number;
  readMethod: `read${64 | 128 | 256}`;
  writeMethod: `write${64 | 128 | 256}`;
  maxValue: bigint;
} & BcsTypeOptions<string, string | number | bigint>): BcsType<string, string | number | bigint, Name>;
declare function dynamicSizeBcsType<T, Input = T, const Name extends string = string>({
  serialize,
  ...options
}: {
  name: Name;
  read: (reader: BcsReader) => T;
  serialize: (value: Input, options?: BcsWriterOptions) => Uint8Array<ArrayBuffer>;
} & BcsTypeOptions<T, Input>): BcsType<T, Input, string>;
declare function stringLikeBcsType<const Name extends string = string>({
  toBytes,
  fromBytes,
  ...options
}: {
  name: Name;
  toBytes: (value: string) => Uint8Array;
  fromBytes: (bytes: Uint8Array) => string;
  serializedSize?: (value: string) => number | null;
} & BcsTypeOptions<string, string, Name>): BcsType<string, string, Name>;
declare function lazyBcsType<T, Input>(cb: () => BcsType<T, Input>): BcsType<T, Input, string>;
interface BcsStructOptions<T extends Record<string, BcsType<any>>, Name extends string = string> extends Omit<BcsTypeOptions<{ [K in keyof T]: T[K] extends BcsType<infer U, any> ? U : never }, { [K in keyof T]: T[K] extends BcsType<any, infer U> ? U : never }, Name>, 'name'> {
  name: Name;
  fields: T;
}
declare class BcsStruct<T extends Record<string, BcsType<any>>, const Name extends string = string> extends BcsType<{ [K in keyof T]: T[K] extends BcsType<infer U, any> ? U : never }, { [K in keyof T]: T[K] extends BcsType<any, infer U> ? U : never }, Name> {
  constructor({
    name,
    fields,
    ...options
  }: BcsStructOptions<T, Name>);
}
interface BcsEnumOptions<T extends Record<string, BcsType<any> | null>, Name extends string = string> extends Omit<BcsTypeOptions<EnumOutputShape<{ [K in keyof T]: T[K] extends BcsType<infer U, any, any> ? U : true }>, EnumInputShape<{ [K in keyof T]: T[K] extends BcsType<any, infer U, any> ? U : boolean | object | null }>, Name>, 'name'> {
  name: Name;
  fields: T;
}
declare class BcsEnum<T extends Record<string, BcsType<any> | null>, const Name extends string = string> extends BcsType<EnumOutputShape<{ [K in keyof T]: T[K] extends BcsType<infer U, any> ? U : true }>, EnumInputShape<{ [K in keyof T]: T[K] extends BcsType<any, infer U, any> ? U : boolean | object | null }>, Name> {
  constructor({
    fields,
    ...options
  }: BcsEnumOptions<T, Name>);
}
interface BcsTupleOptions<T extends readonly BcsType<any>[], Name extends string> extends Omit<BcsTypeOptions<{ -readonly [K in keyof T]: T[K] extends BcsType<infer T, any> ? T : never }, { [K in keyof T]: T[K] extends BcsType<any, infer T> ? T : never }, Name>, 'name'> {
  name?: Name;
  fields: T;
}
declare class BcsTuple<const T extends readonly BcsType<any>[], const Name extends string = `(${JoinString<{ [K in keyof T]: T[K] extends BcsType<any, any, infer T> ? T : never }, ', '>})`> extends BcsType<{ -readonly [K in keyof T]: T[K] extends BcsType<infer T, any> ? T : never }, { [K in keyof T]: T[K] extends BcsType<any, infer T> ? T : never }, Name> {
  constructor({
    fields,
    name,
    ...options
  }: BcsTupleOptions<T, Name>);
}
//#endregion
export { BcsEnum, BcsEnumOptions, BcsStruct, BcsStructOptions, BcsTuple, BcsTupleOptions, BcsType, BcsTypeOptions, SerializedBcs, bigUIntBcsType, dynamicSizeBcsType, fixedSizeBcsType, isSerializedBcs, lazyBcsType, stringLikeBcsType, uIntBcsType };
//# sourceMappingURL=bcs-type.d.mts.map