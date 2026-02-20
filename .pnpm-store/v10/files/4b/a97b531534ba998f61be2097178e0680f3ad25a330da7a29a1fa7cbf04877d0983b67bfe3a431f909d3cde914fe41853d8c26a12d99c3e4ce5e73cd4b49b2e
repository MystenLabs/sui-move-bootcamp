import { TypeTag } from "../../bcs/types.mjs";
import "./internal.mjs";
import "@mysten/bcs";
import * as valibot49 from "valibot";
import { GenericSchema, InferOutput } from "valibot";

//#region src/transactions/data/v1.d.ts

declare const SerializedTransactionDataV1: valibot49.ObjectSchema<{
  readonly version: valibot49.LiteralSchema<1, undefined>;
  readonly sender: valibot49.OptionalSchema<valibot49.StringSchema<undefined>, undefined>;
  readonly expiration: valibot49.NullishSchema<valibot49.UnionSchema<[valibot49.ObjectSchema<{
    readonly Epoch: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
  }, undefined>, valibot49.ObjectSchema<{
    readonly None: valibot49.NullableSchema<valibot49.LiteralSchema<true, undefined>, undefined>;
  }, undefined>], undefined>, undefined>;
  readonly gasConfig: valibot49.ObjectSchema<{
    readonly budget: valibot49.OptionalSchema<valibot49.SchemaWithPipe<readonly [valibot49.UnionSchema<[valibot49.NumberSchema<undefined>, valibot49.StringSchema<undefined>, valibot49.BigintSchema<undefined>], undefined>, valibot49.CheckAction<string | number | bigint, undefined>]>, undefined>;
    readonly price: valibot49.OptionalSchema<valibot49.SchemaWithPipe<readonly [valibot49.UnionSchema<[valibot49.NumberSchema<undefined>, valibot49.StringSchema<undefined>, valibot49.BigintSchema<undefined>], undefined>, valibot49.CheckAction<string | number | bigint, undefined>]>, undefined>;
    readonly payment: valibot49.OptionalSchema<valibot49.ArraySchema<valibot49.ObjectSchema<{
      readonly digest: valibot49.StringSchema<undefined>;
      readonly objectId: valibot49.StringSchema<undefined>;
      readonly version: valibot49.UnionSchema<[valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>, valibot49.StringSchema<undefined>, valibot49.BigintSchema<undefined>], undefined>;
    }, undefined>, undefined>, undefined>;
    readonly owner: valibot49.OptionalSchema<valibot49.StringSchema<undefined>, undefined>;
  }, undefined>;
  readonly inputs: valibot49.ArraySchema<valibot49.UnionSchema<[valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"Input", undefined>;
    readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    readonly value: valibot49.UnknownSchema;
    readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
  }, undefined>, valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"Input", undefined>;
    readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    readonly value: valibot49.UnknownSchema;
    readonly type: valibot49.LiteralSchema<"pure", undefined>;
  }, undefined>], undefined>, undefined>;
  readonly transactions: valibot49.ArraySchema<valibot49.UnionSchema<[valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"MoveCall", undefined>;
    readonly target: GenericSchema<`${string}::${string}::${string}`>;
    readonly typeArguments: valibot49.ArraySchema<valibot49.StringSchema<undefined>, undefined>;
    readonly arguments: valibot49.ArraySchema<valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>, undefined>;
  }, undefined>, valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"TransferObjects", undefined>;
    readonly objects: valibot49.ArraySchema<valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>, undefined>;
    readonly address: valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>;
  }, undefined>, valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"SplitCoins", undefined>;
    readonly coin: valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>;
    readonly amounts: valibot49.ArraySchema<valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>, undefined>;
  }, undefined>, valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"MergeCoins", undefined>;
    readonly destination: valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>;
    readonly sources: valibot49.ArraySchema<valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>, undefined>;
  }, undefined>, valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"Publish", undefined>;
    readonly modules: valibot49.ArraySchema<valibot49.ArraySchema<valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>, undefined>, undefined>;
    readonly dependencies: valibot49.ArraySchema<valibot49.StringSchema<undefined>, undefined>;
  }, undefined>, valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"Upgrade", undefined>;
    readonly modules: valibot49.ArraySchema<valibot49.ArraySchema<valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>, undefined>, undefined>;
    readonly dependencies: valibot49.ArraySchema<valibot49.StringSchema<undefined>, undefined>;
    readonly packageId: valibot49.StringSchema<undefined>;
    readonly ticket: valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>;
  }, undefined>, valibot49.ObjectSchema<{
    readonly kind: valibot49.LiteralSchema<"MakeMoveVec", undefined>;
    readonly type: valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly Some: GenericSchema<TypeTag>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly None: valibot49.NullableSchema<valibot49.LiteralSchema<true, undefined>, undefined>;
    }, undefined>], undefined>;
    readonly objects: valibot49.ArraySchema<valibot49.UnionSchema<[valibot49.UnionSchema<[valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.OptionalSchema<valibot49.LiteralSchema<"object", undefined>, undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Input", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly value: valibot49.UnknownSchema;
      readonly type: valibot49.LiteralSchema<"pure", undefined>;
    }, undefined>], undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"GasCoin", undefined>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"Result", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>, valibot49.ObjectSchema<{
      readonly kind: valibot49.LiteralSchema<"NestedResult", undefined>;
      readonly index: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
      readonly resultIndex: valibot49.SchemaWithPipe<readonly [valibot49.NumberSchema<undefined>, valibot49.IntegerAction<number, undefined>]>;
    }, undefined>], undefined>, undefined>;
  }, undefined>], undefined>, undefined>;
}, undefined>;
type SerializedTransactionDataV1 = InferOutput<typeof SerializedTransactionDataV1>;
//#endregion
export { SerializedTransactionDataV1 };
//# sourceMappingURL=v1.d.mts.map