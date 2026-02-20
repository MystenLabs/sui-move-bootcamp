import { SuiSignTransactionBlockInput } from "./suiSignTransactionBlock.mjs";
import { ExecuteTransactionRequestType, SuiTransactionBlockResponse, SuiTransactionBlockResponseOptions } from "@mysten/sui/jsonRpc";

//#region src/features/suiSignAndExecuteTransactionBlock.d.ts
/** Name of the feature. */
declare const SuiSignAndExecuteTransactionBlock = "sui:signAndExecuteTransactionBlock";
/** The latest API version of the signAndExecuteTransactionBlock API. */
type SuiSignAndExecuteTransactionBlockVersion = '1.0.0';
/**
 * @deprecated Use `sui:signAndExecuteTransaction` instead.
 *
 * A Wallet Standard feature for signing a transaction, and submitting it to the
 * network. The wallet is expected to submit the transaction to the network via RPC,
 * and return the transaction response.
 */
type SuiSignAndExecuteTransactionBlockFeature = {
  /** Namespace for the feature. */
  [SuiSignAndExecuteTransactionBlock]: {
    /** Version of the feature API. */
    version: SuiSignAndExecuteTransactionBlockVersion;
    /** @deprecated Use `sui:signAndExecuteTransaction` instead. */
    signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
  };
};
/** @deprecated Use `sui:signAndExecuteTransaction` instead. */
type SuiSignAndExecuteTransactionBlockMethod = (input: SuiSignAndExecuteTransactionBlockInput) => Promise<SuiSignAndExecuteTransactionBlockOutput>;
/** Input for signing and sending transactions. */
interface SuiSignAndExecuteTransactionBlockInput extends SuiSignTransactionBlockInput {
  /**
   * @deprecated requestType will be ignored by JSON RPC in the future
   */
  requestType?: ExecuteTransactionRequestType;
  /** specify which fields to return (e.g., transaction, effects, events, etc). By default, only the transaction digest will be returned. */
  options?: SuiTransactionBlockResponseOptions;
}
/** Output of signing and sending transactions. */
interface SuiSignAndExecuteTransactionBlockOutput extends SuiTransactionBlockResponse {}
//#endregion
export { SuiSignAndExecuteTransactionBlock, SuiSignAndExecuteTransactionBlockFeature, SuiSignAndExecuteTransactionBlockInput, SuiSignAndExecuteTransactionBlockMethod, SuiSignAndExecuteTransactionBlockOutput, SuiSignAndExecuteTransactionBlockVersion };
//# sourceMappingURL=suiSignAndExecuteTransactionBlock.d.mts.map