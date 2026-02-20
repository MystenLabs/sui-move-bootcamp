import { bcs as suiBcs } from "../../bcs/index.mjs";
import { SuiClientTypes } from "../../client/types.mjs";
import { Transaction } from "../Transaction.mjs";
import { Signer } from "../../cryptography/keypair.mjs";
import { ObjectCacheOptions } from "../ObjectCache.mjs";
import { ClientWithCoreApi } from "../../client/core.mjs";

//#region src/transactions/executor/serial.d.ts
interface SerialTransactionExecutorBaseOptions extends Omit<ObjectCacheOptions, 'address'> {
  client: ClientWithCoreApi;
  signer: Signer;
  defaultGasBudget?: bigint;
}
interface SerialTransactionExecutorCoinOptions extends SerialTransactionExecutorBaseOptions {
  gasMode?: 'coins';
}
interface SerialTransactionExecutorAddressBalanceOptions extends SerialTransactionExecutorBaseOptions {
  gasMode: 'addressBalance';
}
type SerialTransactionExecutorOptions = SerialTransactionExecutorCoinOptions | SerialTransactionExecutorAddressBalanceOptions;
declare class SerialTransactionExecutor {
  #private;
  constructor(options: SerialTransactionExecutorOptions);
  applyEffects(effects: typeof suiBcs.TransactionEffects.$inferType): Promise<void>;
  buildTransaction(transaction: Transaction): Promise<Uint8Array<ArrayBuffer>>;
  resetCache(): Promise<void>;
  waitForLastTransaction(): Promise<void>;
  executeTransaction<Include extends SuiClientTypes.TransactionInclude = {}>(transaction: Transaction | Uint8Array, include?: Include, additionalSignatures?: string[]): Promise<SuiClientTypes.TransactionResult<Include & {
    effects: true;
  }>>;
}
//#endregion
export { SerialTransactionExecutor };
//# sourceMappingURL=serial.d.mts.map