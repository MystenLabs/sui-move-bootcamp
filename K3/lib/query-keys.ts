export const COUNTER_QUERY_KEYS = {
  base: ['counter'],
  value: (objectId: string) => [...COUNTER_QUERY_KEYS.base, 'value', objectId],
  events: () => [...COUNTER_QUERY_KEYS.base, 'events'],
};
