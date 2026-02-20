import { Transaction, isTransaction } from "../Transaction.mjs";
import { CachingTransactionExecutor } from "./caching.mjs";
import { SerialQueue } from "./queue.mjs";

//#region src/transactions/executor/serial.ts
const EPOCH_BOUNDARY_WINDOW = 6e4;
var SerialTransactionExecutor = class {
	#queue = new SerialQueue();
	#signer;
	#client;
	#cache;
	#defaultGasBudget;
	#gasMode;
	#epochInfo = null;
	#epochInfoPromise = null;
	constructor(options) {
		const { signer, defaultGasBudget = 50000000n, client, cache } = options;
		this.#signer = signer;
		this.#client = client;
		this.#defaultGasBudget = defaultGasBudget;
		this.#gasMode = options.gasMode ?? "coins";
		this.#cache = new CachingTransactionExecutor({
			client,
			cache,
			onEffects: (effects) => this.#cacheGasCoin(effects)
		});
	}
	async applyEffects(effects) {
		return this.#cache.applyEffects(effects);
	}
	#cacheGasCoin = async (effects) => {
		if (this.#gasMode === "addressBalance" || !effects.V2) return;
		const gasCoin = getGasCoinFromEffects(effects).ref;
		if (gasCoin) this.#cache.cache.setCustom("gasCoin", gasCoin);
		else this.#cache.cache.deleteCustom("gasCoin");
	};
	async buildTransaction(transaction) {
		return this.#queue.runTask(() => this.#buildTransaction(transaction));
	}
	#buildTransaction = async (transaction) => {
		await transaction.prepareForSerialization({
			client: this.#client,
			supportedIntents: ["CoinWithBalance"]
		});
		const copy = Transaction.from(transaction);
		if (this.#gasMode === "addressBalance") {
			copy.setGasPayment([]);
			copy.setExpiration(await this.#getValidDuringExpiration());
		} else {
			const gasCoin = await this.#cache.cache.getCustom("gasCoin");
			if (gasCoin) copy.setGasPayment([gasCoin]);
		}
		copy.setGasBudgetIfNotSet(this.#defaultGasBudget);
		copy.setSenderIfNotSet(this.#signer.toSuiAddress());
		return this.#cache.buildTransaction({ transaction: copy });
	};
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
			expiration: Number(systemState.epochStartTimestampMs) + Number(systemState.parameters.epochDurationMs),
			chainIdentifier
		};
	}
	resetCache() {
		return this.#cache.reset();
	}
	waitForLastTransaction() {
		return this.#cache.waitForLastTransaction();
	}
	executeTransaction(transaction, include, additionalSignatures = []) {
		return this.#queue.runTask(async () => {
			const bytes = isTransaction(transaction) ? await this.#buildTransaction(transaction) : transaction;
			const { signature } = await this.#signer.signTransaction(bytes);
			return this.#cache.executeTransaction({
				signatures: [signature, ...additionalSignatures],
				transaction: bytes,
				include
			}).catch(async (error) => {
				await this.resetCache();
				throw error;
			});
		});
	}
};
function getGasCoinFromEffects(effects) {
	if (!effects.V2) throw new Error("Unexpected effects version");
	const gasObjectChange = effects.V2.changedObjects[effects.V2.gasObjectIndex];
	if (!gasObjectChange) throw new Error("Gas object not found in effects");
	const [objectId, { outputState }] = gasObjectChange;
	if (!outputState.ObjectWrite) throw new Error("Unexpected gas object state");
	const [digest, owner] = outputState.ObjectWrite;
	return {
		ref: {
			objectId,
			digest,
			version: effects.V2.lamportVersion
		},
		owner: owner.AddressOwner || owner.ObjectOwner
	};
}

//#endregion
export { SerialTransactionExecutor };
//# sourceMappingURL=serial.mjs.map