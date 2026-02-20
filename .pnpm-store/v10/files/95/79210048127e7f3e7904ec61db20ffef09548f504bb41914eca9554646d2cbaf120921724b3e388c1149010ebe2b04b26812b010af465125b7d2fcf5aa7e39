//#region src/faucet/faucet.ts
var FaucetRateLimitError = class extends Error {};
async function faucetRequest({ host, path, body, headers, method }) {
	const endpoint = new URL(path, host).toString();
	const res = await fetch(endpoint, {
		method,
		body: body ? JSON.stringify(body) : void 0,
		headers: {
			"Content-Type": "application/json",
			...headers
		}
	});
	if (res.status === 429) throw new FaucetRateLimitError(`Too many requests from this client have been sent to the faucet. Please retry later`);
	try {
		return await res.json();
	} catch (e) {
		throw new Error(`Encountered error when parsing response from faucet, error: ${e}, status ${res.status}, response ${res}`);
	}
}
async function requestSuiFromFaucetV2(input) {
	const response = await faucetRequest({
		host: input.host,
		path: "/v2/gas",
		body: { FixedAmountRequest: { recipient: input.recipient } },
		headers: input.headers,
		method: "POST"
	});
	if (response.status !== "Success") throw new Error(`Faucet request failed: ${response.status.Failure.internal}`);
	return response;
}
function getFaucetHost(network) {
	switch (network) {
		case "testnet": return "https://faucet.testnet.sui.io";
		case "devnet": return "https://faucet.devnet.sui.io";
		case "localnet": return "http://127.0.0.1:9123";
		default: throw new Error(`Unknown network: ${network}`);
	}
}

//#endregion
export { FaucetRateLimitError, getFaucetHost, requestSuiFromFaucetV2 };
//# sourceMappingURL=faucet.mjs.map