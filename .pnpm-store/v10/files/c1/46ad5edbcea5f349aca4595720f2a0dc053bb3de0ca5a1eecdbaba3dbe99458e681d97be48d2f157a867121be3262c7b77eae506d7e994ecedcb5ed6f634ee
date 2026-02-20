import { normalizeStructTag, normalizeSuiAddress } from "../utils/sui-types.mjs";
import { deriveDynamicFieldID } from "../utils/dynamic-fields.mjs";
import { CoreClient } from "../client/core.mjs";
import { TransactionDataBuilder } from "../transactions/TransactionData.mjs";
import { formatMoveAbortMessage, parseTransactionEffectsBcs } from "../client/utils.mjs";
import { ObjectError, SimulationError } from "../client/errors.mjs";
import { SUI_TYPE_ARG } from "../utils/constants.mjs";
import { DefaultSuinsNameDocument, ExecuteTransactionDocument, ExecutionStatus, GetAllBalancesDocument, GetBalanceDocument, GetChainIdentifierDocument, GetCoinMetadataDocument, GetCoinsDocument, GetCurrentSystemStateDocument, GetDynamicFieldsDocument, GetMoveFunctionDocument, GetOwnedObjectsDocument, GetReferenceGasPriceDocument, GetTransactionBlockDocument, MultiGetObjectsDocument, ResolveTransactionDocument, SimulateTransactionDocument, VerifyZkLoginSignatureDocument, ZkLoginIntentScope } from "./generated/queries.mjs";
import { Transaction } from "../grpc/proto/sui/rpc/v2/transaction.mjs";
import { grpcTransactionToTransactionData, transactionDataToGrpcTransaction, transactionToGrpcJson } from "../client/transaction-resolver.mjs";
import { BalanceChange } from "../grpc/proto/sui/rpc/v2/balance_change.mjs";
import { TransactionEffects } from "../grpc/proto/sui/rpc/v2/effects.mjs";
import { chunk, fromBase64, toBase64 } from "@mysten/utils";

