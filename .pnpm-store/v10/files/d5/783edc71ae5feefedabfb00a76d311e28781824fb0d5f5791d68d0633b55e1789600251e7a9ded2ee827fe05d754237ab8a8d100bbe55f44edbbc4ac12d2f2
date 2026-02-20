import { FieldMask } from "../../../google/protobuf/field_mask.mjs";
import { Checkpoint } from "./checkpoint.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/subscription_service.d.ts

/**
 * Request message for SubscriptionService.SubscribeCheckpoints
 *
 * @generated from protobuf message sui.rpc.v2.SubscribeCheckpointsRequest
 */
interface SubscribeCheckpointsRequest {
  /**
   * Optional. Mask for specifying which parts of the
   * SubscribeCheckpointsResponse should be returned.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 1;
   */
  readMask?: FieldMask;
}
/**
 * Response message for SubscriptionService.SubscribeCheckpoints
 *
 * @generated from protobuf message sui.rpc.v2.SubscribeCheckpointsResponse
 */
interface SubscribeCheckpointsResponse {
  /**
   * Required. The checkpoint sequence number and value of the current cursor
   * into the checkpoint stream
   *
   * @generated from protobuf field: optional uint64 cursor = 1;
   */
  cursor?: bigint;
  /**
   * The requested data for this checkpoint
   *
   * @generated from protobuf field: optional sui.rpc.v2.Checkpoint checkpoint = 2;
   */
  checkpoint?: Checkpoint;
}
declare class SubscribeCheckpointsRequest$Type extends MessageType<SubscribeCheckpointsRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.SubscribeCheckpointsRequest
 */
declare const SubscribeCheckpointsRequest: SubscribeCheckpointsRequest$Type;
declare class SubscribeCheckpointsResponse$Type extends MessageType<SubscribeCheckpointsResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.SubscribeCheckpointsResponse
 */
declare const SubscribeCheckpointsResponse: SubscribeCheckpointsResponse$Type;
/**
 * @generated ServiceType for protobuf service sui.rpc.v2.SubscriptionService
 */
declare const SubscriptionService: ServiceType;
//#endregion
export { SubscribeCheckpointsRequest, SubscribeCheckpointsResponse, SubscriptionService };
//# sourceMappingURL=subscription_service.d.mts.map