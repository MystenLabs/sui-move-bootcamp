export const COUNTER_QUERY_KEYS = {
  base: ['counter'],
  value: (objectId: string) => [...COUNTER_QUERY_KEYS.base, 'value', objectId],
  eventsBase: () => [...COUNTER_QUERY_KEYS.base, 'events'],
  events: (network: string, packageAddress: string, limit: number) => [
    ...COUNTER_QUERY_KEYS.eventsBase(),
    network,
    packageAddress,
    limit,
  ],
};
