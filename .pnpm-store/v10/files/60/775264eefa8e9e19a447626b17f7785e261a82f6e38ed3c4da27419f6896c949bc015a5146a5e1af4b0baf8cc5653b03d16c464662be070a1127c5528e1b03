import { getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, } from '../UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js';
describe('the wallet registry', () => {
    describe('given a handle against which a Standard wallet is registered', () => {
        let mockWallet;
        let uiWalletHandle;
        beforeEach(() => {
            mockWallet = {};
            uiWalletHandle = {};
            registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletHandle, mockWallet);
        });
        it('lets you recover a registered wallet by its handle', () => {
            const recoveredWallet = getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletHandle);
            expect(recoveredWallet).toBe(mockWallet);
        });
    });
    it('throws if there is no registered wallet pertaining to the supplied handle', () => {
        const unregisteredHandle = {};
        expect(() => {
            getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(unregisteredHandle);
        }).toThrow();
    });
});
//# sourceMappingURL=uiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED-test.js.map