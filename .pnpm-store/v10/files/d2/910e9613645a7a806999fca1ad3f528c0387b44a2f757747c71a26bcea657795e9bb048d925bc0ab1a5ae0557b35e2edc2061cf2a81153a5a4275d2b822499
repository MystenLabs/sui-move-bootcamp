import { StandardConnect, StandardEvents } from "@wallet-standard/core";

//#region src/detect.ts
const REQUIRED_FEATURES = [StandardConnect, StandardEvents];
function isWalletWithRequiredFeatureSet(wallet, additionalFeatures = []) {
	return [...REQUIRED_FEATURES, ...additionalFeatures].every((feature) => feature in wallet.features);
}

//#endregion
export { isWalletWithRequiredFeatureSet };
//# sourceMappingURL=detect.mjs.map