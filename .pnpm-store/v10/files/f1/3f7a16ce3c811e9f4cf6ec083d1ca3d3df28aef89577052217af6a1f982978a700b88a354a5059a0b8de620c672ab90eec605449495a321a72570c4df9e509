import { ObjectSet } from "./object.mjs";
import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { Transaction } from "./transaction.mjs";
import { BalanceChange } from "./balance_change.mjs";
import { TransactionEffects } from "./effects.mjs";
import { TransactionEvents } from "./event.mjs";
import { UserSignature } from "./signature.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/executed_transaction.ts
var ExecutedTransaction$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ExecutedTransaction", [
			{
				no: 1,
				name: "digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "transaction",
				kind: "message",
				T: () => Transaction
			},
			{
				no: 3,
				name: "signatures",
				kind: "message",
				repeat: 1,
				T: () => UserSignature
			},
			{
				no: 4,
				name: "effects",
				kind: "message",
				T: () => TransactionEffects
			},
			{
				no: 5,
				name: "events",
				kind: "message",
				T: () => TransactionEvents
			},
			{
				no: 6,
				name: "checkpoint",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 7,
				name: "timestamp",
				kind: "message",
				T: () => Timestamp
			},
			{
				no: 8,
				name: "balance_changes",
				kind: "message",
				repeat: 1,
				T: () => BalanceChange
			},
			{
				no: 9,
				name: "objects",
				kind: "message",
				T: () => ObjectSet
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ExecutedTransaction
*/
const ExecutedTransaction = new ExecutedTransaction$Type();

//#endregion
export { ExecutedTransaction };
//# sourceMappingURL=executed_transaction.mjs.map