//#region src/jsonRpc/errors.ts
const CODE_TO_ERROR_TYPE = {
	"-32700": "ParseError",
	"-32701": "OversizedRequest",
	"-32702": "OversizedResponse",
	"-32600": "InvalidRequest",
	"-32601": "MethodNotFound",
	"-32602": "InvalidParams",
	"-32603": "InternalError",
	"-32604": "ServerBusy",
	"-32000": "CallExecutionFailed",
	"-32001": "UnknownError",
	"-32003": "SubscriptionClosed",
	"-32004": "SubscriptionClosedWithError",
	"-32005": "BatchesNotSupported",
	"-32006": "TooManySubscriptions",
	"-32050": "TransientError",
	"-32002": "TransactionExecutionClientError"
};
var SuiHTTPTransportError = class extends Error {};
var JsonRpcError = class extends SuiHTTPTransportError {
	constructor(message, code) {
		super(message);
		this.code = code;
		this.type = CODE_TO_ERROR_TYPE[code] ?? "ServerError";
	}
};
var SuiHTTPStatusError = class extends SuiHTTPTransportError {
	constructor(message, status, statusText) {
		super(message);
		this.status = status;
		this.statusText = statusText;
	}
};

//#endregion
export { JsonRpcError, SuiHTTPStatusError, SuiHTTPTransportError };
//# sourceMappingURL=errors.mjs.map