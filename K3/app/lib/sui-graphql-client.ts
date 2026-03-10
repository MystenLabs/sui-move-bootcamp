import { SuiGraphQLClient } from '@mysten/sui/graphql';
import type { SuiNetworkName } from './sui-grpc-client';

const graphqlClientCache = new Map<SuiNetworkName, SuiGraphQLClient>();
const GRAPHQL_URLS: Record<SuiNetworkName, string> = {
  mainnet: 'https://graphql.mainnet.sui.io/graphql',
  testnet: 'https://graphql.testnet.sui.io/graphql',
  devnet: 'https://graphql.devnet.sui.io/graphql',
};

/**
 * Creates a cached Sui GraphQL client for the given network.
 * We derive the endpoint from the network's fullnode base URL.
 */
export function createSuiGraphQLClient(network: SuiNetworkName): SuiGraphQLClient {
  let client = graphqlClientCache.get(network);
  if (!client) {
    client = new SuiGraphQLClient({
      network,
      url: GRAPHQL_URLS[network],
    });
    graphqlClientCache.set(network, client);
  }
  return client;
}
