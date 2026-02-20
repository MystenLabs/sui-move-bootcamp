import { PureTypeName, ShapeFromPureTypeName, ValidPureTypeName } from "../bcs/pure.mjs";
import { SerializedBcs } from "@mysten/bcs";

//#region src/transactions/pure.d.ts
declare function createPure<T>(makePure: (value: SerializedBcs<any, any> | Uint8Array) => T): {
  <Type extends PureTypeName>(type: Type extends PureTypeName ? ValidPureTypeName<Type> : Type, value: ShapeFromPureTypeName<Type>): T;
  (value: SerializedBcs<any, any> | Uint8Array): T;
  u8(value: number): T;
  u16(value: number): T;
  u32(value: number): T;
  u64(value: bigint | number | string): T;
  u128(value: bigint | number | string): T;
  u256(value: bigint | number | string): T;
  bool(value: boolean): T;
  string(value: string): T;
  address(value: string): T;
  id: (value: string) => T;
  vector<Type extends PureTypeName>(type: Type extends PureTypeName ? ValidPureTypeName<Type> : Type, value: Iterable<ShapeFromPureTypeName<Type>> & {
    length: number;
  }): T;
  option<Type extends PureTypeName>(type: Type extends PureTypeName ? ValidPureTypeName<Type> : Type, value: ShapeFromPureTypeName<Type> | null | undefined): T;
};
//#endregion
export { createPure };
//# sourceMappingURL=pure.d.mts.map