"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_registry_1 = require("@wallet-standard/ui-registry");
const storage_key_js_1 = require("../storage-key.js");
describe('getUiWalletAccountStorageKey()', () => {
    let mockUiWalletAccount;
    beforeEach(() => {
        const mockWalletAccount = {
            address: 'abc',
            chains: [],
            features: [],
            publicKey: new Uint8Array([1, 2, 3]),
        };
        const mockWallet = {
            accounts: [],
            chains: [],
            features: {},
            icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIBAAA=',
            name: 'Mock:Wallet',
            version: '1.0.0',
        };
        mockUiWalletAccount = (0, ui_registry_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
    });
    it('vends a colon separated key for a wallet account', () => {
        expect((0, storage_key_js_1.getUiWalletAccountStorageKey)(mockUiWalletAccount)).toBe('Mock_Wallet:abc');
    });
});
//# sourceMappingURL=storage-key-test.js.map