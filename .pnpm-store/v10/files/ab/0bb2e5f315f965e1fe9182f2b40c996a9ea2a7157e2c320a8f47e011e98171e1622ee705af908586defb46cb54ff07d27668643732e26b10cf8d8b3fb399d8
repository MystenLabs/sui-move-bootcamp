import { SuiClientTypes } from "../client/types.mjs";
import { TransactionPlugin } from "../transactions/resolve.mjs";
import "../transactions/index.mjs";
import { BaseClient } from "../client/client.mjs";
import "../client/index.mjs";
import { GraphQLCoreClient } from "./core.mjs";
import { TypedDocumentString } from "./generated/queries.mjs";
import { DocumentNode } from "graphql";
import { TadaDocumentNode } from "gql.tada";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

//#region src/graphql/client.d.ts
type GraphQLDocument<Result = Record<string, unknown>, Variables = Record<string, unknown>> = string | DocumentNode | TypedDocumentString<Result, Variables> | TypedDocumentNode<Result, Variables> | TadaDocumentNode<Result, Variables>;
type GraphQLQueryOptions<Result = Record<string, unknown>, Variables = Record<string, unknown>> = {
  query: GraphQLDocument<Result, Variables>;
  operationName?: string;
  extensions?: Record<string, unknown>;
  signal?: AbortSignal;
} & (Variables extends {
  [key: string]: never;
} ? {
  variables?: Variables;
} : {
  variables: Variables;
});
type GraphQLQueryResult<Result = Record<string, unknown>> = {
  data?: Result;
  errors?: GraphQLResponseErrors;
  extensions?: Record<string, unknown>;
};
type GraphQLResponseErrors = Array<{
  message: string;
  locations?: {
    line: number;
    column: number;
  }[];
  path?: (string | number)[];
}>;
interface SuiGraphQLClientOptions<Queries extends Record<string, GraphQLDocument>> {
  url: string;
  fetch?: typeof fetch;
  headers?: Record<string, string>;
  queries?: Queries;
  network: SuiClientTypes.Network;
  mvr?: SuiClientTypes.MvrOptions;
}
declare class SuiGraphQLRequestError extends Error {}
declare const SUI_CLIENT_BRAND: never;
declare function isSuiGraphQLClient(client: unknown): client is SuiGraphQLClient;
declare class SuiGraphQLClient<Queries extends Record<string, GraphQLDocument> = {}> extends BaseClient implements SuiClientTypes.TransportMethods {
  #private;
  [SUI_CLIENT_BRAND]: boolean;
  core: GraphQLCoreClient;
  get mvr(): SuiClientTypes.MvrMethods;
  constructor({
    url,
    fetch: fetchFn,
    headers,
    queries,
    network,
    mvr
  }: SuiGraphQLClientOptions<Queries>);
  query<Result = Record<string, unknown>, Variables = Record<string, unknown>>(options: GraphQLQueryOptions<Result, Variables>): Promise<GraphQLQueryResult<Result>>;
  execute<const Query extends Extract<keyof Queries, string>, Result = (Queries[Query] extends GraphQLDocument<infer R, unknown> ? R : Record<string, unknown>), Variables = (Queries[Query] extends GraphQLDocument<unknown, infer V> ? V : Record<string, unknown>)>(query: Query, options: Omit<GraphQLQueryOptions<Result, Variables>, 'query'>): Promise<GraphQLQueryResult<Result>>;
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
export { GraphQLDocument, GraphQLQueryOptions, GraphQLQueryResult, GraphQLResponseErrors, SuiGraphQLClient, SuiGraphQLClientOptions, SuiGraphQLRequestError, isSuiGraphQLClient };
//# sourceMappingURL=client.d.mts.map