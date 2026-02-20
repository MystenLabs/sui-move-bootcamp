import { bcs as suiBcs } from "../bcs/index.mjs";
import { Inputs } from "./Inputs.mjs";
import { coreClientResolveTransactionPlugin } from "../client/core-resolver.mjs";

//#region src/transactions/resolve.ts
function needsTransactionResolution(data, options) {
	if (data.inputs.some((input) => {
		return input.UnresolvedObject || input.UnresolvedPure;
	})) return true;
	if (!options.onlyTransactionKind) {
		if (!data.gasData.price || !data.gasData.budget || !data.gasData.payment) return true;
		if (data.gasData.payment.length === 0 && !data.expiration) return true;
	}
	return false;
}
async function resolveTransactionPlugin(transactionData, options, next) {
	normalizeRawArguments(transactionData);
	if (!needsTransactionResolution(transactionData, options)) {
		await validate(transactionData);
		return next();
	}
	return (getClient(options).core?.resolveTransactionPlugin() ?? coreClientResolveTransactionPlugin)(transactionData, options, async () => {
		await validate(transactionData);
		await next();
	});
}
function validate(transactionData) {
	transactionData.inputs.forEach((input, index) => {
		if (input.$kind !== "Object" && input.$kind !== "Pure" && input.$kind !== "FundsWithdrawal") throw new Error(`Input at index ${index} has not been resolved.  Expected a Pure, Object, or FundsWithdrawal input, but found ${JSON.stringify(input)}`);
	});
}
function getClient(options) {
	if (!options.client) throw new Error(`No sui client passed to Transaction#build, but transaction data was not sufficient to build offline.`);
	return options.client;
}
function normalizeRawArguments(transactionData) {
	for (const command of transactionData.commands) switch (command.$kind) {
		case "SplitCoins":
			command.SplitCoins.amounts.forEach((amount) => {
				normalizeRawArgument(amount, suiBcs.U64, transactionData);
			});
			break;
		case "TransferObjects":
			normalizeRawArgument(command.TransferObjects.address, suiBcs.Address, transactionData);
			break;
	}
}
function normalizeRawArgument(arg, schema, transactionData) {
	if (arg.$kind !== "Input") return;
	const input = transactionData.inputs[arg.Input];
	if (input.$kind !== "UnresolvedPure") return;
	transactionData.inputs[arg.Input] = Inputs.Pure(schema.serialize(input.UnresolvedPure.value));
}

//#endregion
export { needsTransactionResolution, resolveTransactionPlugin };
//# sourceMappingURL=resolve.mjs.map