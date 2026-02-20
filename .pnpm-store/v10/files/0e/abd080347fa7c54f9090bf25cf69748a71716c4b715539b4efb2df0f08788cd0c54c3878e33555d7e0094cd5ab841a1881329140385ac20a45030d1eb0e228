import { JsonRpcTransport } from "./http-transport.mjs";
import { Checkpoint, CoinMetadata, CoinSupply, CommitteeInfo, DelegatedStake, DevInspectResults, DryRunTransactionBlockResponse, ObjectRead, PaginatedCoins, PaginatedEvents, PaginatedObjectsResponse, PaginatedTransactionResponse, ProtocolConfig, SuiMoveFunctionArgType, SuiMoveNormalizedFunction, SuiMoveNormalizedModule, SuiMoveNormalizedStruct, SuiObjectResponse, SuiSystemStateSummary, SuiTransactionBlockResponse, ValidatorsApy, ZkLoginVerifyResult } from "./types/generated.mjs";
import { AddressMetrics, AllEpochsAddressMetrics, CheckpointPage, DynamicFieldPage, EpochInfo, EpochMetricsPage, EpochPage, MoveCallMetrics, NetworkMetrics, ResolvedNameServiceNames, SuiMoveNormalizedModules } from "./types/chain.mjs";
import { CoinBalance } from "./types/coins.mjs";
import { Order } from "./types/common.mjs";
import { DevInspectTransactionBlockParams, DryRunTransactionBlockParams, ExecuteTransactionBlockParams, GetAllBalancesParams, GetAllCoinsParams, GetBalanceParams, GetCheckpointParams, GetCheckpointsParams, GetCoinMetadataParams, GetCoinsParams, GetCommitteeInfoParams, GetDynamicFieldObjectParams, GetDynamicFieldsParams, GetLatestCheckpointSequenceNumberParams, GetLatestSuiSystemStateParams, GetMoveFunctionArgTypesParams, GetNormalizedMoveFunctionParams, GetNormalizedMoveModuleParams, GetNormalizedMoveModulesByPackageParams, GetNormalizedMoveStructParams, GetObjectParams, GetOwnedObjectsParams, GetProtocolConfigParams, GetReferenceGasPriceParams, GetStakesByIdsParams, GetStakesParams, GetTotalSupplyParams, GetTransactionBlockParams, MultiGetObjectsParams, MultiGetTransactionBlocksParams, QueryEventsParams, QueryTransactionBlocksParams, ResolveNameServiceAddressParams, ResolveNameServiceNamesParams, TryGetPastObjectParams, VerifyZkLoginSignatureParams } from "./types/params.mjs";
import "./types/index.mjs";
import { SuiClientTypes } from "../client/types.mjs";
import { Transaction } from "../transactions/Transaction.mjs";
import { Signer } from "../cryptography/keypair.mjs";
import "../cryptography/index.mjs";
import { JSONRpcCoreClient } from "./core.mjs";
import { BaseClient } from "../client/client.mjs";

//#region src/jsonRpc/client.d.ts
interface PaginationArguments<Cursor> {
  /** Optional paging cursor */
  cursor?: Cursor;
  /** Maximum item returned per page */
  limit?: number | null;
}
interface OrderArguments {
  order?: Order | null;
}
/**
 * Configuration options for the SuiJsonRpcClient
 * You must provide either a `url` or a `transport`
 */
