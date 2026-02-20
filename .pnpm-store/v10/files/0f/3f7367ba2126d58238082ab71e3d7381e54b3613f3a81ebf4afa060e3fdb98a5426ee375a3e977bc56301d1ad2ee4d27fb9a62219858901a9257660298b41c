import { TransactionDataBuilder } from "../TransactionData.mjs";
import { coreClientResolveTransactionPlugin } from "../../client/core-resolver.mjs";
import { Transaction } from "../Transaction.mjs";
import { CachingTransactionExecutor } from "./caching.mjs";
import { ParallelQueue, SerialQueue } from "./queue.mjs";
import { promiseWithResolvers } from "@mysten/utils";

//#region src/transactions/executor/parallel.ts
const PARALLEL_EXECUTOR_DEFAULTS = {
	coinBatchSize: 20,
	initialCoinBalance: 200000000n,
	minimumCoinBalance: 50000000n,
	maxPoolSize: 50
};
const EPOCH_BOUNDARY_WINDOW = 6e4;
var ParallelTransactionExecutor = class {
	#signer;
	#client;
	#gasMode;
	#coinBatchSize;
	#initialCoinBalance;
	#minimumCoinBalance;
	#defaultGasBudget;
	#maxPoolSize;
	#sourceCoins;
	#coinPool = [];
	#cache;
	#objectIdQueues = /* @__PURE__ */ new Map();
	#buildQueue = new SerialQueue();
	#executeQueue;
	#lastDigest = null;
	#cacheLock = null;
	#pendingTransactions = 0;
	#epochInfo = null;
	#epochInfoPromise = null;
	constructor(options) {
		this.#signer = options.signer;
		this.#client = options.client;
		this.#gasMode = options.gasMode ?? "coins";
		if (this.#gasMode === "coins") {
			const coinOptions = options;
			this.#coinBatchSize = coinOptions.coinBatchSize ?? PARALLEL_EXECUTOR_DEFAULTS.coinBatchSize;
			this.#initialCoinBalance = coinOptions.initialCoinBalance ?? PARALLEL_EXECUTOR_DEFAULTS.initialCoinBalance;
			this.#minimumCoinBalance = coinOptions.minimumCoinBalance ?? PARALLEL_EXECUTOR_DEFAULTS.minimumCoinBalance;
			this.#sourceCoins = coinOptions.sourceCoins ? new Map(coinOptions.sourceCoins.map((id) => [id, null])) : null;
		} else {
			this.#coinBatchSize = 0;
			this.#initialCoinBalance = 0n;
			this.#minimumCoinBalance = PARALLEL_EXECUTOR_DEFAULTS.minimumCoinBalance;
			this.#sourceCoins = null;
		}
		this.#defaultGasBudget = options.defaultGasBudget ?? this.#minimumCoinBalance;
		this.#maxPoolSize = options.maxPoolSize ?? PARALLEL_EXECUTOR_DEFAULTS.maxPoolSize;
		this.#cache = new CachingTransactionExecutor({
			client: options.client,
			cache: options.cache
		});
		this.#executeQueue = new ParallelQueue(this.#maxPoolSize);
	}
	resetCache() {
		this.#epochInfo = null;
		return this.#updateCache(() => this.#cache.reset());
	}
	async waitForLastTransaction() {
		await this.#updateCache(() => this.#waitForLastDigest());
	}
	async executeTransaction(transaction, include, additionalSignatures = []) {
		const { promise, resolve, reject } = promiseWithResolvers();
		const usedObjects = await this.#getUsedObjects(transaction);
		const execute = () => {
			this.#executeQueue.runTask(() => {
				return this.#execute(transaction, usedObjects, include, additionalSignatures).then(resolve, reject);
			});
		};
		const conflicts = /* @__PURE__ */ new Set();
		usedObjects.forEach((objectId) => {
			if (this.#objectIdQueues.get(objectId)) {
				conflicts.add(objectId);
				this.#objectIdQueues.get(objectId).push(() => {
					conflicts.delete(objectId);
					if (conflicts.size === 0) execute();
				});
			} else this.#objectIdQueues.set(objectId, []);
		});
		if (conflicts.size === 0) execute();
		return promise;
	}
	async #getUsedObjects(transaction) {
		const usedObjects = /* @__PURE__ */ new Set();
		let serialized = false;
		transaction.addSerializationPlugin(async (blockData, _options, next) => {
			await next();
			if (serialized) return;
			serialized = true;
			blockData.inputs.forEach((input) => {
				if (input.Object?.ImmOrOwnedObject?.objectId) usedObjects.add(input.Object.ImmOrOwnedObject.objectId);
				else if (input.Object?.Receiving?.objectId) usedObjects.add(input.Object.Receiving.objectId);
				else if (input.UnresolvedObject?.objectId && !input.UnresolvedObject.initialSharedVersion) usedObjects.add(input.UnresolvedObject.objectId);
			});
		});
		await transaction.prepareForSerialization({ client: this.#client });
		return usedObjects;
	}
	async #execute(transaction, usedObjects, include, additionalSignatures = []) {
		let gasCoin = null;
		try {
			transaction.setSenderIfNotSet(this.#signer.toSuiAddress());
			await this.#buildQueue.runTask(async () => {
				if (!transaction.getData().gasData.price) transaction.setGasPrice(await this.#getGasPrice());
				transaction.setGasBudgetIfNotSet(this.#defaultGasBudget);
				await this.#updateCache();
				this.#pendingTransactions++;
				if (this.#gasMode === "addressBalance") {
					transaction.setGasPayment([]);
					transaction.setExpiration(await this.#getValidDuringExpiration());
				} else {
					gasCoin = await this.#getGasCoin();
					transaction.setGasPayment([{
						objectId: gasCoin.id,
						version: gasCoin.version,
						digest: gasCoin.digest
					}]);
				}
				await this.#cache.buildTransaction({
					transaction,
					onlyTransactionKind: true
				});
			});
			const bytes = await transaction.build({ client: this.#client });
			const { signature } = await this.#signer.signTransaction(bytes);
			const results = await this.#cache.executeTransaction({
				transaction: bytes,
				signatures: [signature, ...additionalSignatures],
				include
			});
			const tx = results.$kind === "Transaction" ? results.Transaction : results.FailedTransaction;
			const effects = tx.effects;
			const gasObject = effects.gasObject;
			const gasUsed = effects.gasUsed;
			if (gasCoin && gasUsed && gasObject) {
				const coin = gasCoin;
				if ((gasObject.outputOwner?.AddressOwner ?? gasObject.outputOwner?.ObjectOwner) === this.#signer.toSuiAddress()) {
					const totalUsed = BigInt(gasUsed.computationCost) + BigInt(gasUsed.storageCost) + BigInt(gasUsed.storageCost) - BigInt(gasUsed.storageRebate);
					const remainingBalance = coin.balance - totalUsed;
					let usesGasCoin = false;
					new TransactionDataBuilder(transaction.getData()).mapArguments((arg) => {
						if (arg.$kind === "GasCoin") usesGasCoin = true;
						return arg;
					});
					const gasRef = {
						objectId: gasObject.objectId,
						version: gasObject.outputVersion,
						digest: gasObject.outputDigest
					};
					if (!usesGasCoin && remainingBalance >= this.#minimumCoinBalance) this.#coinPool.push({
						id: gasRef.objectId,
						version: gasRef.version,
						digest: gasRef.digest,
						balance: remainingBalance
					});
					else {
						if (!this.#sourceCoins) this.#sourceCoins = /* @__PURE__ */ new Map();
						this.#sourceCoins.set(gasRef.objectId, gasRef);
					}
				}
			}
			this.#lastDigest = tx.digest;
			return results;
		} catch (error) {
			if (gasCoin) {
				if (!this.#sourceCoins) this.#sourceCoins = /* @__PURE__ */ new Map();
				this.#sourceCoins.set(gasCoin.id, null);
			}
			await this.#updateCache(async () => {
				await Promise.all([this.#cache.cache.deleteObjects([...usedObjects]), this.#waitForLastDigest()]);
			});
			throw error;
		} finally {
			usedObjects.forEach((objectId) => {
				const queue = this.#objectIdQueues.get(objectId);
				if (queue && queue.length > 0) queue.shift()();
				else if (queue) this.#objectIdQueues.delete(objectId);
			});
			this.#pendingTransactions--;
		}
	}
	/** Helper for synchronizing cache updates, by ensuring only one update happens at a time.  This can also be used to wait for any pending cache updates  */
	async #updateCache(fn) {
		if (this.#cacheLock) await this.#cacheLock;
		this.#cacheLock = fn?.().then(() => {
			this.#cacheLock = null;
		}, () => {}) ?? null;
	}
	async #waitForLastDigest() {
		const digest = this.#lastDigest;
		if (digest) {
			this.#lastDigest = null;
			await this.#client.core.waitForTransaction({ digest });
		}
	}
	async #getGasCoin() {
		if (this.#coinPool.length === 0 && this.#pendingTransactions <= this.#maxPoolSize) await this.#refillCoinPool();
		if (this.#coinPool.length === 0) throw new Error("No coins available");
		return this.#coinPool.shift();
	}
	async #getGasPrice() {
		await this.#ensureEpochInfo();
		return this.#epochInfo.price;
	}
	async #getValidDuringExpiration() {
		await this.#ensureEpochInfo();
		const currentEpoch = BigInt(this.#epochInfo.epoch);
		return { ValidDuring: {
			minEpoch: String(currentEpoch),
			maxEpoch: String(currentEpoch + 1n),
			minTimestamp: null,
			maxTimestamp: null,
			chain: this.#epochInfo.chainIdentifier,
			nonce: Math.random() * 4294967296 >>> 0
		} };
	}
	async #ensureEpochInfo() {
		if (this.#epochInfo && this.#epochInfo.expiration - EPOCH_BOUNDARY_WINDOW - Date.now() > 0) return;
		if (this.#epochInfoPromise) {
			await this.#epochInfoPromise;
			return;
		}
		this.#epochInfoPromise = this.#fetchEpochInfo();
		try {
			await this.#epochInfoPromise;
		} finally {
			this.#epochInfoPromise = null;
		}
	}
	async #fetchEpochInfo() {
		const [{ systemState }, { chainIdentifier }] = await Promise.all([this.#client.core.getCurrentSystemState(), this.#client.core.getChainIdentifier()]);
		this.#epochInfo = {
			epoch: systemState.epoch,
			price: BigInt(systemState.referenceGasPrice),
			expiration: Number(systemState.epochStartTimestampMs) + Number(systemState.parameters.epochDurationMs),
			chainIdentifier
		};
	}
	async #refillCoinPool() {
		const batchSize = Math.min(this.#coinBatchSize, this.#maxPoolSize - (this.#coinPool.length + this.#pendingTransactions) + 1);
		if (batchSize === 0) return;
		const txb = new Transaction();
		const address = this.#signer.toSuiAddress();
		txb.setSender(address);
		if (this.#sourceCoins) {
			const refs = [];
			const ids = [];
			for (const [id, ref] of this.#sourceCoins) if (ref) refs.push(ref);
			else ids.push(id);
			if (ids.length > 0) {
				const { objects } = await this.#client.core.getObjects({ objectIds: ids });
				refs.push(...objects.filter((obj) => !(obj instanceof Error)).map((obj) => ({
					objectId: obj.objectId,
					version: obj.version,
					digest: obj.digest
				})));
			}
			txb.setGasPayment(refs);
			this.#sourceCoins = /* @__PURE__ */ new Map();
		}
		const amounts = new Array(batchSize).fill(this.#initialCoinBalance);
		const splitResults = txb.splitCoins(txb.gas, amounts);
		const coinResults = [];
		for (let i = 0; i < amounts.length; i++) coinResults.push(splitResults[i]);
		txb.transferObjects(coinResults, address);
		await this.waitForLastTransaction();
		txb.addBuildPlugin(coreClientResolveTransactionPlugin);
		const bytes = await txb.build({ client: this.#client });
		const { signature } = await this.#signer.signTransaction(bytes);
		const result = await this.#client.core.executeTransaction({
			transaction: bytes,
			signatures: [signature],
			include: { effects: true }
		});
		const tx = result.$kind === "Transaction" ? result.Transaction : result.FailedTransaction;
		const effects = tx.effects;
		effects.changedObjects.forEach((changedObj) => {
			if (changedObj.objectId === effects.gasObject?.objectId || changedObj.outputState !== "ObjectWrite") return;
			this.#coinPool.push({
				id: changedObj.objectId,
				version: changedObj.outputVersion,
				digest: changedObj.outputDigest,
				balance: BigInt(this.#initialCoinBalance)
			});
		});
		if (!this.#sourceCoins) this.#sourceCoins = /* @__PURE__ */ new Map();
		const gasObject = effects.gasObject;
		this.#sourceCoins.set(gasObject.objectId, {
			objectId: gasObject.objectId,
			version: gasObject.outputVersion,
			digest: gasObject.outputDigest
		});
		await this.#client.core.waitForTransaction({ digest: tx.digest });
	}
};

//#endregion
export { ParallelTransactionExecutor };
//# sourceMappingURL=parallel.mjs.map