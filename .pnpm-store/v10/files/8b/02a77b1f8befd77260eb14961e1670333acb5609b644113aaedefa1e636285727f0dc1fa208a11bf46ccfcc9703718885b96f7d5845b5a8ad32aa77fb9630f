import { SuiClientTypes } from "../../client/types.mjs";
import { Transaction } from "../Transaction.mjs";
import { Signer } from "../../cryptography/keypair.mjs";
import "../../cryptography/index.mjs";
import { ObjectCacheOptions } from "../ObjectCache.mjs";
import { ClientWithCoreApi } from "../../client/core.mjs";

//#region src/transactions/executor/parallel.d.ts
interface ParallelTransactionExecutorBaseOptions extends Omit<ObjectCacheOptions, 'address'> {
  client: ClientWithCoreApi;
  signer: Signer;
  /** The gasBudget to use if the transaction has not defined it's own gasBudget, defaults to `minimumCoinBalance` */
  defaultGasBudget?: bigint;
  /** The maximum number of transactions that can be execute in parallel, this also determines the maximum number of gas coins that will be created */
  maxPoolSize?: number;
}
interface ParallelTransactionExecutorCoinOptions extends ParallelTransactionExecutorBaseOptions {
  /** Gas mode - use owned coins for gas payments (default) */
  gasMode?: 'coins';
  /** The number of coins to create in a batch when refilling the gas pool */
  coinBatchSize?: number;
  /** The initial balance of each coin created for the gas pool */
  initialCoinBalance?: bigint;
  /** The minimum balance of a coin that can be reused for future transactions.  If the gasCoin is below this value, it will be used when refilling the gasPool */
  minimumCoinBalance?: bigint;
  /** An initial list of coins used to fund the gas pool, uses all owned SUI coins by default */
  sourceCoins?: string[];
}
interface ParallelTransactionExecutorAddressBalanceOptions extends ParallelTransactionExecutorBaseOptions {
  /** Gas mode - use address balance for gas payments instead of owned coins */
  gasMode: 'addressBalance';
}
/** Options for ParallelTransactionExecutor - discriminated union based on gasMode */
type ParallelTransactionExecutorOptions = ParallelTransactionExecutorCoinOptions | ParallelTransactionExecutorAddressBalanceOptions;
declare class ParallelTransactionExecutor {
  #private;
  constructor(options: ParallelTransactionExecutorOptions);
  resetCache(): Promise<void>;
  waitForLastTransaction(): Promise<void>;
  executeTransaction<Include extends SuiClientTypes.TransactionInclude = {}>(transaction: Transaction, include?: Include, additionalSignatures?: string[]): Promise<SuiClientTypes.TransactionResult<Include & {
    effects: true;
  }>>;
}
//#endregion
export { ParallelTransactionExecutor, ParallelTransactionExecutorOptions };
//# sourceMappingURL=parallel.d.mts.map