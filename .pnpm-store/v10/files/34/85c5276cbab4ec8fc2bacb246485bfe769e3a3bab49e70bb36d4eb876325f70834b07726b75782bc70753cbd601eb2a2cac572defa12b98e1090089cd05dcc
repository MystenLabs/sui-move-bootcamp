import { SuiClientTypes } from "../client/types.mjs";
import { TransactionPlugin } from "../transactions/resolve.mjs";
import "../transactions/index.mjs";
import { BaseClient } from "../client/client.mjs";
import "../client/index.mjs";
import { TransactionExecutionServiceClient } from "./proto/sui/rpc/v2/transaction_execution_service.client.mjs";
import { LedgerServiceClient } from "./proto/sui/rpc/v2/ledger_service.client.mjs";
import { MovePackageServiceClient } from "./proto/sui/rpc/v2/move_package_service.client.mjs";
import { SignatureVerificationServiceClient } from "./proto/sui/rpc/v2/signature_verification_service.client.mjs";
import { StateServiceClient } from "./proto/sui/rpc/v2/state_service.client.mjs";
import { SubscriptionServiceClient } from "./proto/sui/rpc/v2/subscription_service.client.mjs";
import { GrpcCoreClient } from "./core.mjs";
import { NameServiceClient } from "./proto/sui/rpc/v2/name_service.client.mjs";
import { GrpcWebOptions } from "@protobuf-ts/grpcweb-transport";
import { RpcTransport } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/client.d.ts
interface SuiGrpcTransportOptions extends GrpcWebOptions {
  transport?: never;
}
type SuiGrpcClientOptions = {
  network: SuiClientTypes.Network;
  mvr?: SuiClientTypes.MvrOptions;
} & ({
  transport: RpcTransport;
} | SuiGrpcTransportOptions);
declare const SUI_CLIENT_BRAND: never;
declare function isSuiGrpcClient(client: unknown): client is SuiGrpcClient;
declare class SuiGrpcClient extends BaseClient implements SuiClientTypes.TransportMethods {
  [SUI_CLIENT_BRAND]: boolean;
  core: GrpcCoreClient;
  get mvr(): SuiClientTypes.MvrMethods;
  transactionExecutionService: TransactionExecutionServiceClient;
  ledgerService: LedgerServiceClient;
  stateService: StateServiceClient;
  subscriptionService: SubscriptionServiceClient;
  movePackageService: MovePackageServiceClient;
  signatureVerificationService: SignatureVerificationServiceClient;
  nameService: NameServiceClient;
  constructor(options: SuiGrpcClientOptions);
  getObjects<Include extends SuiClientTypes.ObjectInclude = {}>(input: SuiClientTypes.GetObjectsOptions<Include>): Promise<SuiClientTypes.GetObjectsResponse<Include>>;
  getObject<Include extends SuiClientTypes.ObjectInclude = {}>(input: SuiClientTypes.GetObjectOptions<Include>): Promise<SuiClientTypes.GetObjectResponse<Include>>;
  listCoins(input: SuiClientTypes.ListCoinsOptions): Promise<SuiClientTypes.ListCoinsResponse>;
  listOwnedObjects<Include extends SuiClientTypes.ObjectInclude = {}>(input: SuiClientTypes.ListOwnedObjectsOptions<Include>): Promise<SuiClientTypes.ListOwnedObjectsResponse<Include>>;
  getBalance(input: SuiClientTypes.GetBalanceOptions): Promise<SuiClientTypes.GetBalanceResponse>;
  listBalances(input: SuiClientTypes.ListBalancesOptions): Promise<SuiClientTypes.ListBalancesResponse>;
  getCoinMetadata(input: SuiClientTypes.GetCoinMetadataOptions): Promise<SuiClientTypes.GetCoinMetadataResponse>;
  getTransaction<Include extends SuiClientTypes.TransactionInclude = {}>(input: SuiClientTypes.GetTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  executeTransaction<Include extends SuiClientTypes.TransactionInclude = {}>(input: SuiClientTypes.ExecuteTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  signAndExecuteTransaction<Include extends SuiClientTypes.TransactionInclude = {}>(input: SuiClientTypes.SignAndExecuteTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  waitForTransaction<Include extends SuiClientTypes.TransactionInclude = {}>(input: SuiClientTypes.WaitForTransactionOptions<Include>): Promise<SuiClientTypes.TransactionResult<Include>>;
  simulateTransaction<Include extends SuiClientTypes.SimulateTransactionInclude = {}>(input: SuiClientTypes.SimulateTransactionOptions<Include>): Promise<SuiClientTypes.SimulateTransactionResult<Include>>;
  getReferenceGasPrice(): Promise<SuiClientTypes.GetReferenceGasPriceResponse>;
  listDynamicFields(input: SuiClientTypes.ListDynamicFieldsOptions): Promise<SuiClientTypes.ListDynamicFieldsResponse>;
  getDynamicField(input: SuiClientTypes.GetDynamicFieldOptions): Promise<SuiClientTypes.GetDynamicFieldResponse>;
  getMoveFunction(input: SuiClientTypes.GetMoveFunctionOptions): Promise<SuiClientTypes.GetMoveFunctionResponse>;
  resolveTransactionPlugin(): TransactionPlugin;
  verifyZkLoginSignature(input: SuiClientTypes.VerifyZkLoginSignatureOptions): Promise<SuiClientTypes.ZkLoginVerifyResponse>;
  defaultNameServiceName(input: SuiClientTypes.DefaultNameServiceNameOptions): Promise<SuiClientTypes.DefaultNameServiceNameResponse>;
}
//#endregion
export { SuiGrpcClient, SuiGrpcClientOptions, isSuiGrpcClient };
//# sourceMappingURL=client.d.mts.map