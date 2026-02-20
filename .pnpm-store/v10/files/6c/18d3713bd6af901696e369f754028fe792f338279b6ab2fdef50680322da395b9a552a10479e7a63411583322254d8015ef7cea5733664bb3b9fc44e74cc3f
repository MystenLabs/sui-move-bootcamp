import { Bcs } from "./bcs.mjs";
import { Owner } from "./owner.mjs";
import { ObjectReference } from "./object_reference.mjs";
import { GasCostSummary } from "./gas_cost_summary.mjs";
import { ExecutionStatus } from "./execution_status.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/effects.d.ts

/**
 * The effects of executing a transaction.
 *
 * @generated from protobuf message sui.rpc.v2.TransactionEffects
 */
interface TransactionEffects {
  /**
   * This TransactionEffects serialized as BCS.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs bcs = 1;
   */
  bcs?: Bcs;
  /**
   * The digest of this TransactionEffects.
   *
   * @generated from protobuf field: optional string digest = 2;
   */
  digest?: string;
  /**
   * Version of this TransactionEffects.
   *
   * @generated from protobuf field: optional int32 version = 3;
   */
  version?: number;
  /**
   * The status of the execution.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ExecutionStatus status = 4;
   */
  status?: ExecutionStatus;
  /**
   * The epoch when this transaction was executed.
   *
   * @generated from protobuf field: optional uint64 epoch = 5;
   */
  epoch?: bigint;
  /**
   * The gas used by this transaction.
   *
   * @generated from protobuf field: optional sui.rpc.v2.GasCostSummary gas_used = 6;
   */
  gasUsed?: GasCostSummary;
  /**
   * The transaction digest.
   *
   * @generated from protobuf field: optional string transaction_digest = 7;
   */
  transactionDigest?: string;
  /**
   * Information about the gas object. Also present in the `changed_objects` vector.
   *
   * System transactions that don't require gas will leave this as `None`.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ChangedObject gas_object = 8;
   */
  gasObject?: ChangedObject;
  /**
   * The digest of the events emitted during execution,
   * can be `None` if the transaction does not emit any event.
   *
   * @generated from protobuf field: optional string events_digest = 9;
   */
  eventsDigest?: string;
  /**
   * The set of transaction digests this transaction depends on.
   *
   * @generated from protobuf field: repeated string dependencies = 10;
   */
  dependencies: string[];
  /**
   * The version number of all the written objects (excluding packages) by this transaction.
   *
   * @generated from protobuf field: optional uint64 lamport_version = 11;
   */
  lamportVersion?: bigint;
  /**
   * Objects whose state are changed by this transaction.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.ChangedObject changed_objects = 12;
   */
  changedObjects: ChangedObject[];
  /**
   * Consensus objects that are not mutated in this transaction. Unlike owned objects,
   * read-only consensus objects' version are not committed in the transaction,
   * and in order for a node to catch up and execute it without consensus sequencing,
   * the version needs to be committed in the effects.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.UnchangedConsensusObject unchanged_consensus_objects = 13;
   */
  unchangedConsensusObjects: UnchangedConsensusObject[];
  /**
   * Auxiliary data that are not protocol-critical, generated as part of the effects but are stored separately.
   * Storing it separately allows us to avoid bloating the effects with data that are not critical.
   * It also provides more flexibility on the format and type of the data.
   *
   * @generated from protobuf field: optional string auxiliary_data_digest = 14;
   */
  auxiliaryDataDigest?: string;
  /**
   * @generated from protobuf field: repeated sui.rpc.v2.ObjectReference unchanged_loaded_runtime_objects = 15;
   */
  unchangedLoadedRuntimeObjects: ObjectReference[];
}
/**
 * Input/output state of an object that was changed during execution.
 *
 * @generated from protobuf message sui.rpc.v2.ChangedObject
 */
