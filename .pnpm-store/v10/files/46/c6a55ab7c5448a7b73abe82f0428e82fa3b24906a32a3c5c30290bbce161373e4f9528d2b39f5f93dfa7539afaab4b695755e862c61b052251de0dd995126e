"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@wallet-standard/errors");
const ui_registry_1 = require("@wallet-standard/ui-registry");
const getWalletFeature_js_1 = require("../getWalletFeature.js");
jest.mock('@wallet-standard/ui-registry');
describe('getWalletFeature', () => {
    let mockFeatureA;
    let mockWallet;
    let mockWalletHandle;
    beforeEach(() => {
        mockFeatureA = {};
        mockWallet = {
            accounts: [],
            chains: ['solana:mainnet'],
            features: {
                'feature:a': mockFeatureA,
            },
            icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIBAAA=',
            name: 'Mock Wallet',
            version: '1.0.0',
        };
        mockWalletHandle = {
            '~uiWalletHandle': Symbol(),
            features: ['feature:a'],
        };
        jest.mocked(ui_registry_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).mockReturnValue(mockWallet);
        // Suppresses console output when an `ErrorBoundary` is hit.
        // See https://stackoverflow.com/a/72632884/802047
        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(console, 'warn').mockImplementation();
    });
    it('throws if the handle provided does not support the feature requested', () => {
        expect(() => {
            (0, getWalletFeature_js_1.getWalletFeature)(mockWalletHandle, 'feature:b');
        }).toThrow(new errors_1.WalletStandardError(errors_1.WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED, {
            featureName: 'feature:b',
            supportedChains: ['solana:mainnet'],
            supportedFeatures: ['feature:a'],
            walletName: 'Mock Wallet',
        }));
    });
    it('returns the feature of the underlying wallet', () => {
        jest.mocked(ui_registry_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).mockReturnValue(mockWallet);
        expect((0, getWalletFeature_js_1.getWalletFeature)(mockWalletHandle, 'feature:a')).toBe(mockFeatureA);
    });
});
//# sourceMappingURL=getWalletFeature-test.js.map