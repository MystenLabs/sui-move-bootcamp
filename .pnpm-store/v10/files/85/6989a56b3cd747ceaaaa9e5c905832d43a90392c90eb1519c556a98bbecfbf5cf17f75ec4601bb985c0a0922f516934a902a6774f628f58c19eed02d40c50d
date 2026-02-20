import { Request } from "./requests.mjs";
import { verifyJwtSession } from "../jwt-session/index.mjs";
import { parse } from "valibot";

//#region src/web-wallet-channel/wallet-post-message-channel.ts
var WalletPostMessageChannel = class WalletPostMessageChannel {
	#request;
	#isSendCalled = false;
	constructor(request) {
		if (typeof window === "undefined" || !window.opener) throw new Error("This functionality requires a window opened through `window.open`. `window.opener` is not available.");
		this.#request = request;
	}
	static fromPayload(payload) {
		return new WalletPostMessageChannel(parse(Request, payload));
	}
	static fromUrlHash(hash = window.location.hash.slice(1)) {
		const decoded = atob(decodeURIComponent(hash));
		return new WalletPostMessageChannel(parse(Request, JSON.parse(decoded)));
	}
	getRequestData() {
		return this.#request;
	}
	async verifyJwtSession(secretKey) {
		if (!("session" in this.#request.payload)) return null;
		const session = await verifyJwtSession(this.#request.payload.session, secretKey);
		if (session.aud !== new URL(this.#request.appUrl).origin) throw new Error("App and session origin mismatch");
		const requestAddress = this.#request.payload.address;
		if (!session.payload.accounts.find((account) => account.address === requestAddress)) throw new Error("Requested account not found in session");
		return session;
	}
	sendMessage(payload) {
		if (this.#isSendCalled) throw new Error("sendMessage() can only be called once");
		this.#isSendCalled = true;
		window.opener.postMessage({
			id: this.#request.requestId,
			source: "web-wallet-channel",
			payload,
			version: this.#request.version
		}, this.#request.appUrl);
	}
	close(payload) {
		if (payload) this.sendMessage(payload);
		window.close();
	}
};

//#endregion
export { WalletPostMessageChannel };
//# sourceMappingURL=wallet-post-message-channel.mjs.map