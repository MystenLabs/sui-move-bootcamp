import { BcsType } from "./bcs-type.mjs";
import { Simplify } from "@mysten/utils";

//#region src/types.d.ts

/**
 * Supported encodings.
 * Used in `Reader.toString()` as well as in `decodeStr` and `encodeStr` functions.
 */
type Encoding = 'base58' | 'base64' | 'hex';
type InferBcsType<T extends BcsType<any>> = T extends BcsType<infer U, any> ? U : never;
type InferBcsInput<T extends BcsType<any, any>> = T extends BcsType<any, infer U> ? U : never;
type EnumOutputShape<T extends Record<string, unknown>, Keys extends string = Extract<keyof T, string>, Values = (T[keyof T] extends infer Type ? (Type extends BcsType<infer U> ? U : never) : never)> = 0 extends Values ? EnumOutputShapeWithKeys<T, never> : 0n extends Values ? EnumOutputShapeWithKeys<T, never> : '' extends Values ? EnumOutputShapeWithKeys<T, never> : false extends Values ? EnumOutputShapeWithKeys<T, never> : EnumOutputShapeWithKeys<T, Keys>;
type EnumOutputShapeWithKeys<T extends Record<string, unknown>, Keys extends string> = { [K in keyof T]: Exclude<Keys, K> extends infer Empty extends string ? Simplify<{ [K2 in K]: T[K] } & { [K in Empty]?: never } & {
  $kind: K;
}> : never }[keyof T];
type EnumInputShape<T extends Record<string, unknown>> = { [K in keyof T]: { [K2 in K]: T[K] } }[keyof T];
type JoinString<T, Sep extends string> = T extends readonly [infer F extends string, ...infer R extends string[]] ? [] extends R ? F : `${F}${Sep}${JoinString<R, Sep>}` : '';
//#endregion
export { Encoding, EnumInputShape, EnumOutputShape, EnumOutputShapeWithKeys, InferBcsInput, InferBcsType, JoinString };
//# sourceMappingURL=types.d.mts.map