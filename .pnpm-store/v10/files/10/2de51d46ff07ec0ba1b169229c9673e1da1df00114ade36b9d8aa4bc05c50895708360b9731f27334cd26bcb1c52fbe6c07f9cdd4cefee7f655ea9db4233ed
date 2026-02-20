import { normalizeSuiAddress } from "../utils/sui-types.mjs";
import { ArgumentSchema, NormalizedCallArg, ObjectRefSchema, TransactionExpiration } from "./data/internal.mjs";
import { serializeV1TransactionData } from "./data/v1.mjs";
import { getIdFromCallArg } from "./utils.mjs";
import { TransactionDataBuilder } from "./TransactionData.mjs";
import { TransactionCommands } from "./Commands.mjs";
import { SerializedTransactionDataV2Schema } from "./data/v2.mjs";
import { Inputs } from "./Inputs.mjs";
import { needsTransactionResolution, resolveTransactionPlugin } from "./resolve.mjs";
import { createObjectMethods } from "./object.mjs";
import { createPure } from "./pure.mjs";
import { namedPackagesPlugin } from "./plugins/NamedPackagesPlugin.mjs";
import { COIN_WITH_BALANCE, resolveCoinBalance } from "./intents/CoinWithBalance.mjs";
import { fromBase64, isSerializedBcs } from "@mysten/bcs";
import { is, parse } from "valibot";

