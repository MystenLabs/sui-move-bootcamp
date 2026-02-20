import { IdentifierString, WalletAccount } from "@wallet-standard/core";
import { Transaction } from "@mysten/sui/transactions";

//#region src/features/suiSignTransactionBlock.d.ts
/** Name of the feature. */
declare const SuiSignTransactionBlock = "sui:signTransactionBlock";
/** The latest API version of the signTransactionBlock API. */
type SuiSignTransactionBlockVersion = '1.0.0';
/**
 * @deprecated Use `sui:signTransaction` instead.
 *
 * A Wallet Standard feature for signing a transaction, and returning the
 * serialized transaction and transaction signature.
 */
type SuiSignTransactionBlockFeature = {
  /** Namespace for the feature. */
  [SuiSignTransactionBlock]: {
    /** Version of the feature API. */
    version: SuiSignTransactionBlockVersion;
    /** @deprecated Use `sui:signTransaction` instead. */
    signTransactionBlock: SuiSignTransactionBlockMethod;
  };
};
/** @deprecated Use `sui:signTransaction` instead. */
type SuiSignTransactionBlockMethod = (input: SuiSignTransactionBlockInput) => Promise<SuiSignTransactionBlockOutput>;
/** Input for signing transactions. */
interface SuiSignTransactionBlockInput {
  transactionBlock: Transaction;
  account: WalletAccount;
  chain: IdentifierString;
}
/** Output of signing transactions. */
interface SuiSignTransactionBlockOutput extends SignedTransactionBlock {}
interface SignedTransactionBlock {
  /** Transaction as base64 encoded bcs. */
  transactionBlockBytes: string;
  /** Base64 encoded signature */
  signature: string;
}
//#endregion
export { SignedTransactionBlock, SuiSignTransactionBlock, SuiSignTransactionBlockFeature, SuiSignTransactionBlockInput, SuiSignTransactionBlockMethod, SuiSignTransactionBlockOutput, SuiSignTransactionBlockVersion };
//# sourceMappingURL=suiSignTransactionBlock.d.mts.map