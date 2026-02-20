import { IdentifierString, WalletAccount } from "@wallet-standard/core";

//#region src/features/suiSignTransaction.d.ts
/** Name of the feature. */
declare const SuiSignTransaction = "sui:signTransaction";
/** The latest API version of the signTransaction API. */
type SuiSignTransactionVersion = '2.0.0';
/**
 * A Wallet Standard feature for signing a transaction, and returning the
 * serialized transaction and transaction signature.
 */
type SuiSignTransactionFeature = {
  /** Namespace for the feature. */
  [SuiSignTransaction]: {
    /** Version of the feature API. */
    version: SuiSignTransactionVersion;
    signTransaction: SuiSignTransactionMethod;
  };
};
type SuiSignTransactionMethod = (input: SuiSignTransactionInput) => Promise<SignedTransaction>;
/** Input for signing transactions. */
interface SuiSignTransactionInput {
  transaction: {
    toJSON: () => Promise<string>;
  };
  account: WalletAccount;
  chain: IdentifierString;
  signal?: AbortSignal;
}
/** Output of signing transactions. */
interface SignedTransaction {
  /** Transaction as base64 encoded bcs. */
  bytes: string;
  /** Base64 encoded signature */
  signature: string;
}
//#endregion
export { SignedTransaction, SuiSignTransaction, SuiSignTransactionFeature, SuiSignTransactionInput, SuiSignTransactionMethod, SuiSignTransactionVersion };
//# sourceMappingURL=suiSignTransaction.d.mts.map