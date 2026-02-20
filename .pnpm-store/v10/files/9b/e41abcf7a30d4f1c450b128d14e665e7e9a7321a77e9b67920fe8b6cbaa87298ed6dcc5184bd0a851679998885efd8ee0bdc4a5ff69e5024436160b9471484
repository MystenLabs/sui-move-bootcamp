import { normalizeSuiNSName } from "../utils/suins.mjs";
import { isValidNamedPackage } from "../utils/move-registry.mjs";
import { isValidSuiAddress, isValidSuiObjectId, isValidTransactionDigest, normalizeSuiAddress, normalizeSuiObjectId } from "../utils/sui-types.mjs";
import { BaseClient } from "../client/client.mjs";
import { hasMvrName } from "../client/mvr.mjs";
import { JsonRpcHTTPTransport } from "./http-transport.mjs";
import { isTransaction } from "../transactions/Transaction.mjs";
import { JSONRpcCoreClient } from "./core.mjs";
import { fromBase58, toBase64, toHex } from "@mysten/bcs";

//#region src/jsonRpc/client.ts
const SUI_CLIENT_BRAND = Symbol.for("@mysten/SuiJsonRpcClient");
const COIN_RESERVATION_MAGIC = new Uint8Array([
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172,
	172
]);
/**
* Checks if a digest indicates a fake address balance coin.
* These "coins" are created by the JSON RPC to represent address balances
* and should be filtered out from coin listings.
*/
function isCoinReservationDigest(digestBase58) {
	return fromBase58(digestBase58).slice(12, 32).every((byte, i) => byte === COIN_RESERVATION_MAGIC[i]);
}
function isSuiJsonRpcClient(client) {
	return typeof client === "object" && client !== null && client[SUI_CLIENT_BRAND] === true;
}
var SuiJsonRpcClient = class extends BaseClient {
	get [SUI_CLIENT_BRAND]() {
		return true;
	}
	/**
	* Establish a connection to a Sui RPC endpoint
	*
	* @param options configuration options for the API Client
	*/
	constructor(options) {
		super({ network: options.network });
		this.jsonRpc = this;
		this.transport = options.transport ?? new JsonRpcHTTPTransport({ url: options.url });
		this.core = new JSONRpcCoreClient({
			jsonRpcClient: this,
			mvr: options.mvr
		});
	}
	async getRpcApiVersion({ signal } = {}) {
		return (await this.transport.request({
			method: "rpc.discover",
			params: [],
			signal
		})).info.version;
	}
	/**
	* Get all Coin<`coin_type`> objects owned by an address.
	*/
	async getCoins({ coinType, owner, cursor, limit, signal }) {
		if (!owner || !isValidSuiAddress(normalizeSuiAddress(owner))) throw new Error("Invalid Sui address");
		if (coinType && hasMvrName(coinType)) coinType = (await this.core.mvr.resolveType({ type: coinType })).type;
		const result = await this.transport.request({
			method: "suix_getCoins",
			params: [
				owner,
				coinType,
				cursor,
				limit
			],
			signal
		});
		return {
			...result,
			data: result.data.filter((coin) => !isCoinReservationDigest(coin.digest))
		};
	}
	/**
	* Get all Coin objects owned by an address.
	*/
	async getAllCoins(input) {
		if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) throw new Error("Invalid Sui address");
		const result = await this.transport.request({
			method: "suix_getAllCoins",
			params: [
				input.owner,
				input.cursor,
				input.limit
			],
			signal: input.signal
		});
		return {
			...result,
			data: result.data.filter((coin) => !isCoinReservationDigest(coin.digest))
		};
	}
	/**
	* Get the total coin balance for one coin type, owned by the address owner.
	*/
	async getBalance({ owner, coinType, signal }) {
		if (!owner || !isValidSuiAddress(normalizeSuiAddress(owner))) throw new Error("Invalid Sui address");
		if (coinType && hasMvrName(coinType)) coinType = (await this.core.mvr.resolveType({ type: coinType })).type;
		return await this.transport.request({
			method: "suix_getBalance",
			params: [owner, coinType],
			signal
		});
	}
	/**
	* Get the total coin balance for all coin types, owned by the address owner.
	*/
	async getAllBalances(input) {
		if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) throw new Error("Invalid Sui address");
		return await this.transport.request({
			method: "suix_getAllBalances",
			params: [input.owner],
			signal: input.signal
		});
	}
	/**
	* Fetch CoinMetadata for a given coin type
	*/
	async getCoinMetadata({ coinType, signal }) {
		if (coinType && hasMvrName(coinType)) coinType = (await this.core.mvr.resolveType({ type: coinType })).type;
		return await this.transport.request({
			method: "suix_getCoinMetadata",
			params: [coinType],
			signal
		});
	}
	/**
	*  Fetch total supply for a coin
	*/
	async getTotalSupply({ coinType, signal }) {
		if (coinType && hasMvrName(coinType)) coinType = (await this.core.mvr.resolveType({ type: coinType })).type;
		return await this.transport.request({
			method: "suix_getTotalSupply",
			params: [coinType],
			signal
		});
	}
	/**
	* Invoke any RPC method
	* @param method the method to be invoked
	* @param args the arguments to be passed to the RPC request
	*/
	async call(method, params, { signal } = {}) {
		return await this.transport.request({
			method,
			params,
			signal
		});
	}
	/**
	* Get Move function argument types like read, write and full access
	*/
	async getMoveFunctionArgTypes({ package: pkg, module, function: fn, signal }) {
		if (pkg && isValidNamedPackage(pkg)) pkg = (await this.core.mvr.resolvePackage({ package: pkg })).package;
		return await this.transport.request({
			method: "sui_getMoveFunctionArgTypes",
			params: [
				pkg,
				module,
				fn
			],
			signal
		});
	}
	/**
	* Get a map from module name to
	* structured representations of Move modules
	*/
	async getNormalizedMoveModulesByPackage({ package: pkg, signal }) {
		if (pkg && isValidNamedPackage(pkg)) pkg = (await this.core.mvr.resolvePackage({ package: pkg })).package;
		return await this.transport.request({
			method: "sui_getNormalizedMoveModulesByPackage",
			params: [pkg],
			signal
		});
	}
	/**
	* Get a structured representation of Move module
	*/
	async getNormalizedMoveModule({ package: pkg, module, signal }) {
		if (pkg && isValidNamedPackage(pkg)) pkg = (await this.core.mvr.resolvePackage({ package: pkg })).package;
		return await this.transport.request({
			method: "sui_getNormalizedMoveModule",
			params: [pkg, module],
			signal
		});
	}
	/**
	* Get a structured representation of Move function
	*/
	async getNormalizedMoveFunction({ package: pkg, module, function: fn, signal }) {
		if (pkg && isValidNamedPackage(pkg)) pkg = (await this.core.mvr.resolvePackage({ package: pkg })).package;
		return await this.transport.request({
			method: "sui_getNormalizedMoveFunction",
			params: [
				pkg,
				module,
				fn
			],
			signal
		});
	}
	/**
	* Get a structured representation of Move struct
	*/
	async getNormalizedMoveStruct({ package: pkg, module, struct, signal }) {
		if (pkg && isValidNamedPackage(pkg)) pkg = (await this.core.mvr.resolvePackage({ package: pkg })).package;
		return await this.transport.request({
			method: "sui_getNormalizedMoveStruct",
			params: [
				pkg,
				module,
				struct
			],
			signal
		});
	}
	/**
	* Get all objects owned by an address
	*/
	async getOwnedObjects(input) {
		if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) throw new Error("Invalid Sui address");
		const filter = input.filter ? { ...input.filter } : void 0;
		if (filter && "MoveModule" in filter && isValidNamedPackage(filter.MoveModule.package)) filter.MoveModule = {
			module: filter.MoveModule.module,
			package: (await this.core.mvr.resolvePackage({ package: filter.MoveModule.package })).package
		};
		else if (filter && "StructType" in filter && hasMvrName(filter.StructType)) filter.StructType = (await this.core.mvr.resolveType({ type: filter.StructType })).type;
		return await this.transport.request({
			method: "suix_getOwnedObjects",
			params: [
				input.owner,
				{
					filter,
					options: input.options
				},
				input.cursor,
				input.limit
			],
			signal: input.signal
		});
	}
	/**
	* Get details about an object
	*/
	async getObject(input) {
		if (!input.id || !isValidSuiObjectId(normalizeSuiObjectId(input.id))) throw new Error("Invalid Sui Object id");
		return await this.transport.request({
			method: "sui_getObject",
			params: [input.id, input.options],
			signal: input.signal
		});
	}
	async tryGetPastObject(input) {
		return await this.transport.request({
			method: "sui_tryGetPastObject",
			params: [
				input.id,
				input.version,
				input.options
			],
			signal: input.signal
		});
	}
	/**
	* Batch get details about a list of objects. If any of the object ids are duplicates the call will fail
	*/
	async multiGetObjects(input) {
		input.ids.forEach((id) => {
			if (!id || !isValidSuiObjectId(normalizeSuiObjectId(id))) throw new Error(`Invalid Sui Object id ${id}`);
		});
		if (input.ids.length !== new Set(input.ids).size) throw new Error(`Duplicate object ids in batch call ${input.ids}`);
		return await this.transport.request({
			method: "sui_multiGetObjects",
			params: [input.ids, input.options],
			signal: input.signal
		});
	}
	/**
	* Get transaction blocks for a given query criteria
	*/
	async queryTransactionBlocks({ filter, options, cursor, limit, order, signal }) {
		if (filter && "MoveFunction" in filter && isValidNamedPackage(filter.MoveFunction.package)) filter = {
			...filter,
			MoveFunction: { package: (await this.core.mvr.resolvePackage({ package: filter.MoveFunction.package })).package }
		};
		return await this.transport.request({
			method: "suix_queryTransactionBlocks",
			params: [
				{
					filter,
					options
				},
				cursor,
				limit,
				(order || "descending") === "descending"
			],
			signal
		});
	}
	async getTransactionBlock(input) {
		if (!isValidTransactionDigest(input.digest)) throw new Error("Invalid Transaction digest");
		return await this.transport.request({
			method: "sui_getTransactionBlock",
			params: [input.digest, input.options],
			signal: input.signal
		});
	}
	async multiGetTransactionBlocks(input) {
		input.digests.forEach((d) => {
			if (!isValidTransactionDigest(d)) throw new Error(`Invalid Transaction digest ${d}`);
		});
		if (input.digests.length !== new Set(input.digests).size) throw new Error(`Duplicate digests in batch call ${input.digests}`);
		return await this.transport.request({
			method: "sui_multiGetTransactionBlocks",
			params: [input.digests, input.options],
			signal: input.signal
		});
	}
	async executeTransactionBlock({ transactionBlock, signature, options, signal }) {
		return await this.transport.request({
			method: "sui_executeTransactionBlock",
			params: [
				typeof transactionBlock === "string" ? transactionBlock : toBase64(transactionBlock),
				Array.isArray(signature) ? signature : [signature],
				options
			],
			signal
		});
	}
	async signAndExecuteTransaction({ transaction, signer, ...input }) {
		let transactionBytes;
		if (transaction instanceof Uint8Array) transactionBytes = transaction;
		else {
			transaction.setSenderIfNotSet(signer.toSuiAddress());
			transactionBytes = await transaction.build({ client: this });
		}
		const { signature, bytes } = await signer.signTransaction(transactionBytes);
		return this.executeTransactionBlock({
			transactionBlock: bytes,
			signature,
			...input
		});
	}
	/**
	* Get total number of transactions
	*/
	async getTotalTransactionBlocks({ signal } = {}) {
		const resp = await this.transport.request({
			method: "sui_getTotalTransactionBlocks",
			params: [],
			signal
		});
		return BigInt(resp);
	}
	/**
	* Getting the reference gas price for the network
	*/
	async getReferenceGasPrice({ signal } = {}) {
		const resp = await this.transport.request({
			method: "suix_getReferenceGasPrice",
			params: [],
			signal
		});
		return BigInt(resp);
	}
	/**
	* Return the delegated stakes for an address
	*/
	async getStakes(input) {
		if (!input.owner || !isValidSuiAddress(normalizeSuiAddress(input.owner))) throw new Error("Invalid Sui address");
		return await this.transport.request({
			method: "suix_getStakes",
			params: [input.owner],
			signal: input.signal
		});
	}
	/**
	* Return the delegated stakes queried by id.
	*/
	async getStakesByIds(input) {
		input.stakedSuiIds.forEach((id) => {
			if (!id || !isValidSuiObjectId(normalizeSuiObjectId(id))) throw new Error(`Invalid Sui Stake id ${id}`);
		});
		return await this.transport.request({
			method: "suix_getStakesByIds",
			params: [input.stakedSuiIds],
			signal: input.signal
		});
	}
	/**
	* Return the latest system state content.
	*/
	async getLatestSuiSystemState({ signal } = {}) {
		return await this.transport.request({
			method: "suix_getLatestSuiSystemState",
			params: [],
			signal
		});
	}
	/**
	* Get events for a given query criteria
	*/
	async queryEvents({ query, cursor, limit, order, signal }) {
		if (query && "MoveEventType" in query && hasMvrName(query.MoveEventType)) query = {
			...query,
			MoveEventType: (await this.core.mvr.resolveType({ type: query.MoveEventType })).type
		};
		if (query && "MoveEventModule" in query && isValidNamedPackage(query.MoveEventModule.package)) query = {
			...query,
			MoveEventModule: {
				module: query.MoveEventModule.module,
				package: (await this.core.mvr.resolvePackage({ package: query.MoveEventModule.package })).package
			}
		};
		if ("MoveModule" in query && isValidNamedPackage(query.MoveModule.package)) query = {
			...query,
			MoveModule: {
				module: query.MoveModule.module,
				package: (await this.core.mvr.resolvePackage({ package: query.MoveModule.package })).package
			}
		};
		return await this.transport.request({
			method: "suix_queryEvents",
			params: [
				query,
				cursor,
				limit,
				(order || "descending") === "descending"
			],
			signal
		});
	}
	/**
	* Runs the transaction block in dev-inspect mode. Which allows for nearly any
	* transaction (or Move call) with any arguments. Detailed results are
	* provided, including both the transaction effects and any return values.
	*/
	async devInspectTransactionBlock(input) {
		let devInspectTxBytes;
		if (isTransaction(input.transactionBlock)) {
			input.transactionBlock.setSenderIfNotSet(input.sender);
			devInspectTxBytes = toBase64(await input.transactionBlock.build({
				client: this,
				onlyTransactionKind: true
			}));
		} else if (typeof input.transactionBlock === "string") devInspectTxBytes = input.transactionBlock;
		else if (input.transactionBlock instanceof Uint8Array) devInspectTxBytes = toBase64(input.transactionBlock);
		else throw new Error("Unknown transaction block format.");
		input.signal?.throwIfAborted();
		return await this.transport.request({
			method: "sui_devInspectTransactionBlock",
			params: [
				input.sender,
				devInspectTxBytes,
				input.gasPrice?.toString(),
				input.epoch
			],
			signal: input.signal
		});
	}
	/**
	* Dry run a transaction block and return the result.
	*/
	async dryRunTransactionBlock(input) {
		return await this.transport.request({
			method: "sui_dryRunTransactionBlock",
			params: [typeof input.transactionBlock === "string" ? input.transactionBlock : toBase64(input.transactionBlock)]
		});
	}
	/**
	* Return the list of dynamic field objects owned by an object
	*/
	async getDynamicFields(input) {
		if (!input.parentId || !isValidSuiObjectId(normalizeSuiObjectId(input.parentId))) throw new Error("Invalid Sui Object id");
		return await this.transport.request({
			method: "suix_getDynamicFields",
			params: [
				input.parentId,
				input.cursor,
				input.limit
			],
			signal: input.signal
		});
	}
	/**
	* Return the dynamic field object information for a specified object
	*/
	async getDynamicFieldObject(input) {
		return await this.transport.request({
			method: "suix_getDynamicFieldObject",
			params: [input.parentId, input.name],
			signal: input.signal
		});
	}
	/**
	* Get the sequence number of the latest checkpoint that has been executed
	*/
	async getLatestCheckpointSequenceNumber({ signal } = {}) {
		const resp = await this.transport.request({
			method: "sui_getLatestCheckpointSequenceNumber",
			params: [],
			signal
		});
		return String(resp);
	}
	/**
	* Returns information about a given checkpoint
	*/
	async getCheckpoint(input) {
		return await this.transport.request({
			method: "sui_getCheckpoint",
			params: [input.id],
			signal: input.signal
		});
	}
	/**
	* Returns historical checkpoints paginated
	*/
	async getCheckpoints(input) {
		return await this.transport.request({
			method: "sui_getCheckpoints",
			params: [
				input.cursor,
				input?.limit,
				input.descendingOrder
			],
			signal: input.signal
		});
	}
	/**
	* Return the committee information for the asked epoch
	*/
	async getCommitteeInfo(input) {
		return await this.transport.request({
			method: "suix_getCommitteeInfo",
			params: [input?.epoch],
			signal: input?.signal
		});
	}
	async getNetworkMetrics({ signal } = {}) {
		return await this.transport.request({
			method: "suix_getNetworkMetrics",
			params: [],
			signal
		});
	}
	async getAddressMetrics({ signal } = {}) {
		return await this.transport.request({
			method: "suix_getLatestAddressMetrics",
			params: [],
			signal
		});
	}
	async getEpochMetrics(input) {
		return await this.transport.request({
			method: "suix_getEpochMetrics",
			params: [
				input?.cursor,
				input?.limit,
				input?.descendingOrder
			],
			signal: input?.signal
		});
	}
	async getAllEpochAddressMetrics(input) {
		return await this.transport.request({
			method: "suix_getAllEpochAddressMetrics",
			params: [input?.descendingOrder],
			signal: input?.signal
		});
	}
	/**
	* Return the committee information for the asked epoch
	*/
	async getEpochs(input) {
		return await this.transport.request({
			method: "suix_getEpochs",
			params: [
				input?.cursor,
				input?.limit,
				input?.descendingOrder
			],
			signal: input?.signal
		});
	}
	/**
	* Returns list of top move calls by usage
	*/
	async getMoveCallMetrics({ signal } = {}) {
		return await this.transport.request({
			method: "suix_getMoveCallMetrics",
			params: [],
			signal
		});
	}
	/**
	* Return the committee information for the asked epoch
	*/
	async getCurrentEpoch({ signal } = {}) {
		return await this.transport.request({
			method: "suix_getCurrentEpoch",
			params: [],
			signal
		});
	}
	/**
	* Return the Validators APYs
	*/
	async getValidatorsApy({ signal } = {}) {
		return await this.transport.request({
			method: "suix_getValidatorsApy",
			params: [],
			signal
		});
	}
	async getChainIdentifier({ signal } = {}) {
		return toHex(fromBase58((await this.getCheckpoint({
			id: "0",
			signal
		})).digest).slice(0, 4));
	}
	async resolveNameServiceAddress(input) {
		return await this.transport.request({
			method: "suix_resolveNameServiceAddress",
			params: [input.name],
			signal: input.signal
		});
	}
	async resolveNameServiceNames({ format = "dot", ...input }) {
		const { nextCursor, hasNextPage, data } = await this.transport.request({
			method: "suix_resolveNameServiceNames",
			params: [
				input.address,
				input.cursor,
				input.limit
			],
			signal: input.signal
		});
		return {
			hasNextPage,
			nextCursor,
			data: data.map((name) => normalizeSuiNSName(name, format))
		};
	}
	async getProtocolConfig(input) {
		return await this.transport.request({
			method: "sui_getProtocolConfig",
			params: [input?.version],
			signal: input?.signal
		});
	}
	async verifyZkLoginSignature(input) {
		return await this.transport.request({
			method: "sui_verifyZkLoginSignature",
			params: [
				input.bytes,
				input.signature,
				input.intentScope,
				input.author
			],
			signal: input.signal
		});
	}
	/**
	* Wait for a transaction block result to be available over the API.
	* This can be used in conjunction with `executeTransactionBlock` to wait for the transaction to
	* be available via the API.
	* This currently polls the `getTransactionBlock` API to check for the transaction.
	*/
	async waitForTransaction({ signal, timeout = 60 * 1e3, pollInterval = 2 * 1e3, ...input }) {
		const timeoutSignal = AbortSignal.timeout(timeout);
		const timeoutPromise = new Promise((_, reject) => {
			timeoutSignal.addEventListener("abort", () => reject(timeoutSignal.reason));
		});
		timeoutPromise.catch(() => {});
		while (!timeoutSignal.aborted) {
			signal?.throwIfAborted();
			try {
				return await this.getTransactionBlock(input);
			} catch {
				await Promise.race([new Promise((resolve) => setTimeout(resolve, pollInterval)), timeoutPromise]);
			}
		}
		timeoutSignal.throwIfAborted();
		throw new Error("Unexpected error while waiting for transaction block.");
	}
};

//#endregion
export { SuiJsonRpcClient, isSuiJsonRpcClient };
//# sourceMappingURL=client.mjs.map