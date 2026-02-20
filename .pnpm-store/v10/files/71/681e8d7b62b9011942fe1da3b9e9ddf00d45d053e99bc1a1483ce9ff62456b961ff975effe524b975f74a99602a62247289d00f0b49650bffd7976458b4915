import { BaseClient } from "../client/client.mjs";
import { GraphQLCoreClient } from "./core.mjs";
import { print } from "graphql";

//#region src/graphql/client.ts
var SuiGraphQLRequestError = class extends Error {};
const SUI_CLIENT_BRAND = Symbol.for("@mysten/SuiGraphQLClient");
function isSuiGraphQLClient(client) {
	return typeof client === "object" && client !== null && client[SUI_CLIENT_BRAND] === true;
}
var SuiGraphQLClient = class extends BaseClient {
	#url;
	#queries;
	#headers;
	#fetch;
	get mvr() {
		return this.core.mvr;
	}
	get [SUI_CLIENT_BRAND]() {
		return true;
	}
	constructor({ url, fetch: fetchFn = fetch, headers = {}, queries = {}, network, mvr }) {
		super({ network });
		this.#url = url;
		this.#queries = queries;
		this.#headers = headers;
		this.#fetch = (...args) => fetchFn(...args);
		this.core = new GraphQLCoreClient({
			graphqlClient: this,
			mvr
		});
	}
	async query(options) {
		const res = await this.#fetch(this.#url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...this.#headers
			},
			body: JSON.stringify({
				query: typeof options.query === "string" || options.query instanceof String ? String(options.query) : print(options.query),
				variables: options.variables,
				extensions: options.extensions,
				operationName: options.operationName
			}),
			signal: options.signal
		});
		if (!res.ok) throw new SuiGraphQLRequestError(`GraphQL request failed: ${res.statusText} (${res.status})`);
		return await res.json();
	}
	async execute(query, options) {
		return this.query({
			...options,
			query: this.#queries[query]
		});
	}
	getObjects(input) {
		return this.core.getObjects(input);
	}
	getObject(input) {
		return this.core.getObject(input);
	}
	listCoins(input) {
		return this.core.listCoins(input);
	}
	listOwnedObjects(input) {
		return this.core.listOwnedObjects(input);
	}
	getBalance(input) {
		return this.core.getBalance(input);
	}
	listBalances(input) {
		return this.core.listBalances(input);
	}
	getCoinMetadata(input) {
		return this.core.getCoinMetadata(input);
	}
	getTransaction(input) {
		return this.core.getTransaction(input);
	}
	executeTransaction(input) {
		return this.core.executeTransaction(input);
	}
	signAndExecuteTransaction(input) {
		return this.core.signAndExecuteTransaction(input);
	}
	waitForTransaction(input) {
		return this.core.waitForTransaction(input);
	}
	simulateTransaction(input) {
		return this.core.simulateTransaction(input);
	}
	getReferenceGasPrice() {
		return this.core.getReferenceGasPrice();
	}
	listDynamicFields(input) {
		return this.core.listDynamicFields(input);
	}
	getDynamicField(input) {
		return this.core.getDynamicField(input);
	}
	getMoveFunction(input) {
		return this.core.getMoveFunction(input);
	}
	resolveTransactionPlugin() {
		return this.core.resolveTransactionPlugin();
	}
	verifyZkLoginSignature(input) {
		return this.core.verifyZkLoginSignature(input);
	}
	defaultNameServiceName(input) {
		return this.core.defaultNameServiceName(input);
	}
};

//#endregion
export { SuiGraphQLClient, SuiGraphQLRequestError, isSuiGraphQLClient };
//# sourceMappingURL=client.mjs.map