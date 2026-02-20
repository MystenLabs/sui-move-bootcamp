"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletAccountFeature = getWalletAccountFeature;
const errors_1 = require("@wallet-standard/errors");
const getWalletFeature_js_1 = require("./getWalletFeature.js");
/**
 * Returns the feature object from the Wallet Standard `Wallet` that underlies a
 * `UiWalletAccount`. In the event that either the wallet or the account do not support the
 * feature, a `WalletStandardError` will be thrown.
 */
function getWalletAccountFeature(walletAccount, featureName) {
    if (!walletAccount.features.includes(featureName)) {
        const err = new errors_1.WalletStandardError(errors_1.WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED, {
            address: walletAccount.address,
            featureName,
            supportedChains: [...walletAccount.chains],
            supportedFeatures: [...walletAccount.features],
        });
        (0, errors_1.safeCaptureStackTrace)(err, getWalletAccountFeature);
        throw err;
    }
    return (0, getWalletFeature_js_1.getWalletFeature)(walletAccount, featureName);
}
//# sourceMappingURL=getWalletAccountFeature.js.map