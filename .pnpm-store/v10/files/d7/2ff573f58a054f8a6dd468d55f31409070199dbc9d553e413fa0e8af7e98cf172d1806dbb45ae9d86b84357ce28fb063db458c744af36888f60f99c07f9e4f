import { normalizeStructTag, normalizeSuiAddress } from "../utils/sui-types.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { CoreClient } from "../client/core.mjs";
import { formatMoveAbortMessage } from "../client/utils.mjs";
import { SimulationError } from "../client/errors.mjs";
import { SUI_TYPE_ARG } from "../utils/constants.mjs";
import { Value } from "./proto/google/protobuf/struct.mjs";
import { Ability, FunctionDescriptor_Visibility, OpenSignatureBody_Type, OpenSignature_Reference } from "./proto/sui/rpc/v2/move_package.mjs";
import { Owner_OwnerKind } from "./proto/sui/rpc/v2/owner.mjs";
import { applyGrpcResolvedTransaction, grpcTransactionToTransactionData, transactionDataToGrpcTransaction, transactionToGrpcTransaction } from "../client/transaction-resolver.mjs";
import { CommandArgumentError_CommandArgumentErrorKind } from "./proto/sui/rpc/v2/execution_status.mjs";
import { ChangedObject_IdOperation, ChangedObject_InputObjectState, ChangedObject_OutputObjectState, UnchangedConsensusObject_UnchangedConsensusObjectKind } from "./proto/sui/rpc/v2/effects.mjs";
import { DynamicField_DynamicFieldKind } from "./proto/sui/rpc/v2/state_service.mjs";
import { chunk, fromBase64, toBase64 } from "@mysten/utils";

