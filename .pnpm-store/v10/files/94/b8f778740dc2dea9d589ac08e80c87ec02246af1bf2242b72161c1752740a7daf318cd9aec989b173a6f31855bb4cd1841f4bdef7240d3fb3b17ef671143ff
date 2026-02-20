"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@wallet-standard/errors");
const getWalletAccountFeature_js_1 = require("../getWalletAccountFeature.js");
const getWalletFeature_js_1 = require("../getWalletFeature.js");
jest.mock('../getWalletFeature.js');
describe('getWalletAccountFeature', () => {
    let mockWalletAccount;
    beforeEach(() => {
        mockWalletAccount = {
            '~uiWalletHandle': Symbol(),
            address: 'abc',
            chains: ['solana:mainnet'],
            features: ['feature:a'],
            publicKey: new Uint8Array([1, 2, 3]),
        };
        // Suppresses console output when an `ErrorBoundary` is hit.
        // See https://stackoverflow.com/a/72632884/802047
        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(console, 'warn').mockImplementation();
    });
    it('throws if the account does not support the feature requested', () => {
        expect(() => {
            (0, getWalletAccountFeature_js_1.getWalletAccountFeature)(mockWalletAccount, 'feature:b');
        }).toThrow(new errors_1.WalletStandardError(errors_1.WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED, {
            address: 'abc',
            supportedChains: ['solana:mainnet'],
            supportedFeatures: ['feature:a'],
            featureName: 'feature:b',
        }));
    });
    it('returns the feature of the underlying wallet', () => {
        const mockFeature = {};
        jest.mocked(getWalletFeature_js_1.getWalletFeature).mockReturnValue(mockFeature);
        expect((0, getWalletAccountFeature_js_1.getWalletAccountFeature)(mockWalletAccount, 'feature:a')).toBe(mockFeature);
    });
});
//# sourceMappingURL=getWalletAccountFeature-test.js.map