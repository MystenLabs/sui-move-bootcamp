import { getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from '@wallet-standard/ui-registry';
/**
 * Produces a stable string that can be used to uniquely identify a `UiWalletAccount`.
 *
 * You can use this to identify a list item when rendering a list of accounts, or as a way to store
 * your app's last selected account as a string in browser storage.
 */
export function getUiWalletAccountStorageKey(uiWalletAccount) {
    const underlyingWallet = getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletAccount);
    return `${underlyingWallet.name.replace(':', '_')}:${uiWalletAccount.address}`;
}
//# sourceMappingURL=storage-key.js.map