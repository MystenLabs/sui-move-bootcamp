import { Address } from "./bcs.mjs";
import { bcs } from "@mysten/bcs";

//#region src/bcs/pure.ts
function pureBcsSchemaFromTypeName(name) {
	switch (name) {
		case "u8": return bcs.u8();
		case "u16": return bcs.u16();
		case "u32": return bcs.u32();
		case "u64": return bcs.u64();
		case "u128": return bcs.u128();
		case "u256": return bcs.u256();
		case "bool": return bcs.bool();
		case "string": return bcs.string();
		case "id":
		case "address": return Address;
	}
	const generic = name.match(/^(vector|option)<(.+)>$/);
	if (generic) {
		const [kind, inner] = generic.slice(1);
		if (kind === "vector") return bcs.vector(pureBcsSchemaFromTypeName(inner));
		else return bcs.option(pureBcsSchemaFromTypeName(inner));
	}
	throw new Error(`Invalid Pure type name: ${name}`);
}

//#endregion
export { pureBcsSchemaFromTypeName };
//# sourceMappingURL=pure.mjs.map