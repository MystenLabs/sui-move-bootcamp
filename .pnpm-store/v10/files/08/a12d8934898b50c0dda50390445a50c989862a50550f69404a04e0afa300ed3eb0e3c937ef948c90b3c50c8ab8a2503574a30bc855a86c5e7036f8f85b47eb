import { IdentifierString, WalletAccount } from "@wallet-standard/core";

//#region src/features/suiSignPersonalMessage.d.ts
/** Name of the feature. */
declare const SuiSignPersonalMessage = "sui:signPersonalMessage";
/** The latest API version of the signPersonalMessage API. */
type SuiSignPersonalMessageVersion = '1.1.0';
/**
 * A Wallet Standard feature for signing a personal message, and returning the
 * message bytes that were signed, and message signature.
 */
type SuiSignPersonalMessageFeature = {
  /** Namespace for the feature. */
  [SuiSignPersonalMessage]: {
    /** Version of the feature API. */
    version: SuiSignPersonalMessageVersion;
    signPersonalMessage: SuiSignPersonalMessageMethod;
  };
};
type SuiSignPersonalMessageMethod = (input: SuiSignPersonalMessageInput) => Promise<SuiSignPersonalMessageOutput>;
/** Input for signing personal messages. */
interface SuiSignPersonalMessageInput {
  message: Uint8Array;
  account: WalletAccount;
  chain?: IdentifierString;
}
/** Output of signing personal messages. */
interface SuiSignPersonalMessageOutput extends SignedPersonalMessage {}
interface SignedPersonalMessage {
  /** Base64 encoded message bytes */
  bytes: string;
  /** Base64 encoded signature */
  signature: string;
}
//#endregion
export { SignedPersonalMessage, SuiSignPersonalMessage, SuiSignPersonalMessageFeature, SuiSignPersonalMessageInput, SuiSignPersonalMessageMethod, SuiSignPersonalMessageOutput, SuiSignPersonalMessageVersion };
//# sourceMappingURL=suiSignPersonalMessage.d.mts.map