import { LedgerService } from "./ledger_service.mjs";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/ledger_service.client.ts
/**
* @generated from protobuf service sui.rpc.v2.LedgerService
*/
var LedgerServiceClient = class {
	constructor(_transport) {
		this._transport = _transport;
		this.typeName = LedgerService.typeName;
		this.methods = LedgerService.methods;
		this.options = LedgerService.options;
	}
	/**
	* Query the service for general information about its current state.
	*
	* @generated from protobuf rpc: GetServiceInfo(sui.rpc.v2.GetServiceInfoRequest) returns (sui.rpc.v2.GetServiceInfoResponse);
	*/
	getServiceInfo(input, options) {
		const method = this.methods[0], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: GetObject(sui.rpc.v2.GetObjectRequest) returns (sui.rpc.v2.GetObjectResponse);
	*/
	getObject(input, options) {
		const method = this.methods[1], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: BatchGetObjects(sui.rpc.v2.BatchGetObjectsRequest) returns (sui.rpc.v2.BatchGetObjectsResponse);
	*/
	batchGetObjects(input, options) {
		const method = this.methods[2], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: GetTransaction(sui.rpc.v2.GetTransactionRequest) returns (sui.rpc.v2.GetTransactionResponse);
	*/
	getTransaction(input, options) {
		const method = this.methods[3], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: BatchGetTransactions(sui.rpc.v2.BatchGetTransactionsRequest) returns (sui.rpc.v2.BatchGetTransactionsResponse);
	*/
	batchGetTransactions(input, options) {
		const method = this.methods[4], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: GetCheckpoint(sui.rpc.v2.GetCheckpointRequest) returns (sui.rpc.v2.GetCheckpointResponse);
	*/
	getCheckpoint(input, options) {
		const method = this.methods[5], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: GetEpoch(sui.rpc.v2.GetEpochRequest) returns (sui.rpc.v2.GetEpochResponse);
	*/
	getEpoch(input, options) {
		const method = this.methods[6], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
};

//#endregion
export { LedgerServiceClient };
//# sourceMappingURL=ledger_service.client.mjs.map