import { Response } from "./responses.mjs";
import { getClientMetadata } from "./utils.mjs";
import { safeParse } from "valibot";
import { promiseWithResolvers } from "@mysten/utils";

//#region src/web-wallet-channel/dapp-post-message-channel.ts
var DappPostMessageChannel = class {
	#popup;
	#version = "1";
	#id;
	#hostOrigin;
	#hostPathname;
	#appName;
	#extraRequestOptions;
	#promise;
	#resolve;
	#reject;
	#interval = null;
	#isSendCalled = false;
	constructor({ appName, hostOrigin, hostPathname = "dapp-request", extraRequestOptions, popupWindow }) {
		const popup = popupWindow ?? window.open("about:blank", "_blank");
		if (!popup) throw new Error("Failed to open new window");
		this.#id = crypto.randomUUID();
		this.#popup = popup;
		this.#hostOrigin = hostOrigin;
		this.#hostPathname = hostPathname;
		this.#appName = appName;
		const { promise, resolve, reject } = promiseWithResolvers();
		this.#promise = promise;
		this.#resolve = resolve;
		this.#reject = reject;
		this.#extraRequestOptions = extraRequestOptions;
		this.#interval = setInterval(() => {
			try {
				if (this.#popup.closed) {
					this.#cleanup();
					reject(/* @__PURE__ */ new Error("User closed the wallet window"));
				}
			} catch {}
		}, 1e3);
	}
	send({ type, ...data }) {
		if (this.#popup.closed) throw new Error("User closed the wallet window");
		if (this.#isSendCalled) throw new Error("send() can only be called once");
		this.#isSendCalled = true;
		window.addEventListener("message", this.#listener);
		const requestData = {
			version: this.#version,
			requestId: this.#id,
			appUrl: window.location.href.split("#")[0],
			appName: this.#appName,
			payload: {
				type,
				...data
			},
			metadata: getClientMetadata(),
			extraRequestOptions: this.#extraRequestOptions
		};
		const encodedRequestData = encodeURIComponent(btoa(JSON.stringify(requestData)));
		this.#popup.location.assign(`${this.#hostOrigin}/${this.#hostPathname}#${encodedRequestData}`);
		return this.#promise;
	}
	close() {
		this.#cleanup();
		this.#popup.close();
	}
	#listener = (event) => {
		if (event.origin !== this.#hostOrigin) return;
		const { success, output } = safeParse(Response, event.data);
		if (!success || output.id !== this.#id) return;
		this.#cleanup();
		if (output.payload.type === "reject") this.#reject(/* @__PURE__ */ new Error("User rejected the request"));
		else if (output.payload.type === "resolve") this.#resolve(output.payload.data);
	};
	#cleanup() {
		if (this.#interval) {
			clearInterval(this.#interval);
			this.#interval = null;
		}
		window.removeEventListener("message", this.#listener);
	}
};

//#endregion
export { DappPostMessageChannel };
//# sourceMappingURL=dapp-post-message-channel.mjs.map