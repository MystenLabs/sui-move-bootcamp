import { bcs as suiBcs } from "../../bcs/index.mjs";
import { coreClientResolveTransactionPlugin } from "../../client/core-resolver.mjs";
import { isTransaction } from "../Transaction.mjs";
import { ObjectCache } from "../ObjectCache.mjs";

//#region src/transactions/executor/caching.ts
var CachingTransactionExecutor = class {
	#client;
	#lastDigest = null;
	constructor({ client, ...options }) {
		this.#client = client;
		this.cache = new ObjectCache(options);
	}
	/**
	* Clears all Owned objects
	* Immutable objects, Shared objects, and Move function definitions will be preserved
	*/
	async reset() {
		await Promise.all([
			this.cache.clearOwnedObjects(),
			this.cache.clearCustom(),
			this.waitForLastTransaction()
		]);
	}
	async buildTransaction({ transaction, ...options }) {
		transaction.addBuildPlugin(this.cache.asPlugin());
		transaction.addBuildPlugin(coreClientResolveTransactionPlugin);
		return transaction.build({
			client: this.#client,
			...options
		});
	}
	async executeTransaction({ transaction, signatures, include }) {
		const bytes = isTransaction(transaction) ? await this.buildTransaction({ transaction }) : transaction;
		const results = await this.#client.core.executeTransaction({
			transaction: bytes,
			signatures,
			include: {
				...include,
				effects: true
			}
		});
		const tx = results.$kind === "Transaction" ? results.Transaction : results.FailedTransaction;
		if (tx.effects?.bcs) {
			const effects = suiBcs.TransactionEffects.parse(tx.effects.bcs);
			await this.applyEffects(effects);
		}
		return results;
	}
	async signAndExecuteTransaction({ include, transaction, signer }) {
		transaction.setSenderIfNotSet(signer.toSuiAddress());
		const bytes = await this.buildTransaction({ transaction });
		const { signature } = await signer.signTransaction(bytes);
		return this.executeTransaction({
			transaction: bytes,
			signatures: [signature],
			include
		});
	}
	async applyEffects(effects) {
		this.#lastDigest = effects.V2?.transactionDigest ?? null;
		await this.cache.applyEffects(effects);
	}
	async waitForLastTransaction() {
		if (this.#lastDigest) {
			await this.#client.core.waitForTransaction({ digest: this.#lastDigest });
			this.#lastDigest = null;
		}
	}
};

//#endregion
export { CachingTransactionExecutor };
//# sourceMappingURL=caching.mjs.map