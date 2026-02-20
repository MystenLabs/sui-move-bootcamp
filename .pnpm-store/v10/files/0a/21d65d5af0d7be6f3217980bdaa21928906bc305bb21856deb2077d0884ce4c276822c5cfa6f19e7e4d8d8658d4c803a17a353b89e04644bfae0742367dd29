//#region src/client/cache.ts
var ClientCache = class ClientCache {
	#prefix;
	#cache;
	constructor({ prefix, cache } = {}) {
		this.#prefix = prefix ?? [];
		this.#cache = cache ?? /* @__PURE__ */ new Map();
	}
	read(key, load) {
		const cacheKey = [this.#prefix, ...key].join(":");
		if (this.#cache.has(cacheKey)) return this.#cache.get(cacheKey);
		const result = load();
		this.#cache.set(cacheKey, result);
		if (typeof result === "object" && result !== null && "then" in result) return Promise.resolve(result).then((v) => {
			this.#cache.set(cacheKey, v);
			return v;
		}).catch((err) => {
			this.#cache.delete(cacheKey);
			throw err;
		});
		return result;
	}
	readSync(key, load) {
		const cacheKey = [this.#prefix, ...key].join(":");
		if (this.#cache.has(cacheKey)) return this.#cache.get(cacheKey);
		const result = load();
		this.#cache.set(cacheKey, result);
		return result;
	}
	clear(prefix) {
		const prefixKey = [...this.#prefix, ...prefix ?? []].join(":");
		if (!prefixKey) {
			this.#cache.clear();
			return;
		}
		for (const key of this.#cache.keys()) if (key.startsWith(prefixKey)) this.#cache.delete(key);
	}
	scope(prefix) {
		return new ClientCache({
			prefix: [...this.#prefix, ...Array.isArray(prefix) ? prefix : [prefix]],
			cache: this.#cache
		});
	}
};

//#endregion
export { ClientCache };
//# sourceMappingURL=cache.mjs.map