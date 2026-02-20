import { normalizeSuiAddress } from "../utils/sui-types.mjs";

//#region src/transactions/ObjectCache.ts
var AsyncCache = class {
	async getObject(id) {
		const [owned, shared] = await Promise.all([this.get("OwnedObject", id), this.get("SharedOrImmutableObject", id)]);
		return owned ?? shared ?? null;
	}
	async getObjects(ids) {
		return Promise.all(ids.map((id) => this.getObject(id)));
	}
	async addObject(object) {
		if (object.owner) await this.set("OwnedObject", object.objectId, object);
		else await this.set("SharedOrImmutableObject", object.objectId, object);
		return object;
	}
	async addObjects(objects) {
		await Promise.all(objects.map(async (object) => this.addObject(object)));
	}
	async deleteObject(id) {
		await Promise.all([this.delete("OwnedObject", id), this.delete("SharedOrImmutableObject", id)]);
	}
	async deleteObjects(ids) {
		await Promise.all(ids.map((id) => this.deleteObject(id)));
	}
	async getMoveFunctionDefinition(ref) {
		const functionName = `${normalizeSuiAddress(ref.package)}::${ref.module}::${ref.function}`;
		return this.get("MoveFunction", functionName);
	}
	async addMoveFunctionDefinition(functionEntry) {
		const pkg = normalizeSuiAddress(functionEntry.package);
		const functionName = `${pkg}::${functionEntry.module}::${functionEntry.function}`;
		const entry = {
			...functionEntry,
			package: pkg
		};
		await this.set("MoveFunction", functionName, entry);
		return entry;
	}
	async deleteMoveFunctionDefinition(ref) {
		const functionName = `${normalizeSuiAddress(ref.package)}::${ref.module}::${ref.function}`;
		await this.delete("MoveFunction", functionName);
	}
	async getCustom(key) {
		return this.get("Custom", key);
	}
	async setCustom(key, value) {
		return this.set("Custom", key, value);
	}
	async deleteCustom(key) {
		return this.delete("Custom", key);
	}
};
var InMemoryCache = class extends AsyncCache {
	#caches = {
		OwnedObject: /* @__PURE__ */ new Map(),
		SharedOrImmutableObject: /* @__PURE__ */ new Map(),
		MoveFunction: /* @__PURE__ */ new Map(),
		Custom: /* @__PURE__ */ new Map()
	};
	async get(type, key) {
		return this.#caches[type].get(key) ?? null;
	}
	async set(type, key, value) {
		this.#caches[type].set(key, value);
	}
	async delete(type, key) {
		this.#caches[type].delete(key);
	}
	async clear(type) {
		if (type) this.#caches[type].clear();
		else for (const cache of Object.values(this.#caches)) cache.clear();
	}
};
var ObjectCache = class {
	#cache;
	#onEffects;
	constructor({ cache = new InMemoryCache(), onEffects }) {
		this.#cache = cache;
		this.#onEffects = onEffects;
	}
	asPlugin() {
		return async (transactionData, _options, next) => {
			const unresolvedObjects = transactionData.inputs.filter((input) => input.UnresolvedObject).map((input) => input.UnresolvedObject.objectId);
			const cached = (await this.#cache.getObjects(unresolvedObjects)).filter((obj) => obj !== null);
			const byId = new Map(cached.map((obj) => [obj.objectId, obj]));
			for (const input of transactionData.inputs) {
				if (!input.UnresolvedObject) continue;
				const cached$1 = byId.get(input.UnresolvedObject.objectId);
				if (!cached$1) continue;
				if (cached$1.initialSharedVersion && !input.UnresolvedObject.initialSharedVersion) input.UnresolvedObject.initialSharedVersion = cached$1.initialSharedVersion;
				else {
					if (cached$1.version && !input.UnresolvedObject.version) input.UnresolvedObject.version = cached$1.version;
					if (cached$1.digest && !input.UnresolvedObject.digest) input.UnresolvedObject.digest = cached$1.digest;
				}
			}
			await Promise.all(transactionData.commands.map(async (commands) => {
				if (commands.MoveCall) {
					const def = await this.getMoveFunctionDefinition({
						package: commands.MoveCall.package,
						module: commands.MoveCall.module,
						function: commands.MoveCall.function
					});
					if (def) commands.MoveCall._argumentTypes = def.parameters;
				}
			}));
			await next();
			await Promise.all(transactionData.commands.map(async (commands) => {
				if (commands.MoveCall?._argumentTypes) await this.#cache.addMoveFunctionDefinition({
					package: commands.MoveCall.package,
					module: commands.MoveCall.module,
					function: commands.MoveCall.function,
					parameters: commands.MoveCall._argumentTypes
				});
			}));
		};
	}
	async clear() {
		await this.#cache.clear();
	}
	async getMoveFunctionDefinition(ref) {
		return this.#cache.getMoveFunctionDefinition(ref);
	}
	async getObjects(ids) {
		return this.#cache.getObjects(ids);
	}
	async deleteObjects(ids) {
		return this.#cache.deleteObjects(ids);
	}
	async clearOwnedObjects() {
		await this.#cache.clear("OwnedObject");
	}
	async clearCustom() {
		await this.#cache.clear("Custom");
	}
	async getCustom(key) {
		return this.#cache.getCustom(key);
	}
	async setCustom(key, value) {
		return this.#cache.setCustom(key, value);
	}
	async deleteCustom(key) {
		return this.#cache.deleteCustom(key);
	}
	async applyEffects(effects) {
		if (!effects.V2) throw new Error(`Unsupported transaction effects version ${effects.$kind}`);
		const { lamportVersion, changedObjects } = effects.V2;
		const deletedIds = [];
		const addedObjects = [];
		changedObjects.forEach(([id, change]) => {
			if (change.outputState.NotExist) deletedIds.push(id);
			else if (change.outputState.ObjectWrite) {
				const [digest, owner] = change.outputState.ObjectWrite;
				addedObjects.push({
					objectId: id,
					digest,
					version: lamportVersion,
					owner: owner.AddressOwner ?? owner.ObjectOwner ?? null,
					initialSharedVersion: owner.Shared?.initialSharedVersion ?? null
				});
			}
		});
		await Promise.all([
			this.#cache.addObjects(addedObjects),
			this.#cache.deleteObjects(deletedIds),
			this.#onEffects?.(effects)
		]);
	}
};

//#endregion
export { AsyncCache, ObjectCache };
//# sourceMappingURL=ObjectCache.mjs.map