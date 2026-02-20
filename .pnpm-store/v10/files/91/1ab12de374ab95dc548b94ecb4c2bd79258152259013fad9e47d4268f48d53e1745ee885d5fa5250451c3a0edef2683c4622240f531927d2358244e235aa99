import { StateService } from "./state_service.mjs";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/state_service.client.ts
/**
* @generated from protobuf service sui.rpc.v2.StateService
*/
var StateServiceClient = class {
	constructor(_transport) {
		this._transport = _transport;
		this.typeName = StateService.typeName;
		this.methods = StateService.methods;
		this.options = StateService.options;
	}
	/**
	* @generated from protobuf rpc: ListDynamicFields(sui.rpc.v2.ListDynamicFieldsRequest) returns (sui.rpc.v2.ListDynamicFieldsResponse);
	*/
	listDynamicFields(input, options) {
		const method = this.methods[0], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: ListOwnedObjects(sui.rpc.v2.ListOwnedObjectsRequest) returns (sui.rpc.v2.ListOwnedObjectsResponse);
	*/
	listOwnedObjects(input, options) {
		const method = this.methods[1], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: GetCoinInfo(sui.rpc.v2.GetCoinInfoRequest) returns (sui.rpc.v2.GetCoinInfoResponse);
	*/
	getCoinInfo(input, options) {
		const method = this.methods[2], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: GetBalance(sui.rpc.v2.GetBalanceRequest) returns (sui.rpc.v2.GetBalanceResponse);
	*/
	getBalance(input, options) {
		const method = this.methods[3], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: ListBalances(sui.rpc.v2.ListBalancesRequest) returns (sui.rpc.v2.ListBalancesResponse);
	*/
	listBalances(input, options) {
		const method = this.methods[4], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
};

//#endregion
export { StateServiceClient };
//# sourceMappingURL=state_service.client.mjs.map