import type { WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED, WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED, WALLET_STANDARD_ERROR__REGISTRY__WALLET_ACCOUNT_NOT_FOUND, WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED, WalletStandardErrorCode } from './codes.js';
type DefaultUnspecifiedErrorContextToUndefined<T> = {
    [P in WalletStandardErrorCode]: P extends keyof T ? T[P] : undefined;
};
/**
 * To add a new error, follow the instructions at
 * https://github.com/wallet-standard/wallet-standard/tree/master/packages/core/errors/#adding-a-new-error
 *
 * WARNING:
 *   - Don't change or remove members of an error's context.
 */
export type WalletStandardErrorContext = DefaultUnspecifiedErrorContextToUndefined<{
    [WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED]: {
        address: string;
        chain: string;
        featureName: string;
        supportedChains: string[];
        supportedFeatures: string[];
    };
    [WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED]: {
        address: string;
        featureName: string;
        supportedChains: string[];
        supportedFeatures: string[];
    };
    [WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED]: {
        featureName: string;
        supportedFeatures: string[];
        supportedChains: string[];
        walletName: string;
    };
    [WALLET_STANDARD_ERROR__REGISTRY__WALLET_ACCOUNT_NOT_FOUND]: {
        address: string;
        walletName: string;
    };
}>;
export declare function decodeEncodedContext(encodedContext: string): object;
export declare function encodeContextObject(context: object): string;
export {};
//# sourceMappingURL=context.d.ts.map