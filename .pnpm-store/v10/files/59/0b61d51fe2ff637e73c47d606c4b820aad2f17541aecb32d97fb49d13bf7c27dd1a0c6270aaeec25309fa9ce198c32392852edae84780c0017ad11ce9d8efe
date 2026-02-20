import { WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED, WalletStandardError, safeCaptureStackTrace, } from '@wallet-standard/errors';
import { getWalletFeature } from './getWalletFeature.js';
/**
 * Returns the feature object from the Wallet Standard `Wallet` that underlies a
 * `UiWalletAccount`. In the event that either the wallet or the account do not support the
 * feature, a `WalletStandardError` will be thrown.
 */
export function getWalletAccountFeature(walletAccount, featureName) {
    if (!walletAccount.features.includes(featureName)) {
        const err = new WalletStandardError(WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED, {
            address: walletAccount.address,
            featureName,
            supportedChains: [...walletAccount.chains],
            supportedFeatures: [...walletAccount.features],
        });
        safeCaptureStackTrace(err, getWalletAccountFeature);
        throw err;
    }
    return getWalletFeature(walletAccount, featureName);
}
//# sourceMappingURL=getWalletAccountFeature.js.map