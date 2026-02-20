import { SignedTransaction, SuiSignTransactionInput } from "./suiSignTransaction.mjs";

//#region src/features/suiSignAndExecuteTransaction.d.ts
/** Name of the feature. */
declare const SuiSignAndExecuteTransaction = "sui:signAndExecuteTransaction";
/** The latest API version of the signAndExecuteTransactionBlock API. */
type SuiSignAndExecuteTransactionVersion = '2.0.0';
/**
 * A Wallet Standard feature for signing a transaction, and submitting it to the
 * network. The wallet is expected to submit the transaction to the network via RPC,
 * and return the transaction response.
 */
type SuiSignAndExecuteTransactionFeature = {
  /** Namespace for the feature. */
  [SuiSignAndExecuteTransaction]: {
    /** Version of the feature API. */
    version: SuiSignAndExecuteTransactionVersion;
    signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
  };
};
type SuiSignAndExecuteTransactionMethod = (input: SuiSignAndExecuteTransactionInput) => Promise<SuiSignAndExecuteTransactionOutput>;
/** Input for signing and sending transactions. */
interface SuiSignAndExecuteTransactionInput extends SuiSignTransactionInput {}
/** Output of signing and sending transactions. */
interface SuiSignAndExecuteTransactionOutput extends SignedTransaction {
  digest: string;
  /** Transaction effects as base64 encoded bcs. */
  effects: string;
}
//#endregion
export { SuiSignAndExecuteTransaction, SuiSignAndExecuteTransactionFeature, SuiSignAndExecuteTransactionInput, SuiSignAndExecuteTransactionMethod, SuiSignAndExecuteTransactionOutput, SuiSignAndExecuteTransactionVersion };
//# sourceMappingURL=suiSignAndExecuteTransaction.d.mts.map