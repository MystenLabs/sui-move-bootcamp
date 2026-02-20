import { normalizeSuiAddress } from "../utils/sui-types.mjs";
import { ArgumentSchema } from "./data/internal.mjs";
import { is } from "valibot";

//#region src/transactions/utils.ts
function getIdFromCallArg(arg) {
	if (typeof arg === "string") return normalizeSuiAddress(arg);
	if (arg.Object) {
		if (arg.Object.ImmOrOwnedObject) return normalizeSuiAddress(arg.Object.ImmOrOwnedObject.objectId);
		if (arg.Object.Receiving) return normalizeSuiAddress(arg.Object.Receiving.objectId);
		return normalizeSuiAddress(arg.Object.SharedObject.objectId);
	}
	if (arg.UnresolvedObject) return normalizeSuiAddress(arg.UnresolvedObject.objectId);
}
function isArgument(value) {
	return is(ArgumentSchema, value);
}
function remapCommandArguments(command, inputMapping, commandMapping) {
	const remapArg = (arg) => {
		switch (arg.$kind) {
			case "Input": {
				const newInputIndex = inputMapping.get(arg.Input);
				if (newInputIndex === void 0) throw new Error(`Input ${arg.Input} not found in input mapping`);
				return {
					...arg,
					Input: newInputIndex
				};
			}
			case "Result": {
				const newCommandIndex = commandMapping.get(arg.Result);
				if (newCommandIndex !== void 0) return {
					...arg,
					Result: newCommandIndex
				};
				return arg;
			}
			case "NestedResult": {
				const newCommandIndex = commandMapping.get(arg.NestedResult[0]);
				if (newCommandIndex !== void 0) return {
					...arg,
					NestedResult: [newCommandIndex, arg.NestedResult[1]]
				};
				return arg;
			}
			default: return arg;
		}
	};
	switch (command.$kind) {
		case "MoveCall":
			command.MoveCall.arguments = command.MoveCall.arguments.map(remapArg);
			break;
		case "TransferObjects":
			command.TransferObjects.objects = command.TransferObjects.objects.map(remapArg);
			command.TransferObjects.address = remapArg(command.TransferObjects.address);
			break;
		case "SplitCoins":
			command.SplitCoins.coin = remapArg(command.SplitCoins.coin);
			command.SplitCoins.amounts = command.SplitCoins.amounts.map(remapArg);
			break;
		case "MergeCoins":
			command.MergeCoins.destination = remapArg(command.MergeCoins.destination);
			command.MergeCoins.sources = command.MergeCoins.sources.map(remapArg);
			break;
		case "MakeMoveVec":
			command.MakeMoveVec.elements = command.MakeMoveVec.elements.map(remapArg);
			break;
		case "Upgrade":
			command.Upgrade.ticket = remapArg(command.Upgrade.ticket);
			break;
		case "$Intent": {
			const inputs = command.$Intent.inputs;
			command.$Intent.inputs = {};
			for (const [key, value] of Object.entries(inputs)) command.$Intent.inputs[key] = Array.isArray(value) ? value.map(remapArg) : remapArg(value);
			break;
		}
		case "Publish": break;
	}
}

//#endregion
export { getIdFromCallArg, isArgument, remapCommandArguments };
//# sourceMappingURL=utils.mjs.map