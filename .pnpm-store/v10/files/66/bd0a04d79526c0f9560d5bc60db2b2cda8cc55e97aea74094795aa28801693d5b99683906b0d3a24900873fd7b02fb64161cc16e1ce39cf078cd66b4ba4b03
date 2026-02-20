import { normalizeStructTag, normalizeSuiAddress } from "../utils/sui-types.mjs";
import { TypeTagSerializer } from "../bcs/type-tag-serializer.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { CoreClient } from "../client/core.mjs";
import { TransactionDataBuilder } from "../transactions/TransactionData.mjs";
import { formatMoveAbortMessage, parseTransactionBcs, parseTransactionEffectsBcs } from "../client/utils.mjs";
import { ObjectError } from "../client/errors.mjs";
import { SUI_FRAMEWORK_ADDRESS, SUI_SYSTEM_ADDRESS } from "../utils/constants.mjs";
import { coreClientResolveTransactionPlugin } from "../client/core-resolver.mjs";
import { Transaction } from "../transactions/Transaction.mjs";
import { fromBase64 } from "@mysten/bcs";
import { chunk } from "@mysten/utils";

//#region src/jsonRpc/core.ts
const MAX_GAS = 5e10;
function parseJsonRpcExecutionStatus(status, abortError) {
	if (status.status === "success") return {
		success: true,
		error: null
	};
	const rawMessage = status.error ?? "Unknown";
	if (abortError) {
		const commandMatch = rawMessage.match(/in command (\d+)/);
		const command = commandMatch ? parseInt(commandMatch[1], 10) : void 0;
		const instructionMatch = rawMessage.match(/instruction:\s*(\d+)/);
		const instruction = instructionMatch ? parseInt(instructionMatch[1], 10) : void 0;
		const moduleParts = abortError.module_id?.split("::") ?? [];
		const pkg = moduleParts[0] ? normalizeSuiAddress(moduleParts[0]) : void 0;
		const module = moduleParts[1];
		return {
			success: false,
			error: {
				$kind: "MoveAbort",
				message: formatMoveAbortMessage({
					command,
					location: pkg && module ? {
						package: pkg,
						module,
						functionName: abortError.function ?? void 0,
						instruction
					} : void 0,
					abortCode: String(abortError.error_code ?? 0),
					cleverError: abortError.line != null ? { lineNumber: abortError.line } : void 0
				}),
				command,
				MoveAbort: {
					abortCode: String(abortError.error_code ?? 0),
					location: abortError.module_id ? {
						package: normalizeSuiAddress(abortError.module_id.split("::")[0] ?? ""),
						module: abortError.module_id.split("::")[1] ?? "",
						functionName: abortError.function ?? void 0,
						instruction
					} : void 0
				}
			}
		};
	}
	return {
		success: false,
		error: {
			$kind: "Unknown",
			message: rawMessage,
			Unknown: null
		}
	};
}
var JSONRpcCoreClient = class extends CoreClient {
	#jsonRpcClient;
	constructor({ jsonRpcClient, mvr }) {
		super({
			network: jsonRpcClient.network,
			base: jsonRpcClient,
			mvr
		});
		this.#jsonRpcClient = jsonRpcClient;
	}
	async getObjects(options) {
		const batches = chunk(options.objectIds, 50);
		const results = [];
		for (const batch of batches) {
			const objects = await this.#jsonRpcClient.multiGetObjects({
				ids: batch,
				options: {
					showOwner: true,
					showType: true,
					showBcs: options.include?.content || options.include?.objectBcs ? true : false,
					showPreviousTransaction: options.include?.previousTransaction || options.include?.objectBcs ? true : false,
					showStorageRebate: options.include?.objectBcs ?? false,
					showContent: options.include?.json ?? false
				},
				signal: options.signal
			});
			for (const [idx, object] of objects.entries()) if (object.error) results.push(ObjectError.fromResponse(object.error, batch[idx]));
			else results.push(parseObject(object.data, options.include));
		}
		return { objects: results };
	}
	async listOwnedObjects(options) {
		let filter = null;
		if (options.type) {
			const parts = options.type.split("::");
			if (parts.length === 1) filter = { Package: options.type };
			else if (parts.length === 2) filter = { MoveModule: {
				package: parts[0],
				module: parts[1]
			} };
			else filter = { StructType: options.type };
		}
		const objects = await this.#jsonRpcClient.getOwnedObjects({
			owner: options.owner,
			limit: options.limit,
			cursor: options.cursor,
			options: {
				showOwner: true,
				showType: true,
				showBcs: options.include?.content || options.include?.objectBcs ? true : false,
				showPreviousTransaction: options.include?.previousTransaction || options.include?.objectBcs ? true : false,
				showStorageRebate: options.include?.objectBcs ?? false,
				showContent: options.include?.json ?? false
			},
			filter,
			signal: options.signal
		});
		return {
			objects: objects.data.map((result) => {
				if (result.error) throw ObjectError.fromResponse(result.error);
				return parseObject(result.data, options.include);
			}),
			hasNextPage: objects.hasNextPage,
			cursor: objects.nextCursor ?? null
		};
	}
	async listCoins(options) {
		const coins = await this.#jsonRpcClient.getCoins({
			owner: options.owner,
			coinType: options.coinType,
			limit: options.limit,
			cursor: options.cursor,
			signal: options.signal
		});
		return {
			objects: coins.data.map((coin) => ({
				objectId: coin.coinObjectId,
				version: coin.version,
				digest: coin.digest,
				balance: coin.balance,
				type: normalizeStructTag(`0x2::coin::Coin<${coin.coinType}>`),
				owner: {
					$kind: "AddressOwner",
					AddressOwner: options.owner
				}
			})),
			hasNextPage: coins.hasNextPage,
			cursor: coins.nextCursor ?? null
		};
	}
	async getBalance(options) {
		const balance = await this.#jsonRpcClient.getBalance({
			owner: options.owner,
			coinType: options.coinType,
			signal: options.signal
		});
		const addressBalance = balance.fundsInAddressBalance ?? "0";
		const coinBalance = String(BigInt(balance.totalBalance) - BigInt(addressBalance));
		return { balance: {
			coinType: normalizeStructTag(balance.coinType),
			balance: balance.totalBalance,
			coinBalance,
			addressBalance
		} };
	}
	async getCoinMetadata(options) {
		const coinType = (await this.mvr.resolveType({ type: options.coinType })).type;
		const result = await this.#jsonRpcClient.getCoinMetadata({
			coinType,
			signal: options.signal
		});
		if (!result) return { coinMetadata: null };
		return { coinMetadata: {
			id: result.id ?? null,
			decimals: result.decimals,
			name: result.name,
			symbol: result.symbol,
			description: result.description,
			iconUrl: result.iconUrl ?? null
		} };
	}
	async listBalances(options) {
		return {
			balances: (await this.#jsonRpcClient.getAllBalances({
				owner: options.owner,
				signal: options.signal
			})).map((balance) => {
				const addressBalance = balance.fundsInAddressBalance ?? "0";
				const coinBalance = String(BigInt(balance.totalBalance) - BigInt(addressBalance));
				return {
					coinType: normalizeStructTag(balance.coinType),
					balance: balance.totalBalance,
					coinBalance,
					addressBalance
				};
			}),
			hasNextPage: false,
			cursor: null
		};
	}
	async getTransaction(options) {
		return parseTransaction(await this.#jsonRpcClient.getTransactionBlock({
			digest: options.digest,
			options: {
				showRawInput: true,
				showEffects: true,
				showObjectChanges: options.include?.objectTypes ?? false,
				showRawEffects: options.include?.effects ?? false,
				showEvents: options.include?.events ?? false,
				showBalanceChanges: options.include?.balanceChanges ?? false
			},
			signal: options.signal
		}), options.include);
	}
	async executeTransaction(options) {
		return parseTransaction(await this.#jsonRpcClient.executeTransactionBlock({
			transactionBlock: options.transaction,
			signature: options.signatures,
			options: {
				showRawInput: true,
				showEffects: true,
				showRawEffects: options.include?.effects ?? false,
				showEvents: options.include?.events ?? false,
				showObjectChanges: options.include?.objectTypes ?? false,
				showBalanceChanges: options.include?.balanceChanges ?? false
			},
			signal: options.signal
		}), options.include);
	}
	async simulateTransaction(options) {
		if (!(options.transaction instanceof Uint8Array)) await options.transaction.prepareForSerialization({ client: this });
		const tx = Transaction.from(options.transaction);
		const data = options.transaction instanceof Uint8Array ? null : TransactionDataBuilder.restore(options.transaction.getData());
		const transactionBytes = data ? data.build({ overrides: { gasData: {
			budget: data.gasData.budget ?? String(MAX_GAS),
			price: data.gasData.price ?? String(await this.#jsonRpcClient.getReferenceGasPrice()),
			payment: data.gasData.payment ?? []
		} } }) : options.transaction;
		const result = await this.#jsonRpcClient.dryRunTransactionBlock({
			transactionBlock: transactionBytes,
			signal: options.signal
		});
		const { effects, objectTypes } = parseTransactionEffectsJson({
			effects: result.effects,
			objectChanges: result.objectChanges
		});
		const transactionData = {
			digest: TransactionDataBuilder.getDigestFromBytes(transactionBytes),
			epoch: null,
			status: effects.status,
			effects: options.include?.effects ? effects : void 0,
			objectTypes: options.include?.objectTypes ? objectTypes : void 0,
			signatures: [],
			transaction: options.include?.transaction ? parseTransactionBcs(options.transaction instanceof Uint8Array ? options.transaction : await options.transaction.build({ client: this }).catch(() => null)) : void 0,
			bcs: options.include?.bcs ? transactionBytes : void 0,
			balanceChanges: options.include?.balanceChanges ? result.balanceChanges.map((change) => ({
				coinType: normalizeStructTag(change.coinType),
				address: parseOwnerAddress(change.owner),
				amount: change.amount
			})) : void 0,
			events: options.include?.events ? result.events?.map((event) => ({
				packageId: event.packageId,
				module: event.transactionModule,
				sender: event.sender,
				eventType: event.type,
				bcs: "bcs" in event ? fromBase64(event.bcs) : new Uint8Array()
			})) ?? [] : void 0
		};
		let commandResults;
		if (options.include?.commandResults) try {
			const sender = tx.getData().sender ?? normalizeSuiAddress("0x0");
			const devInspectResult = await this.#jsonRpcClient.devInspectTransactionBlock({
				sender,
				transactionBlock: tx,
				signal: options.signal
			});
			if (devInspectResult.results) commandResults = devInspectResult.results.map((result$1) => ({
				returnValues: (result$1.returnValues ?? []).map(([bytes]) => ({ bcs: new Uint8Array(bytes) })),
				mutatedReferences: (result$1.mutableReferenceOutputs ?? []).map(([, bytes]) => ({ bcs: new Uint8Array(bytes) }))
			}));
		} catch {}
		return effects.status.success ? {
			$kind: "Transaction",
			Transaction: transactionData,
			commandResults
		} : {
			$kind: "FailedTransaction",
			FailedTransaction: transactionData,
			commandResults
		};
	}
	async getReferenceGasPrice(options) {
		const referenceGasPrice = await this.#jsonRpcClient.getReferenceGasPrice({ signal: options?.signal });
		return { referenceGasPrice: String(referenceGasPrice) };
	}
	async getCurrentSystemState(options) {
		const systemState = await this.#jsonRpcClient.getLatestSuiSystemState({ signal: options?.signal });
		return { systemState: {
			systemStateVersion: systemState.systemStateVersion,
			epoch: systemState.epoch,
			protocolVersion: systemState.protocolVersion,
			referenceGasPrice: systemState.referenceGasPrice?.toString() ?? null,
			epochStartTimestampMs: systemState.epochStartTimestampMs,
			safeMode: systemState.safeMode,
			safeModeStorageRewards: systemState.safeModeStorageRewards,
			safeModeComputationRewards: systemState.safeModeComputationRewards,
			safeModeStorageRebates: systemState.safeModeStorageRebates,
			safeModeNonRefundableStorageFee: systemState.safeModeNonRefundableStorageFee,
			parameters: {
				epochDurationMs: systemState.epochDurationMs,
				stakeSubsidyStartEpoch: systemState.stakeSubsidyStartEpoch,
				maxValidatorCount: systemState.maxValidatorCount,
				minValidatorJoiningStake: systemState.minValidatorJoiningStake,
				validatorLowStakeThreshold: systemState.validatorLowStakeThreshold,
				validatorLowStakeGracePeriod: systemState.validatorLowStakeGracePeriod
			},
			storageFund: {
				totalObjectStorageRebates: systemState.storageFundTotalObjectStorageRebates,
				nonRefundableBalance: systemState.storageFundNonRefundableBalance
			},
			stakeSubsidy: {
				balance: systemState.stakeSubsidyBalance,
				distributionCounter: systemState.stakeSubsidyDistributionCounter,
				currentDistributionAmount: systemState.stakeSubsidyCurrentDistributionAmount,
				stakeSubsidyPeriodLength: systemState.stakeSubsidyPeriodLength,
				stakeSubsidyDecreaseRate: systemState.stakeSubsidyDecreaseRate
			}
		} };
	}
	async listDynamicFields(options) {
		const dynamicFields = await this.#jsonRpcClient.getDynamicFields({
			parentId: options.parentId,
			limit: options.limit,
			cursor: options.cursor
		});
		return {
			dynamicFields: dynamicFields.data.map((dynamicField) => {
				const fullType = dynamicField.type === "DynamicObject" ? `0x2::dynamic_field::Field<0x2::dynamic_object_field::Wrapper<${dynamicField.name.type}>, 0x2::object::ID>` : `0x2::dynamic_field::Field<${dynamicField.name.type}, ${dynamicField.objectType}>`;
				return {
					fieldId: dynamicField.objectId,
					type: normalizeStructTag(fullType),
					name: {
						type: dynamicField.name.type,
						bcs: fromBase64(dynamicField.bcsName)
					},
					valueType: dynamicField.objectType
				};
			}),
			hasNextPage: dynamicFields.hasNextPage,
			cursor: dynamicFields.nextCursor
		};
	}
	async verifyZkLoginSignature(options) {
		const result = await this.#jsonRpcClient.verifyZkLoginSignature({
			bytes: options.bytes,
			signature: options.signature,
			intentScope: options.intentScope,
			author: options.address
		});
		return {
			success: result.success,
			errors: result.errors
		};
	}
	async defaultNameServiceName(options) {
		return { data: { name: (await this.#jsonRpcClient.resolveNameServiceNames(options)).data[0] } };
	}
	resolveTransactionPlugin() {
		return coreClientResolveTransactionPlugin;
	}
	async getMoveFunction(options) {
		const resolvedPackageId = (await this.mvr.resolvePackage({ package: options.packageId })).package;
		const result = await this.#jsonRpcClient.getNormalizedMoveFunction({
			package: resolvedPackageId,
			module: options.moduleName,
			function: options.name
		});
		return { function: {
			packageId: normalizeSuiAddress(resolvedPackageId),
			moduleName: options.moduleName,
			name: options.name,
			visibility: parseVisibility(result.visibility),
			isEntry: result.isEntry,
			typeParameters: result.typeParameters.map((abilities) => ({
				isPhantom: false,
				constraints: parseAbilities(abilities)
			})),
			parameters: result.parameters.map((param) => parseNormalizedSuiMoveType(param)),
			returns: result.return.map((ret) => parseNormalizedSuiMoveType(ret))
		} };
	}
	async getChainIdentifier(_options) {
		return this.cache.read(["chainIdentifier"], async () => {
			return { chainIdentifier: (await this.#jsonRpcClient.getCheckpoint({ id: "0" })).digest };
		});
	}
};
function serializeObjectToBcs(object) {
	if (object.bcs?.dataType !== "moveObject") return;
	try {
		const typeStr = normalizeStructTag(object.bcs.type);
		let moveObjectType;
		const normalizedSuiFramework = normalizeSuiAddress(SUI_FRAMEWORK_ADDRESS);
		const gasCoinType = normalizeStructTag(`${SUI_FRAMEWORK_ADDRESS}::coin::Coin<${SUI_FRAMEWORK_ADDRESS}::sui::SUI>`);
		const stakedSuiType = normalizeStructTag(`${SUI_SYSTEM_ADDRESS}::staking_pool::StakedSui`);
		const coinPrefix = `${normalizedSuiFramework}::coin::Coin<`;
		if (typeStr === gasCoinType) moveObjectType = { GasCoin: null };
		else if (typeStr === stakedSuiType) moveObjectType = { StakedSui: null };
		else if (typeStr.startsWith(coinPrefix)) {
			const innerTypeMatch = typeStr.match(/* @__PURE__ */ new RegExp(`${normalizedSuiFramework.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}::coin::Coin<(.+)>$`));
			if (innerTypeMatch) moveObjectType = { Coin: TypeTagSerializer.parseFromStr(innerTypeMatch[1], true) };
			else throw new Error("Failed to parse Coin type");
		} else {
			const typeTag = TypeTagSerializer.parseFromStr(typeStr, true);
			if (typeof typeTag !== "object" || !("struct" in typeTag)) throw new Error("Expected struct type tag");
			moveObjectType = { Other: typeTag.struct };
		}
		const contents = fromBase64(object.bcs.bcsBytes);
		const owner = convertOwnerToBcs(object.owner);
		return suiBcs.Object.serialize({
			data: { Move: {
				type: moveObjectType,
				hasPublicTransfer: object.bcs.hasPublicTransfer,
				version: object.bcs.version,
				contents
			} },
			owner,
			previousTransaction: object.previousTransaction,
			storageRebate: object.storageRebate
		}).toBytes();
	} catch {
		return;
	}
}
function parseObject(object, include) {
	const bcsContent = object.bcs?.dataType === "moveObject" ? fromBase64(object.bcs.bcsBytes) : void 0;
	const objectBcs = include?.objectBcs ? serializeObjectToBcs(object) : void 0;
	const type = object.type && object.type.includes("::") ? normalizeStructTag(object.type) : object.type ?? "";
	const jsonContent = include?.json && object.content?.dataType === "moveObject" ? object.content.fields : include?.json ? null : void 0;
	return {
		objectId: object.objectId,
		version: object.version,
		digest: object.digest,
		type,
		content: include?.content ? bcsContent : void 0,
		owner: parseOwner(object.owner),
		previousTransaction: include?.previousTransaction ? object.previousTransaction ?? void 0 : void 0,
		objectBcs,
		json: jsonContent
	};
}
function parseOwner(owner) {
	if (owner === "Immutable") return {
		$kind: "Immutable",
		Immutable: true
	};
	if ("ConsensusAddressOwner" in owner) return {
		$kind: "ConsensusAddressOwner",
		ConsensusAddressOwner: {
			owner: owner.ConsensusAddressOwner.owner,
			startVersion: owner.ConsensusAddressOwner.start_version
		}
	};
	if ("AddressOwner" in owner) return {
		$kind: "AddressOwner",
		AddressOwner: owner.AddressOwner
	};
	if ("ObjectOwner" in owner) return {
		$kind: "ObjectOwner",
		ObjectOwner: owner.ObjectOwner
	};
	if ("Shared" in owner) return {
		$kind: "Shared",
		Shared: { initialSharedVersion: owner.Shared.initial_shared_version }
	};
	throw new Error(`Unknown owner type: ${JSON.stringify(owner)}`);
}
function convertOwnerToBcs(owner) {
	if (owner === "Immutable") return { Immutable: null };
	if ("AddressOwner" in owner) return { AddressOwner: owner.AddressOwner };
	if ("ObjectOwner" in owner) return { ObjectOwner: owner.ObjectOwner };
	if ("Shared" in owner) return { Shared: { initialSharedVersion: owner.Shared.initial_shared_version } };
	if (typeof owner === "object" && owner !== null && "ConsensusAddressOwner" in owner) return { ConsensusAddressOwner: {
		startVersion: owner.ConsensusAddressOwner.start_version,
		owner: owner.ConsensusAddressOwner.owner
	} };
	throw new Error(`Unknown owner type: ${JSON.stringify(owner)}`);
}
function parseOwnerAddress(owner) {
	if (owner === "Immutable") return null;
	if ("ConsensusAddressOwner" in owner) return owner.ConsensusAddressOwner.owner;
	if ("AddressOwner" in owner) return owner.AddressOwner;
	if ("ObjectOwner" in owner) return owner.ObjectOwner;
	if ("Shared" in owner) return null;
	throw new Error(`Unknown owner type: ${JSON.stringify(owner)}`);
}
function parseTransaction(transaction, include) {
	const objectTypes = {};
	if (include?.objectTypes) transaction.objectChanges?.forEach((change) => {
		if (change.type !== "published") objectTypes[change.objectId] = normalizeStructTag(change.objectType);
	});
	let transactionData;
	let signatures = [];
	let bcsBytes;
	if (transaction.rawTransaction) {
		const parsedTx = suiBcs.SenderSignedData.parse(fromBase64(transaction.rawTransaction))[0];
		signatures = parsedTx.txSignatures;
		if (include?.transaction || include?.bcs) {
			const bytes = suiBcs.TransactionData.serialize(parsedTx.intentMessage.value).toBytes();
			if (include?.bcs) bcsBytes = bytes;
			if (include?.transaction) transactionData = { ...TransactionDataBuilder.restore({
				version: 2,
				sender: parsedTx.intentMessage.value.V1.sender,
				expiration: parsedTx.intentMessage.value.V1.expiration,
				gasData: parsedTx.intentMessage.value.V1.gasData,
				inputs: parsedTx.intentMessage.value.V1.kind.ProgrammableTransaction.inputs,
				commands: parsedTx.intentMessage.value.V1.kind.ProgrammableTransaction.commands
			}) };
		}
	}
	const status = transaction.effects?.status ? parseJsonRpcExecutionStatus(transaction.effects.status, transaction.effects.abortError) : {
		success: false,
		error: {
			$kind: "Unknown",
			message: "Unknown",
			Unknown: null
		}
	};
	const effectsBytes = transaction.rawEffects ? new Uint8Array(transaction.rawEffects) : null;
	const result = {
		digest: transaction.digest,
		epoch: transaction.effects?.executedEpoch ?? null,
		status,
		effects: include?.effects && effectsBytes ? parseTransactionEffectsBcs(effectsBytes) : void 0,
		objectTypes: include?.objectTypes ? objectTypes : void 0,
		transaction: transactionData,
		bcs: bcsBytes,
		signatures,
		balanceChanges: include?.balanceChanges ? transaction.balanceChanges?.map((change) => ({
			coinType: normalizeStructTag(change.coinType),
			address: parseOwnerAddress(change.owner),
			amount: change.amount
		})) ?? [] : void 0,
		events: include?.events ? transaction.events?.map((event) => ({
			packageId: event.packageId,
			module: event.transactionModule,
			sender: event.sender,
			eventType: event.type,
			bcs: "bcs" in event ? fromBase64(event.bcs) : new Uint8Array()
		})) ?? [] : void 0
	};
	return status.success ? {
		$kind: "Transaction",
		Transaction: result
	} : {
		$kind: "FailedTransaction",
		FailedTransaction: result
	};
}
function parseTransactionEffectsJson({ bytes, effects, objectChanges }) {
	const changedObjects = [];
	const unchangedConsensusObjects = [];
	const objectTypes = {};
	objectChanges?.forEach((change) => {
		switch (change.type) {
			case "published":
				changedObjects.push({
					objectId: change.packageId,
					inputState: "DoesNotExist",
					inputVersion: null,
					inputDigest: null,
					inputOwner: null,
					outputState: "PackageWrite",
					outputVersion: change.version,
					outputDigest: change.digest,
					outputOwner: null,
					idOperation: "Created"
				});
				break;
			case "transferred":
				changedObjects.push({
					objectId: change.objectId,
					inputState: "Exists",
					inputVersion: change.version,
					inputDigest: change.digest,
					inputOwner: {
						$kind: "AddressOwner",
						AddressOwner: change.sender
					},
					outputState: "ObjectWrite",
					outputVersion: change.version,
					outputDigest: change.digest,
					outputOwner: parseOwner(change.recipient),
					idOperation: "None"
				});
				objectTypes[change.objectId] = normalizeStructTag(change.objectType);
				break;
			case "mutated":
				changedObjects.push({
					objectId: change.objectId,
					inputState: "Exists",
					inputVersion: change.previousVersion,
					inputDigest: null,
					inputOwner: parseOwner(change.owner),
					outputState: "ObjectWrite",
					outputVersion: change.version,
					outputDigest: change.digest,
					outputOwner: parseOwner(change.owner),
					idOperation: "None"
				});
				objectTypes[change.objectId] = normalizeStructTag(change.objectType);
				break;
			case "deleted":
				changedObjects.push({
					objectId: change.objectId,
					inputState: "Exists",
					inputVersion: change.version,
					inputDigest: effects.deleted?.find((d) => d.objectId === change.objectId)?.digest ?? null,
					inputOwner: null,
					outputState: "DoesNotExist",
					outputVersion: null,
					outputDigest: null,
					outputOwner: null,
					idOperation: "Deleted"
				});
				objectTypes[change.objectId] = normalizeStructTag(change.objectType);
				break;
			case "wrapped":
				changedObjects.push({
					objectId: change.objectId,
					inputState: "Exists",
					inputVersion: change.version,
					inputDigest: null,
					inputOwner: {
						$kind: "AddressOwner",
						AddressOwner: change.sender
					},
					outputState: "ObjectWrite",
					outputVersion: change.version,
					outputDigest: effects.wrapped?.find((w) => w.objectId === change.objectId)?.digest ?? null,
					outputOwner: {
						$kind: "ObjectOwner",
						ObjectOwner: change.sender
					},
					idOperation: "None"
				});
				objectTypes[change.objectId] = normalizeStructTag(change.objectType);
				break;
			case "created":
				changedObjects.push({
					objectId: change.objectId,
					inputState: "DoesNotExist",
					inputVersion: null,
					inputDigest: null,
					inputOwner: null,
					outputState: "ObjectWrite",
					outputVersion: change.version,
					outputDigest: change.digest,
					outputOwner: parseOwner(change.owner),
					idOperation: "Created"
				});
				objectTypes[change.objectId] = normalizeStructTag(change.objectType);
				break;
		}
	});
	return {
		objectTypes,
		effects: {
			bcs: bytes ?? null,
			version: 2,
			status: parseJsonRpcExecutionStatus(effects.status, effects.abortError),
			gasUsed: effects.gasUsed,
			transactionDigest: effects.transactionDigest,
			gasObject: {
				objectId: effects.gasObject?.reference.objectId,
				inputState: "Exists",
				inputVersion: null,
				inputDigest: null,
				inputOwner: null,
				outputState: "ObjectWrite",
				outputVersion: effects.gasObject.reference.version,
				outputDigest: effects.gasObject.reference.digest,
				outputOwner: parseOwner(effects.gasObject.owner),
				idOperation: "None"
			},
			eventsDigest: effects.eventsDigest ?? null,
			dependencies: effects.dependencies ?? [],
			lamportVersion: effects.gasObject.reference.version,
			changedObjects,
			unchangedConsensusObjects,
			auxiliaryDataDigest: null
		}
	};
}
function parseNormalizedSuiMoveType(type) {
	if (typeof type !== "string") {
		if ("Reference" in type) return {
			reference: "immutable",
			body: parseNormalizedSuiMoveTypeBody(type.Reference)
		};
		if ("MutableReference" in type) return {
			reference: "mutable",
			body: parseNormalizedSuiMoveTypeBody(type.MutableReference)
		};
	}
	return {
		reference: null,
		body: parseNormalizedSuiMoveTypeBody(type)
	};
}
function parseNormalizedSuiMoveTypeBody(type) {
	switch (type) {
		case "Address": return { $kind: "address" };
		case "Bool": return { $kind: "bool" };
		case "U8": return { $kind: "u8" };
		case "U16": return { $kind: "u16" };
		case "U32": return { $kind: "u32" };
		case "U64": return { $kind: "u64" };
		case "U128": return { $kind: "u128" };
		case "U256": return { $kind: "u256" };
	}
	if (typeof type === "string") throw new Error(`Unknown type: ${type}`);
	if ("Vector" in type) return {
		$kind: "vector",
		vector: parseNormalizedSuiMoveTypeBody(type.Vector)
	};
	if ("Struct" in type) return {
		$kind: "datatype",
		datatype: {
			typeName: `${normalizeSuiAddress(type.Struct.address)}::${type.Struct.module}::${type.Struct.name}`,
			typeParameters: type.Struct.typeArguments.map((t) => parseNormalizedSuiMoveTypeBody(t))
		}
	};
	if ("TypeParameter" in type) return {
		$kind: "typeParameter",
		index: type.TypeParameter
	};
	throw new Error(`Unknown type: ${JSON.stringify(type)}`);
}
function parseAbilities(abilitySet) {
	return abilitySet.abilities.map((ability) => {
		switch (ability) {
			case "Copy": return "copy";
			case "Drop": return "drop";
			case "Store": return "store";
			case "Key": return "key";
			default: return "unknown";
		}
	});
}
function parseVisibility(visibility) {
	switch (visibility) {
		case "Public": return "public";
		case "Private": return "private";
		case "Friend": return "friend";
		default: return "unknown";
	}
}

//#endregion
export { JSONRpcCoreClient };
//# sourceMappingURL=core.mjs.map