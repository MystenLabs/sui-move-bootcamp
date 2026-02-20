import { Object as Object$1 } from "./object.mjs";
import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { ExecutedTransaction } from "./executed_transaction.mjs";
import { FieldMask } from "../../../google/protobuf/field_mask.mjs";
import { Epoch } from "./epoch.mjs";
import { Checkpoint } from "./checkpoint.mjs";
import { Status } from "../../../google/rpc/status.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/ledger_service.d.ts

/**
 * @generated from protobuf message sui.rpc.v2.GetServiceInfoRequest
 */
interface GetServiceInfoRequest {}
/**
 * @generated from protobuf message sui.rpc.v2.GetServiceInfoResponse
 */
interface GetServiceInfoResponse {
  /**
   * The chain identifier of the chain that this node is on.
   *
   * The chain identifier is the digest of the genesis checkpoint, the
   * checkpoint with sequence number 0.
   *
   * @generated from protobuf field: optional string chain_id = 1;
   */
  chainId?: string;
  /**
   * Human-readable name of the chain that this node is on.
   *
   * This is intended to be a human-readable name like `mainnet`, `testnet`, and so on.
   *
   * @generated from protobuf field: optional string chain = 2;
   */
  chain?: string;
  /**
   * Current epoch of the node based on its highest executed checkpoint.
   *
   * @generated from protobuf field: optional uint64 epoch = 3;
   */
  epoch?: bigint;
  /**
   * Checkpoint height of the most recently executed checkpoint.
   *
   * @generated from protobuf field: optional uint64 checkpoint_height = 4;
   */
  checkpointHeight?: bigint;
  /**
   * Unix timestamp of the most recently executed checkpoint.
   *
   * @generated from protobuf field: optional google.protobuf.Timestamp timestamp = 5;
   */
  timestamp?: Timestamp;
  /**
   * The lowest checkpoint for which checkpoints and transaction data are available.
   *
   * @generated from protobuf field: optional uint64 lowest_available_checkpoint = 6;
   */
  lowestAvailableCheckpoint?: bigint;
  /**
   * The lowest checkpoint for which object data is available.
   *
   * @generated from protobuf field: optional uint64 lowest_available_checkpoint_objects = 7;
   */
  lowestAvailableCheckpointObjects?: bigint;
  /**
   * Software version of the service. Similar to the `server` http header.
   *
   * @generated from protobuf field: optional string server = 8;
   */
  server?: string;
}
/**
 * @generated from protobuf message sui.rpc.v2.GetObjectRequest
 */
interface GetObjectRequest {
  /**
   * Required. The `ObjectId` of the requested object.
   *
   * @generated from protobuf field: optional string object_id = 1;
   */
  objectId?: string;
  /**
   * Request a specific version of the object.
   * If no version is specified, and the object is live, then the latest
   * version of the object is returned.
   *
   * @generated from protobuf field: optional uint64 version = 2;
   */
  version?: bigint;
  /**
   * Mask specifying which fields to read.
   * If no mask is specified, defaults to `object_id,version,digest`.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 3;
   */
  readMask?: FieldMask;
}
/**
 * @generated from protobuf message sui.rpc.v2.GetObjectResponse
 */
interface GetObjectResponse {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.Object object = 1;
   */
  object?: Object$1;
}
/**
 * @generated from protobuf message sui.rpc.v2.BatchGetObjectsRequest
 */
interface BatchGetObjectsRequest {
  /**
   * @generated from protobuf field: repeated sui.rpc.v2.GetObjectRequest requests = 1;
   */
  requests: GetObjectRequest[];
  /**
   * Mask specifying which fields to read.
   * If no mask is specified, defaults to `object_id,version,digest`.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 2;
   */
  readMask?: FieldMask;
}
/**
 * @generated from protobuf message sui.rpc.v2.BatchGetObjectsResponse
 */
interface BatchGetObjectsResponse {
  /**
   * @generated from protobuf field: repeated sui.rpc.v2.GetObjectResult objects = 1;
   */
  objects: GetObjectResult[];
}
/**
 * @generated from protobuf message sui.rpc.v2.GetObjectResult
 */
