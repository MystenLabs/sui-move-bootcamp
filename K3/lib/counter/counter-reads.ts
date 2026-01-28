import clientConfig from '@/lib/env-config-client';
import { COUNTER_QUERY_KEYS } from '@/lib/query-keys';
import { useSuiClient } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui/client';
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
  client: SuiClient,
  objectId: string,
): Promise<CounterData | null> {
  try {
    const objectResponse = await client.getObject({
      id: objectId,
      options: {
        showContent: true,
      },
    });

    if (!objectResponse.data) {
      return null;
    }

    if (objectResponse.data.content?.dataType !== 'moveObject') {
      return null;
    }

    const moveObject = objectResponse.data.content;

    // Verify this is a Counter object
    if (!moveObject.type?.includes('counter::Counter')) {
      return null;
    }

    const fields = moveObject.fields as {
      id: { id: string };
      value: string | bigint;
    };

    return {
      id: objectId,
      value: typeof fields.value === 'string' ? BigInt(fields.value) : fields.value,
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
  const client = useSuiClient();

  return useQuery({
    queryKey: COUNTER_QUERY_KEYS.value(objectId),
    queryFn: () => {
      if (!client) {
        throw new Error('SuiClient not initialized');
      }
      return getCounterById(client, objectId);
    },
    refetchInterval: 5000, // Refetch every 5 seconds to see updates
  });
};

/**
 * Fetches Incremented and Decremented events for the counter
 * @param client - The Sui client instance
 * @param packageAddress - The package address
 * @param limit - Maximum number of events to fetch
 * @returns Array of counter events
 */
export async function getCounterEvents(
  client: SuiClient,
  packageAddress: string,
  limit: number = 20,
): Promise<CounterEvent[]> {
  const events: CounterEvent[] = [];

  // Fetch Incremented events
  const incrementedEvents = await client.queryEvents({
    query: {
      MoveEventType: `${packageAddress}::counter::Incremented`,
    },
    limit,
    order: 'descending',
  });

  for (const event of incrementedEvents.data) {
    const parsedJson = event.parsedJson as {
      by: string;
      note: string;
      new_value: string;
    };

    events.push({
      id: event.id.txDigest + '-' + event.id.eventSeq,
      type: 'increment',
      by: parsedJson.by,
      note: parsedJson.note,
      newValue: BigInt(parsedJson.new_value),
      timestamp: event.timestampMs ?? undefined,
    });
  }

  // Fetch Decremented events
  const decrementedEvents = await client.queryEvents({
    query: {
      MoveEventType: `${packageAddress}::counter::Decremented`,
    },
    limit,
    order: 'descending',
  });

  for (const event of decrementedEvents.data) {
    const parsedJson = event.parsedJson as {
      by: string;
      note: string;
      new_value: string;
    };

    events.push({
      id: event.id.txDigest + '-' + event.id.eventSeq,
      type: 'decrement',
      by: parsedJson.by,
      note: parsedJson.note,
      newValue: BigInt(parsedJson.new_value),
      timestamp: event.timestampMs ?? undefined,
    });
  }

  // Sort by timestamp descending
  events.sort((a, b) => {
    const timeA = a.timestamp ? Number(a.timestamp) : 0;
    const timeB = b.timestamp ? Number(b.timestamp) : 0;
    return timeB - timeA;
  });

  return events.slice(0, limit);
}

/**
 * React Query hook for fetching counter events
 */
export const useCounterEvents = (limit: number = 10) => {
  const client = useSuiClient();
  const packageAddress = clientConfig.NEXT_PUBLIC_PACKAGE_ADDRESS;

  return useQuery({
    queryKey: COUNTER_QUERY_KEYS.events(),
    queryFn: () => {
      if (!client) {
        throw new Error('SuiClient not initialized');
      }
      return getCounterEvents(client, packageAddress, limit);
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};
