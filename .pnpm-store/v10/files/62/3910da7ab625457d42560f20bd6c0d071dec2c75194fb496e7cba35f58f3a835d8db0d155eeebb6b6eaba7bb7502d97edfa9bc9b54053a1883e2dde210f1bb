import { WalletAccount } from "@wallet-standard/core";

//#region src/features/suiSignMessage.d.ts

/**
 * Name of the feature.
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `sui:signPersonalMessage` feature
 **/
declare const SuiSignMessage = "sui:signMessage";
/**
 * The latest API version of the signMessage API.
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `sui:signPersonalMessage` feature
 */
type SuiSignMessageVersion = '1.0.0';
/**
 * A Wallet Standard feature for signing a personal message, and returning the
 * message bytes that were signed, and message signature.
 *
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `sui:signPersonalMessage` feature
 */
type SuiSignMessageFeature = {
  /** Namespace for the feature. */
  [SuiSignMessage]: {
    /** Version of the feature API. */
    version: SuiSignMessageVersion;
    signMessage: SuiSignMessageMethod;
  };
};
/** @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `sui:signPersonalMessage` feature */
type SuiSignMessageMethod = (input: SuiSignMessageInput) => Promise<SuiSignMessageOutput>;
/**
 * Input for signing messages.
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `sui:signPersonalMessage` feature
 */
interface SuiSignMessageInput {
  message: Uint8Array;
  account: WalletAccount;
}
/**
 * Output of signing messages.
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `sui:signPersonalMessage` feature
 */
interface SuiSignMessageOutput {
  /** Base64 message bytes. */
  messageBytes: string;
  /** Base64 encoded signature */
  signature: string;
}
//#endregion
export { SuiSignMessage, SuiSignMessageFeature, SuiSignMessageInput, SuiSignMessageMethod, SuiSignMessageOutput, SuiSignMessageVersion };
//# sourceMappingURL=suiSignMessage.d.mts.map