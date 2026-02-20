import { DatatypeDescriptor, FunctionDescriptor, Package } from "./move_package.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/move_package_service.ts
var GetPackageRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetPackageRequest", [{
			no: 1,
			name: "package_id",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetPackageRequest
*/
const GetPackageRequest = new GetPackageRequest$Type();
var GetPackageResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetPackageResponse", [{
			no: 1,
			name: "package",
			kind: "message",
			T: () => Package
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetPackageResponse
*/
const GetPackageResponse = new GetPackageResponse$Type();
var GetDatatypeRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetDatatypeRequest", [
			{
				no: 1,
				name: "package_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "module_name",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "name",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetDatatypeRequest
*/
const GetDatatypeRequest = new GetDatatypeRequest$Type();
var GetDatatypeResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetDatatypeResponse", [{
			no: 1,
			name: "datatype",
			kind: "message",
			T: () => DatatypeDescriptor
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetDatatypeResponse
*/
const GetDatatypeResponse = new GetDatatypeResponse$Type();
var GetFunctionRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetFunctionRequest", [
			{
				no: 1,
				name: "package_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "module_name",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "name",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetFunctionRequest
*/
const GetFunctionRequest = new GetFunctionRequest$Type();
var GetFunctionResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetFunctionResponse", [{
			no: 1,
			name: "function",
			kind: "message",
			T: () => FunctionDescriptor
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetFunctionResponse
*/
const GetFunctionResponse = new GetFunctionResponse$Type();
var ListPackageVersionsRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ListPackageVersionsRequest", [
			{
				no: 1,
				name: "package_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "page_size",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 3,
				name: "page_token",
				kind: "scalar",
				opt: true,
				T: 12
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ListPackageVersionsRequest
*/
const ListPackageVersionsRequest = new ListPackageVersionsRequest$Type();
var ListPackageVersionsResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ListPackageVersionsResponse", [{
			no: 1,
			name: "versions",
			kind: "message",
			repeat: 1,
			T: () => PackageVersion
		}, {
			no: 2,
			name: "next_page_token",
			kind: "scalar",
			opt: true,
			T: 12
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ListPackageVersionsResponse
*/
const ListPackageVersionsResponse = new ListPackageVersionsResponse$Type();
var PackageVersion$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.PackageVersion", [{
			no: 1,
			name: "package_id",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "version",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.PackageVersion
*/
const PackageVersion = new PackageVersion$Type();
/**
* @generated ServiceType for protobuf service sui.rpc.v2.MovePackageService
*/
const MovePackageService = new ServiceType("sui.rpc.v2.MovePackageService", [
	{
		name: "GetPackage",
		options: {},
		I: GetPackageRequest,
		O: GetPackageResponse
	},
	{
		name: "GetDatatype",
		options: {},
		I: GetDatatypeRequest,
		O: GetDatatypeResponse
	},
	{
		name: "GetFunction",
		options: {},
		I: GetFunctionRequest,
		O: GetFunctionResponse
	},
	{
		name: "ListPackageVersions",
		options: {},
		I: ListPackageVersionsRequest,
		O: ListPackageVersionsResponse
	}
]);

//#endregion
export { GetDatatypeRequest, GetDatatypeResponse, GetFunctionRequest, GetFunctionResponse, GetPackageRequest, GetPackageResponse, ListPackageVersionsRequest, ListPackageVersionsResponse, MovePackageService, PackageVersion };
//# sourceMappingURL=move_package_service.mjs.map