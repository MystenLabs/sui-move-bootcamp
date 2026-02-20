//#region src/jsonRpc/errors.d.ts
declare class SuiHTTPTransportError extends Error {}
declare class JsonRpcError extends SuiHTTPTransportError {
  code: number;
  type: string;
  constructor(message: string, code: number);
}
declare class SuiHTTPStatusError extends SuiHTTPTransportError {
  status: number;
  statusText: string;
  constructor(message: string, status: number, statusText: string);
}
//#endregion
export { JsonRpcError, SuiHTTPStatusError, SuiHTTPTransportError };
//# sourceMappingURL=errors.d.mts.map