"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_registry_1 = require("@wallet-standard/ui-registry");
const compare_js_1 = require("../compare.js");
describe('uiWalletAccountsAreSame()', () => {
    let mockUiWalletAccount;
    let mockWallet;
    let mockWalletAccount;
    beforeEach(() => {
        mockWalletAccount = {
            address: 'abc',
            chains: [],
            features: [],
            publicKey: new Uint8Array([1, 2, 3]),
        };
        mockWallet = {
            accounts: [],
            chains: [],
            features: {},
            icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIBAAA=',
            name: 'Mock:Wallet',
            version: '1.0.0',
        };
        mockUiWalletAccount = (0, ui_registry_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
    });
    it('returns true for the same account object', () => {
        expect((0, compare_js_1.uiWalletAccountsAreSame)(mockUiWalletAccount, mockUiWalletAccount)).toBe(true);
    });
    it('returns true if the addresses and underlying `Wallet` match, despite the objects being different', () => {
        const clonedMockUiWalletAccount = (0, ui_registry_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, Object.assign(Object.assign({}, mockWalletAccount), { chains: ['solana:danknet'] }));
        expect((0, compare_js_1.uiWalletAccountsAreSame)(mockUiWalletAccount, clonedMockUiWalletAccount)).toBe(true);
    });
    it('returns false if the addresses match but the underlying `Wallet` does not', () => {
        const clonedMockUiWalletAccount = (0, ui_registry_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(Object.assign({}, mockWallet), mockWalletAccount);
        expect((0, compare_js_1.uiWalletAccountsAreSame)(mockUiWalletAccount, clonedMockUiWalletAccount)).toBe(false);
    });
    it('returns false if the addresses do not match even if the underlying `Wallet` does', () => {
        const clonedMockUiWalletAccount = (0, ui_registry_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, Object.assign(Object.assign({}, mockWalletAccount), { address: 'xyz' }));
        expect((0, compare_js_1.uiWalletAccountsAreSame)(mockUiWalletAccount, clonedMockUiWalletAccount)).toBe(false);
    });
});
describe('uiWalletAccountBelongsToUiWallet()', () => {
    let mockWalletAccount;
    let mockWallet;
    let mockUiWalletAccount;
    let mockUiWallet;
    beforeEach(() => {
        mockWalletAccount = {
            address: 'abc',
            chains: [],
            features: [],
            publicKey: new Uint8Array([1, 2, 3]),
        };
        mockWallet = {
            accounts: [],
            chains: [],
            features: {},
            icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIBAAA=',
            name: 'Mock:Wallet',
            version: '1.0.0',
        };
        mockUiWalletAccount = (0, ui_registry_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockUiWallet = (0, ui_registry_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
    });
    it('returns true if the UI wallet account belongs to the UI wallet', () => {
        expect((0, compare_js_1.uiWalletAccountBelongsToUiWallet)(mockUiWalletAccount, mockUiWallet)).toBe(true);
    });
    it('returns false if the UI wallet account does not belong to the UI wallet', () => {
        const differentWallet = Object.assign({}, mockWallet); /* different object */
        const identicalAccountInDifferentWallet = (0, ui_registry_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(differentWallet, mockWalletAccount);
        expect((0, compare_js_1.uiWalletAccountBelongsToUiWallet)(identicalAccountInDifferentWallet, mockUiWallet)).toBe(false);
    });
});
//# sourceMappingURL=compare-test.js.map