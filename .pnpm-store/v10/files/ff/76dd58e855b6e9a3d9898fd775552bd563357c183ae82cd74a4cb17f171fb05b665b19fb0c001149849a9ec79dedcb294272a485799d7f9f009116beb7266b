import { Value } from "../../../google/protobuf/struct.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/input.ts
/**
* @generated from protobuf enum sui.rpc.v2.Input.InputKind
*/
let Input_InputKind = /* @__PURE__ */ function(Input_InputKind$1) {
	/**
	* @generated from protobuf enum value: INPUT_KIND_UNKNOWN = 0;
	*/
	Input_InputKind$1[Input_InputKind$1["INPUT_KIND_UNKNOWN"] = 0] = "INPUT_KIND_UNKNOWN";
	/**
	* A move value serialized as BCS.
	*
	* @generated from protobuf enum value: PURE = 1;
	*/
	Input_InputKind$1[Input_InputKind$1["PURE"] = 1] = "PURE";
	/**
	* A Move object that is either immutable or address owned.
	*
	* @generated from protobuf enum value: IMMUTABLE_OR_OWNED = 2;
	*/
	Input_InputKind$1[Input_InputKind$1["IMMUTABLE_OR_OWNED"] = 2] = "IMMUTABLE_OR_OWNED";
	/**
	* A Move object whose owner is "Shared".
	*
	* @generated from protobuf enum value: SHARED = 3;
	*/
	Input_InputKind$1[Input_InputKind$1["SHARED"] = 3] = "SHARED";
	/**
	* A Move object that is attempted to be received in this transaction.
	*
	* @generated from protobuf enum value: RECEIVING = 4;
	*/
	Input_InputKind$1[Input_InputKind$1["RECEIVING"] = 4] = "RECEIVING";
	/**
	* Reservation to withdraw balance from a funds accumulator
	*
	* @generated from protobuf enum value: FUNDS_WITHDRAWAL = 5;
	*/
	Input_InputKind$1[Input_InputKind$1["FUNDS_WITHDRAWAL"] = 5] = "FUNDS_WITHDRAWAL";
	return Input_InputKind$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.Input.Mutability
*/
let Input_Mutability = /* @__PURE__ */ function(Input_Mutability$1) {
	/**
	* @generated from protobuf enum value: MUTABILITY_UNKNOWN = 0;
	*/
	Input_Mutability$1[Input_Mutability$1["MUTABILITY_UNKNOWN"] = 0] = "MUTABILITY_UNKNOWN";
	/**
	* @generated from protobuf enum value: IMMUTABLE = 1;
	*/
	Input_Mutability$1[Input_Mutability$1["IMMUTABLE"] = 1] = "IMMUTABLE";
	/**
	* @generated from protobuf enum value: MUTABLE = 2;
	*/
	Input_Mutability$1[Input_Mutability$1["MUTABLE"] = 2] = "MUTABLE";
	/**
	* Non-exclusive write is used to allow multiple transactions to
	* simultaneously add disjoint dynamic fields to an object.
	* (Currently only used by settlement transactions).
	*
	* @generated from protobuf enum value: NON_EXCLUSIVE_WRITE = 3;
	*/
	Input_Mutability$1[Input_Mutability$1["NON_EXCLUSIVE_WRITE"] = 3] = "NON_EXCLUSIVE_WRITE";
	return Input_Mutability$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.FundsWithdrawal.Source
*/
let FundsWithdrawal_Source = /* @__PURE__ */ function(FundsWithdrawal_Source$1) {
	/**
	* @generated from protobuf enum value: SOURCE_UNKNOWN = 0;
	*/
	FundsWithdrawal_Source$1[FundsWithdrawal_Source$1["SOURCE_UNKNOWN"] = 0] = "SOURCE_UNKNOWN";
	/**
	* @generated from protobuf enum value: SENDER = 1;
	*/
	FundsWithdrawal_Source$1[FundsWithdrawal_Source$1["SENDER"] = 1] = "SENDER";
	/**
	* @generated from protobuf enum value: SPONSOR = 2;
	*/
	FundsWithdrawal_Source$1[FundsWithdrawal_Source$1["SPONSOR"] = 2] = "SPONSOR";
	return FundsWithdrawal_Source$1;
}({});
var Input$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Input", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.Input.InputKind", Input_InputKind]
			},
			{
				no: 2,
				name: "pure",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 3,
				name: "object_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 6,
				name: "mutable",
				kind: "scalar",
				opt: true,
				T: 8
			},
			{
				no: 7,
				name: "mutability",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.Input.Mutability", Input_Mutability]
			},
			{
				no: 8,
				name: "funds_withdrawal",
				kind: "message",
				T: () => FundsWithdrawal
			},
			{
				no: 1e3,
				name: "literal",
				kind: "message",
				T: () => Value
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Input
*/
const Input = new Input$Type();
var FundsWithdrawal$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.FundsWithdrawal", [
			{
				no: 1,
				name: "amount",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "coin_type",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "source",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.FundsWithdrawal.Source", FundsWithdrawal_Source]
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.FundsWithdrawal
*/
const FundsWithdrawal = new FundsWithdrawal$Type();

//#endregion
export { FundsWithdrawal, FundsWithdrawal_Source, Input, Input_InputKind, Input_Mutability };
//# sourceMappingURL=input.mjs.map