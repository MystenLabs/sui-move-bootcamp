import { BcsType } from "@mysten/bcs";

//#region src/bcs/pure.d.ts
type BasePureType = 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256' | 'bool' | 'id' | 'string' | 'address';
interface PureShapeByType {
  u8: number;
  u16: number;
  u32: number;
  u64: bigint | string | number;
  u128: bigint | string | number;
  u256: bigint | string | number;
  bool: boolean;
  string: string;
  id: string | Uint8Array;
  address: string | Uint8Array;
}
type PureTypeName = BasePureType | `vector<${string}>` | `option<${string}>`;
type ValidPureTypeName<T extends string> = T extends BasePureType ? PureTypeName : T extends `vector<${infer U}>` ? ValidPureTypeName<U> : T extends `option<${infer U}>` ? ValidPureTypeName<U> : PureTypeValidationError<T>;
type ShapeFromPureTypeName<T extends PureTypeName> = T extends BasePureType ? PureShapeByType[T] : T extends `vector<${infer U extends PureTypeName}>` ? ShapeFromPureTypeName<U>[] : T extends `option<${infer U extends PureTypeName}>` ? ShapeFromPureTypeName<U> | null : never;
type PureTypeValidationError<T extends string> = {
  error: `Invalid Pure type name: ${T}`;
} & {};
declare function pureBcsSchemaFromTypeName<T extends PureTypeName>(name: T extends PureTypeName ? ValidPureTypeName<T> : T): BcsType<ShapeFromPureTypeName<T>>;
//#endregion
export { PureTypeName, ShapeFromPureTypeName, ValidPureTypeName, pureBcsSchemaFromTypeName };
//# sourceMappingURL=pure.d.mts.map