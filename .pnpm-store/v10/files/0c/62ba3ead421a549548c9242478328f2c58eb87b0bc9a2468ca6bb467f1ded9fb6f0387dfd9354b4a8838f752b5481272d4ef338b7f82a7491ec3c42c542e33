"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@wallet-standard/test-matchers/toBeFrozenObject");
const UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("../UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
const UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("../UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
const UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("../UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
jest.mock('../UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js');
jest.mock('../UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js');
describe('getOrCreateUiWalletForWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED', () => {
    let mockWallet;
    let mockWalletAccount;
    beforeEach(() => {
        mockWalletAccount = {
            address: 'abc',
            chains: ['solana:basednet'],
            features: ['feature:b'],
            icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIBAAA=',
            label: 'Mock Account A',
            publicKey: new Uint8Array([1, 2, 3]),
        };
        mockWallet = {
            accounts: [mockWalletAccount],
            chains: ['solana:basednet', 'solana:goatnet'],
            features: {
                'feature:a': { version: '1.0.0' },
                'feature:b': { version: '1.0.0' },
            },
            icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIBAAA=',
            name: 'Mock wallet',
            version: '1.0.0',
        };
    });
    it('returns a frozen object', () => {
        const uiWallet = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWallet).toBeFrozenObject();
    });
    it('registers the Standard wallet associated with the UI wallet account with the wallet handle registry', () => {
        const uiWallet = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWallet, mockWallet);
    });
    it('returns the same UI wallet given the same underlying Standard wallet', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledTimes(1);
        expect(uiWalletB).toBeFrozenObject();
    });
    /**
     * Accounts
     */
    it('returns a UI wallet with a frozen list of UI wallet accounts', () => {
        const mockUiWalletAccount = {};
        jest.mocked(UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).mockReturnValue(mockUiWalletAccount);
        const uiWallet = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWallet).toHaveProperty('accounts', [mockUiWalletAccount]);
        expect(uiWallet.accounts).toBeFrozenObject();
    });
    it('returns a new UI wallet given the same underlying Standard wallet that mutated the accounts to add one', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.accounts.unshift(Object.assign(Object.assign({}, mockWalletAccount), { address: 'def' }));
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    it('returns a new UI wallet given the same underlying Standard wallet that mutated the accounts to remove one', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.accounts.pop();
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    it('returns a new UI wallet given the same underlying Standard wallet that mutated the accounts to modify one', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        jest.mocked(UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).mockReturnValue(
        // Doesn't matter what this is, so long as it's a new object.
        {});
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    /**
     * Chains
     */
    it('returns a UI wallet with a frozen chains array', () => {
        const uiWallet = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWallet).toHaveProperty('chains', mockWallet.chains);
        expect(uiWallet.chains).toBeFrozenObject();
    });
    it('returns a new UI wallet given the same underlying Standard wallet that mutated the chains to add one', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.chains.unshift('solana:boomernet');
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    it('returns a new UI wallet given the same underlying Standard wallet that mutated the chains to remove one', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.chains.splice(0, 1);
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    it('returns a new UI wallet given the same underlying Standard wallet whose existing chains have been mutated', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.chains[0] = 'solana:danknet';
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    /**
     * Features
     */
    it('returns a UI wallet with a flat frozen feature names array', () => {
        const uiWallet = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWallet).toHaveProperty('features', Object.keys(mockWallet.features));
        expect(uiWallet.chains).toBeFrozenObject();
    });
    it('returns a new UI wallet given the same underlying Standard wallet that mutated the features to add one', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.features['feature:new'] = { version: '1.0.0' };
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    it('returns a new UI wallet given the same underlying Standard wallet that mutated the features to remove one', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        delete mockWallet.features['feature:a'];
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    it('returns the same UI wallet given the same underlying Standard wallet whose existing features have been mutated', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.features['feature:a'].version = '2.0.0';
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledTimes(1);
    });
    /**
     * Icon
     */
    it('returns a UI wallet with an icon', () => {
        const uiWallet = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWallet).toHaveProperty('icon', mockWallet.icon);
    });
    it('returns a new UI wallet given the same underlying Standard wallet whose icon has been mutated', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.icon = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    /**
     * Name
     */
    it('returns a UI wallet with a name', () => {
        const uiWallet = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWallet).toHaveProperty('name', mockWallet.name);
    });
    it('returns a new UI wallet given the same underlying Standard wallet whose name has been mutated', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.name = 'Based Wallet';
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
    /**
     * Version
     */
    it('returns a UI wallet with a version', () => {
        const uiWallet = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWallet).toHaveProperty('version', mockWallet.version);
    });
    it('returns a new UI wallet given the same underlying Standard wallet whose version has been mutated', () => {
        const uiWalletA = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        mockWallet.version = '2.0.0';
        const uiWalletB = (0, UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet);
        expect(uiWalletB).not.toBe(uiWalletA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletB, mockWallet);
    });
});
//# sourceMappingURL=uiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED-test.js.map