interface ChangedObject {
  /**
   * ID of the object.
   *
   * @generated from protobuf field: optional string object_id = 1;
   */
  objectId?: string;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.ChangedObject.InputObjectState input_state = 2;
   */
  inputState?: ChangedObject_InputObjectState;
  /**
   * Version of the object before this transaction executed.
   *
   * @generated from protobuf field: optional uint64 input_version = 3;
   */
  inputVersion?: bigint;
  /**
   * Digest of the object before this transaction executed.
   *
   * @generated from protobuf field: optional string input_digest = 4;
   */
  inputDigest?: string;
  /**
   * Owner of the object before this transaction executed.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Owner input_owner = 5;
   */
  inputOwner?: Owner;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.ChangedObject.OutputObjectState output_state = 6;
   */
  outputState?: ChangedObject_OutputObjectState;
  /**
   * Version of the object after this transaction executed.
   *
   * @generated from protobuf field: optional uint64 output_version = 7;
   */
  outputVersion?: bigint;
  /**
   * Digest of the object after this transaction executed.
   *
   * @generated from protobuf field: optional string output_digest = 8;
   */
  outputDigest?: string;
  /**
   * Owner of the object after this transaction executed.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Owner output_owner = 9;
   */
  outputOwner?: Owner;
  /**
   * The contents of the accumulator write when `output_state` is `OUTPUT_OBJECT_STATE_ACCUMULATOR_WRITE`
   *
   * @generated from protobuf field: optional sui.rpc.v2.AccumulatorWrite accumulator_write = 12;
   */
  accumulatorWrite?: AccumulatorWrite;
  /**
   * What happened to an `ObjectId` during execution.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ChangedObject.IdOperation id_operation = 10;
   */
  idOperation?: ChangedObject_IdOperation;
  /**
   * Type information is not provided by the effects structure but is instead
   * provided by an indexing layer
   *
   * @generated from protobuf field: optional string object_type = 11;
   */
  objectType?: string;
}
/**
 * @generated from protobuf enum sui.rpc.v2.ChangedObject.InputObjectState
 */
declare enum ChangedObject_InputObjectState {
  /**
   * @generated from protobuf enum value: INPUT_OBJECT_STATE_UNKNOWN = 0;
   */
  UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: INPUT_OBJECT_STATE_DOES_NOT_EXIST = 1;
   */
  DOES_NOT_EXIST = 1,
  /**
   * @generated from protobuf enum value: INPUT_OBJECT_STATE_EXISTS = 2;
   */
  EXISTS = 2,
}
/**
 * @generated from protobuf enum sui.rpc.v2.ChangedObject.OutputObjectState
 */
declare enum ChangedObject_OutputObjectState {
  /**
   * @generated from protobuf enum value: OUTPUT_OBJECT_STATE_UNKNOWN = 0;
   */
  UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: OUTPUT_OBJECT_STATE_DOES_NOT_EXIST = 1;
   */
  DOES_NOT_EXIST = 1,
  /**
   * @generated from protobuf enum value: OUTPUT_OBJECT_STATE_OBJECT_WRITE = 2;
   */
  OBJECT_WRITE = 2,
  /**
   * @generated from protobuf enum value: OUTPUT_OBJECT_STATE_PACKAGE_WRITE = 3;
   */
  PACKAGE_WRITE = 3,
  /**
   * @generated from protobuf enum value: OUTPUT_OBJECT_STATE_ACCUMULATOR_WRITE = 4;
   */
  ACCUMULATOR_WRITE = 4,
}
/**
 * @generated from protobuf enum sui.rpc.v2.ChangedObject.IdOperation
 */
declare enum ChangedObject_IdOperation {
  /**
   * @generated from protobuf enum value: ID_OPERATION_UNKNOWN = 0;
   */
  ID_OPERATION_UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: NONE = 1;
   */
  NONE = 1,
  /**
   * @generated from protobuf enum value: CREATED = 2;
   */
  CREATED = 2,
  /**
   * @generated from protobuf enum value: DELETED = 3;
   */
  DELETED = 3,
}
/**
 * @generated from protobuf message sui.rpc.v2.AccumulatorWrite
 */
interface AccumulatorWrite {
  /**
   * @generated from protobuf field: optional string address = 1;
   */
  address?: string;
  /**
   * @generated from protobuf field: optional string accumulator_type = 2;
   */
  accumulatorType?: string;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.AccumulatorWrite.AccumulatorOperation operation = 3;
   */
  operation?: AccumulatorWrite_AccumulatorOperation;
  /**
   * @generated from protobuf field: optional uint64 value = 5;
   */
  value?: bigint;
}
/**
 * @generated from protobuf enum sui.rpc.v2.AccumulatorWrite.AccumulatorOperation
 */
