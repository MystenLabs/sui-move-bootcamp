import { TransactionExecutionService } from "./transaction_execution_service.mjs";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/transaction_execution_service.client.ts
/**
* @generated from protobuf service sui.rpc.v2.TransactionExecutionService
*/
var TransactionExecutionServiceClient = class {
	constructor(_transport) {
		this._transport = _transport;
		this.typeName = TransactionExecutionService.typeName;
		this.methods = TransactionExecutionService.methods;
		this.options = TransactionExecutionService.options;
	}
	/**
	* @generated from protobuf rpc: ExecuteTransaction(sui.rpc.v2.ExecuteTransactionRequest) returns (sui.rpc.v2.ExecuteTransactionResponse);
	*/
	executeTransaction(input, options) {
		const method = this.methods[0], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
	/**
	* @generated from protobuf rpc: SimulateTransaction(sui.rpc.v2.SimulateTransactionRequest) returns (sui.rpc.v2.SimulateTransactionResponse);
	*/
	simulateTransaction(input, options) {
		const method = this.methods[1], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
};

//#endregion
export { TransactionExecutionServiceClient };
//# sourceMappingURL=transaction_execution_service.client.mjs.map