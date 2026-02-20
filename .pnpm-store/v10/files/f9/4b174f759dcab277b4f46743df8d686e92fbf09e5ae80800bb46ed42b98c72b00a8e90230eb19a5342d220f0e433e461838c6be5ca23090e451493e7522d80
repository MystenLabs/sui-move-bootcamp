import { Value } from "../../../google/protobuf/struct.mjs";
import { Bcs } from "./bcs.mjs";
import { Argument } from "./argument.mjs";
import { Transaction } from "./transaction.mjs";
import { UserSignature } from "./signature.mjs";
import { ExecutedTransaction } from "./executed_transaction.mjs";
import { FieldMask } from "../../../google/protobuf/field_mask.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/transaction_execution_service.ts
/**
* buf:lint:ignore ENUM_ZERO_VALUE_SUFFIX
*
* @generated from protobuf enum sui.rpc.v2.SimulateTransactionRequest.TransactionChecks
*/
let SimulateTransactionRequest_TransactionChecks = /* @__PURE__ */ function(SimulateTransactionRequest_TransactionChecks$1) {
	/**
	* @generated from protobuf enum value: ENABLED = 0;
	*/
	SimulateTransactionRequest_TransactionChecks$1[SimulateTransactionRequest_TransactionChecks$1["ENABLED"] = 0] = "ENABLED";
	/**
	* @generated from protobuf enum value: DISABLED = 1;
	*/
	SimulateTransactionRequest_TransactionChecks$1[SimulateTransactionRequest_TransactionChecks$1["DISABLED"] = 1] = "DISABLED";
	return SimulateTransactionRequest_TransactionChecks$1;
}({});
var ExecuteTransactionRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ExecuteTransactionRequest", [
			{
				no: 1,
				name: "transaction",
				kind: "message",
				T: () => Transaction
			},
			{
				no: 2,
				name: "signatures",
				kind: "message",
				repeat: 1,
				T: () => UserSignature
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
* @generated MessageType for protobuf message sui.rpc.v2.ExecuteTransactionRequest
*/
const ExecuteTransactionRequest = new ExecuteTransactionRequest$Type();
var ExecuteTransactionResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ExecuteTransactionResponse", [{
			no: 1,
			name: "transaction",
			kind: "message",
			T: () => ExecutedTransaction
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ExecuteTransactionResponse
*/
const ExecuteTransactionResponse = new ExecuteTransactionResponse$Type();
var SimulateTransactionRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SimulateTransactionRequest", [
			{
				no: 1,
				name: "transaction",
				kind: "message",
				T: () => Transaction
			},
			{
				no: 2,
				name: "read_mask",
				kind: "message",
				T: () => FieldMask
			},
			{
				no: 3,
				name: "checks",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.SimulateTransactionRequest.TransactionChecks", SimulateTransactionRequest_TransactionChecks]
			},
			{
				no: 4,
				name: "do_gas_selection",
				kind: "scalar",
				opt: true,
				T: 8
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SimulateTransactionRequest
*/
const SimulateTransactionRequest = new SimulateTransactionRequest$Type();
var SimulateTransactionResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SimulateTransactionResponse", [{
			no: 1,
			name: "transaction",
			kind: "message",
			T: () => ExecutedTransaction
		}, {
			no: 2,
			name: "command_outputs",
			kind: "message",
			repeat: 1,
			T: () => CommandResult
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SimulateTransactionResponse
*/
const SimulateTransactionResponse = new SimulateTransactionResponse$Type();
var CommandResult$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CommandResult", [{
			no: 1,
			name: "return_values",
			kind: "message",
			repeat: 1,
			T: () => CommandOutput
		}, {
			no: 2,
			name: "mutated_by_ref",
			kind: "message",
			repeat: 1,
			T: () => CommandOutput
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CommandResult
*/
const CommandResult = new CommandResult$Type();
var CommandOutput$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CommandOutput", [
			{
				no: 1,
				name: "argument",
				kind: "message",
				T: () => Argument
			},
			{
				no: 2,
				name: "value",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 3,
				name: "json",
				kind: "message",
				T: () => Value
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CommandOutput
*/
const CommandOutput = new CommandOutput$Type();
/**
* @generated ServiceType for protobuf service sui.rpc.v2.TransactionExecutionService
*/
const TransactionExecutionService = new ServiceType("sui.rpc.v2.TransactionExecutionService", [{
	name: "ExecuteTransaction",
	options: {},
	I: ExecuteTransactionRequest,
	O: ExecuteTransactionResponse
}, {
	name: "SimulateTransaction",
	options: {},
	I: SimulateTransactionRequest,
	O: SimulateTransactionResponse
}]);

//#endregion
export { CommandOutput, CommandResult, ExecuteTransactionRequest, ExecuteTransactionResponse, SimulateTransactionRequest, SimulateTransactionRequest_TransactionChecks, SimulateTransactionResponse, TransactionExecutionService };
//# sourceMappingURL=transaction_execution_service.mjs.map