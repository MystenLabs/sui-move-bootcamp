"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("./UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
const compare_js_1 = require("./compare.js");
const walletAccountsToUiWalletAccounts = new WeakMap();
/**
 * DO NOT USE THIS OR YOU WILL BE FIRED
 *
 * This method is for exclusive use by Wallet Standard UI library authors. Use this if you need to
 * create or obtain the existing `UiWalletAccount` object associated with a Wallet Standard
 * `WalletAccount`.
 *
 * @internal
 */
function getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(wallet, account) {
    let existingUiWalletAccount = walletAccountsToUiWalletAccounts.get(account);
    if (existingUiWalletAccount) {
        try {
            if ((0, UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(existingUiWalletAccount) !== wallet) {
                existingUiWalletAccount = undefined;
            }
        }
        catch (_a) {
            existingUiWalletAccount = undefined;
        }
    }
    const mustInitialize = !existingUiWalletAccount;
    let uiWalletAccount = existingUiWalletAccount !== null && existingUiWalletAccount !== void 0 ? existingUiWalletAccount : {};
    let isDirty = !existingUiWalletAccount;
    function dirtyUiWallet() {
        if (!isDirty) {
            uiWalletAccount = Object.assign({}, uiWalletAccount);
            isDirty = true;
        }
    }
    if (mustInitialize || (0, compare_js_1.identifierArraysAreDifferent)(uiWalletAccount.chains, account.chains)) {
        dirtyUiWallet();
        uiWalletAccount.chains = Object.freeze([...account.chains]);
    }
    if (mustInitialize || (0, compare_js_1.identifierArraysAreDifferent)(uiWalletAccount.features, account.features)) {
        dirtyUiWallet();
        uiWalletAccount.features = Object.freeze([...account.features]);
    }
    if (mustInitialize ||
        uiWalletAccount.address !== account.address ||
        uiWalletAccount.icon !== account.icon ||
        uiWalletAccount.label !== account.label ||
        uiWalletAccount.publicKey !== account.publicKey) {
        dirtyUiWallet();
        uiWalletAccount.address = account.address;
        uiWalletAccount.icon = account.icon;
        uiWalletAccount.label = account.label;
        uiWalletAccount.publicKey = account.publicKey;
    }
    if (isDirty) {
        walletAccountsToUiWalletAccounts.set(account, uiWalletAccount);
        (0, UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(uiWalletAccount, wallet);
    }
    return Object.freeze(uiWalletAccount);
}
//# sourceMappingURL=UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js.map