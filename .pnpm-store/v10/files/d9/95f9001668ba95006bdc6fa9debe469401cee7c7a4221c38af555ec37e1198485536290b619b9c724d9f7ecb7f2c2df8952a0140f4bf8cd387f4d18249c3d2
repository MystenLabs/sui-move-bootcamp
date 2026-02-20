import { isValidNamedPackage, isValidNamedType } from "../utils/move-registry.mjs";
import { isValidSuiAddress, normalizeStructTag, normalizeSuiAddress, parseStructTag } from "../utils/sui-types.mjs";
import { PACKAGE_VERSION } from "../version.mjs";
import { DataLoader, chunk } from "@mysten/utils";

//#region src/client/mvr.ts
const NAME_SEPARATOR = "/";
const MVR_API_HEADER = { "Mvr-Source": `@mysten/sui@${PACKAGE_VERSION}` };
var MvrClient = class {
	#cache;
	#url;
	#pageSize;
	#overrides;
	constructor({ cache, url, pageSize = 50, overrides }) {
		this.#cache = cache;
		this.#url = url;
		this.#pageSize = pageSize;
		this.#overrides = {
			packages: overrides?.packages,
			types: overrides?.types
		};
		validateOverrides(this.#overrides);
	}
	get #mvrPackageDataLoader() {
		return this.#cache.readSync(["#mvrPackageDataLoader", this.#url ?? ""], () => {
			const loader = new DataLoader(async (packages) => {
				if (!this.#url) throw new Error(`MVR Api URL is not set for the current client (resolving ${packages.join(", ")})`);
				const resolved = await this.#resolvePackages(packages);
				return packages.map((pkg) => resolved[pkg] ?? /* @__PURE__ */ new Error(`Failed to resolve package: ${pkg}`));
			});
			const overrides = this.#overrides?.packages;
			if (overrides) for (const [pkg, id] of Object.entries(overrides)) loader.prime(pkg, id);
			return loader;
		});
	}
	get #mvrTypeDataLoader() {
		return this.#cache.readSync(["#mvrTypeDataLoader", this.#url ?? ""], () => {
			const loader = new DataLoader(async (types) => {
				if (!this.#url) throw new Error(`MVR Api URL is not set for the current client (resolving ${types.join(", ")})`);
				const resolved = await this.#resolveTypes(types);
				return types.map((type) => resolved[type] ?? /* @__PURE__ */ new Error(`Failed to resolve type: ${type}`));
			});
			const overrides = this.#overrides?.types;
			if (overrides) for (const [type, id] of Object.entries(overrides)) loader.prime(type, id);
			return loader;
		});
	}
	async #resolvePackages(packages) {
		if (packages.length === 0) return {};
		const batches = chunk(packages, this.#pageSize);
		const results = {};
		await Promise.all(batches.map(async (batch) => {
			const data = await this.#fetch("/v1/resolution/bulk", { names: batch });
			if (!data?.resolution) return;
			for (const pkg of Object.keys(data?.resolution)) {
				const pkgData = data.resolution[pkg]?.package_id;
				if (!pkgData) continue;
				results[pkg] = pkgData;
			}
		}));
		return results;
	}
	async #resolveTypes(types) {
		if (types.length === 0) return {};
		const batches = chunk(types, this.#pageSize);
		const results = {};
		await Promise.all(batches.map(async (batch) => {
			const data = await this.#fetch("/v1/struct-definition/bulk", { types: batch });
			if (!data?.resolution) return;
			for (const type of Object.keys(data?.resolution)) {
				const typeData = data.resolution[type]?.type_tag;
				if (!typeData) continue;
				results[type] = typeData;
			}
		}));
		return results;
	}
	async #fetch(url, body) {
		if (!this.#url) throw new Error("MVR Api URL is not set for the current client");
		const response = await fetch(`${this.#url}${url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...MVR_API_HEADER
			},
			body: JSON.stringify(body)
		});
		if (!response.ok) {
			const errorBody = await response.json().catch(() => ({}));
			throw new Error(`Failed to resolve types: ${errorBody?.message}`);
		}
		return response.json();
	}
	async resolvePackage({ package: name }) {
		if (!hasMvrName(name)) return { package: name };
		return { package: await this.#mvrPackageDataLoader.load(name) };
	}
	async resolveType({ type }) {
		if (!hasMvrName(type)) return { type };
		const mvrTypes = [...extractMvrTypes(type)];
		const resolvedTypes = await this.#mvrTypeDataLoader.loadMany(mvrTypes);
		const typeMap = {};
		for (let i = 0; i < mvrTypes.length; i++) {
			const resolvedType = resolvedTypes[i];
			if (resolvedType instanceof Error) throw resolvedType;
			typeMap[mvrTypes[i]] = resolvedType;
		}
		return { type: replaceMvrNames(type, typeMap) };
	}
	async resolve({ types = [], packages = [] }) {
		const mvrTypes = /* @__PURE__ */ new Set();
		for (const type of types ?? []) extractMvrTypes(type, mvrTypes);
		const typesArray = [...mvrTypes];
		const [resolvedTypes, resolvedPackages] = await Promise.all([typesArray.length > 0 ? this.#mvrTypeDataLoader.loadMany(typesArray) : [], packages.length > 0 ? this.#mvrPackageDataLoader.loadMany(packages) : []]);
		const typeMap = { ...this.#overrides?.types };
		for (const [i, type] of typesArray.entries()) {
			const resolvedType = resolvedTypes[i];
			if (resolvedType instanceof Error) throw resolvedType;
			typeMap[type] = resolvedType;
		}
		const replacedTypes = {};
		for (const type of types ?? []) replacedTypes[type] = { type: replaceMvrNames(type, typeMap) };
		const replacedPackages = {};
		for (const [i, pkg] of (packages ?? []).entries()) {
			const resolvedPkg = this.#overrides?.packages?.[pkg] ?? resolvedPackages[i];
			if (resolvedPkg instanceof Error) throw resolvedPkg;
			replacedPackages[pkg] = { package: resolvedPkg };
		}
		return {
			types: replacedTypes,
			packages: replacedPackages
		};
	}
};
function validateOverrides(overrides) {
	if (overrides?.packages) for (const [pkg, id] of Object.entries(overrides.packages)) {
		if (!isValidNamedPackage(pkg)) throw new Error(`Invalid package name: ${pkg}`);
		if (!isValidSuiAddress(normalizeSuiAddress(id))) throw new Error(`Invalid package ID: ${id}`);
	}
	if (overrides?.types) for (const [type, val] of Object.entries(overrides.types)) {
		if (parseStructTag(type).typeParams.length > 0) throw new Error("Type overrides must be first-level only. If you want to supply generic types, just pass each type individually.");
		if (!isValidSuiAddress(parseStructTag(val).address)) throw new Error(`Invalid type: ${val}`);
	}
}
/**
* Extracts all named types from a given type.
*/
function extractMvrTypes(type, types = /* @__PURE__ */ new Set()) {
	if (typeof type === "string" && !hasMvrName(type)) return types;
	const tag = isStructTag(type) ? type : parseStructTag(type);
	if (hasMvrName(tag.address)) types.add(`${tag.address}::${tag.module}::${tag.name}`);
	for (const param of tag.typeParams) extractMvrTypes(param, types);
	return types;
}
/**
* Traverses a type, and replaces any found names with their resolved equivalents,
* based on the supplied type cache.
*/
function replaceMvrNames(tag, typeCache) {
	const type = isStructTag(tag) ? tag : parseStructTag(tag);
	const cacheHit = typeCache[`${type.address}::${type.module}::${type.name}`];
	return normalizeStructTag({
		...type,
		address: cacheHit ? cacheHit.split("::")[0] : type.address,
		typeParams: type.typeParams.map((param) => replaceMvrNames(param, typeCache))
	});
}
function hasMvrName(nameOrType) {
	return nameOrType.includes(NAME_SEPARATOR) || nameOrType.includes("@") || nameOrType.includes(".sui");
}
function isStructTag(type) {
	return typeof type === "object" && "address" in type && "module" in type && "name" in type && "typeParams" in type;
}
/**
* Looks up all `.move` names in a transaction block.
* Returns a list of all the names found.
*/
function findNamesInTransaction(builder) {
	const packages = /* @__PURE__ */ new Set();
	const types = /* @__PURE__ */ new Set();
	for (const command of builder.commands) switch (command.$kind) {
		case "MakeMoveVec":
			if (command.MakeMoveVec.type) getNamesFromTypeList([command.MakeMoveVec.type]).forEach((type) => {
				types.add(type);
			});
			break;
		case "MoveCall":
			const moveCall = command.MoveCall;
			const pkg = moveCall.package.split("::")[0];
			if (hasMvrName(pkg)) {
				if (!isValidNamedPackage(pkg)) throw new Error(`Invalid package name: ${pkg}`);
				packages.add(pkg);
			}
			getNamesFromTypeList(moveCall.typeArguments ?? []).forEach((type) => {
				types.add(type);
			});
			break;
		default: break;
	}
	return {
		packages: [...packages],
		types: [...types]
	};
}
/**
* Replace all names & types in a transaction block
* with their resolved names/types.
*/
function replaceNames(builder, resolved) {
	for (const command of builder.commands) {
		if (command.MakeMoveVec?.type) {
			if (!hasMvrName(command.MakeMoveVec.type)) continue;
			if (!resolved.types[command.MakeMoveVec.type]) throw new Error(`No resolution found for type: ${command.MakeMoveVec.type}`);
			command.MakeMoveVec.type = resolved.types[command.MakeMoveVec.type].type;
		}
		const tx = command.MoveCall;
		if (!tx) continue;
		const nameParts = tx.package.split("::");
		const name = nameParts[0];
		if (hasMvrName(name) && !resolved.packages[name]) throw new Error(`No address found for package: ${name}`);
		if (hasMvrName(name)) {
			nameParts[0] = resolved.packages[name].package;
			tx.package = nameParts.join("::");
		}
		const types = tx.typeArguments;
		if (!types) continue;
		for (let i = 0; i < types.length; i++) {
			if (!hasMvrName(types[i])) continue;
			if (!resolved.types[types[i]]) throw new Error(`No resolution found for type: ${types[i]}`);
			types[i] = resolved.types[types[i]].type;
		}
		tx.typeArguments = types;
	}
}
/**
* Returns a list of unique types that include a name
* from the given list. This list is retrieved from the Transaction Data.
*/
function getNamesFromTypeList(types) {
	const names = /* @__PURE__ */ new Set();
	for (const type of types) if (hasMvrName(type)) {
		if (!isValidNamedType(type)) throw new Error(`Invalid type with names: ${type}`);
		names.add(type);
	}
	return names;
}

//#endregion
export { MvrClient, findNamesInTransaction, hasMvrName, replaceNames };
//# sourceMappingURL=mvr.mjs.map