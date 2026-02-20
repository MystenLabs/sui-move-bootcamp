import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/name_service.ts
var LookupNameRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.LookupNameRequest", [{
			no: 1,
			name: "name",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.LookupNameRequest
*/
const LookupNameRequest = new LookupNameRequest$Type();
var LookupNameResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.LookupNameResponse", [{
			no: 1,
			name: "record",
			kind: "message",
			T: () => NameRecord
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.LookupNameResponse
*/
const LookupNameResponse = new LookupNameResponse$Type();
var ReverseLookupNameRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ReverseLookupNameRequest", [{
			no: 1,
			name: "address",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ReverseLookupNameRequest
*/
const ReverseLookupNameRequest = new ReverseLookupNameRequest$Type();
var ReverseLookupNameResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ReverseLookupNameResponse", [{
			no: 1,
			name: "record",
			kind: "message",
			T: () => NameRecord
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ReverseLookupNameResponse
*/
const ReverseLookupNameResponse = new ReverseLookupNameResponse$Type();
var NameRecord$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.NameRecord", [
			{
				no: 1,
				name: "id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "name",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "registration_nft_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "expiration_timestamp",
				kind: "message",
				T: () => Timestamp
			},
			{
				no: 5,
				name: "target_address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 6,
				name: "data",
				kind: "map",
				K: 9,
				V: {
					kind: "scalar",
					T: 9
				}
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.NameRecord
*/
const NameRecord = new NameRecord$Type();
/**
* @generated ServiceType for protobuf service sui.rpc.v2.NameService
*/
const NameService = new ServiceType("sui.rpc.v2.NameService", [{
	name: "LookupName",
	options: {},
	I: LookupNameRequest,
	O: LookupNameResponse
}, {
	name: "ReverseLookupName",
	options: {},
	I: ReverseLookupNameRequest,
	O: ReverseLookupNameResponse
}]);

//#endregion
export { LookupNameRequest, LookupNameResponse, NameRecord, NameService, ReverseLookupNameRequest, ReverseLookupNameResponse };
//# sourceMappingURL=name_service.mjs.map