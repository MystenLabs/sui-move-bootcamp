import { ClientCache } from "./cache.mjs";

//#region src/client/client.ts
var BaseClient = class {
	constructor({ network, base, cache = base?.cache ?? new ClientCache() }) {
		this.network = network;
		this.base = base ?? this;
		this.cache = cache;
	}
	$extend(...registrations) {
		const extensions = Object.fromEntries(registrations.map((registration) => {
			return [registration.name, registration.register(this)];
		}));
		const methodCache = /* @__PURE__ */ new Map();
		return new Proxy(this, { get(target, prop, receiver) {
			if (typeof prop === "string" && prop in extensions) return extensions[prop];
			const value = Reflect.get(target, prop, receiver);
			if (typeof value === "function") {
				if (prop === "$extend") return value.bind(receiver);
				if (!methodCache.has(prop)) methodCache.set(prop, value.bind(target));
				return methodCache.get(prop);
			}
			return value;
		} });
	}
};

//#endregion
export { BaseClient };
//# sourceMappingURL=client.mjs.map