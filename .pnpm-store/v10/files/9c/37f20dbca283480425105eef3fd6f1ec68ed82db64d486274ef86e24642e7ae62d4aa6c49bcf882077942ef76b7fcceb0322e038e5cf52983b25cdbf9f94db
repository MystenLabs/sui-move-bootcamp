import { Owner } from "./owner.mjs";
import { Bcs } from "./bcs.mjs";
import { ObjectReference } from "./object_reference.mjs";
import { GasCostSummary } from "./gas_cost_summary.mjs";
import { ExecutionStatus } from "./execution_status.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/effects.ts
/**
* @generated from protobuf enum sui.rpc.v2.ChangedObject.InputObjectState
*/
let ChangedObject_InputObjectState = /* @__PURE__ */ function(ChangedObject_InputObjectState$1) {
	/**
	* @generated from protobuf enum value: INPUT_OBJECT_STATE_UNKNOWN = 0;
	*/
	ChangedObject_InputObjectState$1[ChangedObject_InputObjectState$1["UNKNOWN"] = 0] = "UNKNOWN";
	/**
	* @generated from protobuf enum value: INPUT_OBJECT_STATE_DOES_NOT_EXIST = 1;
	*/
	ChangedObject_InputObjectState$1[ChangedObject_InputObjectState$1["DOES_NOT_EXIST"] = 1] = "DOES_NOT_EXIST";
	/**
	* @generated from protobuf enum value: INPUT_OBJECT_STATE_EXISTS = 2;
	*/
	ChangedObject_InputObjectState$1[ChangedObject_InputObjectState$1["EXISTS"] = 2] = "EXISTS";
	return ChangedObject_InputObjectState$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.ChangedObject.OutputObjectState
*/
let ChangedObject_OutputObjectState = /* @__PURE__ */ function(ChangedObject_OutputObjectState$1) {
	/**
	* @generated from protobuf enum value: OUTPUT_OBJECT_STATE_UNKNOWN = 0;
	*/
	ChangedObject_OutputObjectState$1[ChangedObject_OutputObjectState$1["UNKNOWN"] = 0] = "UNKNOWN";
	/**
	* @generated from protobuf enum value: OUTPUT_OBJECT_STATE_DOES_NOT_EXIST = 1;
	*/
	ChangedObject_OutputObjectState$1[ChangedObject_OutputObjectState$1["DOES_NOT_EXIST"] = 1] = "DOES_NOT_EXIST";
	/**
	* @generated from protobuf enum value: OUTPUT_OBJECT_STATE_OBJECT_WRITE = 2;
	*/
	ChangedObject_OutputObjectState$1[ChangedObject_OutputObjectState$1["OBJECT_WRITE"] = 2] = "OBJECT_WRITE";
	/**
	* @generated from protobuf enum value: OUTPUT_OBJECT_STATE_PACKAGE_WRITE = 3;
	*/
	ChangedObject_OutputObjectState$1[ChangedObject_OutputObjectState$1["PACKAGE_WRITE"] = 3] = "PACKAGE_WRITE";
	/**
	* @generated from protobuf enum value: OUTPUT_OBJECT_STATE_ACCUMULATOR_WRITE = 4;
	*/
	ChangedObject_OutputObjectState$1[ChangedObject_OutputObjectState$1["ACCUMULATOR_WRITE"] = 4] = "ACCUMULATOR_WRITE";
	return ChangedObject_OutputObjectState$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.ChangedObject.IdOperation
*/
let ChangedObject_IdOperation = /* @__PURE__ */ function(ChangedObject_IdOperation$1) {
	/**
	* @generated from protobuf enum value: ID_OPERATION_UNKNOWN = 0;
	*/
	ChangedObject_IdOperation$1[ChangedObject_IdOperation$1["ID_OPERATION_UNKNOWN"] = 0] = "ID_OPERATION_UNKNOWN";
	/**
	* @generated from protobuf enum value: NONE = 1;
	*/
	ChangedObject_IdOperation$1[ChangedObject_IdOperation$1["NONE"] = 1] = "NONE";
	/**
	* @generated from protobuf enum value: CREATED = 2;
	*/
	ChangedObject_IdOperation$1[ChangedObject_IdOperation$1["CREATED"] = 2] = "CREATED";
	/**
	* @generated from protobuf enum value: DELETED = 3;
	*/
	ChangedObject_IdOperation$1[ChangedObject_IdOperation$1["DELETED"] = 3] = "DELETED";
	return ChangedObject_IdOperation$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.AccumulatorWrite.AccumulatorOperation
*/
let AccumulatorWrite_AccumulatorOperation = /* @__PURE__ */ function(AccumulatorWrite_AccumulatorOperation$1) {
	/**
	* @generated from protobuf enum value: ACCUMULATOR_OPERATION_UNKNOWN = 0;
	*/
	AccumulatorWrite_AccumulatorOperation$1[AccumulatorWrite_AccumulatorOperation$1["ACCUMULATOR_OPERATION_UNKNOWN"] = 0] = "ACCUMULATOR_OPERATION_UNKNOWN";
	/**
	* @generated from protobuf enum value: MERGE = 1;
	*/
	AccumulatorWrite_AccumulatorOperation$1[AccumulatorWrite_AccumulatorOperation$1["MERGE"] = 1] = "MERGE";
	/**
	* @generated from protobuf enum value: SPLIT = 2;
	*/
	AccumulatorWrite_AccumulatorOperation$1[AccumulatorWrite_AccumulatorOperation$1["SPLIT"] = 2] = "SPLIT";
	return AccumulatorWrite_AccumulatorOperation$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.UnchangedConsensusObject.UnchangedConsensusObjectKind
*/
let UnchangedConsensusObject_UnchangedConsensusObjectKind = /* @__PURE__ */ function(UnchangedConsensusObject_UnchangedConsensusObjectKind$1) {
	/**
	* @generated from protobuf enum value: UNCHANGED_CONSENSUS_OBJECT_KIND_UNKNOWN = 0;
	*/
	UnchangedConsensusObject_UnchangedConsensusObjectKind$1[UnchangedConsensusObject_UnchangedConsensusObjectKind$1["UNCHANGED_CONSENSUS_OBJECT_KIND_UNKNOWN"] = 0] = "UNCHANGED_CONSENSUS_OBJECT_KIND_UNKNOWN";
	/**
	* Read-only consensus object from the input.
	*
	* @generated from protobuf enum value: READ_ONLY_ROOT = 1;
	*/
	UnchangedConsensusObject_UnchangedConsensusObjectKind$1[UnchangedConsensusObject_UnchangedConsensusObjectKind$1["READ_ONLY_ROOT"] = 1] = "READ_ONLY_ROOT";
	/**
	* Objects with ended consensus streams that appear mutably/owned in the input.
	*
	* @generated from protobuf enum value: MUTATE_CONSENSUS_STREAM_ENDED = 2;
	*/
	UnchangedConsensusObject_UnchangedConsensusObjectKind$1[UnchangedConsensusObject_UnchangedConsensusObjectKind$1["MUTATE_CONSENSUS_STREAM_ENDED"] = 2] = "MUTATE_CONSENSUS_STREAM_ENDED";
	/**
	* Objects with ended consensus streams objects that appear as read-only in the input.
	*
	* @generated from protobuf enum value: READ_CONSENSUS_STREAM_ENDED = 3;
	*/
	UnchangedConsensusObject_UnchangedConsensusObjectKind$1[UnchangedConsensusObject_UnchangedConsensusObjectKind$1["READ_CONSENSUS_STREAM_ENDED"] = 3] = "READ_CONSENSUS_STREAM_ENDED";
	/**
	* Consensus objects that were congested and resulted in this transaction being
	* canceled.
	*
	* @generated from protobuf enum value: CANCELED = 4;
	*/
	UnchangedConsensusObject_UnchangedConsensusObjectKind$1[UnchangedConsensusObject_UnchangedConsensusObjectKind$1["CANCELED"] = 4] = "CANCELED";
	/**
	* Read of a per-epoch config object that should remain the same during an
	* epoch. This optionally will indicate the sequence number of the config
	* object at the start of the epoch.
	*
	* @generated from protobuf enum value: PER_EPOCH_CONFIG = 5;
	*/
	UnchangedConsensusObject_UnchangedConsensusObjectKind$1[UnchangedConsensusObject_UnchangedConsensusObjectKind$1["PER_EPOCH_CONFIG"] = 5] = "PER_EPOCH_CONFIG";
	return UnchangedConsensusObject_UnchangedConsensusObjectKind$1;
}({});
var TransactionEffects$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.TransactionEffects", [
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
				name: "version",
				kind: "scalar",
				opt: true,
				T: 5
			},
			{
				no: 4,
				name: "status",
				kind: "message",
				T: () => ExecutionStatus
			},
			{
				no: 5,
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 6,
				name: "gas_used",
				kind: "message",
				T: () => GasCostSummary
			},
			{
				no: 7,
				name: "transaction_digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 8,
				name: "gas_object",
				kind: "message",
				T: () => ChangedObject
			},
			{
				no: 9,
				name: "events_digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 10,
				name: "dependencies",
				kind: "scalar",
				repeat: 2,
				T: 9
			},
			{
				no: 11,
				name: "lamport_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 12,
				name: "changed_objects",
				kind: "message",
				repeat: 1,
				T: () => ChangedObject
			},
			{
				no: 13,
				name: "unchanged_consensus_objects",
				kind: "message",
				repeat: 1,
				T: () => UnchangedConsensusObject
			},
			{
				no: 14,
				name: "auxiliary_data_digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 15,
				name: "unchanged_loaded_runtime_objects",
				kind: "message",
				repeat: 1,
				T: () => ObjectReference
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.TransactionEffects
*/
const TransactionEffects = new TransactionEffects$Type();
var ChangedObject$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ChangedObject", [
			{
				no: 1,
				name: "object_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "input_state",
				kind: "enum",
				opt: true,
				T: () => [
					"sui.rpc.v2.ChangedObject.InputObjectState",
					ChangedObject_InputObjectState,
					"INPUT_OBJECT_STATE_"
				]
			},
			{
				no: 3,
				name: "input_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "input_digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "input_owner",
				kind: "message",
				T: () => Owner
			},
			{
				no: 6,
				name: "output_state",
				kind: "enum",
				opt: true,
				T: () => [
					"sui.rpc.v2.ChangedObject.OutputObjectState",
					ChangedObject_OutputObjectState,
					"OUTPUT_OBJECT_STATE_"
				]
			},
			{
				no: 7,
				name: "output_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 8,
				name: "output_digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 9,
				name: "output_owner",
				kind: "message",
				T: () => Owner
			},
			{
				no: 12,
				name: "accumulator_write",
				kind: "message",
				T: () => AccumulatorWrite
			},
			{
				no: 10,
				name: "id_operation",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.ChangedObject.IdOperation", ChangedObject_IdOperation]
			},
			{
				no: 11,
				name: "object_type",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ChangedObject
*/
const ChangedObject = new ChangedObject$Type();
var AccumulatorWrite$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.AccumulatorWrite", [
			{
				no: 1,
				name: "address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "accumulator_type",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "operation",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.AccumulatorWrite.AccumulatorOperation", AccumulatorWrite_AccumulatorOperation]
			},
			{
				no: 5,
				name: "value",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.AccumulatorWrite
*/
const AccumulatorWrite = new AccumulatorWrite$Type();
var UnchangedConsensusObject$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.UnchangedConsensusObject", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.UnchangedConsensusObject.UnchangedConsensusObjectKind", UnchangedConsensusObject_UnchangedConsensusObjectKind]
			},
			{
				no: 2,
				name: "object_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "object_type",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.UnchangedConsensusObject
*/
const UnchangedConsensusObject = new UnchangedConsensusObject$Type();

//#endregion
export { AccumulatorWrite, AccumulatorWrite_AccumulatorOperation, ChangedObject, ChangedObject_IdOperation, ChangedObject_InputObjectState, ChangedObject_OutputObjectState, TransactionEffects, UnchangedConsensusObject, UnchangedConsensusObject_UnchangedConsensusObjectKind };
//# sourceMappingURL=effects.mjs.map