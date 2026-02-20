import { MinimallyRequiredFeatures } from "./features/index.mjs";
import { Wallet, WalletWithFeatures } from "@wallet-standard/core";

//#region src/detect.d.ts
declare function isWalletWithRequiredFeatureSet<AdditionalFeatures extends Wallet['features']>(wallet: Wallet, additionalFeatures?: (keyof AdditionalFeatures)[]): wallet is WalletWithFeatures<MinimallyRequiredFeatures & AdditionalFeatures>;
//#endregion
export { isWalletWithRequiredFeatureSet };
//# sourceMappingURL=detect.d.mts.map