import { bcs as suiBcs } from "../bcs/index.mjs";
import { SuiClientTypes } from "../client/types.mjs";
import { TransactionPlugin } from "./resolve.mjs";

//#region src/transactions/ObjectCache.d.ts
interface ObjectCacheEntry {
  objectId: string;
  version: string;
  digest: string;
  owner: string | null;
  initialSharedVersion: string | null;
}
interface MoveFunctionCacheEntry {
  package: string;
  module: string;
  function: string;
  parameters: SuiClientTypes.OpenSignature[];
}
interface CacheEntryTypes {
  OwnedObject: ObjectCacheEntry;
  SharedOrImmutableObject: ObjectCacheEntry;
  MoveFunction: MoveFunctionCacheEntry;
  Custom: unknown;
}
declare abstract class AsyncCache {
  protected abstract get<T extends keyof CacheEntryTypes>(type: T, key: string): Promise<CacheEntryTypes[T] | null>;
  protected abstract set<T extends keyof CacheEntryTypes>(type: T, key: string, value: CacheEntryTypes[T]): Promise<void>;
  protected abstract delete<T extends keyof CacheEntryTypes>(type: T, key: string): Promise<void>;
  abstract clear<T extends keyof CacheEntryTypes>(type?: T): Promise<void>;
  getObject(id: string): Promise<ObjectCacheEntry | null>;
  getObjects(ids: string[]): Promise<(ObjectCacheEntry | null)[]>;
  addObject(object: ObjectCacheEntry): Promise<ObjectCacheEntry>;
  addObjects(objects: ObjectCacheEntry[]): Promise<void>;
  deleteObject(id: string): Promise<void>;
  deleteObjects(ids: string[]): Promise<void>;
  getMoveFunctionDefinition(ref: {
    package: string;
    module: string;
    function: string;
  }): Promise<MoveFunctionCacheEntry | null>;
  addMoveFunctionDefinition(functionEntry: MoveFunctionCacheEntry): Promise<{
    package: string;
    module: string;
    function: string;
    parameters: SuiClientTypes.OpenSignature[];
  }>;
  deleteMoveFunctionDefinition(ref: {
    package: string;
    module: string;
    function: string;
  }): Promise<void>;
  getCustom<T>(key: string): Promise<T | null>;
  setCustom<T>(key: string, value: T): Promise<void>;
  deleteCustom(key: string): Promise<void>;
}
interface ObjectCacheOptions {
  cache?: AsyncCache;
  onEffects?: (effects: typeof suiBcs.TransactionEffects.$inferType) => Promise<void>;
}
declare class ObjectCache {
  #private;
  constructor({
    cache,
    onEffects
  }: ObjectCacheOptions);
  asPlugin(): TransactionPlugin;
  clear(): Promise<void>;
  getMoveFunctionDefinition(ref: {
    package: string;
    module: string;
    function: string;
  }): Promise<MoveFunctionCacheEntry | null>;
  getObjects(ids: string[]): Promise<(ObjectCacheEntry | null)[]>;
  deleteObjects(ids: string[]): Promise<void>;
  clearOwnedObjects(): Promise<void>;
  clearCustom(): Promise<void>;
  getCustom<T>(key: string): Promise<T | null>;
  setCustom<T>(key: string, value: T): Promise<void>;
  deleteCustom(key: string): Promise<void>;
  applyEffects(effects: typeof suiBcs.TransactionEffects.$inferType): Promise<void>;
}
//#endregion
export { AsyncCache, ObjectCache, ObjectCacheOptions };
//# sourceMappingURL=ObjectCache.d.mts.map