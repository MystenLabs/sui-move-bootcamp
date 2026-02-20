import { Object as Object$1 } from "./object.mjs";
import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { ExecutedTransaction } from "./executed_transaction.mjs";
import { FieldMask } from "../../../google/protobuf/field_mask.mjs";
import { Epoch } from "./epoch.mjs";
import { Checkpoint } from "./checkpoint.mjs";
import { Status } from "../../../google/rpc/status.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/ledger_service.ts
var GetServiceInfoRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetServiceInfoRequest", []);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetServiceInfoRequest
*/
const GetServiceInfoRequest = new GetServiceInfoRequest$Type();
var GetServiceInfoResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetServiceInfoResponse", [
			{
				no: 1,
				name: "chain_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "chain",
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
				name: "checkpoint_height",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "timestamp",
				kind: "message",
				T: () => Timestamp
			},
			{
				no: 6,
				name: "lowest_available_checkpoint",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 7,
				name: "lowest_available_checkpoint_objects",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 8,
				name: "server",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetServiceInfoResponse
*/
const GetServiceInfoResponse = new GetServiceInfoResponse$Type();
var GetObjectRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetObjectRequest", [
			{
				no: 1,
				name: "object_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "read_mask",
				kind: "message",
				T: () => FieldMask
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetObjectRequest
*/
const GetObjectRequest = new GetObjectRequest$Type();
var GetObjectResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetObjectResponse", [{
			no: 1,
			name: "object",
			kind: "message",
			T: () => Object$1
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetObjectResponse
*/
const GetObjectResponse = new GetObjectResponse$Type();
var BatchGetObjectsRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.BatchGetObjectsRequest", [{
			no: 1,
			name: "requests",
			kind: "message",
			repeat: 1,
			T: () => GetObjectRequest
		}, {
			no: 2,
			name: "read_mask",
			kind: "message",
			T: () => FieldMask
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.BatchGetObjectsRequest
*/
const BatchGetObjectsRequest = new BatchGetObjectsRequest$Type();
var BatchGetObjectsResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.BatchGetObjectsResponse", [{
			no: 1,
			name: "objects",
			kind: "message",
			repeat: 1,
			T: () => GetObjectResult
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.BatchGetObjectsResponse
*/
const BatchGetObjectsResponse = new BatchGetObjectsResponse$Type();
var GetObjectResult$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetObjectResult", [{
			no: 1,
			name: "object",
			kind: "message",
			oneof: "result",
			T: () => Object$1
		}, {
			no: 2,
			name: "error",
			kind: "message",
			oneof: "result",
			T: () => Status
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetObjectResult
*/
const GetObjectResult = new GetObjectResult$Type();
var GetTransactionRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetTransactionRequest", [{
			no: 1,
			name: "digest",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "read_mask",
			kind: "message",
			T: () => FieldMask
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetTransactionRequest
*/
const GetTransactionRequest = new GetTransactionRequest$Type();
var GetTransactionResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetTransactionResponse", [{
			no: 1,
			name: "transaction",
			kind: "message",
			T: () => ExecutedTransaction
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetTransactionResponse
*/
const GetTransactionResponse = new GetTransactionResponse$Type();
var BatchGetTransactionsRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.BatchGetTransactionsRequest", [{
			no: 1,
			name: "digests",
			kind: "scalar",
			repeat: 2,
			T: 9
		}, {
			no: 2,
			name: "read_mask",
			kind: "message",
			T: () => FieldMask
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.BatchGetTransactionsRequest
*/
const BatchGetTransactionsRequest = new BatchGetTransactionsRequest$Type();
var BatchGetTransactionsResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.BatchGetTransactionsResponse", [{
			no: 1,
			name: "transactions",
			kind: "message",
			repeat: 1,
			T: () => GetTransactionResult
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.BatchGetTransactionsResponse
*/
const BatchGetTransactionsResponse = new BatchGetTransactionsResponse$Type();
var GetTransactionResult$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetTransactionResult", [{
			no: 1,
			name: "transaction",
			kind: "message",
			oneof: "result",
			T: () => ExecutedTransaction
		}, {
			no: 2,
			name: "error",
			kind: "message",
			oneof: "result",
			T: () => Status
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetTransactionResult
*/
const GetTransactionResult = new GetTransactionResult$Type();
var GetCheckpointRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetCheckpointRequest", [
			{
				no: 1,
				name: "sequence_number",
				kind: "scalar",
				oneof: "checkpointId",
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "digest",
				kind: "scalar",
				oneof: "checkpointId",
				T: 9
			},
			{
				no: 3,
				name: "read_mask",
				kind: "message",
				T: () => FieldMask
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetCheckpointRequest
*/
const GetCheckpointRequest = new GetCheckpointRequest$Type();
var GetCheckpointResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetCheckpointResponse", [{
			no: 1,
			name: "checkpoint",
			kind: "message",
			T: () => Checkpoint
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetCheckpointResponse
*/
const GetCheckpointResponse = new GetCheckpointResponse$Type();
var GetEpochRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetEpochRequest", [{
			no: 1,
			name: "epoch",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}, {
			no: 2,
			name: "read_mask",
			kind: "message",
			T: () => FieldMask
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetEpochRequest
*/
const GetEpochRequest = new GetEpochRequest$Type();
var GetEpochResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetEpochResponse", [{
			no: 1,
			name: "epoch",
			kind: "message",
			T: () => Epoch
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetEpochResponse
*/
const GetEpochResponse = new GetEpochResponse$Type();
/**
* @generated ServiceType for protobuf service sui.rpc.v2.LedgerService
*/
const LedgerService = new ServiceType("sui.rpc.v2.LedgerService", [
	{
		name: "GetServiceInfo",
		options: {},
		I: GetServiceInfoRequest,
		O: GetServiceInfoResponse
	},
	{
		name: "GetObject",
		options: {},
		I: GetObjectRequest,
		O: GetObjectResponse
	},
	{
		name: "BatchGetObjects",
		options: {},
		I: BatchGetObjectsRequest,
		O: BatchGetObjectsResponse
	},
	{
		name: "GetTransaction",
		options: {},
		I: GetTransactionRequest,
		O: GetTransactionResponse
	},
	{
		name: "BatchGetTransactions",
		options: {},
		I: BatchGetTransactionsRequest,
		O: BatchGetTransactionsResponse
	},
	{
		name: "GetCheckpoint",
		options: {},
		I: GetCheckpointRequest,
		O: GetCheckpointResponse
	},
	{
		name: "GetEpoch",
		options: {},
		I: GetEpochRequest,
		O: GetEpochResponse
	}
]);

//#endregion
export { BatchGetObjectsRequest, BatchGetObjectsResponse, BatchGetTransactionsRequest, BatchGetTransactionsResponse, GetCheckpointRequest, GetCheckpointResponse, GetEpochRequest, GetEpochResponse, GetObjectRequest, GetObjectResponse, GetObjectResult, GetServiceInfoRequest, GetServiceInfoResponse, GetTransactionRequest, GetTransactionResponse, GetTransactionResult, LedgerService };
//# sourceMappingURL=ledger_service.mjs.map