//#region src/grpc/core.ts
var GrpcCoreClient = class extends CoreClient {
	#client;
	constructor({ client, ...options }) {
		super(options);
		this.#client = client;
	}
	async getObjects(options) {
		const batches = chunk(options.objectIds, 50);
		const results = [];
		const paths = [
			"owner",
			"object_type",
			"digest",
			"version",
			"object_id"
		];
		if (options.include?.content) paths.push("contents");
		if (options.include?.previousTransaction) paths.push("previous_transaction");
		if (options.include?.objectBcs) paths.push("bcs");
		if (options.include?.json) paths.push("json");
		for (const batch of batches) {
			const response = await this.#client.ledgerService.batchGetObjects({
				requests: batch.map((id) => ({ objectId: id })),
				readMask: { paths }
			});
			results.push(...response.response.objects.map((object) => {
				if (object.result.oneofKind === "error") return new Error(object.result.error.message);
				if (object.result.oneofKind !== "object") return /* @__PURE__ */ new Error("Unexpected result type");
				const bcsContent = object.result.object.contents?.value ?? void 0;
				const objectBcs = object.result.object.bcs?.value ?? void 0;
				const objectType = object.result.object.objectType;
				const type = objectType && objectType.includes("::") ? normalizeStructTag(objectType) : objectType ?? "";
				const jsonContent = options.include?.json ? object.result.object.json ? Value.toJson(object.result.object.json) : null : void 0;
				return {
					objectId: object.result.object.objectId,
					version: object.result.object.version?.toString(),
					digest: object.result.object.digest,
					content: bcsContent,
					owner: mapOwner(object.result.object.owner),
					type,
					previousTransaction: object.result.object.previousTransaction ?? void 0,
					objectBcs,
					json: jsonContent
				};
			}));
		}
		return { objects: results };
	}
	async listOwnedObjects(options) {
		const paths = [
			"owner",
			"object_type",
			"digest",
			"version",
			"object_id"
		];
		if (options.include?.content) paths.push("contents");
		if (options.include?.previousTransaction) paths.push("previous_transaction");
		if (options.include?.objectBcs) paths.push("bcs");
		if (options.include?.json) paths.push("json");
		const response = await this.#client.stateService.listOwnedObjects({
			owner: options.owner,
			objectType: options.type ? (await this.mvr.resolveType({ type: options.type })).type : void 0,
			pageToken: options.cursor ? fromBase64(options.cursor) : void 0,
			pageSize: options.limit,
			readMask: { paths }
		});
		return {
			objects: response.response.objects.map((object) => ({
				objectId: object.objectId,
				version: object.version?.toString(),
				digest: object.digest,
				content: object.contents?.value,
				owner: mapOwner(object.owner),
				type: object.objectType,
				previousTransaction: object.previousTransaction ?? void 0,
				objectBcs: object.bcs?.value,
				json: options.include?.json ? object.json ? Value.toJson(object.json) : null : void 0
			})),
			cursor: response.response.nextPageToken ? toBase64(response.response.nextPageToken) : null,
			hasNextPage: response.response.nextPageToken !== void 0
		};
	}
	async listCoins(options) {
		const paths = [
			"owner",
			"object_type",
			"digest",
			"version",
			"object_id",
			"balance"
		];
		const coinType = options.coinType ?? SUI_TYPE_ARG;
		const response = await this.#client.stateService.listOwnedObjects({
			owner: options.owner,
			objectType: `0x2::coin::Coin<${(await this.mvr.resolveType({ type: coinType })).type}>`,
			pageToken: options.cursor ? fromBase64(options.cursor) : void 0,
			readMask: { paths }
		});
		return {
			objects: response.response.objects.map((object) => ({
				objectId: object.objectId,
				version: object.version?.toString(),
				digest: object.digest,
				owner: mapOwner(object.owner),
				type: object.objectType,
				balance: object.balance?.toString()
			})),
			cursor: response.response.nextPageToken ? toBase64(response.response.nextPageToken) : null,
			hasNextPage: response.response.nextPageToken !== void 0
		};
	}
	async getBalance(options) {
		const coinType = options.coinType ?? SUI_TYPE_ARG;
		const result = await this.#client.stateService.getBalance({
			owner: options.owner,
			coinType: (await this.mvr.resolveType({ type: coinType })).type
		});
		return { balance: {
			balance: result.response.balance?.balance?.toString() ?? "0",
			coinType: result.response.balance?.coinType ?? coinType,
			coinBalance: result.response.balance?.coinBalance?.toString() ?? "0",
			addressBalance: result.response.balance?.addressBalance?.toString() ?? "0"
		} };
	}
	async getCoinMetadata(options) {
		const coinType = (await this.mvr.resolveType({ type: options.coinType })).type;
		let response;
		try {
			({response} = await this.#client.stateService.getCoinInfo({ coinType }));
		} catch {
			return { coinMetadata: null };
		}
		if (!response.metadata) return { coinMetadata: null };
		return { coinMetadata: {
			id: response.metadata.id ?? null,
			decimals: response.metadata.decimals ?? 0,
			name: response.metadata.name ?? "",
			symbol: response.metadata.symbol ?? "",
			description: response.metadata.description ?? "",
			iconUrl: response.metadata.iconUrl ?? null
		} };
	}
	async listBalances(options) {
		const result = await this.#client.stateService.listBalances({
			owner: options.owner,
			pageToken: options.cursor ? fromBase64(options.cursor) : void 0,
			pageSize: options.limit
		});
		return {
			hasNextPage: !!result.response.nextPageToken,
			cursor: result.response.nextPageToken ? toBase64(result.response.nextPageToken) : null,
			balances: result.response.balances.map((balance) => ({
				balance: balance.balance?.toString() ?? "0",
				coinType: balance.coinType,
				coinBalance: balance.coinBalance?.toString() ?? "0",
				addressBalance: balance.addressBalance?.toString() ?? "0"
			}))
		};
	}
	async getTransaction(options) {
		const paths = [
			"digest",
			"transaction.digest",
			"signatures",
			"effects.status"
		];
		if (options.include?.transaction) paths.push("transaction.sender", "transaction.gas_payment", "transaction.expiration", "transaction.kind");
		if (options.include?.bcs) paths.push("transaction.bcs");
		if (options.include?.balanceChanges) paths.push("balance_changes");
		if (options.include?.effects) paths.push("effects");
		if (options.include?.events) paths.push("events");
		if (options.include?.objectTypes) {
			paths.push("effects.changed_objects.object_type");
			paths.push("effects.changed_objects.object_id");
		}
		const { response } = await this.#client.ledgerService.getTransaction({
			digest: options.digest,
			readMask: { paths }
		});
		if (!response.transaction) throw new Error(`Transaction ${options.digest} not found`);
		return parseTransaction(response.transaction, options.include);
	}
	async executeTransaction(options) {
		const paths = [
			"digest",
			"transaction.digest",
			"signatures",
			"effects.status"
		];
		if (options.include?.transaction) paths.push("transaction.sender", "transaction.gas_payment", "transaction.expiration", "transaction.kind");
		if (options.include?.bcs) paths.push("transaction.bcs");
		if (options.include?.balanceChanges) paths.push("balance_changes");
		if (options.include?.effects) paths.push("effects");
		if (options.include?.events) paths.push("events");
		if (options.include?.objectTypes) {
			paths.push("effects.changed_objects.object_type");
			paths.push("effects.changed_objects.object_id");
		}
		const { response } = await this.#client.transactionExecutionService.executeTransaction({
			transaction: { bcs: { value: options.transaction } },
			signatures: options.signatures.map((signature) => ({
				bcs: { value: fromBase64(signature) },
				signature: { oneofKind: void 0 }
			})),
			readMask: { paths }
		});
		return parseTransaction(response.transaction, options.include);
	}
	async simulateTransaction(options) {
		const paths = [
			"transaction.digest",
			"transaction.transaction.digest",
			"transaction.signatures",
			"transaction.effects.status"
		];
		if (options.include?.transaction) paths.push("transaction.transaction.sender", "transaction.transaction.gas_payment", "transaction.transaction.expiration", "transaction.transaction.kind");
		if (options.include?.bcs) paths.push("transaction.transaction.bcs");
		if (options.include?.balanceChanges) paths.push("transaction.balance_changes");
		if (options.include?.effects) paths.push("transaction.effects");
		if (options.include?.events) paths.push("transaction.events");
		if (options.include?.objectTypes) {
			paths.push("transaction.effects.changed_objects.object_type");
			paths.push("transaction.effects.changed_objects.object_id");
		}
		if (options.include?.commandResults) paths.push("command_outputs");
		if (!(options.transaction instanceof Uint8Array)) await options.transaction.prepareForSerialization({ client: this });
		const { response } = await this.#client.transactionExecutionService.simulateTransaction({
			transaction: options.transaction instanceof Uint8Array ? { bcs: { value: options.transaction } } : transactionToGrpcTransaction(options.transaction),
			readMask: { paths },
			doGasSelection: false
		});
		const transactionResult = parseTransaction(response.transaction, options.include);
		const commandResults = options.include?.commandResults && response.commandOutputs ? response.commandOutputs.map((output) => ({
			returnValues: (output.returnValues ?? []).map((rv) => ({ bcs: rv.value?.value ?? null })),
			mutatedReferences: (output.mutatedByRef ?? []).map((mr) => ({ bcs: mr.value?.value ?? null }))
		})) : void 0;
		if (transactionResult.$kind === "Transaction") return {
			$kind: "Transaction",
			Transaction: transactionResult.Transaction,
			commandResults
		};
		else return {
			$kind: "FailedTransaction",
			FailedTransaction: transactionResult.FailedTransaction,
			commandResults
		};
	}
	async getReferenceGasPrice() {
		return { referenceGasPrice: (await this.#client.ledgerService.getEpoch({ readMask: { paths: ["reference_gas_price"] } })).response.epoch?.referenceGasPrice?.toString() ?? "" };
	}
	async getCurrentSystemState() {
		const epoch = (await this.#client.ledgerService.getEpoch({ readMask: { paths: [
			"system_state.version",
			"system_state.epoch",
			"system_state.protocol_version",
			"system_state.reference_gas_price",
			"system_state.epoch_start_timestamp_ms",
			"system_state.safe_mode",
			"system_state.safe_mode_storage_rewards",
			"system_state.safe_mode_computation_rewards",
			"system_state.safe_mode_storage_rebates",
			"system_state.safe_mode_non_refundable_storage_fee",
			"system_state.parameters",
			"system_state.storage_fund",
			"system_state.stake_subsidy"
		] } })).response.epoch;
		const systemState = epoch?.systemState;
		if (!systemState) throw new Error("System state not found in response");
		const startMs = epoch?.start?.seconds ? Number(epoch.start.seconds) * 1e3 + Math.floor((epoch.start.nanos || 0) / 1e6) : systemState.epochStartTimestampMs ? Number(systemState.epochStartTimestampMs) : null;
		return { systemState: {
			systemStateVersion: systemState.version?.toString() ?? null,
			epoch: systemState.epoch?.toString() ?? null,
			protocolVersion: systemState.protocolVersion?.toString() ?? null,
			referenceGasPrice: systemState.referenceGasPrice?.toString() ?? null,
			epochStartTimestampMs: startMs.toString(),
			safeMode: systemState.safeMode ?? false,
			safeModeStorageRewards: systemState.safeModeStorageRewards?.toString() ?? null,
			safeModeComputationRewards: systemState.safeModeComputationRewards?.toString() ?? null,
			safeModeStorageRebates: systemState.safeModeStorageRebates?.toString() ?? null,
			safeModeNonRefundableStorageFee: systemState.safeModeNonRefundableStorageFee?.toString() ?? null,
			parameters: {
				epochDurationMs: systemState.parameters?.epochDurationMs?.toString() ?? null,
				stakeSubsidyStartEpoch: systemState.parameters?.stakeSubsidyStartEpoch?.toString() ?? null,
				maxValidatorCount: systemState.parameters?.maxValidatorCount?.toString() ?? null,
				minValidatorJoiningStake: systemState.parameters?.minValidatorJoiningStake?.toString() ?? null,
				validatorLowStakeThreshold: systemState.parameters?.validatorLowStakeThreshold?.toString() ?? null,
				validatorLowStakeGracePeriod: systemState.parameters?.validatorLowStakeGracePeriod?.toString() ?? null
			},
			storageFund: {
				totalObjectStorageRebates: systemState.storageFund?.totalObjectStorageRebates?.toString() ?? null,
				nonRefundableBalance: systemState.storageFund?.nonRefundableBalance?.toString() ?? null
			},
			stakeSubsidy: {
				balance: systemState.stakeSubsidy?.balance?.toString() ?? null,
				distributionCounter: systemState.stakeSubsidy?.distributionCounter?.toString() ?? null,
				currentDistributionAmount: systemState.stakeSubsidy?.currentDistributionAmount?.toString() ?? null,
				stakeSubsidyPeriodLength: systemState.stakeSubsidy?.stakeSubsidyPeriodLength?.toString() ?? null,
				stakeSubsidyDecreaseRate: systemState.stakeSubsidy?.stakeSubsidyDecreaseRate ?? null
			}
		} };
	}
	async listDynamicFields(options) {
		const response = await this.#client.stateService.listDynamicFields({
			parent: options.parentId,
			pageToken: options.cursor ? fromBase64(options.cursor) : void 0,
			pageSize: options.limit,
			readMask: { paths: [
				"field_id",
				"name",
				"value_type",
				"kind"
			] }
		});
		return {
			dynamicFields: response.response.dynamicFields.map((field) => {
				const fieldType = field.kind === DynamicField_DynamicFieldKind.OBJECT ? `0x2::dynamic_field::Field<0x2::dynamic_object_field::Wrapper<${field.name?.name}>,0x2::object::ID>` : `0x2::dynamic_field::Field<${field.name?.name},${field.valueType}>`;
				return {
					fieldId: field.fieldId,
					name: {
						type: field.name?.name,
						bcs: field.name?.value
					},
					valueType: field.valueType,
					type: normalizeStructTag(fieldType)
				};
			}),
			cursor: response.response.nextPageToken ? toBase64(response.response.nextPageToken) : null,
			hasNextPage: response.response.nextPageToken !== void 0
		};
	}
	async verifyZkLoginSignature(options) {
		const messageBytes = fromBase64(options.bytes);
		const messageValue = options.intentScope === "PersonalMessage" ? suiBcs.byteVector().serialize(messageBytes).toBytes() : messageBytes;
		const { response } = await this.#client.signatureVerificationService.verifySignature({
			message: {
				name: options.intentScope,
				value: messageValue
			},
			signature: {
				bcs: { value: fromBase64(options.signature) },
				signature: { oneofKind: void 0 }
			},
			address: options.address,
			jwks: []
		});
		return {
			success: response.isValid ?? false,
			errors: response.reason ? [response.reason] : []
		};
	}
	async defaultNameServiceName(options) {
		return { data: { name: (await this.#client.nameService.reverseLookupName({ address: options.address })).response.record?.name ?? null } };
	}
	async getMoveFunction(options) {
		const resolvedPackageId = (await this.mvr.resolvePackage({ package: options.packageId })).package;
		const { response } = await this.#client.movePackageService.getFunction({
			packageId: resolvedPackageId,
			moduleName: options.moduleName,
			name: options.name
		});
		let visibility = "unknown";
		switch (response.function?.visibility) {
			case FunctionDescriptor_Visibility.PUBLIC:
				visibility = "public";
				break;
			case FunctionDescriptor_Visibility.PRIVATE:
				visibility = "private";
				break;
			case FunctionDescriptor_Visibility.FRIEND:
				visibility = "friend";
				break;
		}
		return { function: {
			packageId: normalizeSuiAddress(resolvedPackageId),
			moduleName: options.moduleName,
			name: response.function?.name,
			visibility,
			isEntry: response.function?.isEntry ?? false,
			typeParameters: response.function?.typeParameters?.map(({ constraints }) => ({
				isPhantom: false,
				constraints: constraints.map((constraint) => {
					switch (constraint) {
						case Ability.COPY: return "copy";
						case Ability.DROP: return "drop";
						case Ability.STORE: return "store";
						case Ability.KEY: return "key";
						default: return "unknown";
					}
				}) ?? []
			})) ?? [],
			parameters: response.function?.parameters?.map((param) => parseNormalizedSuiMoveType(param)) ?? [],
			returns: response.function?.returns?.map((ret) => parseNormalizedSuiMoveType(ret)) ?? []
		} };
	}
	async getChainIdentifier(_options) {
		return this.cache.read(["chainIdentifier"], async () => {
			const { response } = await this.#client.ledgerService.getServiceInfo({});
			if (!response.chainId) throw new Error("Chain identifier not found in service info");
			return { chainIdentifier: response.chainId };
		});
	}
	resolveTransactionPlugin() {
		const client = this.#client;
		return async function resolveTransactionData(transactionData, options, next) {
			const snapshot = transactionData.snapshot();
			if (!snapshot.sender) snapshot.sender = "0x0000000000000000000000000000000000000000000000000000000000000000";
			const grpcTransaction = transactionDataToGrpcTransaction(snapshot);
			let response;
			try {
				response = (await client.transactionExecutionService.simulateTransaction({
					transaction: grpcTransaction,
					doGasSelection: !options.onlyTransactionKind && (snapshot.gasData.budget == null || snapshot.gasData.payment == null),
					readMask: { paths: [
						"transaction.transaction.sender",
						"transaction.transaction.gas_payment",
						"transaction.transaction.expiration",
						"transaction.transaction.kind",
						"transaction.effects.status"
					] }
				})).response;
			} catch (error) {
				if (error instanceof Error && error.message) throw new SimulationError(decodeURIComponent(error.message), { cause: error });
				throw error;
			}
			if (!options.onlyTransactionKind && response.transaction?.effects?.status && !response.transaction.effects.status.success) {
				const executionError = response.transaction.effects.status.error ? parseGrpcExecutionError(response.transaction.effects.status.error) : void 0;
				throw new SimulationError(`Transaction resolution failed: ${executionError?.message ?? "Transaction failed"}`, { executionError });
			}
			if (!response.transaction?.transaction) throw new Error("simulateTransaction did not return resolved transaction data");
			applyGrpcResolvedTransaction(transactionData, response.transaction.transaction, options);
			return await next();
		};
	}
};
function mapOwner(owner) {
	if (!owner) return null;
	if (owner.kind === Owner_OwnerKind.IMMUTABLE) return {
		$kind: "Immutable",
		Immutable: true
	};
	if (owner.kind === Owner_OwnerKind.ADDRESS) return {
		AddressOwner: owner.address,
		$kind: "AddressOwner"
	};
	if (owner.kind === Owner_OwnerKind.OBJECT) return {
		$kind: "ObjectOwner",
		ObjectOwner: owner.address
	};
	if (owner.kind === Owner_OwnerKind.SHARED) return {
		$kind: "Shared",
		Shared: { initialSharedVersion: owner.version?.toString() }
	};
	if (owner.kind === Owner_OwnerKind.CONSENSUS_ADDRESS) return {
		$kind: "ConsensusAddressOwner",
		ConsensusAddressOwner: {
			startVersion: owner.version?.toString(),
			owner: owner.address
		}
	};
	throw new Error(`Unknown owner kind ${JSON.stringify(owner, (_k, v) => typeof v === "bigint" ? v.toString() : v)}`);
}
function parseGrpcExecutionError(error) {
	const message = error.description ?? "Unknown error";
	const command = error.command != null ? Number(error.command) : void 0;
	const details = error.errorDetails;
	switch (details?.oneofKind) {
		case "abort": {
			const abort = details.abort;
			const cleverError = abort.cleverError;
			return {
				$kind: "MoveAbort",
				message: formatMoveAbortMessage({
					command,
					location: abort.location,
					abortCode: String(abort.abortCode ?? 0n),
					cleverError: cleverError ? {
						lineNumber: cleverError.lineNumber != null ? Number(cleverError.lineNumber) : void 0,
						constantName: cleverError.constantName,
						value: cleverError.value?.oneofKind === "rendered" ? cleverError.value.rendered : void 0
					} : void 0
				}),
				command,
				MoveAbort: parseMoveAbort(abort)
			};
		}
		case "sizeError": return {
			$kind: "SizeError",
			message,
			command,
			SizeError: {
				name: mapErrorName(error.kind),
				size: Number(details.sizeError.size ?? 0n),
				maxSize: Number(details.sizeError.maxSize ?? 0n)
			}
		};
		case "commandArgumentError": return {
			$kind: "CommandArgumentError",
			message,
			command,
			CommandArgumentError: {
				argument: details.commandArgumentError.argument ?? 0,
				name: mapErrorName(details.commandArgumentError.kind)
			}
		};
		case "typeArgumentError": return {
			$kind: "TypeArgumentError",
			message,
			command,
			TypeArgumentError: {
				typeArgument: details.typeArgumentError.typeArgument ?? 0,
				name: mapErrorName(details.typeArgumentError.kind)
			}
		};
		case "packageUpgradeError": return {
			$kind: "PackageUpgradeError",
			message,
			command,
			PackageUpgradeError: {
				name: mapErrorName(details.packageUpgradeError.kind),
				packageId: details.packageUpgradeError.packageId,
				digest: details.packageUpgradeError.digest
			}
		};
		case "indexError": return {
			$kind: "IndexError",
			message,
			command,
			IndexError: {
				index: details.indexError.index,
				subresult: details.indexError.subresult
			}
		};
		case "coinDenyListError": return {
			$kind: "CoinDenyListError",
			message,
			command,
			CoinDenyListError: {
				name: mapErrorName(error.kind),
				coinType: details.coinDenyListError.coinType,
				address: details.coinDenyListError.address
			}
		};
		case "congestedObjects": return {
			$kind: "CongestedObjects",
			message,
			command,
			CongestedObjects: {
				name: mapErrorName(error.kind),
				objects: details.congestedObjects.objects
			}
		};
		case "objectId": return {
			$kind: "ObjectIdError",
			message,
			command,
			ObjectIdError: {
				name: mapErrorName(error.kind),
				objectId: details.objectId
			}
		};
		default: return {
			$kind: "Unknown",
			message,
			command,
			Unknown: null
		};
	}
}
function parseMoveAbort(abort) {
	return {
		abortCode: String(abort.abortCode ?? 0n),
		location: { ...abort.location },
		cleverError: abort.cleverError ? {
			errorCode: abort.cleverError.errorCode != null ? Number(abort.cleverError.errorCode) : void 0,
			lineNumber: abort.cleverError.lineNumber != null ? Number(abort.cleverError.lineNumber) : void 0,
			constantName: abort.cleverError.constantName,
			constantType: abort.cleverError.constantType,
			value: abort.cleverError.value?.oneofKind === "rendered" ? abort.cleverError.value.rendered : abort.cleverError.value?.oneofKind === "raw" ? toBase64(abort.cleverError.value.raw) : void 0
		} : void 0
	};
}
function mapErrorName(kind) {
	if (kind == null) return "Unknown";
	const name = CommandArgumentError_CommandArgumentErrorKind[kind];
	if (!name || name.endsWith("_UNKNOWN")) return "Unknown";
	return name.split("_").map((word) => word.charAt(0) + word.slice(1).toLowerCase()).join("");
}
function mapIdOperation(operation) {
	if (operation == null) return null;
	switch (operation) {
		case ChangedObject_IdOperation.CREATED: return "Created";
		case ChangedObject_IdOperation.DELETED: return "Deleted";
		case ChangedObject_IdOperation.NONE:
		case ChangedObject_IdOperation.ID_OPERATION_UNKNOWN: return "None";
		default: return "Unknown";
	}
}
function mapInputObjectState(state) {
	if (state == null) return null;
	switch (state) {
		case ChangedObject_InputObjectState.EXISTS: return "Exists";
		case ChangedObject_InputObjectState.DOES_NOT_EXIST: return "DoesNotExist";
		case ChangedObject_InputObjectState.UNKNOWN: return "Unknown";
		default: return "Unknown";
	}
}
function mapOutputObjectState(state) {
	if (state == null) return null;
	switch (state) {
		case ChangedObject_OutputObjectState.OBJECT_WRITE: return "ObjectWrite";
		case ChangedObject_OutputObjectState.PACKAGE_WRITE: return "PackageWrite";
		case ChangedObject_OutputObjectState.DOES_NOT_EXIST: return "DoesNotExist";
		case ChangedObject_OutputObjectState.ACCUMULATOR_WRITE: return "AccumulatorWriteV1";
		case ChangedObject_OutputObjectState.UNKNOWN: return "Unknown";
		default: return "Unknown";
	}
}
function mapUnchangedConsensusObjectKind(kind) {
	if (kind == null) return null;
	switch (kind) {
		case UnchangedConsensusObject_UnchangedConsensusObjectKind.UNCHANGED_CONSENSUS_OBJECT_KIND_UNKNOWN: return "Unknown";
		case UnchangedConsensusObject_UnchangedConsensusObjectKind.READ_ONLY_ROOT: return "ReadOnlyRoot";
		case UnchangedConsensusObject_UnchangedConsensusObjectKind.MUTATE_CONSENSUS_STREAM_ENDED: return "MutateConsensusStreamEnded";
		case UnchangedConsensusObject_UnchangedConsensusObjectKind.READ_CONSENSUS_STREAM_ENDED: return "ReadConsensusStreamEnded";
		case UnchangedConsensusObject_UnchangedConsensusObjectKind.CANCELED: return "Cancelled";
		case UnchangedConsensusObject_UnchangedConsensusObjectKind.PER_EPOCH_CONFIG: return "PerEpochConfig";
		default: return "Unknown";
	}
}
function parseTransactionEffects({ effects }) {
	if (!effects) return null;
	const changedObjects = effects.changedObjects.map((change) => {
		return {
			objectId: change.objectId,
			inputState: mapInputObjectState(change.inputState),
			inputVersion: change.inputVersion?.toString() ?? null,
			inputDigest: change.inputDigest ?? null,
			inputOwner: mapOwner(change.inputOwner),
			outputState: mapOutputObjectState(change.outputState),
			outputVersion: change.outputVersion?.toString() ?? null,
			outputDigest: change.outputDigest ?? null,
			outputOwner: mapOwner(change.outputOwner),
			idOperation: mapIdOperation(change.idOperation)
		};
	});
	return {
		bcs: effects.bcs?.value,
		version: 2,
		status: effects.status?.success ? {
			success: true,
			error: null
		} : {
			success: false,
			error: parseGrpcExecutionError(effects.status.error)
		},
		gasUsed: {
			computationCost: effects.gasUsed?.computationCost?.toString(),
			storageCost: effects.gasUsed?.storageCost?.toString(),
			storageRebate: effects.gasUsed?.storageRebate?.toString(),
			nonRefundableStorageFee: effects.gasUsed?.nonRefundableStorageFee?.toString()
		},
		transactionDigest: effects.transactionDigest,
		gasObject: {
			objectId: effects.gasObject?.objectId,
			inputState: mapInputObjectState(effects.gasObject?.inputState),
			inputVersion: effects.gasObject?.inputVersion?.toString() ?? null,
			inputDigest: effects.gasObject?.inputDigest ?? null,
			inputOwner: mapOwner(effects.gasObject?.inputOwner),
			outputState: mapOutputObjectState(effects.gasObject?.outputState),
			outputVersion: effects.gasObject?.outputVersion?.toString() ?? null,
			outputDigest: effects.gasObject?.outputDigest ?? null,
			outputOwner: mapOwner(effects.gasObject?.outputOwner),
			idOperation: mapIdOperation(effects.gasObject?.idOperation)
		},
		eventsDigest: effects.eventsDigest ?? null,
		dependencies: effects.dependencies,
		lamportVersion: effects.lamportVersion?.toString() ?? null,
		changedObjects,
		unchangedConsensusObjects: effects.unchangedConsensusObjects.map((object) => {
			return {
				kind: mapUnchangedConsensusObjectKind(object.kind),
				objectId: object.objectId,
				version: object.version?.toString() ?? null,
				digest: object.digest ?? null
			};
		}),
		auxiliaryDataDigest: effects.auxiliaryDataDigest ?? null
	};
}
function parseTransaction(transaction, include) {
	const objectTypes = {};
	if (include?.objectTypes) transaction.effects?.changedObjects?.forEach((change) => {
		if (change.objectId && change.objectType) objectTypes[change.objectId] = change.objectType;
	});
	let transactionData;
	if (include?.transaction) {
		const tx = transaction.transaction;
		if (!tx) throw new Error("Transaction data is required but missing from gRPC response");
		const resolved = grpcTransactionToTransactionData(tx);
		transactionData = {
			gasData: resolved.gasData,
			sender: resolved.sender,
			expiration: resolved.expiration,
			commands: resolved.commands,
			inputs: resolved.inputs,
			version: resolved.version
		};
	}
	const bcsBytes = include?.bcs ? transaction.transaction?.bcs?.value : void 0;
	const effects = include?.effects ? parseTransactionEffects({ effects: transaction.effects }) : void 0;
	const status = transaction.effects?.status?.success ? {
		success: true,
		error: null
	} : {
		success: false,
		error: transaction.effects?.status?.error ? parseGrpcExecutionError(transaction.effects.status.error) : {
			$kind: "Unknown",
			message: "Transaction failed",
			Unknown: null
		}
	};
	const result = {
		digest: transaction.digest,
		epoch: transaction.effects?.epoch?.toString() ?? null,
		status,
		effects,
		objectTypes: include?.objectTypes ? objectTypes : void 0,
		transaction: transactionData,
		bcs: bcsBytes,
		signatures: transaction.signatures?.map((sig) => toBase64(sig.bcs?.value)) ?? [],
		balanceChanges: include?.balanceChanges ? transaction.balanceChanges?.map((change) => ({
			coinType: change.coinType,
			address: change.address,
			amount: change.amount
		})) ?? [] : void 0,
		events: include?.events ? transaction.events?.events.map((event) => ({
			packageId: normalizeSuiAddress(event.packageId),
			module: event.module,
			sender: normalizeSuiAddress(event.sender),
			eventType: event.eventType,
			bcs: event.contents?.value ?? new Uint8Array()
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
function parseNormalizedSuiMoveType(type) {
	let reference = null;
	if (type.reference === OpenSignature_Reference.IMMUTABLE) reference = "immutable";
	else if (type.reference === OpenSignature_Reference.MUTABLE) reference = "mutable";
	return {
		reference,
		body: parseNormalizedSuiMoveTypeBody(type.body)
	};
}
function parseNormalizedSuiMoveTypeBody(type) {
	switch (type.type) {
		case OpenSignatureBody_Type.TYPE_UNKNOWN: return { $kind: "unknown" };
		case OpenSignatureBody_Type.ADDRESS: return { $kind: "address" };
		case OpenSignatureBody_Type.BOOL: return { $kind: "bool" };
		case OpenSignatureBody_Type.U8: return { $kind: "u8" };
		case OpenSignatureBody_Type.U16: return { $kind: "u16" };
		case OpenSignatureBody_Type.U32: return { $kind: "u32" };
		case OpenSignatureBody_Type.U64: return { $kind: "u64" };
		case OpenSignatureBody_Type.U128: return { $kind: "u128" };
		case OpenSignatureBody_Type.U256: return { $kind: "u256" };
		case OpenSignatureBody_Type.VECTOR: return {
			$kind: "vector",
			vector: parseNormalizedSuiMoveTypeBody(type.typeParameterInstantiation[0])
		};
		case OpenSignatureBody_Type.DATATYPE: return {
			$kind: "datatype",
			datatype: {
				typeName: type.typeName,
				typeParameters: type.typeParameterInstantiation.map((t) => parseNormalizedSuiMoveTypeBody(t))
			}
		};
		case OpenSignatureBody_Type.TYPE_PARAMETER: return {
			$kind: "typeParameter",
			index: type.typeParameter
		};
		default: return { $kind: "unknown" };
	}
}

//#endregion
export { GrpcCoreClient };
//# sourceMappingURL=core.mjs.map