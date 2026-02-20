import { ClientWithExtensions, SuiClientTypes } from "./types.mjs";
import { TransactionPlugin } from "../transactions/resolve.mjs";
import "../transactions/index.mjs";
import { BaseClient } from "./client.mjs";

//#region src/client/core.d.ts
type ClientWithCoreApi = ClientWithExtensions<{
  core: CoreClient;
}>;
interface CoreClientOptions extends SuiClientTypes.SuiClientOptions {
  base: BaseClient;
  mvr?: SuiClientTypes.MvrOptions;
}
declare abstract class CoreClient extends BaseClient implements SuiClientTypes.TransportMethods {
  core: this;
  mvr: SuiClientTypes.MvrMethods;
  constructor(options: CoreClientOptions);
  abstract getObjects<Include extends SuiClientTypes.ObjectInclude = object>(options: SuiClientTypes.GetObjectsOptions<Include>): Promise<SuiClientTypes.GetObjectsResponse<Include>>;
  getObject<Include extends SuiClientTypes.ObjectInclude = object>(options: SuiClientTypes.GetObjectOptions<Include>): Promise<SuiClientTypes.GetObjectResponse<Include>>;
  abstract listCoins(options: SuiClientTypes.ListCoinsOptions): Promise<SuiClientTypes.ListCoinsResponse>;
  abstract listOwnedObjects<Include extends SuiClientTypes.ObjectInclude = object>(options: SuiClientTypes.ListOwnedObjectsOptions<Include>): Promise<SuiClientTypes.ListOwnedObjectsResponse<Include>>;
  abstract getBalance(options: SuiClientTypes.GetBalanceOptions): Promise<SuiClientTypes.GetBalanceResponse>;
  abstract listBalances(options: SuiClientTypes.ListBalancesOptions): Promise<SuiClientTypes.ListBalancesResponse>;
  abstract getCoinMetadata(options: SuiClientTypes.GetCoinMetadataOptions): Promise<SuiClientTypes.GetCoinMetadataResponse>;
  abstract getTransaction<Include extends SuiClientTypes.TransactionInclude = object>(options: SuiClientTypes.GetTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  abstract executeTransaction<Include extends SuiClientTypes.TransactionInclude = object>(options: SuiClientTypes.ExecuteTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  abstract simulateTransaction<Include extends SuiClientTypes.SimulateTransactionInclude = object>(options: SuiClientTypes.SimulateTransactionOptions<Include>): Promise<SuiClientTypes.SimulateTransactionResult<Include>>;
  abstract getReferenceGasPrice(options?: SuiClientTypes.GetReferenceGasPriceOptions): Promise<SuiClientTypes.GetReferenceGasPriceResponse>;
  abstract getCurrentSystemState(options?: SuiClientTypes.GetCurrentSystemStateOptions): Promise<SuiClientTypes.GetCurrentSystemStateResponse>;
  abstract getChainIdentifier(options?: SuiClientTypes.GetChainIdentifierOptions): Promise<SuiClientTypes.GetChainIdentifierResponse>;
  abstract listDynamicFields(options: SuiClientTypes.ListDynamicFieldsOptions): Promise<SuiClientTypes.ListDynamicFieldsResponse>;
  abstract resolveTransactionPlugin(): TransactionPlugin;
  abstract verifyZkLoginSignature(options: SuiClientTypes.VerifyZkLoginSignatureOptions): Promise<SuiClientTypes.ZkLoginVerifyResponse>;
  abstract getMoveFunction(options: SuiClientTypes.GetMoveFunctionOptions): Promise<SuiClientTypes.GetMoveFunctionResponse>;
  abstract defaultNameServiceName(options: SuiClientTypes.DefaultNameServiceNameOptions): Promise<SuiClientTypes.DefaultNameServiceNameResponse>;
  getDynamicField(options: SuiClientTypes.GetDynamicFieldOptions): Promise<SuiClientTypes.GetDynamicFieldResponse>;
  getDynamicObjectField<Include extends SuiClientTypes.ObjectInclude = object>(options: SuiClientTypes.GetDynamicObjectFieldOptions<Include>): Promise<SuiClientTypes.GetDynamicObjectFieldResponse<Include>>;
  waitForTransaction<Include extends SuiClientTypes.TransactionInclude = object>(options: SuiClientTypes.WaitForTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  signAndExecuteTransaction<Include extends SuiClientTypes.TransactionInclude = {}>({
    transaction,
    signer,
    additionalSignatures,
    ...input
  }: SuiClientTypes.SignAndExecuteTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
}
//#endregion
export { ClientWithCoreApi, CoreClient, CoreClientOptions };
//# sourceMappingURL=core.d.mts.map