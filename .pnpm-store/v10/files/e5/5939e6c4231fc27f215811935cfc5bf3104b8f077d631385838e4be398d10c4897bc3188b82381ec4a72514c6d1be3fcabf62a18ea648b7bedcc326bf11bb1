import { WALLET_STANDARD_ERROR__REGISTRY__WALLET_ACCOUNT_NOT_FOUND, WALLET_STANDARD_ERROR__REGISTRY__WALLET_NOT_FOUND, WalletStandardError, safeCaptureStackTrace, } from '@wallet-standard/errors';
const uiWalletHandlesToWallets = new WeakMap();
/**
 * DO NOT USE THIS OR YOU WILL BE FIRED
 *
 * This method is for exclusive use by Wallet Standard UI library authors. Use this to associate a
 * `UiWallet` or `UiWalletAccount` object with a Wallet Standard `Wallet` in the central registry.
 *
 * @internal
 */
export function registerWalletHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletHandle, wallet) {
    uiWalletHandlesToWallets.set(uiWalletHandle, wallet);
}
/**
 * DO NOT USE THIS OR YOU WILL BE FIRED
 *
 * This method is for exclusive use by Wallet Standard UI library authors. If you are building APIs
 * that need to materialize account-based features given a `UiWalletAccount` UI object, this
 * function will vend you the underlying `WalletAccount` object associated with it.
 *
 * @internal
 */
export function getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletAccount) {
    const wallet = getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletAccount);
    const account = wallet.accounts.find(({ address }) => address === uiWalletAccount.address);
    if (!account) {
        const err = new WalletStandardError(WALLET_STANDARD_ERROR__REGISTRY__WALLET_ACCOUNT_NOT_FOUND, {
            address: uiWalletAccount.address,
            walletName: wallet.name,
        });
        safeCaptureStackTrace(err, getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
        throw err;
    }
    return account;
}
/**
 * DO NOT USE THIS OR YOU WILL BE FIRED
 *
 * This method is for exclusive use by Wallet Standard UI library authors. If you are building APIs
 * that need to materialize wallet-based features given a `UiWalletAccount` UI object, this
 * function will vend you the underlying `Wallet` object associated with it.
 *
 * @internal
 */
export function getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletHandle) {
    const wallet = uiWalletHandlesToWallets.get(uiWalletHandle);
    if (!wallet) {
        const err = new WalletStandardError(WALLET_STANDARD_ERROR__REGISTRY__WALLET_NOT_FOUND);
        safeCaptureStackTrace(err, getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
        throw err;
    }
    return wallet;
}
//# sourceMappingURL=UiWalletHandleRegistry_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.js.map