//#region src/transactions/Transaction.ts
function createTransactionResult(index, length = Infinity) {
	const baseResult = {
		$kind: "Result",
		get Result() {
			return typeof index === "function" ? index() : index;
		}
	};
	const nestedResults = [];
	const nestedResultFor = (resultIndex) => nestedResults[resultIndex] ??= {
		$kind: "NestedResult",
		get NestedResult() {
			return [typeof index === "function" ? index() : index, resultIndex];
		}
	};
	return new Proxy(baseResult, {
		set() {
			throw new Error("The transaction result is a proxy, and does not support setting properties directly");
		},
		get(target, property) {
			if (property in target) return Reflect.get(target, property);
			if (property === Symbol.iterator) return function* () {
				let i = 0;
				while (i < length) {
					yield nestedResultFor(i);
					i++;
				}
			};
			if (typeof property === "symbol") return;
			const resultIndex = parseInt(property, 10);
			if (Number.isNaN(resultIndex) || resultIndex < 0) return;
			return nestedResultFor(resultIndex);
		}
	});
}
const TRANSACTION_BRAND = Symbol.for("@mysten/transaction");
function isTransaction(obj) {
	return !!obj && typeof obj === "object" && obj[TRANSACTION_BRAND] === true;
}
/**
* Transaction Builder
*/
var Transaction = class Transaction {
	#serializationPlugins;
	#buildPlugins;
	#intentResolvers = /* @__PURE__ */ new Map();
	#inputSection = [];
	#commandSection = [];
	#availableResults = /* @__PURE__ */ new Set();
	#pendingPromises = /* @__PURE__ */ new Set();
	#added = /* @__PURE__ */ new Map();
	/**
	* Converts from a serialize transaction kind (built with `build({ onlyTransactionKind: true })`) to a `Transaction` class.
	* Supports either a byte array, or base64-encoded bytes.
	*/
	static fromKind(serialized) {
		const tx = new Transaction();
		tx.#data = TransactionDataBuilder.fromKindBytes(typeof serialized === "string" ? fromBase64(serialized) : serialized);
		tx.#inputSection = tx.#data.inputs.slice();
		tx.#commandSection = tx.#data.commands.slice();
		tx.#availableResults = new Set(tx.#commandSection.map((_, i) => i));
		return tx;
	}
	/**
	* Converts from a serialized transaction format to a `Transaction` class.
	* There are two supported serialized formats:
	* - A string returned from `Transaction#serialize`. The serialized format must be compatible, or it will throw an error.
	* - A byte array (or base64-encoded bytes) containing BCS transaction data.
	*/
	static from(transaction) {
		const newTransaction = new Transaction();
		if (isTransaction(transaction)) newTransaction.#data = TransactionDataBuilder.restore(transaction.getData());
		else if (typeof transaction !== "string" || !transaction.startsWith("{")) newTransaction.#data = TransactionDataBuilder.fromBytes(typeof transaction === "string" ? fromBase64(transaction) : transaction);
		else newTransaction.#data = TransactionDataBuilder.restore(JSON.parse(transaction));
		newTransaction.#inputSection = newTransaction.#data.inputs.slice();
		newTransaction.#commandSection = newTransaction.#data.commands.slice();
		newTransaction.#availableResults = new Set(newTransaction.#commandSection.map((_, i) => i));
		if (!newTransaction.isPreparedForSerialization({ supportedIntents: [COIN_WITH_BALANCE] })) throw new Error("Transaction has unresolved intents or async thunks. Call `prepareForSerialization` before copying.");
		if (newTransaction.#data.commands.some((cmd) => cmd.$Intent?.name === COIN_WITH_BALANCE)) newTransaction.addIntentResolver(COIN_WITH_BALANCE, resolveCoinBalance);
		return newTransaction;
	}
	addSerializationPlugin(step) {
		this.#serializationPlugins.push(step);
	}
	addBuildPlugin(step) {
		this.#buildPlugins.push(step);
	}
	addIntentResolver(intent, resolver) {
		if (this.#intentResolvers.has(intent) && this.#intentResolvers.get(intent) !== resolver) throw new Error(`Intent resolver for ${intent} already exists`);
		this.#intentResolvers.set(intent, resolver);
	}
	setSender(sender) {
		this.#data.sender = sender;
	}
	/**
	* Sets the sender only if it has not already been set.
	* This is useful for sponsored transaction flows where the sender may not be the same as the signer address.
	*/
	setSenderIfNotSet(sender) {
		if (!this.#data.sender) this.#data.sender = sender;
	}
	setExpiration(expiration) {
		this.#data.expiration = expiration ? parse(TransactionExpiration, expiration) : null;
	}
	setGasPrice(price) {
		this.#data.gasData.price = String(price);
	}
	setGasBudget(budget) {
		this.#data.gasData.budget = String(budget);
	}
	setGasBudgetIfNotSet(budget) {
		if (this.#data.gasData.budget == null) this.#data.gasData.budget = String(budget);
	}
	setGasOwner(owner) {
		this.#data.gasData.owner = owner;
	}
	setGasPayment(payments) {
		this.#data.gasData.payment = payments.map((payment) => parse(ObjectRefSchema, payment));
	}
	#data;
	/** Get a snapshot of the transaction data, in JSON form: */
	getData() {
		return this.#data.snapshot();
	}
	get [TRANSACTION_BRAND]() {
		return true;
	}
	get pure() {
		Object.defineProperty(this, "pure", {
			enumerable: false,
			value: createPure((value) => {
				if (isSerializedBcs(value)) return this.#addInput("pure", {
					$kind: "Pure",
					Pure: { bytes: value.toBase64() }
				});
				return this.#addInput("pure", is(NormalizedCallArg, value) ? parse(NormalizedCallArg, value) : value instanceof Uint8Array ? Inputs.Pure(value) : {
					$kind: "UnresolvedPure",
					UnresolvedPure: { value }
				});
			})
		});
		return this.pure;
	}
	constructor() {
		this.object = createObjectMethods((value) => {
			if (typeof value === "function") return this.object(this.add(value));
			if (typeof value === "object" && is(ArgumentSchema, value)) return value;
			const id = getIdFromCallArg(value);
			const inserted = this.#data.inputs.find((i) => id === getIdFromCallArg(i));
			if (inserted?.Object?.SharedObject && typeof value === "object" && value.Object?.SharedObject) inserted.Object.SharedObject.mutable = inserted.Object.SharedObject.mutable || value.Object.SharedObject.mutable;
			return inserted ? {
				$kind: "Input",
				Input: this.#data.inputs.indexOf(inserted),
				type: "object"
			} : this.#addInput("object", typeof value === "string" ? {
				$kind: "UnresolvedObject",
				UnresolvedObject: { objectId: normalizeSuiAddress(value) }
			} : value);
		});
		this.#data = new TransactionDataBuilder();
		this.#buildPlugins = [];
		this.#serializationPlugins = [];
	}
	/** Returns an argument for the gas coin, to be used in a transaction. */
	get gas() {
		return {
			$kind: "GasCoin",
			GasCoin: true
		};
	}
	/**
	* Add a new object input to the transaction using the fully-resolved object reference.
	* If you only have an object ID, use `builder.object(id)` instead.
	*/
	objectRef(...args) {
		return this.object(Inputs.ObjectRef(...args));
	}
	/**
	* Add a new receiving input to the transaction using the fully-resolved object reference.
	* If you only have an object ID, use `builder.object(id)` instead.
	*/
	receivingRef(...args) {
		return this.object(Inputs.ReceivingRef(...args));
	}
	/**
	* Add a new shared object input to the transaction using the fully-resolved shared object reference.
	* If you only have an object ID, use `builder.object(id)` instead.
	*/
	sharedObjectRef(...args) {
		return this.object(Inputs.SharedObjectRef(...args));
	}
	#fork() {
		const fork = new Transaction();
		fork.#data = this.#data;
		fork.#serializationPlugins = this.#serializationPlugins;
		fork.#buildPlugins = this.#buildPlugins;
		fork.#intentResolvers = this.#intentResolvers;
		fork.#pendingPromises = this.#pendingPromises;
		fork.#availableResults = new Set(this.#availableResults);
		fork.#added = this.#added;
		this.#inputSection.push(fork.#inputSection);
		this.#commandSection.push(fork.#commandSection);
		return fork;
	}
	add(command) {
		if (typeof command === "function") {
			if (this.#added.has(command)) return this.#added.get(command);
			const fork = this.#fork();
			const result = command(fork);
			if (!(result && typeof result === "object" && "then" in result)) {
				this.#availableResults = fork.#availableResults;
				this.#added.set(command, result);
				return result;
			}
			const placeholder = this.#addCommand({
				$kind: "$Intent",
				$Intent: {
					name: "AsyncTransactionThunk",
					inputs: {},
					data: {
						resultIndex: this.#data.commands.length,
						result: null
					}
				}
			});
			this.#pendingPromises.add(Promise.resolve(result).then((result$1) => {
				placeholder.$Intent.data.result = result$1;
			}));
			const txResult = createTransactionResult(() => placeholder.$Intent.data.resultIndex);
			this.#added.set(command, txResult);
			return txResult;
		} else this.#addCommand(command);
		return createTransactionResult(this.#data.commands.length - 1);
	}
	#addCommand(command) {
		const resultIndex = this.#data.commands.length;
		this.#commandSection.push(command);
		this.#availableResults.add(resultIndex);
		this.#data.commands.push(command);
		this.#data.mapCommandArguments(resultIndex, (arg) => {
			if (arg.$kind === "Result" && !this.#availableResults.has(arg.Result)) throw new Error(`Result { Result: ${arg.Result} } is not available to use in the current transaction`);
			if (arg.$kind === "NestedResult" && !this.#availableResults.has(arg.NestedResult[0])) throw new Error(`Result { NestedResult: [${arg.NestedResult[0]}, ${arg.NestedResult[1]}] } is not available to use in the current transaction`);
			if (arg.$kind === "Input" && arg.Input >= this.#data.inputs.length) throw new Error(`Input { Input: ${arg.Input} } references an input that does not exist in the current transaction`);
			return arg;
		});
		return command;
	}
	#addInput(type, input) {
		this.#inputSection.push(input);
		return this.#data.addInput(type, input);
	}
	#normalizeTransactionArgument(arg) {
		if (isSerializedBcs(arg)) return this.pure(arg);
		return this.#resolveArgument(arg);
	}
	#resolveArgument(arg) {
		if (typeof arg === "function") {
			const resolved = this.add(arg);
			if (typeof resolved === "function") return this.#resolveArgument(resolved);
			return parse(ArgumentSchema, resolved);
		}
		return parse(ArgumentSchema, arg);
	}
	splitCoins(coin, amounts) {
		const command = TransactionCommands.SplitCoins(typeof coin === "string" ? this.object(coin) : this.#resolveArgument(coin), amounts.map((amount) => typeof amount === "number" || typeof amount === "bigint" || typeof amount === "string" ? this.pure.u64(amount) : this.#normalizeTransactionArgument(amount)));
		this.#addCommand(command);
		return createTransactionResult(this.#data.commands.length - 1, amounts.length);
	}
	mergeCoins(destination, sources) {
		return this.add(TransactionCommands.MergeCoins(this.object(destination), sources.map((src) => this.object(src))));
	}
	publish({ modules, dependencies }) {
		return this.add(TransactionCommands.Publish({
			modules,
			dependencies
		}));
	}
	upgrade({ modules, dependencies, package: packageId, ticket }) {
		return this.add(TransactionCommands.Upgrade({
			modules,
			dependencies,
			package: packageId,
			ticket: this.object(ticket)
		}));
	}
	moveCall({ arguments: args, ...input }) {
		return this.add(TransactionCommands.MoveCall({
			...input,
			arguments: args?.map((arg) => this.#normalizeTransactionArgument(arg))
		}));
	}
	transferObjects(objects, address) {
		return this.add(TransactionCommands.TransferObjects(objects.map((obj) => this.object(obj)), typeof address === "string" ? this.pure.address(address) : this.#normalizeTransactionArgument(address)));
	}
	makeMoveVec({ type, elements }) {
		return this.add(TransactionCommands.MakeMoveVec({
			type,
			elements: elements.map((obj) => this.object(obj))
		}));
	}
	/**
	* Create a FundsWithdrawal input for withdrawing Balance<T> from an address balance accumulator.
	* This is used for gas payments from address balances.
	*
	* @param options.amount - The Amount to withdraw (u64).
	* @param options.type - The balance type (e.g., "0x2::sui::SUI"). Defaults to SUI.
	*/
	withdrawal({ amount, type }) {
		const input = {
			$kind: "FundsWithdrawal",
			FundsWithdrawal: {
				reservation: {
					$kind: "MaxAmountU64",
					MaxAmountU64: String(amount)
				},
				typeArg: {
					$kind: "Balance",
					Balance: type ?? "0x2::sui::SUI"
				},
				withdrawFrom: {
					$kind: "Sender",
					Sender: true
				}
			}
		};
		return this.#addInput("object", input);
	}
	/**
	* @deprecated Use toJSON instead.
	* For synchronous serialization, you can use `getData()`
	* */
	serialize() {
		return JSON.stringify(serializeV1TransactionData(this.#data.snapshot()));
	}
	async toJSON(options = {}) {
		await this.prepareForSerialization(options);
		const fullyResolved = this.isFullyResolved();
		return JSON.stringify(parse(SerializedTransactionDataV2Schema, fullyResolved ? {
			...this.#data.snapshot(),
			digest: this.#data.getDigest()
		} : this.#data.snapshot()), (_key, value) => typeof value === "bigint" ? value.toString() : value, 2);
	}
	/** Build the transaction to BCS bytes, and sign it with the provided keypair. */
	async sign(options) {
		const { signer, ...buildOptions } = options;
		const bytes = await this.build(buildOptions);
		return signer.signTransaction(bytes);
	}
	/**
	* Checks if the transaction is prepared for serialization to JSON.
	* This means:
	*  - All async thunks have been fully resolved
	*  - All transaction intents have been resolved (unless in supportedIntents)
	*
	* Unlike `isFullyResolved()`, this does not require the sender, gas payment,
	* budget, or object versions to be set.
	*/
	isPreparedForSerialization(options = {}) {
		if (this.#pendingPromises.size > 0) return false;
		if (this.#data.commands.some((cmd) => cmd.$Intent && !options.supportedIntents?.includes(cmd.$Intent.name))) return false;
		return true;
	}
	/**
	*  Ensures that:
	*  - All objects have been fully resolved to a specific version
	*  - All pure inputs have been serialized to bytes
	*  - All async thunks have been fully resolved
	*  - All transaction intents have been resolved
	* 	- The gas payment, budget, and price have been set
	*  - The transaction sender has been set
	*
	*  When true, the transaction will always be built to the same bytes and digest (unless the transaction is mutated)
	*/
	isFullyResolved() {
		if (!this.isPreparedForSerialization()) return false;
		if (!this.#data.sender) return false;
		if (needsTransactionResolution(this.#data, {})) return false;
		return true;
	}
	/** Build the transaction to BCS bytes. */
	async build(options = {}) {
		await this.prepareForSerialization(options);
		await this.#prepareBuild(options);
		return this.#data.build({ onlyTransactionKind: options.onlyTransactionKind });
	}
	/** Derive transaction digest */
	async getDigest(options = {}) {
		await this.prepareForSerialization(options);
		await this.#prepareBuild(options);
		return this.#data.getDigest();
	}
	/**
	* Prepare the transaction by validating the transaction data and resolving all inputs
	* so that it can be built into bytes.
	*/
	async #prepareBuild(options) {
		if (!options.onlyTransactionKind && !this.#data.sender) throw new Error("Missing transaction sender");
		await this.#runPlugins([...this.#buildPlugins, resolveTransactionPlugin], options);
	}
	async #runPlugins(plugins, options) {
		try {
			const createNext = (i) => {
				if (i >= plugins.length) return () => {};
				const plugin = plugins[i];
				return async () => {
					const next = createNext(i + 1);
					let calledNext = false;
					let nextResolved = false;
					await plugin(this.#data, options, async () => {
						if (calledNext) throw new Error(`next() was call multiple times in TransactionPlugin ${i}`);
						calledNext = true;
						await next();
						nextResolved = true;
					});
					if (!calledNext) throw new Error(`next() was not called in TransactionPlugin ${i}`);
					if (!nextResolved) throw new Error(`next() was not awaited in TransactionPlugin ${i}`);
				};
			};
			await createNext(0)();
		} finally {
			this.#inputSection = this.#data.inputs.slice();
			this.#commandSection = this.#data.commands.slice();
			this.#availableResults = new Set(this.#commandSection.map((_, i) => i));
		}
	}
	async #waitForPendingTasks() {
		while (this.#pendingPromises.size > 0) {
			const newPromise = Promise.all(this.#pendingPromises);
			this.#pendingPromises.clear();
			this.#pendingPromises.add(newPromise);
			await newPromise;
			this.#pendingPromises.delete(newPromise);
		}
	}
	#sortCommandsAndInputs() {
		const unorderedCommands = this.#data.commands;
		const unorderedInputs = this.#data.inputs;
		const orderedCommands = this.#commandSection.flat(Infinity);
		const orderedInputs = this.#inputSection.flat(Infinity);
		if (orderedCommands.length !== unorderedCommands.length) throw new Error("Unexpected number of commands found in transaction data");
		if (orderedInputs.length !== unorderedInputs.length) throw new Error("Unexpected number of inputs found in transaction data");
		const filteredCommands = orderedCommands.filter((cmd) => cmd.$Intent?.name !== "AsyncTransactionThunk");
		this.#data.commands = filteredCommands;
		this.#data.inputs = orderedInputs;
		this.#commandSection = filteredCommands;
		this.#inputSection = orderedInputs;
		this.#availableResults = new Set(filteredCommands.map((_, i) => i));
		function getOriginalIndex(index) {
			const command = unorderedCommands[index];
			if (command.$Intent?.name === "AsyncTransactionThunk") {
				const result = command.$Intent.data.result;
				if (result == null) throw new Error("AsyncTransactionThunk has not been resolved");
				return getOriginalIndex(result.Result);
			}
			const updated = filteredCommands.indexOf(command);
			if (updated === -1) throw new Error("Unable to find original index for command");
			return updated;
		}
		this.#data.mapArguments((arg) => {
			if (arg.$kind === "Input") {
				const updated = orderedInputs.indexOf(unorderedInputs[arg.Input]);
				if (updated === -1) throw new Error("Input has not been resolved");
				return {
					...arg,
					Input: updated
				};
			} else if (arg.$kind === "Result") {
				const updated = getOriginalIndex(arg.Result);
				return {
					...arg,
					Result: updated
				};
			} else if (arg.$kind === "NestedResult") {
				const updated = getOriginalIndex(arg.NestedResult[0]);
				return {
					...arg,
					NestedResult: [updated, arg.NestedResult[1]]
				};
			}
			return arg;
		});
		for (const [i, cmd] of unorderedCommands.entries()) if (cmd.$Intent?.name === "AsyncTransactionThunk") try {
			cmd.$Intent.data.resultIndex = getOriginalIndex(i);
		} catch {}
	}
	async prepareForSerialization(options) {
		await this.#waitForPendingTasks();
		this.#sortCommandsAndInputs();
		const intents = /* @__PURE__ */ new Set();
		for (const command of this.#data.commands) if (command.$Intent) intents.add(command.$Intent.name);
		const steps = [...this.#serializationPlugins];
		for (const intent of intents) {
			if (options.supportedIntents?.includes(intent)) continue;
			if (!this.#intentResolvers.has(intent)) throw new Error(`Missing intent resolver for ${intent}`);
			steps.push(this.#intentResolvers.get(intent));
		}
		steps.push(namedPackagesPlugin());
		await this.#runPlugins(steps, options);
	}
};

//#endregion
export { Transaction, isTransaction };
//# sourceMappingURL=Transaction.mjs.map