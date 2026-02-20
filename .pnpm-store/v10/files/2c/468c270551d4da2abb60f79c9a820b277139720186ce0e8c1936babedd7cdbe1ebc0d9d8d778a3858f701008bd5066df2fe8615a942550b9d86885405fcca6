import { ClientCache } from "./cache.mjs";
import { SerializedTransactionDataV2 } from "../transactions/data/v2.mjs";
import { TransactionPlugin } from "../transactions/resolve.mjs";
import { Transaction as Transaction$1 } from "../transactions/Transaction.mjs";
import { Signer } from "../cryptography/keypair.mjs";
import "../transactions/index.mjs";
import { BaseClient } from "./client.mjs";
import { EnumOutputShape } from "@mysten/bcs";

//#region src/client/types.d.ts
type SuiClientRegistration<T extends BaseClient = BaseClient, Name extends string = string, Extension = unknown> = {
  readonly name: Name;
  readonly register: (client: T) => Extension;
};
type ClientWithExtensions<T, Base extends BaseClient = BaseClient> = Base & T;
declare namespace SuiClientTypes {
  type Network = 'mainnet' | 'testnet' | 'devnet' | 'localnet' | (string & {});
  interface SuiClientOptions {
    network: Network;
    base?: BaseClient;
    cache?: ClientCache;
  }
  interface MvrOptions {
    url?: string;
    pageSize?: number;
    overrides?: {
      packages?: Record<string, string>;
      types?: Record<string, string>;
    };
  }
  interface CoreClientMethodOptions {
    signal?: AbortSignal;
  }
  /** Object methods */
  interface TransportMethods {
    getObjects: <Include extends ObjectInclude = {}>(options: GetObjectsOptions<Include>) => Promise<GetObjectsResponse<Include>>;
    listOwnedObjects: <Include extends ObjectInclude = {}>(options: ListOwnedObjectsOptions<Include>) => Promise<ListOwnedObjectsResponse<Include>>;
    listCoins: (options: ListCoinsOptions) => Promise<ListCoinsResponse>;
    listDynamicFields: (options: ListDynamicFieldsOptions) => Promise<ListDynamicFieldsResponse>;
    getDynamicField: (options: GetDynamicFieldOptions) => Promise<GetDynamicFieldResponse>;
  }
  interface ObjectInclude {
    content?: boolean;
    previousTransaction?: boolean;
    objectBcs?: boolean;
    json?: boolean;
  }
  interface GetObjectsOptions<Include extends ObjectInclude = {}> extends CoreClientMethodOptions {
    objectIds: string[];
    include?: Include;
  }
  interface GetObjectOptions<Include extends ObjectInclude = {}> extends CoreClientMethodOptions {
    objectId: string;
    include?: Include;
  }
  interface ListOwnedObjectsOptions<Include extends ObjectInclude = {}> extends CoreClientMethodOptions {
    owner: string;
    limit?: number;
    cursor?: string | null;
    type?: string;
    include?: Include;
  }
  interface ListCoinsOptions extends CoreClientMethodOptions {
    owner: string;
    /** Defaults to `0x2::sui::SUI` */
    coinType?: string;
    limit?: number;
    cursor?: string | null;
  }
  interface ListDynamicFieldsOptions extends CoreClientMethodOptions {
    parentId: string;
    limit?: number;
    cursor?: string | null;
  }
  interface GetDynamicFieldOptions extends CoreClientMethodOptions {
    parentId: string;
    name: DynamicFieldName;
  }
  interface GetObjectsResponse<out Include extends ObjectInclude = {}> {
    objects: (Object<Include> | Error)[];
  }
  interface GetObjectResponse<out Include extends ObjectInclude = {}> {
    object: Object<Include>;
  }
  interface ListOwnedObjectsResponse<out Include extends ObjectInclude = {}> {
    objects: Object<Include>[];
    hasNextPage: boolean;
    cursor: string | null;
  }
  interface ListCoinsResponse {
    objects: Coin[];
    hasNextPage: boolean;
    cursor: string | null;
  }
  interface Object<Include extends ObjectInclude = {}> {
    objectId: string;
    version: string;
    digest: string;
    owner: ObjectOwner;
    type: string;
    content: Include extends {
      content: true;
    } ? Uint8Array<ArrayBuffer> : undefined;
    previousTransaction: Include extends {
      previousTransaction: true;
    } ? string | null : undefined;
    objectBcs: Include extends {
      objectBcs: true;
    } ? Uint8Array<ArrayBuffer> : undefined;
    /**
     * The JSON representation of the object's Move struct content.
     *
     * **Warning:** The exact shape and field names of this data may vary between different
     * API implementations (JSON-RPC vs gRPC or GraphQL). For consistent data across APIs use
     * the `content` field and parse the BCS data directly.
     */
    json: Include extends {
      json: true;
    } ? Record<string, unknown> | null : undefined;
  }
  interface Coin {
    objectId: string;
    version: string;
    digest: string;
    owner: ObjectOwner;
    type: string;
    balance: string;
  }
  interface ListDynamicFieldsResponse {
    hasNextPage: boolean;
    cursor: string | null;
    dynamicFields: {
      fieldId: string;
      type: string;
      name: DynamicFieldName;
      valueType: string;
    }[];
  }
  interface GetDynamicFieldResponse {
    dynamicField: {
      name: DynamicFieldName;
      value: DynamicFieldValue;
      fieldId: string;
      version: string;
      digest: string;
      type: string;
      previousTransaction: string | null;
    };
  }
  interface GetDynamicObjectFieldOptions<Include extends ObjectInclude = {}> extends CoreClientMethodOptions {
    parentId: string;
    name: DynamicFieldName;
    include?: Include;
  }
  interface GetDynamicObjectFieldResponse<out Include extends ObjectInclude = {}> {
    object: Object<Include>;
  }
  interface DynamicFieldName {
    type: string;
    bcs: Uint8Array;
  }
  interface DynamicFieldValue {
    type: string;
    bcs: Uint8Array;
  }
  /** Balance methods */
  interface TransportMethods {
    getBalance: (options: GetBalanceOptions) => Promise<GetBalanceResponse>;
    listBalances: (options: ListBalancesOptions) => Promise<ListBalancesResponse>;
  }
  interface GetBalanceOptions extends CoreClientMethodOptions {
    owner: string;
    /** Defaults to `0x2::sui::SUI` */
    coinType?: string;
  }
  interface Balance {
    coinType: string;
    balance: string;
    coinBalance: string;
    addressBalance: string;
  }
  interface GetBalanceResponse {
    balance: Balance;
  }
  interface ListBalancesOptions extends CoreClientMethodOptions {
    owner: string;
    limit?: number;
    cursor?: string | null;
  }
  interface ListBalancesResponse {
    balances: Balance[];
    hasNextPage: boolean;
    cursor: string | null;
  }
  /** Coin metadata methods */
  interface TransportMethods {
    getCoinMetadata: (options: GetCoinMetadataOptions) => Promise<GetCoinMetadataResponse>;
  }
  interface GetCoinMetadataOptions extends CoreClientMethodOptions {
    coinType: string;
  }
  interface CoinMetadata {
    id: string | null;
    decimals: number;
    name: string;
    symbol: string;
    description: string;
    iconUrl: string | null;
  }
  interface GetCoinMetadataResponse {
    coinMetadata: CoinMetadata | null;
  }
  /** Transaction methods */
  interface TransportMethods {
    getTransaction: <Include extends TransactionInclude = {}>(options: GetTransactionOptions<Include>) => Promise<TransactionResult<Include>>;
    executeTransaction: <Include extends TransactionInclude = {}>(options: ExecuteTransactionOptions<Include>) => Promise<TransactionResult<Include>>;
    simulateTransaction: <Include extends SimulateTransactionInclude = {}>(options: SimulateTransactionOptions<Include>) => Promise<SimulateTransactionResult<Include>>;
    resolveTransactionPlugin: () => TransactionPlugin;
  }
  interface Transaction<out Include extends TransactionInclude = {}> {
    digest: string;
    signatures: string[];
    epoch: string | null;
    status: ExecutionStatus;
    balanceChanges: Include extends {
      balanceChanges: true;
    } ? BalanceChange[] : undefined;
    effects: Include extends {
      effects: true;
    } ? TransactionEffects : undefined;
    events: Include extends {
      events: true;
    } ? Event[] : undefined;
    objectTypes: Include extends {
      objectTypes: true;
    } ? Record<string, string> : undefined;
    transaction: Include extends {
      transaction: true;
    } ? TransactionData : undefined;
    bcs: Include extends {
      bcs: true;
    } ? Uint8Array : undefined;
  }
  type TransactionResult<Include extends TransactionInclude = {}> = {
    $kind: 'Transaction';
    Transaction: Transaction<Include>;
    FailedTransaction?: never;
  } | {
    $kind: 'FailedTransaction';
    Transaction?: never;
    FailedTransaction: Transaction<Include>;
  };
  type SimulateTransactionResult<Include extends SimulateTransactionInclude = {}> = {
    $kind: 'Transaction';
    Transaction: Transaction<Include>;
    FailedTransaction?: never;
    commandResults: Include extends {
      commandResults: true;
    } ? CommandResult[] : undefined;
  } | {
    $kind: 'FailedTransaction';
    Transaction?: never;
    FailedTransaction: Transaction<Include>;
    commandResults: Include extends {
      commandResults: true;
    } ? CommandResult[] : undefined;
  };
  interface TransactionInclude {
    balanceChanges?: boolean;
    effects?: boolean;
    events?: boolean;
    objectTypes?: boolean;
    transaction?: boolean;
    bcs?: boolean;
  }
  interface SimulateTransactionInclude extends TransactionInclude {
    commandResults?: boolean;
  }
  interface CommandResult {
    returnValues: CommandOutput[];
    mutatedReferences: CommandOutput[];
  }
  interface CommandOutput {
    bcs: Uint8Array;
  }
  interface BalanceChange {
    coinType: string;
    address: string;
    amount: string;
  }
  interface TransactionData extends SerializedTransactionDataV2 {}
  interface GetTransactionOptions<Include extends TransactionInclude = {}> extends CoreClientMethodOptions {
    digest: string;
    include?: Include;
  }
  type WaitForTransactionOptions<Include extends TransactionInclude = {}> = WaitForTransactionByDigest<Include> | WaitForTransactionByResult<Include>;
  interface WaitForTransactionByDigest<Include extends TransactionInclude = {}> extends GetTransactionOptions<Include> {
    timeout?: number;
    result?: never;
  }
  interface WaitForTransactionByResult<Include extends TransactionInclude = {}> extends CoreClientMethodOptions {
    result: TransactionResult<any>;
    include?: Include;
    timeout?: number;
    digest?: never;
  }
  interface ExecuteTransactionOptions<Include extends TransactionInclude = {}> extends CoreClientMethodOptions {
    transaction: Uint8Array;
    signatures: string[];
    include?: Include;
  }
  interface SignAndExecuteTransactionOptions<Include extends TransactionInclude = {}> extends CoreClientMethodOptions {
    transaction: Uint8Array | Transaction$1;
    signer: Signer;
    additionalSignatures?: string[];
    include?: Include;
  }
  interface SimulateTransactionOptions<Include extends SimulateTransactionInclude = {}> extends CoreClientMethodOptions {
    transaction: Uint8Array | Transaction$1;
    include?: Include;
  }
  interface GetReferenceGasPriceOptions extends CoreClientMethodOptions {}
  interface TransportMethods {
    getReferenceGasPrice?: (options?: GetReferenceGasPriceOptions) => Promise<GetReferenceGasPriceResponse>;
  }
  interface GetReferenceGasPriceResponse {
    referenceGasPrice: string;
  }
  interface GetCurrentSystemStateOptions extends CoreClientMethodOptions {}
  interface TransportMethods {
    getCurrentSystemState?: (options?: GetCurrentSystemStateOptions) => Promise<GetCurrentSystemStateResponse>;
  }
  interface GetCurrentSystemStateResponse {
    systemState: SystemStateInfo;
  }
  interface GetChainIdentifierOptions extends CoreClientMethodOptions {}
  interface TransportMethods {
    getChainIdentifier?: (options?: GetChainIdentifierOptions) => Promise<GetChainIdentifierResponse>;
  }
  /** The 32-byte genesis checkpoint digest (uniquely identifies the network), base58 encoded. */
  interface GetChainIdentifierResponse {
    chainIdentifier: string;
  }
  interface SystemStateInfo {
    systemStateVersion: string;
    epoch: string;
    protocolVersion: string;
    referenceGasPrice: string;
    epochStartTimestampMs: string;
    safeMode: boolean;
    safeModeStorageRewards: string;
    safeModeComputationRewards: string;
    safeModeStorageRebates: string;
    safeModeNonRefundableStorageFee: string;
    parameters: SystemParameters;
    storageFund: StorageFund;
    stakeSubsidy: StakeSubsidy;
  }
  interface SystemParameters {
    epochDurationMs: string;
    stakeSubsidyStartEpoch: string;
    maxValidatorCount: string;
    minValidatorJoiningStake: string;
    validatorLowStakeThreshold: string;
    validatorLowStakeGracePeriod: string;
  }
  interface StorageFund {
    totalObjectStorageRebates: string;
    nonRefundableBalance: string;
  }
  interface StakeSubsidy {
    balance: string;
    distributionCounter: string;
    currentDistributionAmount: string;
    stakeSubsidyPeriodLength: string;
    stakeSubsidyDecreaseRate: number;
  }
  /** ZkLogin methods */
  interface VerifyZkLoginSignatureOptions extends CoreClientMethodOptions {
    bytes: string;
    signature: string;
    intentScope: 'TransactionData' | 'PersonalMessage';
    address: string;
  }
  interface ZkLoginVerifyResponse {
    success: boolean;
    errors: string[];
  }
  interface TransportMethods {
    verifyZkLoginSignature: (options: VerifyZkLoginSignatureOptions) => Promise<ZkLoginVerifyResponse>;
  }
  /** Name service methods */
  interface DefaultNameServiceNameOptions extends CoreClientMethodOptions {
    address: string;
  }
  interface DefaultNameServiceNameResponse {
    data: {
      name: string | null;
    };
  }
  interface TransportMethods {
    defaultNameServiceName: (options: DefaultNameServiceNameOptions) => Promise<DefaultNameServiceNameResponse>;
  }
  /** MVR methods */
  interface TransportMethods {
    mvr: MvrMethods;
  }
  interface MvrMethods {
    resolvePackage: (options: MvrResolvePackageOptions) => Promise<MvrResolvePackageResponse>;
    resolveType: (options: MvrResolveTypeOptions) => Promise<MvrResolveTypeResponse>;
    resolve: (options: MvrResolveOptions) => Promise<MvrResolveResponse>;
  }
  interface MvrResolvePackageOptions extends CoreClientMethodOptions {
    package: string;
  }
  interface MvrResolveTypeOptions extends CoreClientMethodOptions {
    type: string;
  }
  interface MvrResolveOptions extends CoreClientMethodOptions {
    packages?: string[];
    types?: string[];
  }
  interface MvrResolvePackageResponse {
    package: string;
  }
  interface MvrResolveTypeResponse {
    type: string;
  }
  interface MvrResolveResponse {
    packages: Record<string, {
      package: string;
    }>;
    types: Record<string, {
      type: string;
    }>;
  }
  /** Move package methods */
  interface TransportMethods {
    getMoveFunction: (options: GetMoveFunctionOptions) => Promise<GetMoveFunctionResponse>;
  }
  interface GetMovePackageOptions extends CoreClientMethodOptions {
    packageId: string;
  }
  interface GetMovePackageResponse {
    package: PackageResponse;
  }
  interface PackageResponse {
    storageId: string;
    originalId: string;
    version: string;
    modules: ModuleResponse[];
  }
  interface ModuleResponse {
    name: string;
    datatypes: DatatypeResponse[];
    functions: FunctionResponse[];
  }
  type DatatypeResponse = {
    $kind: 'struct';
    typeName: string;
    definingId: string;
    moduleName: string;
    name: string;
    abilities: Ability[];
    typeParameters: TypeParameter[];
    fields: FieldDescriptor[];
  } | {
    $kind: 'enum';
    typeName: string;
    definingId: string;
    moduleName: string;
    name: string;
    abilities: Ability[];
    typeParameters: TypeParameter[];
    variants: VariantDescriptor[];
  };
  type Ability = 'copy' | 'drop' | 'store' | 'key' | 'unknown';
  type DatatypeKind = 'struct' | 'enum' | 'unknown';
  interface TypeParameter {
    constraints: Ability[];
    isPhantom: boolean;
  }
  interface FieldDescriptor {
    name: string;
    position: number;
    type: OpenSignatureBody;
  }
  interface VariantDescriptor {
    name: string;
    position: number;
    fields: FieldDescriptor[];
  }
  interface GetMoveFunctionOptions extends CoreClientMethodOptions {
    packageId: string;
    moduleName: string;
    name: string;
  }
  interface GetMoveFunctionResponse {
    function: FunctionResponse;
  }
  interface GetMoveDatatypeOptions extends CoreClientMethodOptions {
    packageId: string;
    moduleName: string;
    name: string;
  }
  interface GetMoveDatatypeResponse {
    datatype: DatatypeResponse;
  }
  type Visibility = 'public' | 'friend' | 'private' | 'unknown';
  interface FunctionResponse {
    packageId: string;
    moduleName: string;
    name: string;
    visibility: Visibility;
    isEntry: boolean;
    typeParameters: TypeParameter[];
    parameters: OpenSignature[];
    returns: OpenSignature[];
  }
  type ReferenceType = 'mutable' | 'immutable' | 'unknown';
  type OpenSignature = {
    reference: ReferenceType | null;
    body: OpenSignatureBody;
  };
  type OpenSignatureBody = {
    $kind: 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256' | 'bool' | 'address' | 'unknown';
  } | {
    $kind: 'vector';
    vector: OpenSignatureBody;
  } | {
    $kind: 'datatype';
    datatype: {
      typeName: string;
      typeParameters: OpenSignatureBody[];
    };
  } | {
    $kind: 'typeParameter';
    index: number;
  };
  /** ObjectOwner types */
  interface AddressOwner {
    $kind: 'AddressOwner';
    AddressOwner: string;
    ObjectOwner?: never;
    Shared?: never;
    Immutable?: never;
    ConsensusAddressOwner?: never;
  }
  interface ParentOwner {
    $kind: 'ObjectOwner';
    ObjectOwner: string;
    AddressOwner?: never;
    Shared?: never;
    Immutable?: never;
    ConsensusAddressOwner?: never;
  }
  interface SharedOwner {
    $kind: 'Shared';
    Shared: {
      initialSharedVersion: string;
    };
    AddressOwner?: never;
    ObjectOwner?: never;
    Immutable?: never;
    ConsensusAddressOwner?: never;
  }
  interface ImmutableOwner {
    $kind: 'Immutable';
    Immutable: true;
    AddressOwner?: never;
    ObjectOwner?: never;
    Shared?: never;
    ConsensusAddressOwner?: never;
  }
  interface ConsensusAddressOwner {
    $kind: 'ConsensusAddressOwner';
    ConsensusAddressOwner: {
      startVersion: string;
      owner: string;
    };
    AddressOwner?: never;
    ObjectOwner?: never;
    Shared?: never;
    Immutable?: never;
  }
  interface UnknownOwner {
    $kind: 'Unknown';
    AddressOwner?: never;
    ObjectOwner?: never;
    Shared?: never;
    Immutable?: never;
    ConsensusAddressOwner?: never;
  }
  type ObjectOwner = AddressOwner | ParentOwner | SharedOwner | ImmutableOwner | ConsensusAddressOwner | UnknownOwner;
  /** Effects */
  interface TransactionEffects {
    bcs: Uint8Array | null;
    version: number;
    status: ExecutionStatus;
    gasUsed: GasCostSummary;
    transactionDigest: string;
    gasObject: ChangedObject | null;
    eventsDigest: string | null;
    dependencies: string[];
    lamportVersion: string | null;
    changedObjects: ChangedObject[];
    unchangedConsensusObjects: UnchangedConsensusObject[];
    auxiliaryDataDigest: string | null;
  }
  interface ChangedObject {
    objectId: string;
    inputState: 'Unknown' | 'DoesNotExist' | 'Exists';
    inputVersion: string | null;
    inputDigest: string | null;
    inputOwner: ObjectOwner | null;
    outputState: 'Unknown' | 'DoesNotExist' | 'ObjectWrite' | 'PackageWrite' | 'AccumulatorWriteV1';
    outputVersion: string | null;
    outputDigest: string | null;
    outputOwner: ObjectOwner | null;
    idOperation: 'Unknown' | 'None' | 'Created' | 'Deleted';
  }
  interface GasCostSummary {
    computationCost: string;
    storageCost: string;
    storageRebate: string;
    nonRefundableStorageFee: string;
  }
  type ExecutionStatus = {
    success: true;
    error: null;
  } | {
    success: false;
    error: ExecutionError;
  };
  interface UnchangedConsensusObject {
    kind: 'Unknown' | 'ReadOnlyRoot' | 'MutateConsensusStreamEnded' | 'ReadConsensusStreamEnded' | 'Cancelled' | 'PerEpochConfig';
    objectId: string;
    version: string | null;
    digest: string | null;
  }
  interface Event {
    packageId: string;
    module: string;
    sender: string;
    eventType: string;
    bcs: Uint8Array;
  }
  interface MoveAbort {
    abortCode: string;
    location?: MoveLocation;
    cleverError?: CleverError;
  }
  interface MoveLocation {
    package?: string;
    module?: string;
    function?: number;
    functionName?: string;
    instruction?: number;
  }
  interface CleverError {
    errorCode?: number;
    lineNumber?: number;
    constantName?: string;
    constantType?: string;
    value?: string;
  }
  interface SizeError {
    name: string;
    size: number;
    maxSize: number;
  }
  interface CommandArgumentError {
    argument: number;
    name: string;
  }
  interface TypeArgumentError {
    typeArgument: number;
    name: string;
  }
  interface PackageUpgradeError {
    name: string;
    packageId?: string;
    digest?: string;
  }
  interface CoinDenyListError {
    name: string;
    coinType: string;
    address?: string;
  }
  interface CongestedObjects {
    name: string;
    objects: string[];
  }
  interface IndexError {
    index?: number;
    subresult?: number;
  }
  interface ObjectIdError {
    name?: string;
    objectId: string;
  }
  type ExecutionError = {
    message: string;
    command?: number;
  } & EnumOutputShape<{
    MoveAbort: MoveAbort;
    SizeError: SizeError;
    CommandArgumentError: CommandArgumentError;
    TypeArgumentError: TypeArgumentError;
    PackageUpgradeError: PackageUpgradeError;
    IndexError: IndexError;
    CoinDenyListError: CoinDenyListError;
    CongestedObjects: CongestedObjects;
    ObjectIdError: ObjectIdError;
    Unknown: null;
  }>;
}
//#endregion
export { ClientWithExtensions, SuiClientRegistration, SuiClientTypes };
//# sourceMappingURL=types.d.mts.map