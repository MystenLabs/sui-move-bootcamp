import { NameService } from "./name_service.mjs";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/name_service.client.ts
/**
* @generated from protobuf service sui.rpc.v2.NameService
*/
var NameServiceClient = class {
	constructor(_transport) {
		this._transport = _transport;
		this.typeName = NameService.typeName;
		this.methods = NameService.methods;
		this.options = NameService.options;
	}
	/**
	* @generated from protobuf rpc: LookupName(sui.rpc.v2.LookupNameRequest) returns (sui.rpc.v2.LookupNameResponse);
	*/
	lookupName(input, options) {
		const method = this.methods[0], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: ReverseLookupName(sui.rpc.v2.ReverseLookupNameRequest) returns (sui.rpc.v2.ReverseLookupNameResponse);
	*/
	reverseLookupName(input, options) {
		const method = this.methods[1], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
};

//#endregion
export { NameServiceClient };
//# sourceMappingURL=name_service.client.mjs.map