//#region src/graphql/core.ts
var GraphQLCoreClient = class extends CoreClient {
	#graphqlClient;
	constructor({ graphqlClient, mvr }) {
		super({
			network: graphqlClient.network,
			base: graphqlClient,
			mvr
		});
		this.#graphqlClient = graphqlClient;
	}
	async #graphqlQuery(options, getData) {
		const { data, errors } = await this.#graphqlClient.query(options);
		handleGraphQLErrors(errors);
		const extractedData = data && (getData ? getData(data) : data);
		if (extractedData == null) throw new Error("Missing response data");
		return extractedData;
	}
	async getObjects(options) {
		const batches = chunk(options.objectIds, 50);
		const results = [];
		for (const batch of batches) {
			const page = await this.#graphqlQuery({
				query: MultiGetObjectsDocument,
				variables: {
					objectKeys: batch.map((address) => ({ address })),
					includeContent: options.include?.content ?? false,
					includePreviousTransaction: options.include?.previousTransaction ?? false,
					includeObjectBcs: options.include?.objectBcs ?? false,
					includeJson: options.include?.json ?? false
				}
			}, (result) => result.multiGetObjects);
			results.push(...batch.map((id) => normalizeSuiAddress(id)).map((id) => page.find((obj) => obj?.address === id) ?? new ObjectError("notFound", `Object ${id} not found`)).map((obj) => {
				if (obj instanceof ObjectError) return obj;
				const bcsContent = obj.asMoveObject?.contents?.bcs ? fromBase64(obj.asMoveObject.contents.bcs) : void 0;
				const objectBcs = obj.objectBcs ? fromBase64(obj.objectBcs) : void 0;
				let type;
				if (obj.asMovePackage) type = "package";
				else if (obj.asMoveObject?.contents?.type?.repr) type = obj.asMoveObject.contents.type.repr;
				else type = "";
				const jsonContent = options.include?.json ? obj.asMoveObject?.contents?.json ? obj.asMoveObject.contents.json : null : void 0;
				return {
					objectId: obj.address,
					version: obj.version?.toString(),
					digest: obj.digest,
					owner: mapOwner(obj.owner),
					type,
					content: bcsContent,
					previousTransaction: obj.previousTransaction?.digest ?? void 0,
					objectBcs,
					json: jsonContent
				};
			}));
		}
		return { objects: results };
	}
	async listOwnedObjects(options) {
		const objects = await this.#graphqlQuery({
			query: GetOwnedObjectsDocument,
			variables: {
				owner: options.owner,
				limit: options.limit,
				cursor: options.cursor,
				filter: options.type ? { type: (await this.mvr.resolveType({ type: options.type })).type } : void 0,
				includeContent: options.include?.content ?? false,
				includePreviousTransaction: options.include?.previousTransaction ?? false,
				includeObjectBcs: options.include?.objectBcs ?? false,
				includeJson: options.include?.json ?? false
			}
		}, (result) => result.address?.objects);
		return {
			objects: objects.nodes.map((obj) => ({
				objectId: obj.address,
				version: obj.version?.toString(),
				digest: obj.digest,
				owner: mapOwner(obj.owner),
				type: obj.contents?.type?.repr,
				content: obj.contents?.bcs ? fromBase64(obj.contents.bcs) : void 0,
				previousTransaction: obj.previousTransaction?.digest ?? void 0,
				objectBcs: obj.objectBcs ? fromBase64(obj.objectBcs) : void 0,
				json: options.include?.json ? obj.contents?.json ? obj.contents.json : null : void 0
			})),
			hasNextPage: objects.pageInfo.hasNextPage,
			cursor: objects.pageInfo.endCursor ?? null
		};
	}
	async listCoins(options) {
		const coinType = options.coinType ?? SUI_TYPE_ARG;
		const coins = await this.#graphqlQuery({
			query: GetCoinsDocument,
			variables: {
				owner: options.owner,
				cursor: options.cursor,
				first: options.limit,
				type: `0x2::coin::Coin<${(await this.mvr.resolveType({ type: coinType })).type}>`
			}
		}, (result) => result.address?.objects);
		return {
			cursor: coins.pageInfo.endCursor ?? null,
			hasNextPage: coins.pageInfo.hasNextPage,
			objects: coins.nodes.map((coin) => ({
				objectId: coin.address,
				version: coin.version?.toString(),
				digest: coin.digest,
				owner: mapOwner(coin.owner),
				type: coin.contents?.type?.repr,
				balance: (coin.contents?.json)?.balance
			}))
		};
	}
	async getBalance(options) {
		const coinType = options.coinType ?? SUI_TYPE_ARG;
		const result = await this.#graphqlQuery({
			query: GetBalanceDocument,
			variables: {
				owner: options.owner,
				coinType: (await this.mvr.resolveType({ type: coinType })).type
			}
		}, (result$1) => result$1.address?.balance);
		const addressBalance = BigInt(result.addressBalance ?? "0");
		const coinBalance = BigInt(result.totalBalance ?? "0") - addressBalance;
		return { balance: {
			coinType: result.coinType?.repr ?? coinType,
			balance: result.totalBalance ?? "0",
			coinBalance: coinBalance.toString(),
			addressBalance: addressBalance.toString()
		} };
	}
	async getCoinMetadata(options) {
		const coinType = (await this.mvr.resolveType({ type: options.coinType })).type;
		const { data, errors } = await this.#graphqlClient.query({
			query: GetCoinMetadataDocument,
			variables: { coinType }
		});
		handleGraphQLErrors(errors);
		if (!data?.coinMetadata) return { coinMetadata: null };
		return { coinMetadata: {
			id: data.coinMetadata.address,
			decimals: data.coinMetadata.decimals,
			name: data.coinMetadata.name,
			symbol: data.coinMetadata.symbol,
			description: data.coinMetadata.description,
			iconUrl: data.coinMetadata.iconUrl ?? null
		} };
	}
	async listBalances(options) {
		const balances = await this.#graphqlQuery({
			query: GetAllBalancesDocument,
			variables: { owner: options.owner }
		}, (result) => result.address?.balances);
		return {
			cursor: balances.pageInfo.endCursor ?? null,
			hasNextPage: balances.pageInfo.hasNextPage,
			balances: balances.nodes.map((balance) => {
				const addressBalance = BigInt(balance.addressBalance ?? "0");
				const coinBalance = BigInt(balance.totalBalance ?? "0") - addressBalance;
				return {
					coinType: balance.coinType?.repr,
					balance: balance.totalBalance,
					coinBalance: coinBalance.toString(),
					addressBalance: addressBalance.toString()
				};
			})
		};
	}
	async getTransaction(options) {
		return parseTransaction(await this.#graphqlQuery({
			query: GetTransactionBlockDocument,
			variables: {
				digest: options.digest,
				includeTransaction: options.include?.transaction ?? false,
				includeEffects: options.include?.effects ?? false,
				includeEvents: options.include?.events ?? false,
				includeBalanceChanges: options.include?.balanceChanges ?? false,
				includeObjectTypes: options.include?.objectTypes ?? false,
				includeBcs: options.include?.bcs ?? false
			}
		}, (result) => result.transaction), options.include);
	}
	async executeTransaction(options) {
		const result = await this.#graphqlQuery({
			query: ExecuteTransactionDocument,
			variables: {
				transactionDataBcs: toBase64(options.transaction),
				signatures: options.signatures,
				includeTransaction: options.include?.transaction ?? false,
				includeEffects: options.include?.effects ?? false,
				includeEvents: options.include?.events ?? false,
				includeBalanceChanges: options.include?.balanceChanges ?? false,
				includeObjectTypes: options.include?.objectTypes ?? false,
				includeBcs: options.include?.bcs ?? false
			}
		}, (result$1) => result$1.executeTransaction);
		if (result.errors) {
			if (result.errors.length === 1) throw new Error(result.errors[0]);
			throw new AggregateError(result.errors.map((error) => new Error(error)));
		}
		return parseTransaction(result.effects?.transaction, options.include);
	}
	async simulateTransaction(options) {
		if (!(options.transaction instanceof Uint8Array)) await options.transaction.prepareForSerialization({ client: this });
		const result = await this.#graphqlQuery({
			query: SimulateTransactionDocument,
			variables: {
				transaction: options.transaction instanceof Uint8Array ? { bcs: { value: toBase64(options.transaction) } } : transactionToGrpcJson(options.transaction),
				includeTransaction: options.include?.transaction ?? false,
				includeEffects: options.include?.effects ?? false,
				includeEvents: options.include?.events ?? false,
				includeBalanceChanges: options.include?.balanceChanges ?? false,
				includeObjectTypes: options.include?.objectTypes ?? false,
				includeCommandResults: options.include?.commandResults ?? false,
				includeBcs: options.include?.bcs ?? false
			}
		}, (result$1) => result$1.simulateTransaction);
		if (result.error && !result.effects?.transaction) throw new SimulationError(result.error);
		const transactionResult = parseTransaction(result.effects?.transaction, options.include);
		const commandResults = options.include?.commandResults && result.outputs ? result.outputs.map((output) => ({
			returnValues: (output.returnValues ?? []).map((rv) => ({ bcs: rv.value?.bcs ? fromBase64(rv.value.bcs) : null })),
			mutatedReferences: (output.mutatedReferences ?? []).map((mr) => ({ bcs: mr.value?.bcs ? fromBase64(mr.value.bcs) : null }))
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
		return { referenceGasPrice: await this.#graphqlQuery({ query: GetReferenceGasPriceDocument }, (result) => result.epoch?.referenceGasPrice) ?? "" };
	}
	async getCurrentSystemState() {
		const result = await this.#graphqlQuery({ query: GetCurrentSystemStateDocument }, (result$1) => result$1.epoch);
		if (!result) throw new Error("Epoch data not found in response");
		const startMs = result.startTimestamp ? new Date(result.startTimestamp).getTime().toString() : null;
		const systemStateJson = result.systemState?.json;
		return { systemState: {
			systemStateVersion: systemStateJson?.system_state_version?.toString() ?? null,
			epoch: result.epochId?.toString() ?? null,
			protocolVersion: result.protocolConfigs?.protocolVersion?.toString() ?? null,
			referenceGasPrice: result.referenceGasPrice ?? null,
			epochStartTimestampMs: startMs,
			safeMode: systemStateJson?.safe_mode ?? false,
			safeModeStorageRewards: systemStateJson?.safe_mode_storage_rewards ?? null,
			safeModeComputationRewards: systemStateJson?.safe_mode_computation_rewards ?? null,
			safeModeStorageRebates: systemStateJson?.safe_mode_storage_rebates?.toString() ?? null,
			safeModeNonRefundableStorageFee: systemStateJson?.safe_mode_non_refundable_storage_fee?.toString() ?? null,
			parameters: {
				epochDurationMs: systemStateJson?.parameters?.epoch_duration_ms?.toString() ?? null,
				stakeSubsidyStartEpoch: systemStateJson?.parameters?.stake_subsidy_start_epoch?.toString() ?? null,
				maxValidatorCount: systemStateJson?.parameters?.max_validator_count?.toString() ?? null,
				minValidatorJoiningStake: systemStateJson?.parameters?.min_validator_joining_stake?.toString() ?? null,
				validatorLowStakeThreshold: systemStateJson?.parameters?.validator_low_stake_threshold?.toString() ?? null,
				validatorLowStakeGracePeriod: systemStateJson?.parameters?.validator_low_stake_grace_period?.toString() ?? null
			},
			storageFund: {
				totalObjectStorageRebates: systemStateJson?.storage_fund?.total_object_storage_rebates ?? null,
				nonRefundableBalance: systemStateJson?.storage_fund?.non_refundable_balance ?? null
			},
			stakeSubsidy: {
				balance: systemStateJson?.stake_subsidy?.balance ?? null,
				distributionCounter: systemStateJson?.stake_subsidy?.distribution_counter?.toString() ?? null,
				currentDistributionAmount: systemStateJson?.stake_subsidy?.current_distribution_amount?.toString() ?? null,
				stakeSubsidyPeriodLength: systemStateJson?.stake_subsidy?.stake_subsidy_period_length?.toString() ?? null,
				stakeSubsidyDecreaseRate: systemStateJson?.stake_subsidy?.stake_subsidy_decrease_rate ?? null
			}
		} };
	}
	async listDynamicFields(options) {
		const result = await this.#graphqlQuery({
			query: GetDynamicFieldsDocument,
			variables: {
				parentId: options.parentId,
				first: options.limit,
				cursor: options.cursor
			}
		}, (result$1) => result$1.address?.dynamicFields);
		return {
			dynamicFields: result.nodes.map((dynamicField) => {
				const valueType = dynamicField.value?.__typename === "MoveObject" ? dynamicField.value.contents?.type?.repr : dynamicField.value?.type?.repr;
				return {
					fieldId: deriveDynamicFieldID(options.parentId, dynamicField.name?.type?.repr, fromBase64(dynamicField.name?.bcs)),
					type: normalizeStructTag(dynamicField.value?.__typename === "MoveObject" ? `0x2::dynamic_field::Field<0x2::dynamic_object_field::Wrapper<${dynamicField.name?.type?.repr}>,0x2::object::ID>` : `0x2::dynamic_field::Field<${dynamicField.name?.type?.repr},${valueType}>`),
					name: {
						type: dynamicField.name?.type?.repr,
						bcs: fromBase64(dynamicField.name?.bcs)
					},
					valueType
				};
			}),
			cursor: result.pageInfo.endCursor ?? null,
			hasNextPage: result.pageInfo.hasNextPage
		};
	}
	async verifyZkLoginSignature(options) {
		const intentScope = options.intentScope === "TransactionData" ? ZkLoginIntentScope.TransactionData : ZkLoginIntentScope.PersonalMessage;
		const result = await this.#graphqlQuery({
			query: VerifyZkLoginSignatureDocument,
			variables: {
				bytes: options.bytes,
				signature: options.signature,
				intentScope,
				author: options.address
			}
		}, (result$1) => result$1.verifyZkLoginSignature);
		return {
			success: result.success ?? false,
			errors: result.error ? [result.error] : []
		};
	}
	async defaultNameServiceName(options) {
		return { data: { name: await this.#graphqlQuery({
			query: DefaultSuinsNameDocument,
			signal: options.signal,
			variables: { address: options.address }
		}, (result) => result.address?.defaultNameRecord?.domain ?? null) } };
	}
	async getMoveFunction(options) {
		const moveFunction = await this.#graphqlQuery({
			query: GetMoveFunctionDocument,
			variables: {
				package: (await this.mvr.resolvePackage({ package: options.packageId })).package,
				module: options.moduleName,
				function: options.name
			}
		}, (result) => result.package?.module?.function);
		let visibility = "unknown";
		switch (moveFunction.visibility) {
			case "PUBLIC":
				visibility = "public";
				break;
			case "PRIVATE":
				visibility = "private";
				break;
			case "FRIEND":
				visibility = "friend";
				break;
		}
		return { function: {
			packageId: normalizeSuiAddress(options.packageId),
			moduleName: options.moduleName,
			name: moveFunction.name,
			visibility,
			isEntry: moveFunction.isEntry ?? false,
			typeParameters: moveFunction.typeParameters?.map(({ constraints }) => ({
				isPhantom: false,
				constraints: constraints.map((constraint) => {
					switch (constraint) {
						case "COPY": return "copy";
						case "DROP": return "drop";
						case "STORE": return "store";
						case "KEY": return "key";
						default: return "unknown";
					}
				}) ?? []
			})) ?? [],
			parameters: moveFunction.parameters?.map((param) => parseNormalizedSuiMoveType(param.signature)) ?? [],
			returns: moveFunction.return?.map(({ signature }) => parseNormalizedSuiMoveType(signature)) ?? []
		} };
	}
	async getChainIdentifier(_options) {
		return this.cache.read(["chainIdentifier"], async () => {
			const checkpoint = await this.#graphqlQuery({ query: GetChainIdentifierDocument }, (result) => result.checkpoint);
			if (!checkpoint?.digest) throw new Error("Genesis checkpoint digest not found");
			return { chainIdentifier: checkpoint.digest };
		});
	}
	resolveTransactionPlugin() {
		const graphqlClient = this.#graphqlClient;
		return async function resolveTransactionData(transactionData, options, next) {
			const snapshot = transactionData.snapshot();
			if (!snapshot.sender) snapshot.sender = "0x0000000000000000000000000000000000000000000000000000000000000000";
			const grpcTransaction = transactionDataToGrpcTransaction(snapshot);
			const transactionJson = Transaction.toJson(grpcTransaction);
			const { data, errors } = await graphqlClient.query({
				query: ResolveTransactionDocument,
				variables: {
					transaction: transactionJson,
					doGasSelection: !options.onlyTransactionKind && (snapshot.gasData.budget == null || snapshot.gasData.payment == null)
				}
			});
			handleGraphQLErrors(errors);
			if (data?.simulateTransaction?.error) throw new SimulationError(`Transaction resolution failed: ${data.simulateTransaction.error}`);
			const transactionEffects = data?.simulateTransaction?.effects?.transaction?.effects;
			if (!options.onlyTransactionKind && transactionEffects?.status === ExecutionStatus.Failure) {
				const executionError = parseGraphQLExecutionError(transactionEffects.executionError);
				throw new SimulationError(`Transaction resolution failed: ${executionError?.message ?? "Transaction failed"}`, { executionError });
			}
			const resolvedTransactionBcs = data?.simulateTransaction?.effects?.transaction?.transactionBcs;
			if (!resolvedTransactionBcs) throw new Error("simulateTransaction did not return resolved transaction data");
			const resolved = TransactionDataBuilder.fromBytes(fromBase64(resolvedTransactionBcs)).snapshot();
			if (options.onlyTransactionKind) transactionData.applyResolvedData({
				...resolved,
				gasData: {
					budget: null,
					owner: null,
					payment: null,
					price: null
				},
				expiration: null
			});
			else transactionData.applyResolvedData(resolved);
			return await next();
		};
	}
};
function handleGraphQLErrors(errors) {
	if (!errors || errors.length === 0) return;
	const errorInstances = errors.map((error) => new GraphQLResponseError(error));
	if (errorInstances.length === 1) throw errorInstances[0];
	throw new AggregateError(errorInstances);
}
var GraphQLResponseError = class extends Error {
	constructor(error) {
		super(error.message);
		this.locations = error.locations;
	}
};
function mapOwner(owner) {
	switch (owner.__typename) {
		case "AddressOwner": return {
			$kind: "AddressOwner",
			AddressOwner: owner.address?.address
		};
		case "ConsensusAddressOwner": return {
			$kind: "ConsensusAddressOwner",
			ConsensusAddressOwner: {
				owner: owner?.address?.address,
				startVersion: String(owner.startVersion)
			}
		};
		case "ObjectOwner": return {
			$kind: "ObjectOwner",
			ObjectOwner: owner.address?.address
		};
		case "Immutable": return {
			$kind: "Immutable",
			Immutable: true
		};
		case "Shared": return {
			$kind: "Shared",
			Shared: { initialSharedVersion: String(owner.initialSharedVersion) }
		};
	}
}
function parseTransaction(transaction, include) {
	const objectTypes = {};
	if (include?.objectTypes) {
		const effectsJson = transaction.effects?.effectsJson;
		if (effectsJson) TransactionEffects.fromJson(effectsJson).changedObjects?.forEach((change) => {
			if (change.objectId && change.objectType) objectTypes[change.objectId] = change.objectType;
		});
		const objectChanges = transaction.effects?.objectChanges?.nodes;
		if (objectChanges) for (const change of objectChanges) {
			const type = change.outputState?.asMoveObject?.contents?.type?.repr;
			if (change.address && type) objectTypes[change.address] = type;
		}
	}
	let balanceChanges;
	if (include?.balanceChanges) {
		const balanceChangesJson = transaction.effects?.balanceChangesJson;
		if (Array.isArray(balanceChangesJson)) balanceChanges = balanceChangesJson.map((json) => {
			const change = BalanceChange.fromJson(json);
			return {
				coinType: change.coinType,
				address: change.address,
				amount: change.amount
			};
		});
		else balanceChanges = [];
	}
	const status = transaction.effects?.status === ExecutionStatus.Success ? {
		success: true,
		error: null
	} : {
		success: false,
		error: parseGraphQLExecutionError(transaction.effects?.executionError)
	};
	let transactionData;
	if (include?.transaction && transaction.transactionJson) {
		const resolved = grpcTransactionToTransactionData(Transaction.fromJson(transaction.transactionJson));
		transactionData = {
			gasData: resolved.gasData,
			sender: resolved.sender,
			expiration: resolved.expiration,
			commands: resolved.commands,
			inputs: resolved.inputs,
			version: resolved.version
		};
	}
	const bcsBytes = include?.bcs && transaction.transactionBcs ? fromBase64(transaction.transactionBcs) : void 0;
	const result = {
		digest: transaction.digest,
		status,
		effects: include?.effects ? parseTransactionEffectsBcs(fromBase64(transaction.effects?.effectsBcs)) : void 0,
		epoch: transaction.effects?.epoch?.epochId?.toString() ?? null,
		objectTypes: include?.objectTypes ? objectTypes : void 0,
		transaction: transactionData,
		bcs: bcsBytes,
		signatures: transaction.signatures.map((sig) => sig.signatureBytes),
		balanceChanges,
		events: include?.events ? transaction.effects?.events?.nodes.map((event) => {
			const eventType = event.contents?.type?.repr;
			const [packageId, module] = eventType.split("::");
			return {
				packageId,
				module,
				sender: event.sender?.address,
				eventType,
				bcs: event.contents?.bcs ? fromBase64(event.contents.bcs) : new Uint8Array()
			};
		}) ?? [] : void 0
	};
	return status.success ? {
		$kind: "Transaction",
		Transaction: result,
		FailedTransaction: void 0
	} : {
		$kind: "FailedTransaction",
		Transaction: void 0,
		FailedTransaction: result
	};
}
function parseNormalizedSuiMoveType(type) {
	let reference = null;
	if (type.ref === "&") reference = "immutable";
	else if (type.ref === "&mut") reference = "mutable";
	return {
		reference,
		body: parseNormalizedSuiMoveTypeBody(type.body)
	};
}
function parseGraphQLExecutionError(executionError) {
	if (mapGraphQLExecutionErrorKind(executionError) === "MoveAbort" && executionError?.abortCode != null) {
		const location = parseGraphQLMoveLocation(executionError);
		const cleverError = parseGraphQLCleverError(executionError);
		const commandMatch = executionError.message?.match(/in (\d+)\w* command/);
		const command = commandMatch ? parseInt(commandMatch[1], 10) - 1 : void 0;
		return {
			$kind: "MoveAbort",
			message: formatMoveAbortMessage({
				command,
				location: location ? {
					package: location.package,
					module: location.module,
					functionName: location.functionName,
					instruction: location.instruction
				} : void 0,
				abortCode: executionError.abortCode,
				cleverError: cleverError ? {
					lineNumber: cleverError.lineNumber,
					constantName: cleverError.constantName,
					value: cleverError.value
				} : void 0
			}),
			command,
			MoveAbort: {
				abortCode: executionError.abortCode,
				location,
				cleverError
			}
		};
	}
	return {
		$kind: "Unknown",
		message: executionError?.message ?? "Transaction failed",
		Unknown: null
	};
}
function mapGraphQLExecutionErrorKind(executionError) {
	if (executionError?.abortCode != null) return "MoveAbort";
	return (executionError?.message?.match(/^(\w+)/))?.[1] ?? "Unknown";
}
function parseGraphQLMoveLocation(executionError) {
	if (!(executionError.module?.package?.address && executionError.module?.name)) return;
	return {
		package: executionError.module?.package?.address,
		module: executionError.module?.name,
		functionName: executionError.function?.name,
		instruction: executionError.instructionOffset ?? void 0
	};
}
function parseGraphQLCleverError(executionError) {
	if (!(executionError.identifier || executionError.constant)) return;
	return {
		constantName: executionError.identifier ?? void 0,
		value: executionError.constant ?? void 0,
		lineNumber: executionError.sourceLineNumber ?? void 0
	};
}
function parseNormalizedSuiMoveTypeBody(type) {
	switch (type) {
		case "address": return { $kind: "address" };
		case "bool": return { $kind: "bool" };
		case "u8": return { $kind: "u8" };
		case "u16": return { $kind: "u16" };
		case "u32": return { $kind: "u32" };
		case "u64": return { $kind: "u64" };
		case "u128": return { $kind: "u128" };
		case "u256": return { $kind: "u256" };
	}
	if (typeof type === "string") throw new Error(`Unknown type: ${type}`);
	if ("vector" in type) return {
		$kind: "vector",
		vector: parseNormalizedSuiMoveTypeBody(type.vector)
	};
	if ("datatype" in type) return {
		$kind: "datatype",
		datatype: {
			typeName: `${normalizeSuiAddress(type.datatype.package)}::${type.datatype.module}::${type.datatype.type}`,
			typeParameters: type.datatype.typeParameters.map((t) => parseNormalizedSuiMoveTypeBody(t))
		}
	};
	if ("typeParameter" in type) return {
		$kind: "typeParameter",
		index: type.typeParameter
	};
	throw new Error(`Unknown type: ${JSON.stringify(type)}`);
}

//#endregion
export { GraphQLCoreClient };
//# sourceMappingURL=core.mjs.map