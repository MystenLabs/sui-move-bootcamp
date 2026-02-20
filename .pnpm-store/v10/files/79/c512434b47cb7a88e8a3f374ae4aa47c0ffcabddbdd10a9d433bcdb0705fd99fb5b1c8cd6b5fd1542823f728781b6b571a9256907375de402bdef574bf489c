import { Bcs } from "./bcs.mjs";
import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { GasCostSummary } from "./gas_cost_summary.mjs";
import { ValidatorCommitteeMember } from "./signature.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/checkpoint_summary.d.ts

/**
 * A header for a checkpoint on the Sui blockchain.
 *
 * On the Sui network, checkpoints define the history of the blockchain. They are quite similar to
 * the concept of blocks used by other blockchains like Bitcoin or Ethereum. The Sui blockchain,
 * however, forms checkpoints after transaction execution has already happened to provide a
 * certified history of the chain, instead of being formed before execution.
 *
 * Checkpoints commit to a variety of state, including but not limited to:
 * - The hash of the previous checkpoint.
 * - The set of transaction digests, their corresponding effects digests, as well as the set of
 *   user signatures that authorized its execution.
 * - The objects produced by a transaction.
 * - The set of live objects that make up the current state of the chain.
 * - On epoch transitions, the next validator committee.
 *
 * `CheckpointSummary`s themselves don't directly include all of the previous information but they
 * are the top-level type by which all the information is committed to transitively via cryptographic
 * hashes included in the summary. `CheckpointSummary`s are signed and certified by a quorum of
 * the validator committee in a given epoch to allow verification of the chain's state.
 *
 * @generated from protobuf message sui.rpc.v2.CheckpointSummary
 */
interface CheckpointSummary {
  /**
   * This CheckpointSummary serialized as BCS.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs bcs = 1;
   */
  bcs?: Bcs;
  /**
   * The digest of this CheckpointSummary.
   *
   * @generated from protobuf field: optional string digest = 2;
   */
  digest?: string;
  /**
   * Epoch that this checkpoint belongs to.
   *
   * @generated from protobuf field: optional uint64 epoch = 3;
   */
  epoch?: bigint;
  /**
   * The height of this checkpoint.
   *
   * @generated from protobuf field: optional uint64 sequence_number = 4;
   */
  sequenceNumber?: bigint;
  /**
   * Total number of transactions committed since genesis, including those in this
   * checkpoint.
   *
   * @generated from protobuf field: optional uint64 total_network_transactions = 5;
   */
  totalNetworkTransactions?: bigint;
  /**
   * The hash of the `CheckpointContents` for this checkpoint.
   *
   * @generated from protobuf field: optional string content_digest = 6;
   */
  contentDigest?: string;
  /**
   * The hash of the previous `CheckpointSummary`.
   *
   * This will be `None` only for the first, or genesis, checkpoint.
   *
   * @generated from protobuf field: optional string previous_digest = 7;
   */
  previousDigest?: string;
  /**
   * The running total gas costs of all transactions included in the current epoch so far
   * until this checkpoint.
   *
   * @generated from protobuf field: optional sui.rpc.v2.GasCostSummary epoch_rolling_gas_cost_summary = 8;
   */
  epochRollingGasCostSummary?: GasCostSummary;
  /**
   * Timestamp of the checkpoint - number of milliseconds from the Unix epoch
   * Checkpoint timestamps are monotonic, but not strongly monotonic - subsequent
   * checkpoints can have the same timestamp if they originate from the same underlining consensus commit.
   *
   * @generated from protobuf field: optional google.protobuf.Timestamp timestamp = 9;
   */
  timestamp?: Timestamp;
  /**
   * Commitments to checkpoint-specific state.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.CheckpointCommitment commitments = 10;
   */
  commitments: CheckpointCommitment[];
  /**
   * Extra data only present in the final checkpoint of an epoch.
   *
   * @generated from protobuf field: optional sui.rpc.v2.EndOfEpochData end_of_epoch_data = 11;
   */
  endOfEpochData?: EndOfEpochData;
  /**
   * `CheckpointSummary` is not an evolvable structure - it must be readable by any version of
   * the code. Therefore, to allow extensions to be added to `CheckpointSummary`,
   * opaque data can be added to checkpoints, which can be deserialized based on the current
   * protocol version.
   *
   * @generated from protobuf field: optional bytes version_specific_data = 12;
   */
  versionSpecificData?: Uint8Array;
}
/**
 * Data, which when included in a `CheckpointSummary`, signals the end of an `Epoch`.
 *
 * @generated from protobuf message sui.rpc.v2.EndOfEpochData
 */
interface EndOfEpochData {
  /**
   * The set of validators that will be in the `ValidatorCommittee` for the next epoch.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.ValidatorCommitteeMember next_epoch_committee = 1;
   */
  nextEpochCommittee: ValidatorCommitteeMember[];
  /**
   * The protocol version that is in effect during the next epoch.
   *
   * @generated from protobuf field: optional uint64 next_epoch_protocol_version = 2;
   */
  nextEpochProtocolVersion?: bigint;
  /**
   * Commitments to epoch specific state (live object set)
   *
   * @generated from protobuf field: repeated sui.rpc.v2.CheckpointCommitment epoch_commitments = 3;
   */
  epochCommitments: CheckpointCommitment[];
}
/**
 * A commitment made by a checkpoint.
 *
 * @generated from protobuf message sui.rpc.v2.CheckpointCommitment
 */
interface CheckpointCommitment {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.CheckpointCommitment.CheckpointCommitmentKind kind = 1;
   */
  kind?: CheckpointCommitment_CheckpointCommitmentKind;
  /**
   * @generated from protobuf field: optional string digest = 2;
   */
  digest?: string;
}
/**
 * @generated from protobuf enum sui.rpc.v2.CheckpointCommitment.CheckpointCommitmentKind
 */
declare enum CheckpointCommitment_CheckpointCommitmentKind {
  /**
   * @generated from protobuf enum value: CHECKPOINT_COMMITMENT_KIND_UNKNOWN = 0;
   */
  CHECKPOINT_COMMITMENT_KIND_UNKNOWN = 0,
  /**
   * An elliptic curve multiset hash attesting to the set of objects that
   * comprise the live state of the Sui blockchain.
   *
   * @generated from protobuf enum value: ECMH_LIVE_OBJECT_SET = 1;
   */
  ECMH_LIVE_OBJECT_SET = 1,
  /**
   * Digest of the checkpoint artifacts.
   *
   * @generated from protobuf enum value: CHECKPOINT_ARTIFACTS = 2;
   */
  CHECKPOINT_ARTIFACTS = 2,
}
declare class CheckpointSummary$Type extends MessageType<CheckpointSummary> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CheckpointSummary
 */
declare const CheckpointSummary: CheckpointSummary$Type;
declare class EndOfEpochData$Type extends MessageType<EndOfEpochData> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.EndOfEpochData
 */
declare const EndOfEpochData: EndOfEpochData$Type;
declare class CheckpointCommitment$Type extends MessageType<CheckpointCommitment> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CheckpointCommitment
 */
declare const CheckpointCommitment: CheckpointCommitment$Type;
//#endregion
export { CheckpointCommitment, CheckpointCommitment_CheckpointCommitmentKind, CheckpointSummary, EndOfEpochData };
//# sourceMappingURL=checkpoint_summary.d.mts.map