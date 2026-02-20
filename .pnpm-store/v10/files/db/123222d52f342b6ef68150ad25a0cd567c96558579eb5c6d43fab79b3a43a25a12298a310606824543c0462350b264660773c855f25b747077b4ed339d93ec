import { ObjectSet } from "./object.mjs";
import { ValidatorAggregatedSignature } from "./signature.mjs";
import { ExecutedTransaction } from "./executed_transaction.mjs";
import { CheckpointContents } from "./checkpoint_contents.mjs";
import { CheckpointSummary } from "./checkpoint_summary.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/checkpoint.ts
var Checkpoint$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Checkpoint", [
			{
				no: 1,
				name: "sequence_number",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "summary",
				kind: "message",
				T: () => CheckpointSummary
			},
			{
				no: 4,
				name: "signature",
				kind: "message",
				T: () => ValidatorAggregatedSignature
			},
			{
				no: 5,
				name: "contents",
				kind: "message",
				T: () => CheckpointContents
			},
			{
				no: 6,
				name: "transactions",
				kind: "message",
				repeat: 1,
				T: () => ExecutedTransaction
			},
			{
				no: 7,
				name: "objects",
				kind: "message",
				T: () => ObjectSet
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Checkpoint
*/
const Checkpoint = new Checkpoint$Type();

//#endregion
export { Checkpoint };
//# sourceMappingURL=checkpoint.mjs.map