interface GetObjectResult {
  /**
   * @generated from protobuf oneof: result
   */
  result: {
    oneofKind: 'object';
    /**
     * @generated from protobuf field: sui.rpc.v2.Object object = 1;
     */
    object: Object$1;
  } | {
    oneofKind: 'error';
    /**
     * @generated from protobuf field: google.rpc.Status error = 2;
     */
    error: Status;
  } | {
    oneofKind: undefined;
  };
}
/**
 * @generated from protobuf message sui.rpc.v2.GetTransactionRequest
 */
interface GetTransactionRequest {
  /**
   * Required. The digest of the requested transaction.
   *
   * @generated from protobuf field: optional string digest = 1;
   */
  digest?: string;
  /**
   * Mask specifying which fields to read.
   * If no mask is specified, defaults to `digest`.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 2;
   */
  readMask?: FieldMask;
}
/**
 * @generated from protobuf message sui.rpc.v2.GetTransactionResponse
 */
interface GetTransactionResponse {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.ExecutedTransaction transaction = 1;
   */
  transaction?: ExecutedTransaction;
}
/**
 * @generated from protobuf message sui.rpc.v2.BatchGetTransactionsRequest
 */
interface BatchGetTransactionsRequest {
  /**
   * Required. The digests of the requested transactions.
   *
   * @generated from protobuf field: repeated string digests = 1;
   */
  digests: string[];
  /**
   * Mask specifying which fields to read.
   * If no mask is specified, defaults to `digest`.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 2;
   */
  readMask?: FieldMask;
}
/**
 * @generated from protobuf message sui.rpc.v2.BatchGetTransactionsResponse
 */
interface BatchGetTransactionsResponse {
  /**
   * @generated from protobuf field: repeated sui.rpc.v2.GetTransactionResult transactions = 1;
   */
  transactions: GetTransactionResult[];
}
/**
 * @generated from protobuf message sui.rpc.v2.GetTransactionResult
 */
interface GetTransactionResult {
  /**
   * @generated from protobuf oneof: result
   */
  result: {
    oneofKind: 'transaction';
    /**
     * @generated from protobuf field: sui.rpc.v2.ExecutedTransaction transaction = 1;
     */
    transaction: ExecutedTransaction;
  } | {
    oneofKind: 'error';
    /**
     * @generated from protobuf field: google.rpc.Status error = 2;
     */
    error: Status;
  } | {
    oneofKind: undefined;
  };
}
/**
 * @generated from protobuf message sui.rpc.v2.GetCheckpointRequest
 */
interface GetCheckpointRequest {
  /**
   * @generated from protobuf oneof: checkpoint_id
   */
  checkpointId: {
    oneofKind: 'sequenceNumber';
    /**
     * The sequence number of the requested checkpoint.
     *
     * @generated from protobuf field: uint64 sequence_number = 1;
     */
    sequenceNumber: bigint;
  } | {
    oneofKind: 'digest';
    /**
     * The digest of the requested checkpoint.
     *
     * @generated from protobuf field: string digest = 2;
     */
    digest: string;
  } | {
    oneofKind: undefined;
  };
  /**
   * Mask specifying which fields to read.
   * If no mask is specified, defaults to `sequence_number,digest`.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 3;
   */
  readMask?: FieldMask;
}
/**
 * @generated from protobuf message sui.rpc.v2.GetCheckpointResponse
 */
interface GetCheckpointResponse {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.Checkpoint checkpoint = 1;
   */
  checkpoint?: Checkpoint;
}
/**
 * @generated from protobuf message sui.rpc.v2.GetEpochRequest
 */
interface GetEpochRequest {
  /**
   * The requested epoch.
   * If no epoch is provided the current epoch will be returned.
   *
   * @generated from protobuf field: optional uint64 epoch = 1;
   */
  epoch?: bigint;
  /**
   * Mask specifying which fields to read.
   * If no mask is specified, defaults to `epoch`.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 2;
   */
  readMask?: FieldMask;
}
/**
 * @generated from protobuf message sui.rpc.v2.GetEpochResponse
 */
