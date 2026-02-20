import { ExecutionStatus } from "../bcs/effects.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { TransactionDataBuilder } from "../transactions/TransactionData.mjs";
import { toBase64 } from "@mysten/utils";

//#region src/client/utils.ts
const ordinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });
const ordinalSuffixes = new Map([
	["one", "st"],
	["two", "nd"],
	["few", "rd"],
	["other", "th"]
]);
function formatOrdinal(n) {
	return `${n}${ordinalSuffixes.get(ordinalRules.select(n))}`;
}
function formatMoveAbortMessage(options) {
	const { command, location, abortCode, cleverError } = options;
	const parts = [];
	if (command != null) parts.push(`MoveAbort in ${formatOrdinal(command + 1)} command`);
	else parts.push("MoveAbort");
	if (cleverError?.constantName) {
		const errorStr = cleverError.value ? `'${cleverError.constantName}': ${cleverError.value}` : `'${cleverError.constantName}'`;
		parts.push(errorStr);
	} else parts.push(`abort code: ${abortCode}`);
	if (location?.package && location?.module) {
		const locationStr = [`in '${[
			location.package.startsWith("0x") ? location.package : `0x${location.package}`,
			location.module,
			location.functionName
		].filter(Boolean).join("::")}'`];
		if (cleverError?.lineNumber != null) locationStr.push(`(line ${cleverError.lineNumber})`);
		else if (location.instruction != null) locationStr.push(`(instruction ${location.instruction})`);
		parts.push(locationStr.join(" "));
	}
	return parts.join(", ");
}
const MinimalEffectsWithError = suiBcs.struct("MinimalEffectsWithError", { status: ExecutionStatus });
const MinimalTransactionEffectsWithError = suiBcs.enum("MinimalTransactionEffectsWithError", {
	V1: MinimalEffectsWithError,
	V2: MinimalEffectsWithError
});
const MinimalExecutionStatusNoError = suiBcs.enum("MinimalExecutionStatusNoError", {
	Success: null,
	Failed: null
});
const MinimalEffectsNoError = suiBcs.struct("MinimalEffectsNoError", { status: MinimalExecutionStatusNoError });
const MinimalTransactionEffectsNoError = suiBcs.enum("MinimalTransactionEffectsNoError", {
	V1: MinimalEffectsNoError,
	V2: MinimalEffectsNoError
});
function formatErrorMessage($kind, data) {
	if (data !== null && data !== void 0 && typeof data !== "boolean") return `${$kind}(${JSON.stringify(data, (_key, value) => typeof value === "bigint" ? value.toString() : value)})`;
	return $kind;
}
function parseBcsExecutionError(failure) {
	const error = failure.error;
	const command = failure.command != null ? Number(failure.command) : void 0;
	switch (error.$kind) {
		case "MoveAbort": {
			const [location, abortCode] = error.MoveAbort;
			const moveLocation = {
				package: location.module.address,
				module: location.module.name,
				function: location.function,
				functionName: location.functionName ?? void 0,
				instruction: location.instruction
			};
			return {
				$kind: "MoveAbort",
				message: formatMoveAbortMessage({
					command,
					location: moveLocation,
					abortCode: String(abortCode)
				}),
				command,
				MoveAbort: {
					abortCode: String(abortCode),
					location: moveLocation
				}
			};
		}
		case "MoveObjectTooBig": return {
			$kind: "SizeError",
			message: formatErrorMessage("MoveObjectTooBig", error.MoveObjectTooBig),
			command,
			SizeError: {
				name: "ObjectTooBig",
				size: Number(error.MoveObjectTooBig.objectSize),
				maxSize: Number(error.MoveObjectTooBig.maxObjectSize)
			}
		};
		case "MovePackageTooBig": return {
			$kind: "SizeError",
			message: formatErrorMessage("MovePackageTooBig", error.MovePackageTooBig),
			command,
			SizeError: {
				name: "PackageTooBig",
				size: Number(error.MovePackageTooBig.objectSize),
				maxSize: Number(error.MovePackageTooBig.maxObjectSize)
			}
		};
		case "EffectsTooLarge": return {
			$kind: "SizeError",
			message: formatErrorMessage("EffectsTooLarge", error.EffectsTooLarge),
			command,
			SizeError: {
				name: "EffectsTooLarge",
				size: Number(error.EffectsTooLarge.currentSize),
				maxSize: Number(error.EffectsTooLarge.maxSize)
			}
		};
		case "WrittenObjectsTooLarge": return {
			$kind: "SizeError",
			message: formatErrorMessage("WrittenObjectsTooLarge", error.WrittenObjectsTooLarge),
			command,
			SizeError: {
				name: "WrittenObjectsTooLarge",
				size: Number(error.WrittenObjectsTooLarge.currentSize),
				maxSize: Number(error.WrittenObjectsTooLarge.maxSize)
			}
		};
		case "MoveVectorElemTooBig": return {
			$kind: "SizeError",
			message: formatErrorMessage("MoveVectorElemTooBig", error.MoveVectorElemTooBig),
			command,
			SizeError: {
				name: "MoveVectorElemTooBig",
				size: Number(error.MoveVectorElemTooBig.valueSize),
				maxSize: Number(error.MoveVectorElemTooBig.maxScaledSize)
			}
		};
		case "MoveRawValueTooBig": return {
			$kind: "SizeError",
			message: formatErrorMessage("MoveRawValueTooBig", error.MoveRawValueTooBig),
			command,
			SizeError: {
				name: "MoveRawValueTooBig",
				size: Number(error.MoveRawValueTooBig.valueSize),
				maxSize: Number(error.MoveRawValueTooBig.maxScaledSize)
			}
		};
		case "CommandArgumentError": return {
			$kind: "CommandArgumentError",
			message: formatErrorMessage("CommandArgumentError", error.CommandArgumentError),
			command,
			CommandArgumentError: {
				argument: error.CommandArgumentError.argIdx,
				name: error.CommandArgumentError.kind.$kind
			}
		};
		case "TypeArgumentError": return {
			$kind: "TypeArgumentError",
			message: formatErrorMessage("TypeArgumentError", error.TypeArgumentError),
			command,
			TypeArgumentError: {
				typeArgument: error.TypeArgumentError.argumentIdx,
				name: error.TypeArgumentError.kind.$kind
			}
		};
		case "PackageUpgradeError": {
			const upgradeError = error.PackageUpgradeError.upgradeError;
			return {
				$kind: "PackageUpgradeError",
				message: formatErrorMessage("PackageUpgradeError", error.PackageUpgradeError),
				command,
				PackageUpgradeError: {
					name: upgradeError.$kind,
					packageId: upgradeError.$kind === "UnableToFetchPackage" ? upgradeError.UnableToFetchPackage.packageId : void 0,
					digest: upgradeError.$kind === "DigestDoesNotMatch" ? toBase64(upgradeError.DigestDoesNotMatch.digest) : void 0
				}
			};
		}
		case "ExecutionCancelledDueToSharedObjectCongestion": return {
			$kind: "CongestedObjects",
			message: formatErrorMessage("ExecutionCancelledDueToSharedObjectCongestion", error.ExecutionCancelledDueToSharedObjectCongestion),
			command,
			CongestedObjects: {
				name: "ExecutionCanceledDueToConsensusObjectCongestion",
				objects: error.ExecutionCancelledDueToSharedObjectCongestion.congested_objects
			}
		};
		case "AddressDeniedForCoin": return {
			$kind: "CoinDenyListError",
			message: formatErrorMessage("AddressDeniedForCoin", error.AddressDeniedForCoin),
			command,
			CoinDenyListError: {
				name: "AddressDeniedForCoin",
				address: error.AddressDeniedForCoin.address,
				coinType: error.AddressDeniedForCoin.coinType
			}
		};
		case "CoinTypeGlobalPause": return {
			$kind: "CoinDenyListError",
			message: formatErrorMessage("CoinTypeGlobalPause", error.CoinTypeGlobalPause),
			command,
			CoinDenyListError: {
				name: "CoinTypeGlobalPause",
				coinType: error.CoinTypeGlobalPause.coinType
			}
		};
		case "CircularObjectOwnership": return {
			$kind: "ObjectIdError",
			message: formatErrorMessage("CircularObjectOwnership", error.CircularObjectOwnership),
			command,
			ObjectIdError: {
				name: "CircularObjectOwnership",
				objectId: error.CircularObjectOwnership.object
			}
		};
		case "InvalidGasObject": return {
			$kind: "ObjectIdError",
			message: "InvalidGasObject",
			command,
			ObjectIdError: {
				name: "InvalidGasObject",
				objectId: ""
			}
		};
		case "InputObjectDeleted": return {
			$kind: "ObjectIdError",
			message: "InputObjectDeleted",
			command,
			ObjectIdError: {
				name: "InputObjectDeleted",
				objectId: ""
			}
		};
		case "InvalidTransferObject": return {
			$kind: "ObjectIdError",
			message: "InvalidTransferObject",
			command,
			ObjectIdError: {
				name: "InvalidTransferObject",
				objectId: ""
			}
		};
		case "NonExclusiveWriteInputObjectModified": return {
			$kind: "Unknown",
			message: formatErrorMessage("NonExclusiveWriteInputObjectModified", error.NonExclusiveWriteInputObjectModified),
			command,
			Unknown: null
		};
		case "InsufficientGas":
		case "InvariantViolation":
		case "FeatureNotYetSupported":
		case "InsufficientCoinBalance":
		case "CoinBalanceOverflow":
		case "PublishErrorNonZeroAddress":
		case "SuiMoveVerificationError":
		case "MovePrimitiveRuntimeError":
		case "VMVerificationOrDeserializationError":
		case "VMInvariantViolation":
		case "FunctionNotFound":
		case "ArityMismatch":
		case "TypeArityMismatch":
		case "NonEntryFunctionInvoked":
		case "UnusedValueWithoutDrop":
		case "InvalidPublicFunctionReturnType":
		case "PublishUpgradeMissingDependency":
		case "PublishUpgradeDependencyDowngrade":
		case "CertificateDenied":
		case "SuiMoveVerificationTimedout":
		case "SharedObjectOperationNotAllowed":
		case "ExecutionCancelledDueToRandomnessUnavailable":
		case "InvalidLinkage":
		case "InsufficientBalanceForWithdraw": return {
			$kind: "Unknown",
			message: error.$kind,
			command,
			Unknown: null
		};
		default: return {
			$kind: "Unknown",
			message: "Unknown error",
			command,
			Unknown: null
		};
	}
}
function parseTransactionBcs(bytes, onlyTransactionKind = false) {
	return (onlyTransactionKind ? TransactionDataBuilder.fromKindBytes(bytes) : TransactionDataBuilder.fromBytes(bytes)).snapshot();
}
/**
* Extracts just the status from transaction effects BCS without fully parsing.
* This is optimized for cases where we only need the status (success/failure)
* without parsing the entire effects structure.
*
* Uses a minimal BCS struct that only parses fields up to and including status,
* since BCS fields are read sequentially. First tries to parse with full error details,
* then falls back to a version without error parsing if the error enum has unknown variants.
*
* For errors with data, serializes the error as JSON to preserve all information.
*/
function extractStatusFromEffectsBcs(effectsBytes) {
	let parsed = null;
	try {
		parsed = MinimalTransactionEffectsWithError.parse(effectsBytes);
	} catch {
		const parsedNoError = MinimalTransactionEffectsNoError.parse(effectsBytes);
		if ((parsedNoError.V1 ?? parsedNoError.V2).status.$kind === "Success") return {
			success: true,
			error: null
		};
		return {
			success: false,
			error: {
				$kind: "Unknown",
				message: "ExecutionFailed",
				Unknown: null
			}
		};
	}
	const status = (parsed.V1 ?? parsed.V2).status;
	if (status.$kind === "Success") return {
		success: true,
		error: null
	};
	return {
		success: false,
		error: parseBcsExecutionError(status.Failure)
	};
}
function parseTransactionEffectsBcs(effects) {
	const parsed = suiBcs.TransactionEffects.parse(effects);
	switch (parsed.$kind) {
		case "V1": return parseTransactionEffectsV1({
			bytes: effects,
			effects: parsed.V1
		});
		case "V2": return parseTransactionEffectsV2({
			bytes: effects,
			effects: parsed.V2
		});
		default: throw new Error(`Unknown transaction effects version: ${parsed.$kind}`);
	}
}
function parseTransactionEffectsV1(_) {
	throw new Error("V1 effects are not supported yet");
}
function parseTransactionEffectsV2({ bytes, effects }) {
	const changedObjects = effects.changedObjects.map(([id, change]) => {
		return {
			objectId: id,
			inputState: change.inputState.$kind === "Exist" ? "Exists" : "DoesNotExist",
			inputVersion: change.inputState.Exist?.[0][0] ?? null,
			inputDigest: change.inputState.Exist?.[0][1] ?? null,
			inputOwner: change.inputState.Exist?.[1] ?? null,
			outputState: change.outputState.$kind === "NotExist" ? "DoesNotExist" : change.outputState.$kind,
			outputVersion: change.outputState.$kind === "PackageWrite" ? change.outputState.PackageWrite?.[0] : change.outputState.$kind === "ObjectWrite" ? effects.lamportVersion : null,
			outputDigest: change.outputState.$kind === "PackageWrite" ? change.outputState.PackageWrite?.[1] : change.outputState.$kind === "ObjectWrite" ? change.outputState.ObjectWrite?.[0] ?? null : null,
			outputOwner: change.outputState.$kind === "ObjectWrite" ? change.outputState.ObjectWrite[1] : null,
			idOperation: change.idOperation.$kind
		};
	});
	return {
		bcs: bytes,
		version: 2,
		status: effects.status.$kind === "Success" ? {
			success: true,
			error: null
		} : {
			success: false,
			error: parseBcsExecutionError(effects.status.Failure)
		},
		gasUsed: effects.gasUsed,
		transactionDigest: effects.transactionDigest,
		gasObject: effects.gasObjectIndex === null ? null : changedObjects[effects.gasObjectIndex] ?? null,
		eventsDigest: effects.eventsDigest,
		dependencies: effects.dependencies,
		lamportVersion: effects.lamportVersion,
		changedObjects,
		unchangedConsensusObjects: effects.unchangedConsensusObjects.map(([objectId, object]) => {
			return {
				kind: object.$kind,
				objectId,
				version: object.$kind === "ReadOnlyRoot" ? object.ReadOnlyRoot[0] : object[object.$kind],
				digest: object.$kind === "ReadOnlyRoot" ? object.ReadOnlyRoot[1] : null
			};
		}),
		auxiliaryDataDigest: effects.auxDataDigest
	};
}

//#endregion
export { extractStatusFromEffectsBcs, formatMoveAbortMessage, parseTransactionBcs, parseTransactionEffectsBcs };
//# sourceMappingURL=utils.mjs.map