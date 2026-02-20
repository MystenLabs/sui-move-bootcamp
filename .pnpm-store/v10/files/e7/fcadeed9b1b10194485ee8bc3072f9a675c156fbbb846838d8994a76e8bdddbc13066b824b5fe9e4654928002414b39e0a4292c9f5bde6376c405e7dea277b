import { normalizeSuiAddress, normalizeSuiObjectId } from "../utils/sui-types.mjs";
import { ObjectRefSchema } from "../transactions/data/internal.mjs";
import { SimulationError } from "./errors.mjs";
import { SUI_TYPE_ARG } from "../utils/constants.mjs";
import { Inputs } from "../transactions/Inputs.mjs";
import { getPureBcsSchema, isTxContext } from "../transactions/serializer.mjs";
import { chunk } from "@mysten/utils";
import { parse } from "valibot";

//#region src/client/core-resolver.ts
const MAX_OBJECTS_PER_FETCH = 50;
const GAS_SAFE_OVERHEAD = 1000n;
const MAX_GAS = 5e10;
function getClient(options) {
	if (!options.client) throw new Error(`No sui client passed to Transaction#build, but transaction data was not sufficient to build offline.`);
	return options.client;
}
async function coreClientResolveTransactionPlugin(transactionData, options, next) {
	const client = getClient(options);
	await normalizeInputs(transactionData, client);
	await resolveObjectReferences(transactionData, client);
	if (!options.onlyTransactionKind) await setGasData(transactionData, client);
	return await next();
}
async function setGasData(transactionData, client) {
	let systemState = null;
	if (!transactionData.gasData.price) {
		systemState = (await client.core.getCurrentSystemState()).systemState;
		transactionData.gasData.price = systemState.referenceGasPrice;
	}
	await setGasBudget(transactionData, client);
	await setGasPayment(transactionData, client);
	if (!transactionData.expiration) await setExpiration(transactionData, client, systemState);
}
async function setGasBudget(transactionData, client) {
	if (transactionData.gasData.budget) return;
	const simulateResult = await client.core.simulateTransaction({
		transaction: transactionData.build({ overrides: { gasData: {
			budget: String(MAX_GAS),
			payment: []
		} } }),
		include: { effects: true }
	});
	if (simulateResult.$kind === "FailedTransaction") {
		const executionError = simulateResult.FailedTransaction.status.error ?? void 0;
		throw new SimulationError(`Transaction resolution failed: ${executionError?.message ?? "Unknown error"}`, {
			cause: simulateResult,
			executionError
		});
	}
	const gasUsed = simulateResult.Transaction.effects.gasUsed;
	const safeOverhead = GAS_SAFE_OVERHEAD * BigInt(transactionData.gasData.price || 1n);
	const baseComputationCostWithOverhead = BigInt(gasUsed.computationCost) + safeOverhead;
	const gasBudget = baseComputationCostWithOverhead + BigInt(gasUsed.storageCost) - BigInt(gasUsed.storageRebate);
	transactionData.gasData.budget = String(gasBudget > baseComputationCostWithOverhead ? gasBudget : baseComputationCostWithOverhead);
}
async function setGasPayment(transactionData, client) {
	if (!transactionData.gasData.payment) {
		const gasPayer = transactionData.gasData.owner ?? transactionData.sender;
		let usesGasCoin = false;
		let withdrawals = 0n;
		transactionData.mapArguments((arg) => {
			if (arg.$kind === "GasCoin") usesGasCoin = true;
			else if (arg.$kind === "Input") {
				const input = transactionData.inputs[arg.Input];
				if (input.$kind === "FundsWithdrawal") {
					if ((input.FundsWithdrawal.withdrawFrom.Sender ? transactionData.sender : gasPayer) === gasPayer) {
						if (input.FundsWithdrawal.reservation.$kind === "MaxAmountU64") withdrawals += BigInt(input.FundsWithdrawal.reservation.MaxAmountU64);
					}
				}
			}
			return arg;
		});
		const [suiBalance, coins] = await Promise.all([usesGasCoin || !transactionData.gasData.owner ? null : client.core.getBalance({ owner: transactionData.gasData.owner }), client.core.listCoins({
			owner: transactionData.gasData.owner || transactionData.sender,
			coinType: SUI_TYPE_ARG
		})]);
		if (suiBalance?.balance.addressBalance && BigInt(suiBalance.balance.addressBalance) >= BigInt(transactionData.gasData.budget || "0") + withdrawals) {
			transactionData.gasData.payment = [];
			return;
		}
		const paymentCoins = coins.objects.filter((coin) => {
			return !transactionData.inputs.find((input) => {
				if (input.Object?.ImmOrOwnedObject) return coin.objectId === input.Object.ImmOrOwnedObject.objectId;
				return false;
			});
		}).map((coin) => parse(ObjectRefSchema, {
			objectId: coin.objectId,
			digest: coin.digest,
			version: coin.version
		}));
		if (!paymentCoins.length) throw new Error("No valid gas coins found for the transaction.");
		transactionData.gasData.payment = paymentCoins;
	}
}
async function setExpiration(transactionData, client, existingSystemState) {
	const [systemState, { chainIdentifier }] = await Promise.all([existingSystemState ?? client.core.getCurrentSystemState().then((r) => r.systemState), client.core.getChainIdentifier()]);
	const currentEpoch = BigInt(systemState.epoch);
	transactionData.expiration = {
		$kind: "ValidDuring",
		ValidDuring: {
			minEpoch: String(currentEpoch),
			maxEpoch: String(currentEpoch + 1n),
			minTimestamp: null,
			maxTimestamp: null,
			chain: chainIdentifier,
			nonce: Math.random() * 4294967296 >>> 0
		}
	};
}
async function resolveObjectReferences(transactionData, client) {
	const objectsToResolve = transactionData.inputs.filter((input) => {
		return input.UnresolvedObject && !(input.UnresolvedObject.version || input.UnresolvedObject?.initialSharedVersion);
	});
	const dedupedIds = [...new Set(objectsToResolve.map((input) => normalizeSuiObjectId(input.UnresolvedObject.objectId)))];
	const objectChunks = dedupedIds.length ? chunk(dedupedIds, MAX_OBJECTS_PER_FETCH) : [];
	const resolved = (await Promise.all(objectChunks.map((chunkIds) => client.core.getObjects({ objectIds: chunkIds })))).flatMap((result) => result.objects);
	const responsesById = new Map(dedupedIds.map((id, index) => {
		return [id, resolved[index]];
	}));
	const invalidObjects = Array.from(responsesById).filter(([_, obj]) => obj instanceof Error).map(([_, obj]) => obj.message);
	if (invalidObjects.length) throw new Error(`The following input objects are invalid: ${invalidObjects.join(", ")}`);
	const objects = resolved.map((object$1) => {
		if (object$1 instanceof Error) throw new Error(`Failed to fetch object: ${object$1.message}`);
		const owner = object$1.owner;
		const initialSharedVersion = owner && typeof owner === "object" ? owner.$kind === "Shared" ? owner.Shared.initialSharedVersion : owner.$kind === "ConsensusAddressOwner" ? owner.ConsensusAddressOwner.startVersion : null : null;
		return {
			objectId: object$1.objectId,
			digest: object$1.digest,
			version: object$1.version,
			initialSharedVersion
		};
	});
	const objectsById = new Map(dedupedIds.map((id, index) => {
		return [id, objects[index]];
	}));
	for (const [index, input] of transactionData.inputs.entries()) {
		if (!input.UnresolvedObject) continue;
		let updated;
		const id = normalizeSuiAddress(input.UnresolvedObject.objectId);
		const object$1 = objectsById.get(id);
		if (input.UnresolvedObject.initialSharedVersion ?? object$1?.initialSharedVersion) updated = Inputs.SharedObjectRef({
			objectId: id,
			initialSharedVersion: input.UnresolvedObject.initialSharedVersion || object$1?.initialSharedVersion,
			mutable: input.UnresolvedObject.mutable || isUsedAsMutable(transactionData, index)
		});
		else if (isUsedAsReceiving(transactionData, index)) updated = Inputs.ReceivingRef({
			objectId: id,
			digest: input.UnresolvedObject.digest ?? object$1?.digest,
			version: input.UnresolvedObject.version ?? object$1?.version
		});
		transactionData.inputs[transactionData.inputs.indexOf(input)] = updated ?? Inputs.ObjectRef({
			objectId: id,
			digest: input.UnresolvedObject.digest ?? object$1?.digest,
			version: input.UnresolvedObject.version ?? object$1?.version
		});
	}
}
async function normalizeInputs(transactionData, client) {
	const { inputs, commands } = transactionData;
	const moveCallsToResolve = [];
	const moveFunctionsToResolve = /* @__PURE__ */ new Set();
	commands.forEach((command) => {
		if (command.MoveCall) {
			if (command.MoveCall._argumentTypes) return;
			if (command.MoveCall.arguments.map((arg) => {
				if (arg.$kind === "Input") return transactionData.inputs[arg.Input];
				return null;
			}).some((input) => input?.UnresolvedPure || input?.UnresolvedObject && typeof input?.UnresolvedObject.mutable !== "boolean")) {
				const functionName = `${command.MoveCall.package}::${command.MoveCall.module}::${command.MoveCall.function}`;
				moveFunctionsToResolve.add(functionName);
				moveCallsToResolve.push(command.MoveCall);
			}
		}
	});
	const moveFunctionParameters = /* @__PURE__ */ new Map();
	if (moveFunctionsToResolve.size > 0) await Promise.all([...moveFunctionsToResolve].map(async (functionName) => {
		const [packageId, moduleName, name] = functionName.split("::");
		const { function: def } = await client.core.getMoveFunction({
			packageId,
			moduleName,
			name
		});
		moveFunctionParameters.set(functionName, def.parameters);
	}));
	if (moveCallsToResolve.length) await Promise.all(moveCallsToResolve.map(async (moveCall) => {
		const parameters = moveFunctionParameters.get(`${moveCall.package}::${moveCall.module}::${moveCall.function}`);
		if (!parameters) return;
		moveCall._argumentTypes = parameters.length > 0 && isTxContext(parameters.at(-1)) ? parameters.slice(0, parameters.length - 1) : parameters;
	}));
	commands.forEach((command) => {
		if (!command.MoveCall) return;
		const moveCall = command.MoveCall;
		const fnName = `${moveCall.package}::${moveCall.module}::${moveCall.function}`;
		const params = moveCall._argumentTypes;
		if (!params) return;
		if (params.length !== command.MoveCall.arguments.length) throw new Error(`Incorrect number of arguments for ${fnName}`);
		params.forEach((param, i) => {
			const arg = moveCall.arguments[i];
			if (arg.$kind !== "Input") return;
			const input = inputs[arg.Input];
			if (!input.UnresolvedPure && !input.UnresolvedObject) return;
			const inputValue = input.UnresolvedPure?.value ?? input.UnresolvedObject?.objectId;
			const schema = getPureBcsSchema(param.body);
			if (schema) {
				arg.type = "pure";
				inputs[inputs.indexOf(input)] = Inputs.Pure(schema.serialize(inputValue));
				return;
			}
			if (typeof inputValue !== "string") throw new Error(`Expect the argument to be an object id string, got ${JSON.stringify(inputValue, null, 2)}`);
			arg.type = "object";
			const unresolvedObject = input.UnresolvedPure ? {
				$kind: "UnresolvedObject",
				UnresolvedObject: { objectId: inputValue }
			} : input;
			inputs[arg.Input] = unresolvedObject;
		});
	});
}
function isUsedAsMutable(transactionData, index) {
	let usedAsMutable = false;
	transactionData.getInputUses(index, (arg, tx) => {
		if (tx.MoveCall && tx.MoveCall._argumentTypes) {
			const argIndex = tx.MoveCall.arguments.indexOf(arg);
			usedAsMutable = tx.MoveCall._argumentTypes[argIndex].reference !== "immutable" || usedAsMutable;
		}
		if (tx.$kind === "MakeMoveVec" || tx.$kind === "MergeCoins" || tx.$kind === "SplitCoins" || tx.$kind === "TransferObjects") usedAsMutable = true;
	});
	return usedAsMutable;
}
function isUsedAsReceiving(transactionData, index) {
	let usedAsReceiving = false;
	transactionData.getInputUses(index, (arg, tx) => {
		if (tx.MoveCall && tx.MoveCall._argumentTypes) {
			const argIndex = tx.MoveCall.arguments.indexOf(arg);
			usedAsReceiving = isReceivingType(tx.MoveCall._argumentTypes[argIndex]) || usedAsReceiving;
		}
	});
	return usedAsReceiving;
}
const RECEIVING_TYPE = "0x0000000000000000000000000000000000000000000000000000000000000002::transfer::Receiving";
function isReceivingType(type) {
	if (type.body.$kind !== "datatype") return false;
	return type.body.datatype.typeName === RECEIVING_TYPE;
}

//#endregion
export { coreClientResolveTransactionPlugin };
//# sourceMappingURL=core-resolver.mjs.map