type SuiJsonRpcClientOptions = NetworkOrTransport & {
  network: SuiClientTypes.Network;
  mvr?: SuiClientTypes.MvrOptions;
};
type NetworkOrTransport = {
  url: string;
  transport?: never;
} | {
  transport: JsonRpcTransport;
  url?: never;
};
declare const SUI_CLIENT_BRAND: never;
declare function isSuiJsonRpcClient(client: unknown): client is SuiJsonRpcClient;
declare class SuiJsonRpcClient extends BaseClient {
  [SUI_CLIENT_BRAND]: boolean;
  core: JSONRpcCoreClient;
  jsonRpc: this;
  protected transport: JsonRpcTransport;
  /**
   * Establish a connection to a Sui RPC endpoint
   *
   * @param options configuration options for the API Client
   */
  constructor(options: SuiJsonRpcClientOptions);
  getRpcApiVersion({
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<string | undefined>;
  /**
   * Get all Coin<`coin_type`> objects owned by an address.
   */
  getCoins({
    coinType,
    owner,
    cursor,
    limit,
    signal
  }: GetCoinsParams): Promise<PaginatedCoins>;
  /**
   * Get all Coin objects owned by an address.
   */
  getAllCoins(input: GetAllCoinsParams): Promise<PaginatedCoins>;
  /**
   * Get the total coin balance for one coin type, owned by the address owner.
   */
  getBalance({
    owner,
    coinType,
    signal
  }: GetBalanceParams): Promise<CoinBalance>;
  /**
   * Get the total coin balance for all coin types, owned by the address owner.
   */
  getAllBalances(input: GetAllBalancesParams): Promise<CoinBalance[]>;
  /**
   * Fetch CoinMetadata for a given coin type
   */
  getCoinMetadata({
    coinType,
    signal
  }: GetCoinMetadataParams): Promise<CoinMetadata | null>;
  /**
   *  Fetch total supply for a coin
   */
  getTotalSupply({
    coinType,
    signal
  }: GetTotalSupplyParams): Promise<CoinSupply>;
  /**
   * Invoke any RPC method
   * @param method the method to be invoked
   * @param args the arguments to be passed to the RPC request
   */
  call<T = unknown>(method: string, params: unknown[], {
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<T>;
  /**
   * Get Move function argument types like read, write and full access
   */
  getMoveFunctionArgTypes({
    package: pkg,
    module,
    function: fn,
    signal
  }: GetMoveFunctionArgTypesParams): Promise<SuiMoveFunctionArgType[]>;
  /**
   * Get a map from module name to
   * structured representations of Move modules
   */
  getNormalizedMoveModulesByPackage({
    package: pkg,
    signal
  }: GetNormalizedMoveModulesByPackageParams): Promise<SuiMoveNormalizedModules>;
  /**
   * Get a structured representation of Move module
   */
  getNormalizedMoveModule({
    package: pkg,
    module,
    signal
  }: GetNormalizedMoveModuleParams): Promise<SuiMoveNormalizedModule>;
  /**
   * Get a structured representation of Move function
   */
  getNormalizedMoveFunction({
    package: pkg,
    module,
    function: fn,
    signal
  }: GetNormalizedMoveFunctionParams): Promise<SuiMoveNormalizedFunction>;
  /**
   * Get a structured representation of Move struct
   */
  getNormalizedMoveStruct({
    package: pkg,
    module,
    struct,
    signal
  }: GetNormalizedMoveStructParams): Promise<SuiMoveNormalizedStruct>;
  /**
   * Get all objects owned by an address
   */
  getOwnedObjects(input: GetOwnedObjectsParams): Promise<PaginatedObjectsResponse>;
  /**
   * Get details about an object
   */
  getObject(input: GetObjectParams): Promise<SuiObjectResponse>;
  tryGetPastObject(input: TryGetPastObjectParams): Promise<ObjectRead>;
  /**
   * Batch get details about a list of objects. If any of the object ids are duplicates the call will fail
   */
  multiGetObjects(input: MultiGetObjectsParams): Promise<SuiObjectResponse[]>;
  /**
   * Get transaction blocks for a given query criteria
   */
  queryTransactionBlocks({
    filter,
    options,
    cursor,
    limit,
    order,
    signal
  }: QueryTransactionBlocksParams): Promise<PaginatedTransactionResponse>;
  getTransactionBlock(input: GetTransactionBlockParams): Promise<SuiTransactionBlockResponse>;
  multiGetTransactionBlocks(input: MultiGetTransactionBlocksParams): Promise<SuiTransactionBlockResponse[]>;
  executeTransactionBlock({
    transactionBlock,
    signature,
    options,
    signal
  }: ExecuteTransactionBlockParams): Promise<SuiTransactionBlockResponse>;
  signAndExecuteTransaction({
    transaction,
    signer,
    ...input
  }: {
    transaction: Uint8Array | Transaction;
    signer: Signer;
  } & Omit<ExecuteTransactionBlockParams, 'transactionBlock' | 'signature'>): Promise<SuiTransactionBlockResponse>;
  /**
   * Get total number of transactions
   */
  getTotalTransactionBlocks({
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<bigint>;
  /**
   * Getting the reference gas price for the network
   */
  getReferenceGasPrice({
    signal
  }?: GetReferenceGasPriceParams): Promise<bigint>;
  /**
   * Return the delegated stakes for an address
   */
  getStakes(input: GetStakesParams): Promise<DelegatedStake[]>;
  /**
   * Return the delegated stakes queried by id.
   */
  getStakesByIds(input: GetStakesByIdsParams): Promise<DelegatedStake[]>;
  /**
   * Return the latest system state content.
   */
  getLatestSuiSystemState({
    signal
  }?: GetLatestSuiSystemStateParams): Promise<SuiSystemStateSummary>;
  /**
   * Get events for a given query criteria
   */
  queryEvents({
    query,
    cursor,
    limit,
    order,
    signal
  }: QueryEventsParams): Promise<PaginatedEvents>;
  /**
   * Runs the transaction block in dev-inspect mode. Which allows for nearly any
   * transaction (or Move call) with any arguments. Detailed results are
   * provided, including both the transaction effects and any return values.
   */
  devInspectTransactionBlock(input: DevInspectTransactionBlockParams): Promise<DevInspectResults>;
  /**
   * Dry run a transaction block and return the result.
   */
  dryRunTransactionBlock(input: DryRunTransactionBlockParams): Promise<DryRunTransactionBlockResponse>;
  /**
   * Return the list of dynamic field objects owned by an object
   */
  getDynamicFields(input: GetDynamicFieldsParams): Promise<DynamicFieldPage>;
  /**
   * Return the dynamic field object information for a specified object
   */
  getDynamicFieldObject(input: GetDynamicFieldObjectParams): Promise<SuiObjectResponse>;
  /**
   * Get the sequence number of the latest checkpoint that has been executed
   */
  getLatestCheckpointSequenceNumber({
    signal
  }?: GetLatestCheckpointSequenceNumberParams): Promise<string>;
  /**
   * Returns information about a given checkpoint
   */
  getCheckpoint(input: GetCheckpointParams): Promise<Checkpoint>;
  /**
   * Returns historical checkpoints paginated
   */
  getCheckpoints(input: PaginationArguments<CheckpointPage['nextCursor']> & GetCheckpointsParams): Promise<CheckpointPage>;
  /**
   * Return the committee information for the asked epoch
   */
  getCommitteeInfo(input?: GetCommitteeInfoParams): Promise<CommitteeInfo>;
  getNetworkMetrics({
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<NetworkMetrics>;
  getAddressMetrics({
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<AddressMetrics>;
  getEpochMetrics(input?: {
    descendingOrder?: boolean;
    signal?: AbortSignal;
  } & PaginationArguments<EpochMetricsPage['nextCursor']>): Promise<EpochMetricsPage>;
  getAllEpochAddressMetrics(input?: {
    descendingOrder?: boolean;
    signal?: AbortSignal;
  }): Promise<AllEpochsAddressMetrics>;
  /**
   * Return the committee information for the asked epoch
   */
  getEpochs(input?: {
    descendingOrder?: boolean;
    signal?: AbortSignal;
  } & PaginationArguments<EpochPage['nextCursor']>): Promise<EpochPage>;
  /**
   * Returns list of top move calls by usage
   */
  getMoveCallMetrics({
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<MoveCallMetrics>;
  /**
   * Return the committee information for the asked epoch
   */
  getCurrentEpoch({
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<EpochInfo>;
  /**
   * Return the Validators APYs
   */
  getValidatorsApy({
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<ValidatorsApy>;
  getChainIdentifier({
    signal
  }?: {
    signal?: AbortSignal;
  }): Promise<string>;
  resolveNameServiceAddress(input: ResolveNameServiceAddressParams): Promise<string | null>;
  resolveNameServiceNames({
    format,
    ...input
  }: ResolveNameServiceNamesParams & {
    format?: 'at' | 'dot';
  }): Promise<ResolvedNameServiceNames>;
  getProtocolConfig(input?: GetProtocolConfigParams): Promise<ProtocolConfig>;
  verifyZkLoginSignature(input: VerifyZkLoginSignatureParams): Promise<ZkLoginVerifyResult>;
  /**
   * Wait for a transaction block result to be available over the API.
   * This can be used in conjunction with `executeTransactionBlock` to wait for the transaction to
   * be available via the API.
   * This currently polls the `getTransactionBlock` API to check for the transaction.
   */
  waitForTransaction({
    signal,
    timeout,
    pollInterval,
    ...input
  }: {
    /** An optional abort signal that can be used to cancel */
    signal?: AbortSignal;
    /** The amount of time to wait for a transaction block. Defaults to one minute. */
    timeout?: number;
    /** The amount of time to wait between checks for the transaction block. Defaults to 2 seconds. */
    pollInterval?: number;
  } & Parameters<SuiJsonRpcClient['getTransactionBlock']>[0]): Promise<SuiTransactionBlockResponse>;
}
//#endregion
export { OrderArguments, PaginationArguments, SuiJsonRpcClient, SuiJsonRpcClientOptions, isSuiJsonRpcClient };
//# sourceMappingURL=client.d.mts.map