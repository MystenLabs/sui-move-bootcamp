import { normalizeSuiObjectId } from "../utils/sui-types.mjs";
import { ArgumentSchema } from "./data/internal.mjs";
import { toBase64 } from "@mysten/bcs";
import { parse } from "valibot";

//#region src/transactions/Commands.ts
let UpgradePolicy = /* @__PURE__ */ function(UpgradePolicy$1) {
	UpgradePolicy$1[UpgradePolicy$1["COMPATIBLE"] = 0] = "COMPATIBLE";
	UpgradePolicy$1[UpgradePolicy$1["ADDITIVE"] = 128] = "ADDITIVE";
	UpgradePolicy$1[UpgradePolicy$1["DEP_ONLY"] = 192] = "DEP_ONLY";
	return UpgradePolicy$1;
}({});
/**
* Simple helpers used to construct transactions:
*/
const TransactionCommands = {
	MoveCall(input) {
		const [pkg, mod = "", fn = ""] = "target" in input ? input.target.split("::") : [
			input.package,
			input.module,
			input.function
		];
		return {
			$kind: "MoveCall",
			MoveCall: {
				package: pkg,
				module: mod,
				function: fn,
				typeArguments: input.typeArguments ?? [],
				arguments: input.arguments ?? []
			}
		};
	},
	TransferObjects(objects, address) {
		return {
			$kind: "TransferObjects",
			TransferObjects: {
				objects: objects.map((o) => parse(ArgumentSchema, o)),
				address: parse(ArgumentSchema, address)
			}
		};
	},
	SplitCoins(coin, amounts) {
		return {
			$kind: "SplitCoins",
			SplitCoins: {
				coin: parse(ArgumentSchema, coin),
				amounts: amounts.map((o) => parse(ArgumentSchema, o))
			}
		};
	},
	MergeCoins(destination, sources) {
		return {
			$kind: "MergeCoins",
			MergeCoins: {
				destination: parse(ArgumentSchema, destination),
				sources: sources.map((o) => parse(ArgumentSchema, o))
			}
		};
	},
	Publish({ modules, dependencies }) {
		return {
			$kind: "Publish",
			Publish: {
				modules: modules.map((module) => typeof module === "string" ? module : toBase64(new Uint8Array(module))),
				dependencies: dependencies.map((dep) => normalizeSuiObjectId(dep))
			}
		};
	},
	Upgrade({ modules, dependencies, package: packageId, ticket }) {
		return {
			$kind: "Upgrade",
			Upgrade: {
				modules: modules.map((module) => typeof module === "string" ? module : toBase64(new Uint8Array(module))),
				dependencies: dependencies.map((dep) => normalizeSuiObjectId(dep)),
				package: packageId,
				ticket: parse(ArgumentSchema, ticket)
			}
		};
	},
	MakeMoveVec({ type, elements }) {
		return {
			$kind: "MakeMoveVec",
			MakeMoveVec: {
				type: type ?? null,
				elements: elements.map((o) => parse(ArgumentSchema, o))
			}
		};
	},
	Intent({ name, inputs = {}, data = {} }) {
		return {
			$kind: "$Intent",
			$Intent: {
				name,
				inputs: Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, Array.isArray(value) ? value.map((o) => parse(ArgumentSchema, o)) : parse(ArgumentSchema, value)])),
				data
			}
		};
	}
};

//#endregion
export { TransactionCommands, UpgradePolicy };
//# sourceMappingURL=Commands.mjs.map