import { getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, } from './UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js';
import { identifierArraysAreDifferent } from './compare.js';
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
export function getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(wallet, account) {
    let existingUiWalletAccount = walletAccountsToUiWalletAccounts.get(account);
    if (existingUiWalletAccount) {
        try {
            if (getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(existingUiWalletAccount) !== wallet) {
                existingUiWalletAccount = undefined;
            }
        }
        catch {
            existingUiWalletAccount = undefined;
        }
    }
    const mustInitialize = !existingUiWalletAccount;
    let uiWalletAccount = existingUiWalletAccount ?? {};
    let isDirty = !existingUiWalletAccount;
    function dirtyUiWallet() {
        if (!isDirty) {
            uiWalletAccount = { ...uiWalletAccount };
            isDirty = true;
        }
    }
    if (mustInitialize || identifierArraysAreDifferent(uiWalletAccount.chains, account.chains)) {
        dirtyUiWallet();
        uiWalletAccount.chains = Object.freeze([...account.chains]);
    }
    if (mustInitialize || identifierArraysAreDifferent(uiWalletAccount.features, account.features)) {
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
        registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletAccount, wallet);
    }
    return Object.freeze(uiWalletAccount);
}
//# sourceMappingURL=UiWalletAccountRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js.map