declare enum AccumulatorWrite_AccumulatorOperation {
  /**
   * @generated from protobuf enum value: ACCUMULATOR_OPERATION_UNKNOWN = 0;
   */
  ACCUMULATOR_OPERATION_UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: MERGE = 1;
   */
  MERGE = 1,
  /**
   * @generated from protobuf enum value: SPLIT = 2;
   */
  SPLIT = 2,
}
/**
 * A consensus object that wasn't changed during execution.
 *
 * @generated from protobuf message sui.rpc.v2.UnchangedConsensusObject
 */
interface UnchangedConsensusObject {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.UnchangedConsensusObject.UnchangedConsensusObjectKind kind = 1;
   */
  kind?: UnchangedConsensusObject_UnchangedConsensusObjectKind;
  /**
   * ObjectId of the consensus object.
   *
   * @generated from protobuf field: optional string object_id = 2;
   */
  objectId?: string;
  /**
   * Version of the consensus object.
   *
   * @generated from protobuf field: optional uint64 version = 3;
   */
  version?: bigint;
  /**
   * Digest of the consensus object.
   *
   * @generated from protobuf field: optional string digest = 4;
   */
  digest?: string;
  /**
   * Type information is not provided by the effects structure but is instead
   * provided by an indexing layer
   *
   * @generated from protobuf field: optional string object_type = 5;
   */
  objectType?: string;
}
/**
 * @generated from protobuf enum sui.rpc.v2.UnchangedConsensusObject.UnchangedConsensusObjectKind
 */
declare enum UnchangedConsensusObject_UnchangedConsensusObjectKind {
  /**
   * @generated from protobuf enum value: UNCHANGED_CONSENSUS_OBJECT_KIND_UNKNOWN = 0;
   */
  UNCHANGED_CONSENSUS_OBJECT_KIND_UNKNOWN = 0,
  /**
   * Read-only consensus object from the input.
   *
   * @generated from protobuf enum value: READ_ONLY_ROOT = 1;
   */
  READ_ONLY_ROOT = 1,
  /**
   * Objects with ended consensus streams that appear mutably/owned in the input.
   *
   * @generated from protobuf enum value: MUTATE_CONSENSUS_STREAM_ENDED = 2;
   */
  MUTATE_CONSENSUS_STREAM_ENDED = 2,
  /**
   * Objects with ended consensus streams objects that appear as read-only in the input.
   *
   * @generated from protobuf enum value: READ_CONSENSUS_STREAM_ENDED = 3;
   */
  READ_CONSENSUS_STREAM_ENDED = 3,
  /**
   * Consensus objects that were congested and resulted in this transaction being
   * canceled.
   *
   * @generated from protobuf enum value: CANCELED = 4;
   */
  CANCELED = 4,
  /**
   * Read of a per-epoch config object that should remain the same during an
   * epoch. This optionally will indicate the sequence number of the config
   * object at the start of the epoch.
   *
   * @generated from protobuf enum value: PER_EPOCH_CONFIG = 5;
   */
  PER_EPOCH_CONFIG = 5,
}
declare class TransactionEffects$Type extends MessageType<TransactionEffects> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.TransactionEffects
 */
declare const TransactionEffects: TransactionEffects$Type;
declare class ChangedObject$Type extends MessageType<ChangedObject> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ChangedObject
 */
declare const ChangedObject: ChangedObject$Type;
declare class AccumulatorWrite$Type extends MessageType<AccumulatorWrite> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.AccumulatorWrite
 */
declare const AccumulatorWrite: AccumulatorWrite$Type;
declare class UnchangedConsensusObject$Type extends MessageType<UnchangedConsensusObject> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.UnchangedConsensusObject
 */
declare const UnchangedConsensusObject: UnchangedConsensusObject$Type;
//#endregion
export { AccumulatorWrite, AccumulatorWrite_AccumulatorOperation, ChangedObject, ChangedObject_IdOperation, ChangedObject_InputObjectState, ChangedObject_OutputObjectState, TransactionEffects, UnchangedConsensusObject, UnchangedConsensusObject_UnchangedConsensusObjectKind };
//# sourceMappingURL=effects.d.mts.map