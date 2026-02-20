import { FieldMask } from "../../../google/protobuf/field_mask.mjs";
import { Checkpoint } from "./checkpoint.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/subscription_service.ts
var SubscribeCheckpointsRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SubscribeCheckpointsRequest", [{
			no: 1,
			name: "read_mask",
			kind: "message",
			T: () => FieldMask
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SubscribeCheckpointsRequest
*/
const SubscribeCheckpointsRequest = new SubscribeCheckpointsRequest$Type();
var SubscribeCheckpointsResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SubscribeCheckpointsResponse", [{
			no: 1,
			name: "cursor",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}, {
			no: 2,
			name: "checkpoint",
			kind: "message",
			T: () => Checkpoint
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SubscribeCheckpointsResponse
*/
const SubscribeCheckpointsResponse = new SubscribeCheckpointsResponse$Type();
/**
* @generated ServiceType for protobuf service sui.rpc.v2.SubscriptionService
*/
const SubscriptionService = new ServiceType("sui.rpc.v2.SubscriptionService", [{
	name: "SubscribeCheckpoints",
	serverStreaming: true,
	options: {},
	I: SubscribeCheckpointsRequest,
	O: SubscribeCheckpointsResponse
}]);

//#endregion
export { SubscribeCheckpointsRequest, SubscribeCheckpointsResponse, SubscriptionService };
//# sourceMappingURL=subscription_service.mjs.map