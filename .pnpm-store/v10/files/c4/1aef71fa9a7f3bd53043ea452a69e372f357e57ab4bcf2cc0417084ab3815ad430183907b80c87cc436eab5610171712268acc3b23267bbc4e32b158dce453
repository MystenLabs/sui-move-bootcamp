//#region src/jsonRpc/network.ts
function getJsonRpcFullnodeUrl(network) {
	switch (network) {
		case "mainnet": return "https://fullnode.mainnet.sui.io:443";
		case "testnet": return "https://fullnode.testnet.sui.io:443";
		case "devnet": return "https://fullnode.devnet.sui.io:443";
		case "localnet": return "http://127.0.0.1:9000";
		default: throw new Error(`Unknown network: ${network}`);
	}
}

//#endregion
export { getJsonRpcFullnodeUrl };
//# sourceMappingURL=network.mjs.map