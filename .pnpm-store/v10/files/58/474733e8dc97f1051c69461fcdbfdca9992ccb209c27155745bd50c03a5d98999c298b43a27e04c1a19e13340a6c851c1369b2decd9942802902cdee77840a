import { Bcs } from "./bcs.mjs";
import { UserSignature } from "./signature.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/checkpoint_contents.d.ts

/**
 * The committed to contents of a checkpoint.
 *
 * @generated from protobuf message sui.rpc.v2.CheckpointContents
 */
interface CheckpointContents {
  /**
   * This CheckpointContents serialized as BCS.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs bcs = 1;
   */
  bcs?: Bcs;
  /**
   * The digest of this CheckpointContents.
   *
   * @generated from protobuf field: optional string digest = 2;
   */
  digest?: string;
  /**
   * Version of this CheckpointContents
   *
   * @generated from protobuf field: optional int32 version = 3;
   */
  version?: number;
  /**
   * Set of transactions committed to in this checkpoint.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.CheckpointedTransactionInfo transactions = 4;
   */
  transactions: CheckpointedTransactionInfo[];
}
/**
 * Transaction information committed to in a checkpoint.
 *
 * @generated from protobuf message sui.rpc.v2.CheckpointedTransactionInfo
 */
interface CheckpointedTransactionInfo {
  /**
   * Digest of the transaction.
   *
   * @generated from protobuf field: optional string transaction = 1;
   */
  transaction?: string;
  /**
   * Digest of the effects.
   *
   * @generated from protobuf field: optional string effects = 2;
   */
  effects?: string;
  /**
   * Set of user signatures that authorized the transaction.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.UserSignature signatures = 3;
   */
  signatures: UserSignature[];
  /**
   * The `AddressAliases` object version, if any, that was used to verify the
   * UserSignature at the same position in `signatures`.
   *
   * This field is present when CheckpointContents.version is >= 2.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.AddressAliasesVersion address_aliases_versions = 4;
   */
  addressAliasesVersions: AddressAliasesVersion[];
}
/**
 * @generated from protobuf message sui.rpc.v2.AddressAliasesVersion
 */
interface AddressAliasesVersion {
  /**
   * @generated from protobuf field: optional uint64 version = 1;
   */
  version?: bigint;
}
declare class CheckpointContents$Type extends MessageType<CheckpointContents> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CheckpointContents
 */
declare const CheckpointContents: CheckpointContents$Type;
declare class CheckpointedTransactionInfo$Type extends MessageType<CheckpointedTransactionInfo> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CheckpointedTransactionInfo
 */
declare const CheckpointedTransactionInfo: CheckpointedTransactionInfo$Type;
declare class AddressAliasesVersion$Type extends MessageType<AddressAliasesVersion> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.AddressAliasesVersion
 */
declare const AddressAliasesVersion: AddressAliasesVersion$Type;
//#endregion
export { AddressAliasesVersion, CheckpointContents, CheckpointedTransactionInfo };
//# sourceMappingURL=checkpoint_contents.d.mts.map