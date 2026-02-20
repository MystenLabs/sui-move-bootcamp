import { SuiClientTypes } from "../client/types.mjs";
import { TransactionDataBuilder } from "../transactions/TransactionData.mjs";
import { BuildTransactionOptions } from "../transactions/resolve.mjs";
import "../transactions/index.mjs";
import { CoreClient, CoreClientOptions } from "../client/core.mjs";
import "../client/index.mjs";
import "./proto/sui/rpc/v2/effects.mjs";
import { SuiGrpcClient } from "./client.mjs";

//#region src/grpc/core.d.ts
interface GrpcCoreClientOptions extends CoreClientOptions {
  client: SuiGrpcClient;
}
declare class GrpcCoreClient extends CoreClient {
  #private;
  constructor({
    client,
    ...options
  }: GrpcCoreClientOptions);
  getObjects<Include extends SuiClientTypes.ObjectInclude = object>(options: SuiClientTypes.GetObjectsOptions<Include>): Promise<SuiClientTypes.GetObjectsResponse<Include>>;
  listOwnedObjects<Include extends SuiClientTypes.ObjectInclude = object>(options: SuiClientTypes.ListOwnedObjectsOptions<Include>): Promise<SuiClientTypes.ListOwnedObjectsResponse<Include>>;
  listCoins(options: SuiClientTypes.ListCoinsOptions): Promise<SuiClientTypes.ListCoinsResponse>;
  getBalance(options: SuiClientTypes.GetBalanceOptions): Promise<SuiClientTypes.GetBalanceResponse>;
  getCoinMetadata(options: SuiClientTypes.GetCoinMetadataOptions): Promise<SuiClientTypes.GetCoinMetadataResponse>;
  listBalances(options: SuiClientTypes.ListBalancesOptions): Promise<SuiClientTypes.ListBalancesResponse>;
  getTransaction<Include extends SuiClientTypes.TransactionInclude = object>(options: SuiClientTypes.GetTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  executeTransaction<Include extends SuiClientTypes.TransactionInclude = object>(options: SuiClientTypes.ExecuteTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  simulateTransaction<Include extends SuiClientTypes.SimulateTransactionInclude = object>(options: SuiClientTypes.SimulateTransactionOptions<Include>): Promise<SuiClientTypes.SimulateTransactionResult<Include>>;
  getReferenceGasPrice(): Promise<SuiClientTypes.GetReferenceGasPriceResponse>;
  getCurrentSystemState(): Promise<SuiClientTypes.GetCurrentSystemStateResponse>;
  listDynamicFields(options: SuiClientTypes.ListDynamicFieldsOptions): Promise<SuiClientTypes.ListDynamicFieldsResponse>;
  verifyZkLoginSignature(options: SuiClientTypes.VerifyZkLoginSignatureOptions): Promise<SuiClientTypes.ZkLoginVerifyResponse>;
  defaultNameServiceName(options: SuiClientTypes.DefaultNameServiceNameOptions): Promise<SuiClientTypes.DefaultNameServiceNameResponse>;
  getMoveFunction(options: SuiClientTypes.GetMoveFunctionOptions): Promise<SuiClientTypes.GetMoveFunctionResponse>;
  getChainIdentifier(_options?: SuiClientTypes.GetChainIdentifierOptions): Promise<SuiClientTypes.GetChainIdentifierResponse>;
  resolveTransactionPlugin(): (transactionData: TransactionDataBuilder, options: BuildTransactionOptions, next: () => Promise<void>) => Promise<void>;
}
//#endregion
export { GrpcCoreClient, GrpcCoreClientOptions };
//# sourceMappingURL=core.d.mts.map