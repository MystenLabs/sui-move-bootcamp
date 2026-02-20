"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletFeature = getWalletFeature;
const errors_1 = require("@wallet-standard/errors");
const ui_registry_1 = require("@wallet-standard/ui-registry");
/**
 * Returns the feature object from the Wallet Standard `Wallet` that underlies a `UiWalletHandle`.
 * If the wallet does not support the feature, a `WalletStandardError` will be thrown.
 */
function getWalletFeature(uiWalletHandle, featureName) {
    const wallet = (0, ui_registry_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(uiWalletHandle);
    if (!(featureName in wallet.features)) {
        const err = new errors_1.WalletStandardError(errors_1.WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED, {
            featureName,
            supportedChains: [...wallet.chains],
            supportedFeatures: Object.keys(wallet.features),
            walletName: wallet.name,
        });
        (0, errors_1.safeCaptureStackTrace)(err, getWalletFeature);
        throw err;
    }
    return wallet.features[featureName];
}
//# sourceMappingURL=getWalletFeature.js.map