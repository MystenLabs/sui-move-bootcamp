"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("./UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
const UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1 = require("./UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js");
const compare_js_1 = require("./compare.js");
const walletsToUiWallets = new WeakMap();
/**
 * DO NOT USE THIS OR YOU WILL BE FIRED
 *
 * This method is for exclusive use by Wallet Standard UI library authors. Use this if you need to
 * create or obtain the existing `UiWallet` object associated with a Wallet Standard `Wallet`.
 *
 * @internal
 */
function getOrCreateUiWalletForStandardWallet_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(wallet) {
    const existingUiWallet = walletsToUiWallets.get(wallet);
    const mustInitialize = !existingUiWallet;
    let uiWallet = existingUiWallet !== null && existingUiWallet !== void 0 ? existingUiWallet : {};
    let isDirty = !existingUiWallet;
    function dirtyUiWallet() {
        if (!isDirty) {
            uiWallet = Object.assign({}, uiWallet);
            isDirty = true;
        }
    }
    const nextUiWalletAccounts = {
        _cache: [],
        *[Symbol.iterator]() {
            if (this._cache.length) {
                yield* this._cache;
            }
            for (const walletAccount of wallet.accounts.slice(this._cache.length)) {
                const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(wallet, walletAccount);
                this._cache.push(uiWalletAccount);
                yield uiWalletAccount;
            }
        },
        some(predicateFn) {
            if (this._cache.some(predicateFn)) {
                return true;
            }
            for (const walletAccount of wallet.accounts.slice(this._cache.length)) {
                const uiWalletAccount = (0, UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(wallet, walletAccount);
                this._cache.push(uiWalletAccount);
                if (predicateFn(uiWalletAccount)) {
                    return true;
                }
            }
            return false;
        },
        get length() {
            return wallet.accounts.length;
        },
    };
    if (mustInitialize ||
        uiWallet.accounts.length !== wallet.accounts.length ||
        nextUiWalletAccounts.some((account) => !uiWallet.accounts.includes(account))) {
        dirtyUiWallet();
        uiWallet.accounts = Object.freeze(Array.from(nextUiWalletAccounts));
    }
    if (mustInitialize ||
        (0, compare_js_1.identifierArraysAreDifferent)(uiWallet.features, Object.keys(wallet.features))) {
        dirtyUiWallet();
        uiWallet.features = Object.freeze(Object.keys(wallet.features));
    }
    if (mustInitialize || (0, compare_js_1.identifierArraysAreDifferent)(uiWallet.chains, wallet.chains)) {
        dirtyUiWallet();
        uiWallet.chains = Object.freeze([...wallet.chains]);
    }
    if (mustInitialize ||
        uiWallet.icon !== wallet.icon ||
        uiWallet.name !== wallet.name ||
        uiWallet.version !== wallet.version) {
        dirtyUiWallet();
        uiWallet.icon = wallet.icon;
        uiWallet.name = wallet.name;
        uiWallet.version = wallet.version;
    }
    if (isDirty) {
        walletsToUiWallets.set(wallet, uiWallet);
        (0, UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_js_1.registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)(uiWallet, wallet);
    }
    return Object.freeze(uiWallet);
}
//# sourceMappingURL=UiWalletRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js.map