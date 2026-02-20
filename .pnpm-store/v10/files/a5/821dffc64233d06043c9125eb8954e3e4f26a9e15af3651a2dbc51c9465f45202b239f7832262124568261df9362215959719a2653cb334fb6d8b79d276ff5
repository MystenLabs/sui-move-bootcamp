import { PACKAGE_VERSION, TARGETED_RPC_VERSION } from "../version.mjs";
import { JsonRpcError, SuiHTTPStatusError } from "./errors.mjs";
import { WebsocketClient } from "./rpc-websocket-client.mjs";

//#region src/jsonRpc/http-transport.ts
var JsonRpcHTTPTransport = class {
	#requestId = 0;
	#options;
	#websocketClient;
	constructor(options) {
		this.#options = options;
	}
	fetch(input, init) {
		const fetchFn = this.#options.fetch ?? fetch;
		if (!fetchFn) throw new Error("The current environment does not support fetch, you can provide a fetch implementation in the options for SuiHTTPTransport.");
		return fetchFn(input, init);
	}
	#getWebsocketClient() {
		if (!this.#websocketClient) {
			const WebSocketConstructor = this.#options.WebSocketConstructor ?? WebSocket;
			if (!WebSocketConstructor) throw new Error("The current environment does not support WebSocket, you can provide a WebSocketConstructor in the options for SuiHTTPTransport.");
			this.#websocketClient = new WebsocketClient(this.#options.websocket?.url ?? this.#options.url, {
				WebSocketConstructor,
				...this.#options.websocket
			});
		}
		return this.#websocketClient;
	}
	async request(input) {
		this.#requestId += 1;
		const res = await this.fetch(this.#options.rpc?.url ?? this.#options.url, {
			method: "POST",
			signal: input.signal,
			headers: {
				"Content-Type": "application/json",
				"Client-Sdk-Type": "typescript",
				"Client-Sdk-Version": PACKAGE_VERSION,
				"Client-Target-Api-Version": TARGETED_RPC_VERSION,
				"Client-Request-Method": input.method,
				...this.#options.rpc?.headers
			},
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: this.#requestId,
				method: input.method,
				params: input.params
			})
		});
		if (!res.ok) throw new SuiHTTPStatusError(`Unexpected status code: ${res.status}`, res.status, res.statusText);
		const data = await res.json();
		if ("error" in data && data.error != null) throw new JsonRpcError(data.error.message, data.error.code);
		return data.result;
	}
	async subscribe(input) {
		const unsubscribe = await this.#getWebsocketClient().subscribe(input);
		if (input.signal) {
			input.signal.throwIfAborted();
			input.signal.addEventListener("abort", () => {
				unsubscribe();
			});
		}
		return async () => !!await unsubscribe();
	}
};

//#endregion
export { JsonRpcHTTPTransport };
//# sourceMappingURL=http-transport.mjs.map