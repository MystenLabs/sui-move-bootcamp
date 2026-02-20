import { ClientCache } from "./cache.mjs";
import { ClientWithExtensions, SuiClientRegistration, SuiClientTypes } from "./types.mjs";
import { CoreClient } from "./core.mjs";
import { Simplify, UnionToIntersection } from "@mysten/utils";

//#region src/client/client.d.ts
declare abstract class BaseClient {
  network: SuiClientTypes.Network;
  cache: ClientCache;
  base: BaseClient;
  constructor({
    network,
    base,
    cache
  }: SuiClientTypes.SuiClientOptions);
  abstract core: CoreClient;
  $extend<const Registrations extends SuiClientRegistration<this>[]>(...registrations: Registrations): ClientWithExtensions<Simplify<UnionToIntersection<{ [K in keyof Registrations]: Registrations[K] extends SuiClientRegistration<this, infer Name extends string, infer Extension> ? { [K2 in Name]: Extension } : never }[number]>>, this>;
}
//#endregion
export { BaseClient };
//# sourceMappingURL=client.d.mts.map