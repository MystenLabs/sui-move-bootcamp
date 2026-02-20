import { WebsocketClientOptions } from "./rpc-websocket-client.mjs";

//#region src/jsonRpc/http-transport.d.ts

/**
 * An object defining headers to be passed to the RPC server
 */
type HttpHeaders = {
  [header: string]: string;
};
interface JsonRpcHTTPTransportOptions {
  fetch?: typeof fetch;
  WebSocketConstructor?: typeof WebSocket;
  url: string;
  rpc?: {
    headers?: HttpHeaders;
    url?: string;
  };
  websocket?: WebsocketClientOptions & {
    url?: string;
  };
}
interface JsonRpcTransportRequestOptions {
  method: string;
  params: unknown[];
  signal?: AbortSignal;
}
interface JsonRpcTransportSubscribeOptions<T> {
  method: string;
  unsubscribe: string;
  params: unknown[];
  onMessage: (event: T) => void;
  signal?: AbortSignal;
}
interface JsonRpcTransport {
  request<T = unknown>(input: JsonRpcTransportRequestOptions): Promise<T>;
  subscribe<T = unknown>(input: JsonRpcTransportSubscribeOptions<T>): Promise<() => Promise<boolean>>;
}
declare class JsonRpcHTTPTransport implements JsonRpcTransport {
  #private;
  constructor(options: JsonRpcHTTPTransportOptions);
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
  request<T>(input: JsonRpcTransportRequestOptions): Promise<T>;
  subscribe<T>(input: JsonRpcTransportSubscribeOptions<T>): Promise<() => Promise<boolean>>;
}
//#endregion
export { HttpHeaders, JsonRpcHTTPTransport, JsonRpcHTTPTransportOptions, JsonRpcTransport, JsonRpcTransportRequestOptions, JsonRpcTransportSubscribeOptions };
//# sourceMappingURL=http-transport.d.mts.map