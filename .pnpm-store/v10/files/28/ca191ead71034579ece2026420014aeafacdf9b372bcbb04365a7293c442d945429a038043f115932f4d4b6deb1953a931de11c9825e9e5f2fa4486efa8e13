import { findNamesInTransaction, replaceNames } from "../../client/mvr.mjs";

//#region src/transactions/plugins/NamedPackagesPlugin.ts
/**
* Internal plugin that automatically resolves MVR names in transactions.
* This plugin is automatically added to all transactions and uses the client's
* MVR resolver to convert .move names to on-chain addresses.
*/
function namedPackagesPlugin() {
	return async (transactionData, buildOptions, next) => {
		const names = findNamesInTransaction(transactionData);
		if (names.types.length === 0 && names.packages.length === 0) return next();
		if (!buildOptions.client) throw new Error(`Transaction contains MVR names but no client was provided to resolve them. Please pass a client to Transaction#build()`);
		replaceNames(transactionData, await buildOptions.client.core.mvr.resolve({
			types: names.types,
			packages: names.packages
		}));
		await next();
	};
}

//#endregion
export { namedPackagesPlugin };
//# sourceMappingURL=NamedPackagesPlugin.mjs.map