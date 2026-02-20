import { EnumInputShape } from "@mysten/bcs";
import * as valibot0 from "valibot";
import { GenericSchema, InferOutput } from "valibot";

//#region src/transactions/data/v2.d.ts
declare const SerializedTransactionDataV2Schema: valibot0.ObjectSchema<{
  readonly version: valibot0.LiteralSchema<2, undefined>;
  readonly sender: valibot0.NullishSchema<valibot0.SchemaWithPipe<readonly [valibot0.StringSchema<undefined>, valibot0.TransformAction<string, string>, valibot0.CheckAction<string, undefined>]>, undefined>;
  readonly expiration: valibot0.NullishSchema<GenericSchema<EnumInputShape<{
    None: true;
    Epoch: string | number;
    ValidDuring: {
      minEpoch: string | number | null;
      maxEpoch: string | number | null;
      minTimestamp: string | number | null;
      maxTimestamp: string | number | null;
      chain: string;
      nonce: number;
    };
  }>>, undefined>;
  readonly gasData: valibot0.ObjectSchema<{
    readonly budget: valibot0.NullableSchema<valibot0.SchemaWithPipe<readonly [valibot0.UnionSchema<[valibot0.StringSchema<undefined>, valibot0.SchemaWithPipe<readonly [valibot0.NumberSchema<undefined>, valibot0.IntegerAction<number, undefined>]>], undefined>, valibot0.CheckAction<string | number, "Invalid u64">]>, undefined>;
    readonly price: valibot0.NullableSchema<valibot0.SchemaWithPipe<readonly [valibot0.UnionSchema<[valibot0.StringSchema<undefined>, valibot0.SchemaWithPipe<readonly [valibot0.NumberSchema<undefined>, valibot0.IntegerAction<number, undefined>]>], undefined>, valibot0.CheckAction<string | number, "Invalid u64">]>, undefined>;
    readonly owner: valibot0.NullableSchema<valibot0.SchemaWithPipe<readonly [valibot0.StringSchema<undefined>, valibot0.TransformAction<string, string>, valibot0.CheckAction<string, undefined>]>, undefined>;
    readonly payment: valibot0.NullableSchema<valibot0.ArraySchema<valibot0.ObjectSchema<{
      readonly objectId: valibot0.SchemaWithPipe<readonly [valibot0.StringSchema<undefined>, valibot0.TransformAction<string, string>, valibot0.CheckAction<string, undefined>]>;
      readonly version: valibot0.SchemaWithPipe<readonly [valibot0.UnionSchema<[valibot0.StringSchema<undefined>, valibot0.SchemaWithPipe<readonly [valibot0.NumberSchema<undefined>, valibot0.IntegerAction<number, undefined>]>], undefined>, valibot0.CheckAction<string | number, "Invalid u64">]>;
      readonly digest: valibot0.StringSchema<undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>;
  readonly inputs: valibot0.ArraySchema<GenericSchema<EnumInputShape<{
    Object: EnumInputShape<{
      ImmOrOwnedObject: {
        objectId: string;
        version: string | number;
        digest: string;
      };
      SharedObject: {
        objectId: string;
        initialSharedVersion: string | number;
        mutable: boolean;
      };
      Receiving: {
        objectId: string;
        version: string | number;
        digest: string;
      };
    }>;
    Pure: {
      bytes: string;
    };
    UnresolvedPure: {
      value: unknown;
    };
    UnresolvedObject: {
      objectId: string;
      version?: string | number | null | undefined;
      digest?: string | null | undefined;
      initialSharedVersion?: string | number | null | undefined;
      mutable?: boolean | null | undefined;
    };
    FundsWithdrawal: {
      reservation: {
        MaxAmountU64: string | number;
      };
      typeArg: {
        Balance: string;
      };
      withdrawFrom: {
        Sender: true;
      } | {
        Sponsor: true;
      };
    };
  }>>, undefined>;
  readonly commands: valibot0.ArraySchema<GenericSchema<EnumInputShape<{
    MoveCall: {
      package: string;
      module: string;
      function: string;
      typeArguments: string[];
      arguments: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>[];
    };
    TransferObjects: {
      objects: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>[];
      address: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>;
    };
    SplitCoins: {
      coin: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>;
      amounts: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>[];
    };
    MergeCoins: {
      destination: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>;
      sources: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>[];
    };
    Publish: {
      modules: string[];
      dependencies: string[];
    };
    MakeMoveVec: {
      type: string | null;
      elements: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>[];
    };
    Upgrade: {
      modules: string[];
      dependencies: string[];
      package: string;
      ticket: EnumInputShape<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }>;
    };
    $Intent: {
      name: string;
      inputs: {
        [x: string]: EnumInputShape<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }> | EnumInputShape<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }>[];
      };
      data: {
        [x: string]: unknown;
      };
    };
  }>>, undefined>;
  readonly digest: valibot0.OptionalSchema<valibot0.NullableSchema<valibot0.StringSchema<undefined>, undefined>, undefined>;
}, undefined>;
type SerializedTransactionDataV2 = InferOutput<typeof SerializedTransactionDataV2Schema>;
//#endregion
export { SerializedTransactionDataV2, SerializedTransactionDataV2Schema };
//# sourceMappingURL=v2.d.mts.map