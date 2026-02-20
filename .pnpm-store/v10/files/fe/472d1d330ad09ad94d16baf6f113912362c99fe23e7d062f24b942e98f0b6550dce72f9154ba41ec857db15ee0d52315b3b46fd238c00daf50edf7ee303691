"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("../UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
describe('the wallet registry', () => {
    describe('given a handle against which a Standard wallet is registered', () => {
        let mockWallet;
        let uiWalletHandle;
        beforeEach(() => {
            mockWallet = {};
            uiWalletHandle = {};
            (0, UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(uiWalletHandle, mockWallet);
        });
        it('lets you recover a registered wallet by its handle', () => {
            const recoveredWallet = (0, UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(uiWalletHandle);
            expect(recoveredWallet).toBe(mockWallet);
        });
    });
    it('throws if there is no registered wallet pertaining to the supplied handle', () => {
        const unregisteredHandle = {};
        expect(() => {
            (0, UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(unregisteredHandle);
        }).toThrow();
    });
});
//# sourceMappingURL=uiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED-test.js.map