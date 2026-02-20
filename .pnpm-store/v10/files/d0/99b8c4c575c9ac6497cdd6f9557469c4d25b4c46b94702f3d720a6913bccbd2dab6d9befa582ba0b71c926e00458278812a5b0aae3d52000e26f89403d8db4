import { isValidSuiAddress, normalizeSuiAddress } from "../../utils/sui-types.mjs";
import { array, boolean, check, integer, lazy, literal, nullable, nullish, number, object, optional, pipe, record, string, transform, tuple, union, unknown } from "valibot";

//#region src/transactions/data/internal.ts
function safeEnum(options) {
	return union(Object.keys(options).map((key) => withKind(key, object({ [key]: options[key] }))));
}
function withKind(key, schema) {
	return pipe(object({
		...schema.entries,
		$kind: optional(literal(key))
	}), transform((value) => ({
		...value,
		$kind: key
	})));
}
const SuiAddress = pipe(string(), transform((value) => normalizeSuiAddress(value)), check(isValidSuiAddress));
const ObjectID = SuiAddress;
const BCSBytes = string();
const JsonU64 = pipe(union([string(), pipe(number(), integer())]), check((val) => {
	try {
		BigInt(val);
		return BigInt(val) >= 0 && BigInt(val) <= 18446744073709551615n;
	} catch {
		return false;
	}
}, "Invalid u64"));
const U32 = pipe(number(), integer(), check((val) => val >= 0 && val < 2 ** 32, "Invalid u32"));
const ObjectRefSchema = object({
	objectId: SuiAddress,
	version: JsonU64,
	digest: string()
});
const ArgumentSchema = union([
	withKind("GasCoin", object({ GasCoin: literal(true) })),
	withKind("Input", object({
		Input: pipe(number(), integer()),
		type: optional(union([
			literal("pure"),
			literal("object"),
			literal("withdrawal")
		]))
	})),
	withKind("Result", object({ Result: pipe(number(), integer()) })),
	withKind("NestedResult", object({ NestedResult: tuple([pipe(number(), integer()), pipe(number(), integer())]) }))
]);
const GasDataSchema = object({
	budget: nullable(JsonU64),
	price: nullable(JsonU64),
	owner: nullable(SuiAddress),
	payment: nullable(array(ObjectRefSchema))
});
const StructTagSchema = object({
	address: string(),
	module: string(),
	name: string(),
	typeParams: array(string())
});
const OpenSignatureBodySchema = union([
	object({ $kind: literal("address") }),
	object({ $kind: literal("bool") }),
	object({ $kind: literal("u8") }),
	object({ $kind: literal("u16") }),
	object({ $kind: literal("u32") }),
	object({ $kind: literal("u64") }),
	object({ $kind: literal("u128") }),
	object({ $kind: literal("u256") }),
	object({ $kind: literal("unknown") }),
	object({
		$kind: literal("vector"),
		vector: lazy(() => OpenSignatureBodySchema)
	}),
	object({
		$kind: literal("datatype"),
		datatype: object({
			typeName: string(),
			typeParameters: array(lazy(() => OpenSignatureBodySchema))
		})
	}),
	object({
		$kind: literal("typeParameter"),
		index: pipe(number(), integer())
	})
]);
const OpenSignatureSchema = object({
	reference: nullable(union([
		literal("mutable"),
		literal("immutable"),
		literal("unknown")
	])),
	body: OpenSignatureBodySchema
});
const ProgrammableMoveCallSchema = object({
	package: ObjectID,
	module: string(),
	function: string(),
	typeArguments: array(string()),
	arguments: array(ArgumentSchema),
	_argumentTypes: optional(nullable(array(OpenSignatureSchema)))
});
const $Intent = object({
	name: string(),
	inputs: record(string(), union([ArgumentSchema, array(ArgumentSchema)])),
	data: record(string(), unknown())
});
const CommandSchema = safeEnum({
	MoveCall: ProgrammableMoveCallSchema,
	TransferObjects: object({
		objects: array(ArgumentSchema),
		address: ArgumentSchema
	}),
	SplitCoins: object({
		coin: ArgumentSchema,
		amounts: array(ArgumentSchema)
	}),
	MergeCoins: object({
		destination: ArgumentSchema,
		sources: array(ArgumentSchema)
	}),
	Publish: object({
		modules: array(BCSBytes),
		dependencies: array(ObjectID)
	}),
	MakeMoveVec: object({
		type: nullable(string()),
		elements: array(ArgumentSchema)
	}),
	Upgrade: object({
		modules: array(BCSBytes),
		dependencies: array(ObjectID),
		package: ObjectID,
		ticket: ArgumentSchema
	}),
	$Intent
});
const ObjectArgSchema = safeEnum({
	ImmOrOwnedObject: ObjectRefSchema,
	SharedObject: object({
		objectId: ObjectID,
		initialSharedVersion: JsonU64,
		mutable: boolean()
	}),
	Receiving: ObjectRefSchema
});
const ReservationSchema = safeEnum({ MaxAmountU64: JsonU64 });
const WithdrawalTypeArgSchema = safeEnum({ Balance: string() });
const WithdrawFromSchema = safeEnum({
	Sender: literal(true),
	Sponsor: literal(true)
});
const FundsWithdrawalArgSchema = object({
	reservation: ReservationSchema,
	typeArg: WithdrawalTypeArgSchema,
	withdrawFrom: WithdrawFromSchema
});
const CallArgSchema = safeEnum({
	Object: ObjectArgSchema,
	Pure: object({ bytes: BCSBytes }),
	UnresolvedPure: object({ value: unknown() }),
	UnresolvedObject: object({
		objectId: ObjectID,
		version: optional(nullable(JsonU64)),
		digest: optional(nullable(string())),
		initialSharedVersion: optional(nullable(JsonU64)),
		mutable: optional(nullable(boolean()))
	}),
	FundsWithdrawal: FundsWithdrawalArgSchema
});
const NormalizedCallArg = safeEnum({
	Object: ObjectArgSchema,
	Pure: object({ bytes: BCSBytes })
});
const ValidDuringSchema = object({
	minEpoch: nullable(JsonU64),
	maxEpoch: nullable(JsonU64),
	minTimestamp: nullable(JsonU64),
	maxTimestamp: nullable(JsonU64),
	chain: string(),
	nonce: U32
});
const TransactionExpiration = safeEnum({
	None: literal(true),
	Epoch: JsonU64,
	ValidDuring: ValidDuringSchema
});
const TransactionDataSchema = object({
	version: literal(2),
	sender: nullish(SuiAddress),
	expiration: nullish(TransactionExpiration),
	gasData: GasDataSchema,
	inputs: array(CallArgSchema),
	commands: array(CommandSchema)
});

//#endregion
export { ArgumentSchema, BCSBytes, FundsWithdrawalArgSchema, JsonU64, NormalizedCallArg, ObjectID, ObjectRefSchema, SuiAddress, TransactionDataSchema, TransactionExpiration, ValidDuringSchema, safeEnum };
//# sourceMappingURL=internal.mjs.map