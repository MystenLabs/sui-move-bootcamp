import { Bcs } from "./bcs.mjs";
import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { GasCostSummary } from "./gas_cost_summary.mjs";
import { ValidatorCommitteeMember } from "./signature.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/checkpoint_summary.ts
/**
* @generated from protobuf enum sui.rpc.v2.CheckpointCommitment.CheckpointCommitmentKind
*/
let CheckpointCommitment_CheckpointCommitmentKind = /* @__PURE__ */ function(CheckpointCommitment_CheckpointCommitmentKind$1) {
	/**
	* @generated from protobuf enum value: CHECKPOINT_COMMITMENT_KIND_UNKNOWN = 0;
	*/
	CheckpointCommitment_CheckpointCommitmentKind$1[CheckpointCommitment_CheckpointCommitmentKind$1["CHECKPOINT_COMMITMENT_KIND_UNKNOWN"] = 0] = "CHECKPOINT_COMMITMENT_KIND_UNKNOWN";
	/**
	* An elliptic curve multiset hash attesting to the set of objects that
	* comprise the live state of the Sui blockchain.
	*
	* @generated from protobuf enum value: ECMH_LIVE_OBJECT_SET = 1;
	*/
	CheckpointCommitment_CheckpointCommitmentKind$1[CheckpointCommitment_CheckpointCommitmentKind$1["ECMH_LIVE_OBJECT_SET"] = 1] = "ECMH_LIVE_OBJECT_SET";
	/**
	* Digest of the checkpoint artifacts.
	*
	* @generated from protobuf enum value: CHECKPOINT_ARTIFACTS = 2;
	*/
	CheckpointCommitment_CheckpointCommitmentKind$1[CheckpointCommitment_CheckpointCommitmentKind$1["CHECKPOINT_ARTIFACTS"] = 2] = "CHECKPOINT_ARTIFACTS";
	return CheckpointCommitment_CheckpointCommitmentKind$1;
}({});
var CheckpointSummary$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CheckpointSummary", [
			{
				no: 1,
				name: "bcs",
				kind: "message",
				T: () => Bcs
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
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "sequence_number",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "total_network_transactions",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 6,
				name: "content_digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 7,
				name: "previous_digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 8,
				name: "epoch_rolling_gas_cost_summary",
				kind: "message",
				T: () => GasCostSummary
			},
			{
				no: 9,
				name: "timestamp",
				kind: "message",
				T: () => Timestamp
			},
			{
				no: 10,
				name: "commitments",
				kind: "message",
				repeat: 1,
				T: () => CheckpointCommitment
			},
			{
				no: 11,
				name: "end_of_epoch_data",
				kind: "message",
				T: () => EndOfEpochData
			},
			{
				no: 12,
				name: "version_specific_data",
				kind: "scalar",
				opt: true,
				T: 12
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CheckpointSummary
*/
const CheckpointSummary = new CheckpointSummary$Type();
var EndOfEpochData$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.EndOfEpochData", [
			{
				no: 1,
				name: "next_epoch_committee",
				kind: "message",
				repeat: 1,
				T: () => ValidatorCommitteeMember
			},
			{
				no: 2,
				name: "next_epoch_protocol_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "epoch_commitments",
				kind: "message",
				repeat: 1,
				T: () => CheckpointCommitment
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.EndOfEpochData
*/
const EndOfEpochData = new EndOfEpochData$Type();
var CheckpointCommitment$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CheckpointCommitment", [{
			no: 1,
			name: "kind",
			kind: "enum",
			opt: true,
			T: () => ["sui.rpc.v2.CheckpointCommitment.CheckpointCommitmentKind", CheckpointCommitment_CheckpointCommitmentKind]
		}, {
			no: 2,
			name: "digest",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CheckpointCommitment
*/
const CheckpointCommitment = new CheckpointCommitment$Type();

//#endregion
export { CheckpointCommitment, CheckpointCommitment_CheckpointCommitmentKind, CheckpointSummary, EndOfEpochData };
//# sourceMappingURL=checkpoint_summary.mjs.map