"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@wallet-standard/test-matchers/toBeFrozenObject");
const UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("../UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
const UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("../UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
jest.mock('../UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js');
describe('getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED', () => {
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
        const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccount).toBeFrozenObject();
    });
    it('registers the Standard wallet associated with the UI wallet account with the wallet handle registry', () => {
        const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccount, mockWallet);
    });
    it('returns the same UI wallet account given the same underlying Standard wallet account', () => {
        jest.mocked(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).mockReturnValue(mockWallet);
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountA).toBe(uiWalletAccountB);
    });
    it('returns a different UI wallet account given a different underlying Standard wallet account', () => {
        jest.mocked(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).mockReturnValue(mockWallet);
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        jest.mocked(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).mockReturnValue(Object.assign({}, mockWallet));
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountA).not.toBe(uiWalletAccountB);
    });
    /**
     * Address
     */
    it('returns a UI wallet account with an address', () => {
        const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccount).toHaveProperty('address', mockWalletAccount.address);
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account whose address has been mutated', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.address = 'def'; // As unlikely is it that an account's address would be mutated, we test it none the less.
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    /**
     * Chains
     */
    it('returns a UI wallet account with a frozen chains array', () => {
        const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccount).toHaveProperty('chains', mockWalletAccount.chains);
        expect(uiWalletAccount.chains).toBeFrozenObject();
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account that mutated the chains to add one', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.chains.unshift('solana:boomernet');
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account that mutated the chains to remove one', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.chains.splice(0, 1);
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account whose existing chains have been mutated', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.chains[0] = 'solana:danknet';
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    /**
     * Features
     */
    it('returns a UI wallet account with a flat frozen feature names array', () => {
        const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccount).toHaveProperty('features', mockWalletAccount.features);
        expect(uiWalletAccount.chains).toBeFrozenObject();
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account that mutated the features to add one', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.features.push('feature:new');
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account that mutated the features to remove one', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.features.pop();
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    it('returns a new UI wallet given the same underlying Standard wallet whose existing features have been mutated', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.features[0] = 'feature:z';
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    /**
     * Icon
     */
    it('returns a UI wallet account with an icon', () => {
        const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccount).toHaveProperty('icon', mockWalletAccount.icon);
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account whose icon has been mutated', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.icon = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    /**
     * Label
     */
    it('returns a UI wallet account with a label', () => {
        const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccount).toHaveProperty('label', mockWalletAccount.label);
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account whose label has been mutated', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.label = 'Based Account A';
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
    /**
     * Public key
     */
    it('returns a UI wallet account with a public key', () => {
        const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccount).toHaveProperty('publicKey', mockWalletAccount.publicKey);
    });
    it('returns a new UI wallet account given the same underlying Standard wallet account whose label has been mutated', () => {
        const uiWalletAccountA = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        mockWalletAccount.publicKey = new Uint8Array([4, 5, 6]);
        const uiWalletAccountB = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(mockWallet, mockWalletAccount);
        expect(uiWalletAccountB).not.toBe(uiWalletAccountA);
        expect(UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toHaveBeenCalledWith(uiWalletAccountB, mockWallet);
    });
});
//# sourceMappingURL=uiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED-test.js.map