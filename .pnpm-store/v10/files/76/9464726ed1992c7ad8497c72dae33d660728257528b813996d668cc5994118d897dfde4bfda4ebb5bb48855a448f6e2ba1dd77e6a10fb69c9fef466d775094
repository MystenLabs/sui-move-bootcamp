import { TransactionDataBuilder } from "./TransactionData.mjs";
import { ClientWithCoreApi } from "../client/core.mjs";
import "../client/index.mjs";

//#region src/transactions/resolve.d.ts
interface BuildTransactionOptions {
  client?: ClientWithCoreApi;
  onlyTransactionKind?: boolean;
}
interface SerializeTransactionOptions extends BuildTransactionOptions {
  supportedIntents?: string[];
}
type TransactionPlugin = (transactionData: TransactionDataBuilder, options: BuildTransactionOptions, next: () => Promise<void>) => Promise<void>;
//#endregion
export { BuildTransactionOptions, SerializeTransactionOptions, TransactionPlugin };
//# sourceMappingURL=resolve.d.mts.map