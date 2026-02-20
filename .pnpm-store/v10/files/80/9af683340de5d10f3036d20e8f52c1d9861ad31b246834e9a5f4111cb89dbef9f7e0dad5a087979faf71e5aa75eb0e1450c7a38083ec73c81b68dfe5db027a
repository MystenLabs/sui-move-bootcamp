import { BCSBytes, FundsWithdrawalArgSchema, JsonU64, ObjectID, ObjectRefSchema, SuiAddress, ValidDuringSchema } from "./internal.mjs";
import { array, boolean, integer, literal, nullable, nullish, number, object, optional, pipe, record, string, tuple, union, unknown } from "valibot";

//#region src/transactions/data/v2.ts
function enumUnion(options) {
	return union(Object.entries(options).map(([key, value]) => object({ [key]: value })));
}
const Argument = enumUnion({
	GasCoin: literal(true),
	Input: pipe(number(), integer()),
	Result: pipe(number(), integer()),
	NestedResult: tuple([pipe(number(), integer()), pipe(number(), integer())])
});
const GasData = object({
	budget: nullable(JsonU64),
	price: nullable(JsonU64),
	owner: nullable(SuiAddress),
	payment: nullable(array(ObjectRefSchema))
});
const ProgrammableMoveCall = object({
	package: ObjectID,
	module: string(),
	function: string(),
	typeArguments: array(string()),
	arguments: array(Argument)
});
const $Intent = object({
	name: string(),
	inputs: record(string(), union([Argument, array(Argument)])),
	data: record(string(), unknown())
});
const Command = enumUnion({
	MoveCall: ProgrammableMoveCall,
	TransferObjects: object({
		objects: array(Argument),
		address: Argument
	}),
	SplitCoins: object({
		coin: Argument,
		amounts: array(Argument)
	}),
	MergeCoins: object({
		destination: Argument,
		sources: array(Argument)
	}),
	Publish: object({
		modules: array(BCSBytes),
		dependencies: array(ObjectID)
	}),
	MakeMoveVec: object({
		type: nullable(string()),
		elements: array(Argument)
	}),
	Upgrade: object({
		modules: array(BCSBytes),
		dependencies: array(ObjectID),
		package: ObjectID,
		ticket: Argument
	}),
	$Intent
});
const CallArg = enumUnion({
	Object: enumUnion({
		ImmOrOwnedObject: ObjectRefSchema,
		SharedObject: object({
			objectId: ObjectID,
			initialSharedVersion: JsonU64,
			mutable: boolean()
		}),
		Receiving: ObjectRefSchema
	}),
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
const TransactionExpiration = enumUnion({
	None: literal(true),
	Epoch: JsonU64,
	ValidDuring: ValidDuringSchema
});
const SerializedTransactionDataV2Schema = object({
	version: literal(2),
	sender: nullish(SuiAddress),
	expiration: nullish(TransactionExpiration),
	gasData: GasData,
	inputs: array(CallArg),
	commands: array(Command),
	digest: optional(nullable(string()))
});

//#endregion
export { SerializedTransactionDataV2Schema };
//# sourceMappingURL=v2.mjs.map