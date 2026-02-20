import { SuiClientTypes } from "../../client/types.mjs";
import { EnumInputShape, EnumOutputShape } from "@mysten/bcs";
import { Simplify } from "@mysten/utils";
import * as valibot481 from "valibot";
import { GenericSchema, InferInput, InferOutput, ObjectSchema } from "valibot";

//#region src/transactions/data/internal.d.ts
type EnumSchemaInput<T extends Record<string, GenericSchema<any>>> = EnumInputShape<Simplify<{ [K in keyof T]: InferInput<T[K]> }>>;
type EnumSchemaOutput<T extends Record<string, GenericSchema<any>>> = EnumOutputShape<Simplify<{ [K in keyof T]: InferOutput<T[K]> }>>;
type EnumSchema<T extends Record<string, GenericSchema<any>>> = GenericSchema<EnumSchemaInput<T>, EnumSchemaOutput<T>>;
declare const ObjectRefSchema: ObjectSchema<{
  readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
  readonly version: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
  readonly digest: valibot481.StringSchema<undefined>;
}, undefined>;
type ObjectRef = InferOutput<typeof ObjectRefSchema>;
declare const ArgumentSchema: valibot481.UnionSchema<[GenericSchema<{
  GasCoin: true;
  $kind?: "GasCoin" | undefined;
}, {
  GasCoin: true;
  $kind: "GasCoin";
}>, GenericSchema<{
  Input: number;
  type?: "object" | "pure" | "withdrawal" | undefined;
  $kind?: "Input" | undefined;
}, {
  Input: number;
  type?: "object" | "pure" | "withdrawal" | undefined;
  $kind: "Input";
}>, GenericSchema<{
  Result: number;
  $kind?: "Result" | undefined;
}, {
  Result: number;
  $kind: "Result";
}>, GenericSchema<{
  NestedResult: [number, number];
  $kind?: "NestedResult" | undefined;
}, {
  NestedResult: [number, number];
  $kind: "NestedResult";
}>], undefined>;
type Argument = InferOutput<typeof ArgumentSchema>;
declare const GasDataSchema: ObjectSchema<{
  readonly budget: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
  readonly price: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
  readonly owner: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>, undefined>;
  readonly payment: valibot481.NullableSchema<valibot481.ArraySchema<ObjectSchema<{
    readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
    readonly version: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
    readonly digest: valibot481.StringSchema<undefined>;
  }, undefined>, undefined>, undefined>;
}, undefined>;
type GasData = InferOutput<typeof GasDataSchema>;
type Command<Arg = Argument> = EnumOutputShape<{
  MoveCall: {
    package: string;
    module: string;
    function: string;
    typeArguments: string[];
    arguments: Arg[];
    _argumentTypes?: SuiClientTypes.OpenSignature[] | null;
  };
  TransferObjects: {
    objects: Arg[];
    address: Arg;
  };
  SplitCoins: {
    coin: Arg;
    amounts: Arg[];
  };
  MergeCoins: {
    destination: Arg;
    sources: Arg[];
  };
  Publish: {
    modules: string[];
    dependencies: string[];
  };
  MakeMoveVec: {
    type: string | null;
    elements: Arg[];
  };
  Upgrade: {
    modules: string[];
    dependencies: string[];
    package: string;
    ticket: Arg;
  };
  $Intent: {
    name: string;
    inputs: Record<string, Argument | Argument[]>;
    data: Record<string, unknown>;
  };
}>;
declare const ReservationSchema: EnumSchema<{
  MaxAmountU64: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
}>;
type Reservation = InferOutput<typeof ReservationSchema>;
declare const WithdrawalTypeArgSchema: EnumSchema<{
  Balance: valibot481.StringSchema<undefined>;
}>;
type WithdrawalTypeArg = InferOutput<typeof WithdrawalTypeArgSchema>;
declare const WithdrawFromSchema: EnumSchema<{
  Sender: valibot481.LiteralSchema<true, undefined>;
  Sponsor: valibot481.LiteralSchema<true, undefined>;
}>;
type WithdrawFrom = InferOutput<typeof WithdrawFromSchema>;
declare const CallArgSchema: EnumSchema<{
  Object: EnumSchema<{
    ImmOrOwnedObject: ObjectSchema<{
      readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
      readonly version: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
      readonly digest: valibot481.StringSchema<undefined>;
    }, undefined>;
    SharedObject: ObjectSchema<{
      readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
      readonly initialSharedVersion: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
      readonly mutable: valibot481.BooleanSchema<undefined>;
    }, undefined>;
    Receiving: ObjectSchema<{
      readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
      readonly version: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
      readonly digest: valibot481.StringSchema<undefined>;
    }, undefined>;
  }>;
  Pure: ObjectSchema<{
    readonly bytes: valibot481.StringSchema<undefined>;
  }, undefined>;
  UnresolvedPure: ObjectSchema<{
    readonly value: valibot481.UnknownSchema;
  }, undefined>;
  UnresolvedObject: ObjectSchema<{
    readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
    readonly version: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>, undefined>;
    readonly digest: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.StringSchema<undefined>, undefined>, undefined>;
    readonly initialSharedVersion: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>, undefined>;
    readonly mutable: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.BooleanSchema<undefined>, undefined>, undefined>;
  }, undefined>;
  FundsWithdrawal: ObjectSchema<{
    readonly reservation: EnumSchema<{
      MaxAmountU64: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
    }>;
    readonly typeArg: EnumSchema<{
      Balance: valibot481.StringSchema<undefined>;
    }>;
    readonly withdrawFrom: EnumSchema<{
      Sender: valibot481.LiteralSchema<true, undefined>;
      Sponsor: valibot481.LiteralSchema<true, undefined>;
    }>;
  }, undefined>;
}>;
type CallArg = InferOutput<typeof CallArgSchema>;
declare const TransactionExpiration: EnumSchema<{
  None: valibot481.LiteralSchema<true, undefined>;
  Epoch: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
  ValidDuring: ObjectSchema<{
    readonly minEpoch: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
    readonly maxEpoch: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
    readonly minTimestamp: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
    readonly maxTimestamp: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
    readonly chain: valibot481.StringSchema<undefined>;
    readonly nonce: valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>, valibot481.CheckAction<number, "Invalid u32">]>;
  }, undefined>;
}>;
type TransactionExpiration = InferOutput<typeof TransactionExpiration>;
declare const TransactionDataSchema: ObjectSchema<{
  readonly version: valibot481.LiteralSchema<2, undefined>;
  readonly sender: valibot481.NullishSchema<valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>, undefined>;
  readonly expiration: valibot481.NullishSchema<EnumSchema<{
    None: valibot481.LiteralSchema<true, undefined>;
    Epoch: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
    ValidDuring: ObjectSchema<{
      readonly minEpoch: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
      readonly maxEpoch: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
      readonly minTimestamp: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
      readonly maxTimestamp: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
      readonly chain: valibot481.StringSchema<undefined>;
      readonly nonce: valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>, valibot481.CheckAction<number, "Invalid u32">]>;
    }, undefined>;
  }>, undefined>;
  readonly gasData: ObjectSchema<{
    readonly budget: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
    readonly price: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>;
    readonly owner: valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>, undefined>;
    readonly payment: valibot481.NullableSchema<valibot481.ArraySchema<ObjectSchema<{
      readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
      readonly version: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
      readonly digest: valibot481.StringSchema<undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>;
  readonly inputs: valibot481.ArraySchema<EnumSchema<{
    Object: EnumSchema<{
      ImmOrOwnedObject: ObjectSchema<{
        readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
        readonly version: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
        readonly digest: valibot481.StringSchema<undefined>;
      }, undefined>;
      SharedObject: ObjectSchema<{
        readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
        readonly initialSharedVersion: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
        readonly mutable: valibot481.BooleanSchema<undefined>;
      }, undefined>;
      Receiving: ObjectSchema<{
        readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
        readonly version: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
        readonly digest: valibot481.StringSchema<undefined>;
      }, undefined>;
    }>;
    Pure: ObjectSchema<{
      readonly bytes: valibot481.StringSchema<undefined>;
    }, undefined>;
    UnresolvedPure: ObjectSchema<{
      readonly value: valibot481.UnknownSchema;
    }, undefined>;
    UnresolvedObject: ObjectSchema<{
      readonly objectId: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
      readonly version: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>, undefined>;
      readonly digest: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.StringSchema<undefined>, undefined>, undefined>;
      readonly initialSharedVersion: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>, undefined>, undefined>;
      readonly mutable: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.BooleanSchema<undefined>, undefined>, undefined>;
    }, undefined>;
    FundsWithdrawal: ObjectSchema<{
      readonly reservation: EnumSchema<{
        MaxAmountU64: valibot481.SchemaWithPipe<readonly [valibot481.UnionSchema<[valibot481.StringSchema<undefined>, valibot481.SchemaWithPipe<readonly [valibot481.NumberSchema<undefined>, valibot481.IntegerAction<number, undefined>]>], undefined>, valibot481.CheckAction<string | number, "Invalid u64">]>;
      }>;
      readonly typeArg: EnumSchema<{
        Balance: valibot481.StringSchema<undefined>;
      }>;
      readonly withdrawFrom: EnumSchema<{
        Sender: valibot481.LiteralSchema<true, undefined>;
        Sponsor: valibot481.LiteralSchema<true, undefined>;
      }>;
    }, undefined>;
  }>, undefined>;
  readonly commands: valibot481.ArraySchema<EnumSchema<{
    MoveCall: ObjectSchema<{
      readonly package: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
      readonly module: valibot481.StringSchema<undefined>;
      readonly function: valibot481.StringSchema<undefined>;
      readonly typeArguments: valibot481.ArraySchema<valibot481.StringSchema<undefined>, undefined>;
      readonly arguments: valibot481.ArraySchema<valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>, undefined>;
      readonly _argumentTypes: valibot481.OptionalSchema<valibot481.NullableSchema<valibot481.ArraySchema<ObjectSchema<{
        readonly reference: valibot481.NullableSchema<valibot481.UnionSchema<[valibot481.LiteralSchema<"mutable", undefined>, valibot481.LiteralSchema<"immutable", undefined>, valibot481.LiteralSchema<"unknown", undefined>], undefined>, undefined>;
        readonly body: GenericSchema<SuiClientTypes.OpenSignatureBody>;
      }, undefined>, undefined>, undefined>, undefined>;
    }, undefined>;
    TransferObjects: ObjectSchema<{
      readonly objects: valibot481.ArraySchema<valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>, undefined>;
      readonly address: valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>;
    }, undefined>;
    SplitCoins: ObjectSchema<{
      readonly coin: valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>;
      readonly amounts: valibot481.ArraySchema<valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>, undefined>;
    }, undefined>;
    MergeCoins: ObjectSchema<{
      readonly destination: valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>;
      readonly sources: valibot481.ArraySchema<valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>, undefined>;
    }, undefined>;
    Publish: ObjectSchema<{
      readonly modules: valibot481.ArraySchema<valibot481.StringSchema<undefined>, undefined>;
      readonly dependencies: valibot481.ArraySchema<valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>, undefined>;
    }, undefined>;
    MakeMoveVec: ObjectSchema<{
      readonly type: valibot481.NullableSchema<valibot481.StringSchema<undefined>, undefined>;
      readonly elements: valibot481.ArraySchema<valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>, undefined>;
    }, undefined>;
    Upgrade: ObjectSchema<{
      readonly modules: valibot481.ArraySchema<valibot481.StringSchema<undefined>, undefined>;
      readonly dependencies: valibot481.ArraySchema<valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>, undefined>;
      readonly package: valibot481.SchemaWithPipe<readonly [valibot481.StringSchema<undefined>, valibot481.TransformAction<string, string>, valibot481.CheckAction<string, undefined>]>;
      readonly ticket: valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>;
    }, undefined>;
    $Intent: ObjectSchema<{
      readonly name: valibot481.StringSchema<undefined>;
      readonly inputs: valibot481.RecordSchema<valibot481.StringSchema<undefined>, valibot481.UnionSchema<[valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>, valibot481.ArraySchema<valibot481.UnionSchema<[GenericSchema<{
        GasCoin: true;
        $kind?: "GasCoin" | undefined;
      }, {
        GasCoin: true;
        $kind: "GasCoin";
      }>, GenericSchema<{
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind?: "Input" | undefined;
      }, {
        Input: number;
        type?: "object" | "pure" | "withdrawal" | undefined;
        $kind: "Input";
      }>, GenericSchema<{
        Result: number;
        $kind?: "Result" | undefined;
      }, {
        Result: number;
        $kind: "Result";
      }>, GenericSchema<{
        NestedResult: [number, number];
        $kind?: "NestedResult" | undefined;
      }, {
        NestedResult: [number, number];
        $kind: "NestedResult";
      }>], undefined>, undefined>], undefined>, undefined>;
      readonly data: valibot481.RecordSchema<valibot481.StringSchema<undefined>, valibot481.UnknownSchema, undefined>;
    }, undefined>;
  }>, undefined>;
}, undefined>;
type TransactionData = InferOutput<typeof TransactionDataSchema>;
//#endregion
export { Argument, ArgumentSchema, CallArg, Command, GasData, ObjectRef, Reservation, TransactionData, TransactionExpiration, WithdrawFrom, WithdrawalTypeArg };
//# sourceMappingURL=internal.d.mts.map