interface GetEpochResponse {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.Epoch epoch = 1;
   */
  epoch?: Epoch;
}
declare class GetServiceInfoRequest$Type extends MessageType<GetServiceInfoRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetServiceInfoRequest
 */
declare const GetServiceInfoRequest: GetServiceInfoRequest$Type;
declare class GetServiceInfoResponse$Type extends MessageType<GetServiceInfoResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetServiceInfoResponse
 */
declare const GetServiceInfoResponse: GetServiceInfoResponse$Type;
declare class GetObjectRequest$Type extends MessageType<GetObjectRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetObjectRequest
 */
declare const GetObjectRequest: GetObjectRequest$Type;
declare class GetObjectResponse$Type extends MessageType<GetObjectResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetObjectResponse
 */
declare const GetObjectResponse: GetObjectResponse$Type;
declare class BatchGetObjectsRequest$Type extends MessageType<BatchGetObjectsRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.BatchGetObjectsRequest
 */
declare const BatchGetObjectsRequest: BatchGetObjectsRequest$Type;
declare class BatchGetObjectsResponse$Type extends MessageType<BatchGetObjectsResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.BatchGetObjectsResponse
 */
declare const BatchGetObjectsResponse: BatchGetObjectsResponse$Type;
declare class GetObjectResult$Type extends MessageType<GetObjectResult> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetObjectResult
 */
declare const GetObjectResult: GetObjectResult$Type;
declare class GetTransactionRequest$Type extends MessageType<GetTransactionRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetTransactionRequest
 */
declare const GetTransactionRequest: GetTransactionRequest$Type;
declare class GetTransactionResponse$Type extends MessageType<GetTransactionResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetTransactionResponse
 */
declare const GetTransactionResponse: GetTransactionResponse$Type;
declare class BatchGetTransactionsRequest$Type extends MessageType<BatchGetTransactionsRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.BatchGetTransactionsRequest
 */
declare const BatchGetTransactionsRequest: BatchGetTransactionsRequest$Type;
declare class BatchGetTransactionsResponse$Type extends MessageType<BatchGetTransactionsResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.BatchGetTransactionsResponse
 */
declare const BatchGetTransactionsResponse: BatchGetTransactionsResponse$Type;
declare class GetTransactionResult$Type extends MessageType<GetTransactionResult> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetTransactionResult
 */
declare const GetTransactionResult: GetTransactionResult$Type;
declare class GetCheckpointRequest$Type extends MessageType<GetCheckpointRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetCheckpointRequest
 */
declare const GetCheckpointRequest: GetCheckpointRequest$Type;
declare class GetCheckpointResponse$Type extends MessageType<GetCheckpointResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetCheckpointResponse
 */
declare const GetCheckpointResponse: GetCheckpointResponse$Type;
declare class GetEpochRequest$Type extends MessageType<GetEpochRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetEpochRequest
 */
declare const GetEpochRequest: GetEpochRequest$Type;
declare class GetEpochResponse$Type extends MessageType<GetEpochResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetEpochResponse
 */
declare const GetEpochResponse: GetEpochResponse$Type;
/**
 * @generated ServiceType for protobuf service sui.rpc.v2.LedgerService
 */
declare const LedgerService: ServiceType;
//#endregion
export { BatchGetObjectsRequest, BatchGetObjectsResponse, BatchGetTransactionsRequest, BatchGetTransactionsResponse, GetCheckpointRequest, GetCheckpointResponse, GetEpochRequest, GetEpochResponse, GetObjectRequest, GetObjectResponse, GetObjectResult, GetServiceInfoRequest, GetServiceInfoResponse, GetTransactionRequest, GetTransactionResponse, GetTransactionResult, LedgerService };
//# sourceMappingURL=ledger_service.d.mts.map