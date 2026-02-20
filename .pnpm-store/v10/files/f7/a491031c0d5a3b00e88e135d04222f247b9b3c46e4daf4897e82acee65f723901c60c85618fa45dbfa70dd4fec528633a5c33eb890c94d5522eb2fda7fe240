import { normalizeSuiAddress } from "../utils/sui-types.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { ArgumentSchema, TransactionDataSchema } from "./data/internal.mjs";
import { transactionDataFromV1 } from "./data/v1.mjs";
import { hashTypedData } from "./hash.mjs";
import { getIdFromCallArg, remapCommandArguments } from "./utils.mjs";
import { toBase58 } from "@mysten/bcs";
import { parse } from "valibot";

//#region src/transactions/TransactionData.ts
function prepareSuiAddress(address) {
	return normalizeSuiAddress(address).replace("0x", "");
}
var TransactionDataBuilder = class TransactionDataBuilder {
	static fromKindBytes(bytes) {
		const programmableTx = suiBcs.TransactionKind.parse(bytes).ProgrammableTransaction;
		if (!programmableTx) throw new Error("Unable to deserialize from bytes.");
		return TransactionDataBuilder.restore({
			version: 2,
			sender: null,
			expiration: null,
			gasData: {
				budget: null,
				owner: null,
				payment: null,
				price: null
			},
			inputs: programmableTx.inputs,
			commands: programmableTx.commands
		});
	}
	static fromBytes(bytes) {
		const data = suiBcs.TransactionData.parse(bytes)?.V1;
		const programmableTx = data.kind.ProgrammableTransaction;
		if (!data || !programmableTx) throw new Error("Unable to deserialize from bytes.");
		return TransactionDataBuilder.restore({
			version: 2,
			sender: data.sender,
			expiration: data.expiration,
			gasData: data.gasData,
			inputs: programmableTx.inputs,
			commands: programmableTx.commands
		});
	}
	static restore(data) {
		if (data.version === 2) return new TransactionDataBuilder(parse(TransactionDataSchema, data));
		else return new TransactionDataBuilder(parse(TransactionDataSchema, transactionDataFromV1(data)));
	}
	/**
	* Generate transaction digest.
	*
	* @param bytes BCS serialized transaction data
	* @returns transaction digest.
	*/
	static getDigestFromBytes(bytes) {
		return toBase58(hashTypedData("TransactionData", bytes));
	}
	constructor(clone) {
		this.version = 2;
		this.sender = clone?.sender ?? null;
		this.expiration = clone?.expiration ?? null;
		this.inputs = clone?.inputs ?? [];
		this.commands = clone?.commands ?? [];
		this.gasData = clone?.gasData ?? {
			budget: null,
			price: null,
			owner: null,
			payment: null
		};
	}
	build({ maxSizeBytes = Infinity, overrides, onlyTransactionKind } = {}) {
		const inputs = this.inputs;
		const commands = this.commands;
		const kind = { ProgrammableTransaction: {
			inputs,
			commands
		} };
		if (onlyTransactionKind) return suiBcs.TransactionKind.serialize(kind, { maxSize: maxSizeBytes }).toBytes();
		const expiration = overrides?.expiration ?? this.expiration;
		const sender = overrides?.sender ?? this.sender;
		const gasData = {
			...this.gasData,
			...overrides?.gasData
		};
		if (!sender) throw new Error("Missing transaction sender");
		if (!gasData.budget) throw new Error("Missing gas budget");
		if (!gasData.payment) throw new Error("Missing gas payment");
		if (!gasData.price) throw new Error("Missing gas price");
		const transactionData = {
			sender: prepareSuiAddress(sender),
			expiration: expiration ? expiration : { None: true },
			gasData: {
				payment: gasData.payment,
				owner: prepareSuiAddress(this.gasData.owner ?? sender),
				price: BigInt(gasData.price),
				budget: BigInt(gasData.budget)
			},
			kind: { ProgrammableTransaction: {
				inputs,
				commands
			} }
		};
		return suiBcs.TransactionData.serialize({ V1: transactionData }, { maxSize: maxSizeBytes }).toBytes();
	}
	addInput(type, arg) {
		const index = this.inputs.length;
		this.inputs.push(arg);
		return {
			Input: index,
			type,
			$kind: "Input"
		};
	}
	getInputUses(index, fn) {
		this.mapArguments((arg, command) => {
			if (arg.$kind === "Input" && arg.Input === index) fn(arg, command);
			return arg;
		});
	}
	mapCommandArguments(index, fn) {
		const command = this.commands[index];
		switch (command.$kind) {
			case "MoveCall":
				command.MoveCall.arguments = command.MoveCall.arguments.map((arg) => fn(arg, command, index));
				break;
			case "TransferObjects":
				command.TransferObjects.objects = command.TransferObjects.objects.map((arg) => fn(arg, command, index));
				command.TransferObjects.address = fn(command.TransferObjects.address, command, index);
				break;
			case "SplitCoins":
				command.SplitCoins.coin = fn(command.SplitCoins.coin, command, index);
				command.SplitCoins.amounts = command.SplitCoins.amounts.map((arg) => fn(arg, command, index));
				break;
			case "MergeCoins":
				command.MergeCoins.destination = fn(command.MergeCoins.destination, command, index);
				command.MergeCoins.sources = command.MergeCoins.sources.map((arg) => fn(arg, command, index));
				break;
			case "MakeMoveVec":
				command.MakeMoveVec.elements = command.MakeMoveVec.elements.map((arg) => fn(arg, command, index));
				break;
			case "Upgrade":
				command.Upgrade.ticket = fn(command.Upgrade.ticket, command, index);
				break;
			case "$Intent":
				const inputs = command.$Intent.inputs;
				command.$Intent.inputs = {};
				for (const [key, value] of Object.entries(inputs)) command.$Intent.inputs[key] = Array.isArray(value) ? value.map((arg) => fn(arg, command, index)) : fn(value, command, index);
				break;
			case "Publish": break;
			default: throw new Error(`Unexpected transaction kind: ${command.$kind}`);
		}
	}
	mapArguments(fn) {
		for (const commandIndex of this.commands.keys()) this.mapCommandArguments(commandIndex, fn);
	}
	replaceCommand(index, replacement, resultIndex = index) {
		if (!Array.isArray(replacement)) {
			this.commands[index] = replacement;
			return;
		}
		const sizeDiff = replacement.length - 1;
		this.commands.splice(index, 1, ...structuredClone(replacement));
		this.mapArguments((arg, _command, commandIndex) => {
			if (commandIndex < index + replacement.length) return arg;
			if (typeof resultIndex !== "number") {
				if (arg.$kind === "Result" && arg.Result === index || arg.$kind === "NestedResult" && arg.NestedResult[0] === index) if (!("NestedResult" in arg) || arg.NestedResult[1] === 0) return parse(ArgumentSchema, structuredClone(resultIndex));
				else throw new Error(`Cannot replace command ${index} with a specific result type: NestedResult[${index}, ${arg.NestedResult[1]}] references a nested element that cannot be mapped to the replacement result`);
			}
			switch (arg.$kind) {
				case "Result":
					if (arg.Result === index && typeof resultIndex === "number") arg.Result = resultIndex;
					if (arg.Result > index) arg.Result += sizeDiff;
					break;
				case "NestedResult":
					if (arg.NestedResult[0] === index && typeof resultIndex === "number") return {
						$kind: "NestedResult",
						NestedResult: [resultIndex, arg.NestedResult[1]]
					};
					if (arg.NestedResult[0] > index) arg.NestedResult[0] += sizeDiff;
					break;
			}
			return arg;
		});
	}
	replaceCommandWithTransaction(index, otherTransaction, result) {
		if (result.$kind !== "Result" && result.$kind !== "NestedResult") throw new Error("Result must be of kind Result or NestedResult");
		this.insertTransaction(index, otherTransaction);
		this.replaceCommand(index + otherTransaction.commands.length, [], "Result" in result ? { NestedResult: [result.Result + index, 0] } : { NestedResult: [result.NestedResult[0] + index, result.NestedResult[1]] });
	}
	insertTransaction(atCommandIndex, otherTransaction) {
		const inputMapping = /* @__PURE__ */ new Map();
		const commandMapping = /* @__PURE__ */ new Map();
		for (let i = 0; i < otherTransaction.inputs.length; i++) {
			const otherInput = otherTransaction.inputs[i];
			const id = getIdFromCallArg(otherInput);
			let existingIndex = -1;
			if (id !== void 0) {
				existingIndex = this.inputs.findIndex((input) => getIdFromCallArg(input) === id);
				if (existingIndex !== -1 && this.inputs[existingIndex].Object?.SharedObject && otherInput.Object?.SharedObject) this.inputs[existingIndex].Object.SharedObject.mutable = this.inputs[existingIndex].Object.SharedObject.mutable || otherInput.Object.SharedObject.mutable;
			}
			if (existingIndex !== -1) inputMapping.set(i, existingIndex);
			else {
				const newIndex = this.inputs.length;
				this.inputs.push(otherInput);
				inputMapping.set(i, newIndex);
			}
		}
		for (let i = 0; i < otherTransaction.commands.length; i++) commandMapping.set(i, atCommandIndex + i);
		const remappedCommands = [];
		for (let i = 0; i < otherTransaction.commands.length; i++) {
			const command = structuredClone(otherTransaction.commands[i]);
			remapCommandArguments(command, inputMapping, commandMapping);
			remappedCommands.push(command);
		}
		this.commands.splice(atCommandIndex, 0, ...remappedCommands);
		const sizeDiff = remappedCommands.length;
		if (sizeDiff > 0) this.mapArguments((arg, _command, commandIndex) => {
			if (commandIndex >= atCommandIndex && commandIndex < atCommandIndex + remappedCommands.length) return arg;
			switch (arg.$kind) {
				case "Result":
					if (arg.Result >= atCommandIndex) arg.Result += sizeDiff;
					break;
				case "NestedResult":
					if (arg.NestedResult[0] >= atCommandIndex) arg.NestedResult[0] += sizeDiff;
					break;
			}
			return arg;
		});
	}
	getDigest() {
		const bytes = this.build({ onlyTransactionKind: false });
		return TransactionDataBuilder.getDigestFromBytes(bytes);
	}
	snapshot() {
		return parse(TransactionDataSchema, this);
	}
	shallowClone() {
		return new TransactionDataBuilder({
			version: this.version,
			sender: this.sender,
			expiration: this.expiration,
			gasData: { ...this.gasData },
			inputs: [...this.inputs],
			commands: [...this.commands]
		});
	}
	applyResolvedData(resolved) {
		if (!this.sender) this.sender = resolved.sender ?? null;
		if (!this.expiration) this.expiration = resolved.expiration ?? null;
		if (!this.gasData.budget) this.gasData.budget = resolved.gasData.budget;
		if (!this.gasData.owner) this.gasData.owner = resolved.gasData.owner ?? null;
		if (!this.gasData.payment) this.gasData.payment = resolved.gasData.payment;
		if (!this.gasData.price) this.gasData.price = resolved.gasData.price;
		for (let i = 0; i < this.inputs.length; i++) {
			const input = this.inputs[i];
			const resolvedInput = resolved.inputs[i];
			switch (input.$kind) {
				case "UnresolvedPure":
					if (resolvedInput.$kind !== "Pure") throw new Error(`Expected input at index ${i} to resolve to a Pure argument, but got ${JSON.stringify(resolvedInput)}`);
					this.inputs[i] = resolvedInput;
					break;
				case "UnresolvedObject":
					if (resolvedInput.$kind !== "Object") throw new Error(`Expected input at index ${i} to resolve to an Object argument, but got ${JSON.stringify(resolvedInput)}`);
					if (resolvedInput.Object.$kind === "ImmOrOwnedObject" || resolvedInput.Object.$kind === "Receiving") {
						const original = input.UnresolvedObject;
						const resolved$1 = resolvedInput.Object.ImmOrOwnedObject ?? resolvedInput.Object.Receiving;
						if (normalizeSuiAddress(original.objectId) !== normalizeSuiAddress(resolved$1.objectId) || original.version != null && original.version !== resolved$1.version || original.digest != null && original.digest !== resolved$1.digest || original.mutable != null || original.initialSharedVersion != null) throw new Error(`Input at index ${i} did not match unresolved object. ${JSON.stringify(original)} is not compatible with ${JSON.stringify(resolved$1)}`);
					} else if (resolvedInput.Object.$kind === "SharedObject") {
						const original = input.UnresolvedObject;
						const resolved$1 = resolvedInput.Object.SharedObject;
						if (normalizeSuiAddress(original.objectId) !== normalizeSuiAddress(resolved$1.objectId) || original.initialSharedVersion != null && original.initialSharedVersion !== resolved$1.initialSharedVersion || original.mutable != null && original.mutable !== resolved$1.mutable || original.version != null || original.digest != null) throw new Error(`Input at index ${i} did not match unresolved object. ${JSON.stringify(original)} is not compatible with ${JSON.stringify(resolved$1)}`);
					} else throw new Error(`Input at index ${i} resolved to an unexpected Object kind: ${JSON.stringify(resolvedInput.Object)}`);
					this.inputs[i] = resolvedInput;
					break;
			}
		}
	}
};

//#endregion
export { TransactionDataBuilder };
//# sourceMappingURL=TransactionData.mjs.map