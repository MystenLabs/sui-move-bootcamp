//#region src/dataloader.d.ts
/**
 * DataLoader - A generic utility for batching and caching data fetches.
 *
 * Vendored from: https://github.com/graphql/dataloader
 * Commit: a10773043d41a56bde4219c155fcf5633e6c9bcb
 * License: MIT
 * Copyright (c) GraphQL Contributors
 */
/**
 * A `DataLoader` creates a public API for loading data from a particular
 * data back-end with unique keys such as the `id` column of a SQL table or
 * document name in a MongoDB database, given a batch loading function.
 *
 * Each `DataLoader` instance contains a unique memoized cache. Use caution when
 * used in long-lived applications or those which serve many users with
 * different access permissions and consider creating a new instance per
 * web request.
 */
declare class DataLoader<K, V, C = K> {
  constructor(batchLoadFn: DataLoader.BatchLoadFn<K, V>, options?: DataLoader.Options<K, V, C>);
  _batchLoadFn: DataLoader.BatchLoadFn<K, V>;
  _maxBatchSize: number;
  _batchScheduleFn: (cb: () => void) => void;
  _cacheKeyFn: (key: K) => C;
  _cacheMap: DataLoader.CacheMap<C, Promise<V>> | null;
  _batch: Batch<K, V> | null;
  /**
   * Loads a key, returning a `Promise` for the value represented by that key.
   */
  load(key: K): Promise<V>;
  /**
   * Loads multiple keys, promising an array of values:
   *
   *     var [ a, b ] = await myLoader.loadMany([ 'a', 'b' ]);
   *
   * This is similar to the more verbose:
   *
   *     var [ a, b ] = await Promise.all([
   *       myLoader.load('a'),
   *       myLoader.load('b')
   *     ]);
   *
   * However it is different in the case where any load fails. Where
   * Promise.all() would reject, loadMany() always resolves, however each result
   * is either a value or an Error instance.
   *
   *     var [ a, b, c ] = await myLoader.loadMany([ 'a', 'b', 'badkey' ]);
   *     // c instanceof Error
   *
   */
  loadMany(keys: ReadonlyArray<K>): Promise<Array<V | Error>>;
  /**
   * Clears the value at `key` from the cache, if it exists. Returns itself for
   * method chaining.
   */
  clear(key: K): this;
  /**
   * Clears the entire cache. To be used when some event results in unknown
   * invalidations across this particular `DataLoader`. Returns itself for
   * method chaining.
   */
  clearAll(): this;
  /**
   * Adds the provided key and value to the cache. If the key already
   * exists, no change is made. Returns itself for method chaining.
   *
   * To prime the cache with an error at a key, provide an Error instance.
   */
  prime(key: K, value: V | Promise<V> | Error): this;
  /**
   * The name given to this `DataLoader` instance. Useful for APM tools.
   *
   * Is `null` if not set in the constructor.
   */
  name: string | null;
}
type Batch<K, V> = {
  hasDispatched: boolean;
  keys: Array<K>;
  callbacks: Array<{
    resolve: (value: V) => void;
    reject: (error: Error) => void;
  }>;
  cacheHits?: Array<() => void>;
};
declare namespace DataLoader {
  type CacheMap<K, V> = {
    get(key: K): V | void;
    set(key: K, value: V): any;
    delete(key: K): any;
    clear(): any;
  };
  type BatchLoadFn<K, V> = (keys: ReadonlyArray<K>) => PromiseLike<ArrayLike<V | Error>>;
  type Options<K, V, C = K> = {
    /**
     * Default `true`. Set to `false` to disable batching, invoking
     * `batchLoadFn` with a single load key. This is equivalent to setting
     * `maxBatchSize` to `1`.
     */
    batch?: boolean;
    /**
     * Default `Infinity`. Limits the number of items that get passed in to the
     * `batchLoadFn`. May be set to `1` to disable batching.
     */
    maxBatchSize?: number;
    /**
     * Default see https://github.com/graphql/dataloader#batch-scheduling.
     * A function to schedule the later execution of a batch. The function is
     * expected to call the provided callback in the immediate future.
     */
    batchScheduleFn?: (callback: () => void) => void;
    /**
     * Default `true`. Set to `false` to disable memoization caching, creating a
     * new Promise and new key in the `batchLoadFn` for every load of the same
     * key. This is equivalent to setting `cacheMap` to `null`.
     */
    cache?: boolean;
    /**
     * Default `key => key`. Produces cache key for a given load key. Useful
     * when keys are objects and two objects should be considered equivalent.
     */
    cacheKeyFn?: (key: K) => C;
    /**
     * Default `new Map()`. Instance of `Map` (or an object with a similar API)
     * to be used as cache. May be set to `null` to disable caching.
     */
    cacheMap?: CacheMap<C, Promise<V>> | null;
    /**
     * The name given to this `DataLoader` instance. Useful for APM tools.
     *
     * Is `null` if not set in the constructor.
     */
    name?: string | null;
  };
}
//#endregion
export { DataLoader };
//# sourceMappingURL=dataloader.d.mts.map