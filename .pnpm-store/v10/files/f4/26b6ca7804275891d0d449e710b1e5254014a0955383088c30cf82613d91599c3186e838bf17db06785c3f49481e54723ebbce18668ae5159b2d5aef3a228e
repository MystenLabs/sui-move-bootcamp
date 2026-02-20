import { MovePackageService } from "./move_package_service.mjs";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/move_package_service.client.ts
/**
* @generated from protobuf service sui.rpc.v2.MovePackageService
*/
var MovePackageServiceClient = class {
	constructor(_transport) {
		this._transport = _transport;
		this.typeName = MovePackageService.typeName;
		this.methods = MovePackageService.methods;
		this.options = MovePackageService.options;
	}
	/**
	* @generated from protobuf rpc: GetPackage(sui.rpc.v2.GetPackageRequest) returns (sui.rpc.v2.GetPackageResponse);
	*/
	getPackage(input, options) {
		const method = this.methods[0], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: GetDatatype(sui.rpc.v2.GetDatatypeRequest) returns (sui.rpc.v2.GetDatatypeResponse);
	*/
	getDatatype(input, options) {
		const method = this.methods[1], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: GetFunction(sui.rpc.v2.GetFunctionRequest) returns (sui.rpc.v2.GetFunctionResponse);
	*/
	getFunction(input, options) {
		const method = this.methods[2], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: ListPackageVersions(sui.rpc.v2.ListPackageVersionsRequest) returns (sui.rpc.v2.ListPackageVersionsResponse);
	*/
	listPackageVersions(input, options) {
		const method = this.methods[3], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
};

//#endregion
export { MovePackageServiceClient };
//# sourceMappingURL=move_package_service.client.mjs.map