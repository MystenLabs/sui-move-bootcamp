import { SuiClientTypes } from "../client/types.mjs";
import { coreClientResolveTransactionPlugin } from "../client/core-resolver.mjs";
import { SuiJsonRpcClient } from "./client.mjs";
import { CoreClient } from "../client/core.mjs";

//#region src/jsonRpc/core.d.ts
declare class JSONRpcCoreClient extends CoreClient {
  #private;
  constructor({
    jsonRpcClient,
    mvr
  }: {
    jsonRpcClient: SuiJsonRpcClient;
    mvr?: SuiClientTypes.MvrOptions;
  });
  getObjects<Include extends SuiClientTypes.ObjectInclude = object>(options: SuiClientTypes.GetObjectsOptions<Include>): Promise<{
    objects: (Error | SuiClientTypes.Object<Include>)[];
  }>;
  listOwnedObjects<Include extends SuiClientTypes.ObjectInclude = object>(options: SuiClientTypes.ListOwnedObjectsOptions<Include>): Promise<{
    objects: SuiClientTypes.Object<Include>[];
    hasNextPage: boolean;
    cursor: string | null;
  }>;
  listCoins(options: SuiClientTypes.ListCoinsOptions): Promise<{
    objects: SuiClientTypes.Coin[];
    hasNextPage: boolean;
    cursor: string | null;
  }>;
  getBalance(options: SuiClientTypes.GetBalanceOptions): Promise<{
    balance: {
      coinType: string;
      balance: string;
      coinBalance: string;
      addressBalance: string;
    };
  }>;
  getCoinMetadata(options: SuiClientTypes.GetCoinMetadataOptions): Promise<SuiClientTypes.GetCoinMetadataResponse>;
  listBalances(options: SuiClientTypes.ListBalancesOptions): Promise<{
    balances: {
      coinType: string;
      balance: string;
      coinBalance: string;
      addressBalance: string;
    }[];
    hasNextPage: boolean;
    cursor: null;
  }>;
  getTransaction<Include extends SuiClientTypes.TransactionInclude = object>(options: SuiClientTypes.GetTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  executeTransaction<Include extends SuiClientTypes.TransactionInclude = object>(options: SuiClientTypes.ExecuteTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  simulateTransaction<Include extends SuiClientTypes.SimulateTransactionInclude = object>(options: SuiClientTypes.SimulateTransactionOptions<Include>): Promise<SuiClientTypes.SimulateTransactionResult<Include>>;
  getReferenceGasPrice(options?: SuiClientTypes.GetReferenceGasPriceOptions): Promise<{
    referenceGasPrice: string;
  }>;
  getCurrentSystemState(options?: SuiClientTypes.GetCurrentSystemStateOptions): Promise<SuiClientTypes.GetCurrentSystemStateResponse>;
  listDynamicFields(options: SuiClientTypes.ListDynamicFieldsOptions): Promise<{
    dynamicFields: {
      fieldId: string;
      type: string;
      name: {
        type: string;
        bcs: Uint8Array<ArrayBuffer>;
      };
      valueType: string;
    }[];
    hasNextPage: boolean;
    cursor: string | null;
  }>;
  verifyZkLoginSignature(options: SuiClientTypes.VerifyZkLoginSignatureOptions): Promise<{
    success: boolean;
    errors: string[];
  }>;
  defaultNameServiceName(options: SuiClientTypes.DefaultNameServiceNameOptions): Promise<SuiClientTypes.DefaultNameServiceNameResponse>;
  resolveTransactionPlugin(): typeof coreClientResolveTransactionPlugin;
  getMoveFunction(options: SuiClientTypes.GetMoveFunctionOptions): Promise<SuiClientTypes.GetMoveFunctionResponse>;
  getChainIdentifier(_options?: SuiClientTypes.GetChainIdentifierOptions): Promise<SuiClientTypes.GetChainIdentifierResponse>;
}
//#endregion
export { JSONRpcCoreClient };
//# sourceMappingURL=core.d.mts.map