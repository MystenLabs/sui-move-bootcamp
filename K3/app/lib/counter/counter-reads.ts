import clientConfig from '@/lib/env-config-client';
import { COUNTER_QUERY_KEYS } from '@/lib/query-keys';
import { createSuiGraphQLClient } from '@/lib/sui-graphql-client';
import type { SuiNetworkName } from '@/lib/sui-grpc-client';
import type { ClientWithCoreApi } from '@mysten/dapp-kit-core';
import { useCurrentClient, useCurrentNetwork } from '@mysten/dapp-kit-react';
import type { SuiGraphQLClient } from '@mysten/sui/graphql';
import { useQuery } from '@tanstack/react-query';

/**
 * Counter data structure returned from reading the object
 */
export interface CounterData {
  id: string;
  value: bigint;
}

/**
 * Event data for increment/decrement operations
 */
export interface CounterEvent {
  id: string;
  type: 'increment' | 'decrement';
  by: string;
  note: string;
  newValue: bigint;
  timestamp?: string;
}

/**
 * Retrieves the Counter object from the Sui blockchain
 * @param client - The Sui client instance
 * @param objectId - The Counter object ID
 * @returns The deserialized counter data
 */
export async function getCounterById(
  client: ClientWithCoreApi,
  objectId: string,
): Promise<CounterData | null> {
  try {
    const objectResponse = await client.core.getObject({
      objectId,
      include: { json: true },
    });

    const object = objectResponse.object;
    if (!object) {
      return null;
    }

    // Verify this is a Counter object
    if (!object.type?.includes('counter::Counter')) {
      return null;
    }

    const json = object.json;
    if (!json || typeof json !== 'object') {
      return null;
    }

    const valueRaw = (json as Record<string, unknown>).value;
    if (
      typeof valueRaw !== 'string' &&
      typeof valueRaw !== 'number' &&
      typeof valueRaw !== 'bigint'
    ) {
      return null;
    }

    return {
      id: objectId,
      value: BigInt(valueRaw),
    };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes('not found') ||
        error.message.includes('does not exist'))
    ) {
      return null;
    }
    throw error;
  }
}

/**
 * React Query hook for fetching counter data
 */
export const useCounterById = (objectId: string) => {
  const client = useCurrentClient();

  return useQuery({
    queryKey: COUNTER_QUERY_KEYS.value(objectId),
    queryFn: () => getCounterById(client, objectId),
    refetchInterval: 5000, // Refetch every 5 seconds to see updates
  });
};

const COUNTER_EVENTS_QUERY = `
  query CounterEvents($module: String!, $last: Int!) {
    events(filter: { module: $module }, last: $last) {
      nodes {
        sequenceNumber
        timestamp
        sender {
          address
        }
        transaction {
          digest
        }
        contents {
          json
          type {
            repr
          }
        }
      }
    }
  }
`;

type CounterEventsQueryResult = {
  events?: {
    nodes: Array<{
      sequenceNumber: number;
      timestamp?: string | null;
      sender?: { address: string } | null;
      transaction?: { digest: string } | null;
      contents?: {
        json?: unknown;
        type?: { repr: string } | null;
      } | null;
    }>;
  } | null;
};

/**
 * Fetches Incremented and Decremented events for the counter
 * @param client - The Sui client instance
 * @param packageAddress - The package address
 * @param limit - Maximum number of events to fetch
 * @returns Array of counter events
 */
export async function getCounterEvents(
  client: SuiGraphQLClient,
  packageAddress: string,
  limit: number = 20,
): Promise<CounterEvent[]> {
  const moduleFilter = `${packageAddress}::counter`;
  const response = await client.query<CounterEventsQueryResult>({
    query: COUNTER_EVENTS_QUERY,
    variables: {
      module: moduleFilter,
      last: limit,
    },
  });

  const events: CounterEvent[] = [];
  const nodes = response.data?.events?.nodes ?? [];

  for (const event of nodes) {
    const typeRepr = event.contents?.type?.repr ?? '';
    const isIncrement = typeRepr.includes('::Incremented');
    const isDecrement = typeRepr.includes('::Decremented');

    if (!isIncrement && !isDecrement) {
      continue;
    }

    const parsedJson = (event.contents?.json ?? {}) as Record<string, unknown>;
    const by =
      typeof parsedJson.by === 'string'
        ? parsedJson.by
        : (event.sender?.address ?? '');
    const note = typeof parsedJson.note === 'string' ? parsedJson.note : '';
    const newValueRaw = parsedJson.new_value;
    const newValue =
      typeof newValueRaw === 'string' ||
      typeof newValueRaw === 'number' ||
      typeof newValueRaw === 'bigint'
        ? BigInt(newValueRaw)
        : BigInt(0);
    const digest = event.transaction?.digest ?? 'unknown';

    events.push({
      id: `${digest}-${event.sequenceNumber}`,
      type: isIncrement ? 'increment' : 'decrement',
      by,
      note,
      newValue,
      timestamp: event.timestamp ?? undefined,
    });
  }

  // `last` returns the latest N events, but keeps connection order.
  // Reverse so the newest activity appears first in the UI.
  return events.reverse();
}

/**
 * React Query hook for fetching counter events
 */
export const useCounterEvents = (limit: number = 10) => {
  const network = useCurrentNetwork();
  const packageAddress = clientConfig.NEXT_PUBLIC_PACKAGE_ADDRESS;

  return useQuery({
    queryKey: COUNTER_QUERY_KEYS.events(network, packageAddress, limit),
    queryFn: () => {
      const client = createSuiGraphQLClient(network as SuiNetworkName);
      return getCounterEvents(client, packageAddress, limit);
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};

/**
 * gRPC balance query hook for connected wallet address.
 */
export const useSuiBalanceGrpc = (owner?: string) => {
  const client = useCurrentClient();
  const network = useCurrentNetwork();

  return useQuery({
    queryKey: ['sui-balance', network, owner],
    enabled: Boolean(owner),
    queryFn: async () => {
      if (!owner) {
        throw new Error('Owner is required');
      }
      const response = await client.core.getBalance({
        owner,
        coinType: '0x2::sui::SUI',
      });
      return {
        totalBalance:
          response.balance.balance ??
          response.balance.coinBalance ??
          response.balance.addressBalance,
      };
    },
    refetchInterval: 5000,
  });
};
