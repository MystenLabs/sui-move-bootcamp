//#region src/client/cache.d.ts
interface ClientCacheOptions {
  prefix?: string[];
  cache?: Map<string, unknown>;
}
declare class ClientCache {
  #private;
  constructor({
    prefix,
    cache
  }?: ClientCacheOptions);
  read<T>(key: [string, ...string[]], load: () => T | Promise<T>): T | Promise<T>;
  readSync<T>(key: [string, ...string[]], load: () => T): T;
  clear(prefix?: string[]): void;
  scope(prefix: string | string[]): ClientCache;
}
//#endregion
export { ClientCache, ClientCacheOptions };
//# sourceMappingURL=cache.d.mts.map