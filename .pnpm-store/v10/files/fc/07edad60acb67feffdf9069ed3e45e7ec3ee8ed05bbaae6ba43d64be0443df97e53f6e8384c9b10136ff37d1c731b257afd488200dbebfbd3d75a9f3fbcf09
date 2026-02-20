import { SignedTransaction, SuiSignTransactionInput } from "./features/suiSignTransaction.mjs";
import { SuiSignAndExecuteTransactionInput, SuiSignAndExecuteTransactionOutput } from "./features/suiSignAndExecuteTransaction.mjs";
import { SuiWalletFeatures } from "./features/index.mjs";
import { Wallet as Wallet$1, WalletWithFeatures } from "@wallet-standard/core";

//#region src/wallet.d.ts
declare module '@wallet-standard/core' {
  interface Wallet {
    /**
     * Unique identifier of the Wallet.
     *
     * If not provided, the wallet name will be used as the identifier.
     */
    readonly id?: string;
  }
  interface StandardConnectOutput {
    supportedIntents?: string[];
  }
}
declare function signAndExecuteTransaction(wallet: WalletWithFeatures<Partial<SuiWalletFeatures>>, input: SuiSignAndExecuteTransactionInput): Promise<SuiSignAndExecuteTransactionOutput>;
declare function signTransaction(wallet: WalletWithFeatures<Partial<SuiWalletFeatures>>, input: SuiSignTransactionInput): Promise<SignedTransaction>;
//#endregion
export { type Wallet$1 as Wallet, signAndExecuteTransaction, signTransaction };
//# sourceMappingURL=wallet.d.mts.map