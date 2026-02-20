import { normalizeSuiAddress } from "../utils/sui-types.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { MOVE_STDLIB_ADDRESS, SUI_FRAMEWORK_ADDRESS } from "../utils/constants.mjs";

//#region src/transactions/serializer.ts
/**
* Parses a type name like "0x2::tx_context::TxContext" into package, module, and name parts.
*/
function parseTypeName(typeName) {
	const parts = typeName.split("::");
	if (parts.length !== 3) throw new Error(`Invalid type name format: ${typeName}`);
	return {
		package: parts[0],
		module: parts[1],
		name: parts[2]
	};
}
function isTxContext(param) {
	if (param.body.$kind !== "datatype") return false;
	const { package: pkg, module, name } = parseTypeName(param.body.datatype.typeName);
	return normalizeSuiAddress(pkg) === SUI_FRAMEWORK_ADDRESS && module === "tx_context" && name === "TxContext";
}
function getPureBcsSchema(typeSignature) {
	switch (typeSignature.$kind) {
		case "address": return suiBcs.Address;
		case "bool": return suiBcs.Bool;
		case "u8": return suiBcs.U8;
		case "u16": return suiBcs.U16;
		case "u32": return suiBcs.U32;
		case "u64": return suiBcs.U64;
		case "u128": return suiBcs.U128;
		case "u256": return suiBcs.U256;
		case "vector": {
			if (typeSignature.vector.$kind === "u8") return suiBcs.byteVector().transform({
				input: (val) => typeof val === "string" ? new TextEncoder().encode(val) : val,
				output: (val) => val
			});
			const type = getPureBcsSchema(typeSignature.vector);
			return type ? suiBcs.vector(type) : null;
		}
		case "datatype": {
			const { package: pkg, module, name } = parseTypeName(typeSignature.datatype.typeName);
			const normalizedPkg = normalizeSuiAddress(pkg);
			if (normalizedPkg === MOVE_STDLIB_ADDRESS) {
				if (module === "ascii" && name === "String") return suiBcs.String;
				if (module === "string" && name === "String") return suiBcs.String;
				if (module === "option" && name === "Option") {
					const type = getPureBcsSchema(typeSignature.datatype.typeParameters[0]);
					return type ? suiBcs.vector(type) : null;
				}
			}
			if (normalizedPkg === SUI_FRAMEWORK_ADDRESS) {
				if (module === "object" && name === "ID") return suiBcs.Address;
			}
			return null;
		}
		case "typeParameter":
		case "unknown": return null;
	}
}
function normalizedTypeToMoveTypeSignature(type) {
	if (typeof type === "object" && "Reference" in type) return {
		reference: "immutable",
		body: normalizedTypeToMoveTypeSignatureBody(type.Reference)
	};
	if (typeof type === "object" && "MutableReference" in type) return {
		reference: "mutable",
		body: normalizedTypeToMoveTypeSignatureBody(type.MutableReference)
	};
	return {
		reference: null,
		body: normalizedTypeToMoveTypeSignatureBody(type)
	};
}
function normalizedTypeToMoveTypeSignatureBody(type) {
	if (typeof type === "string") switch (type) {
		case "Address": return { $kind: "address" };
		case "Bool": return { $kind: "bool" };
		case "U8": return { $kind: "u8" };
		case "U16": return { $kind: "u16" };
		case "U32": return { $kind: "u32" };
		case "U64": return { $kind: "u64" };
		case "U128": return { $kind: "u128" };
		case "U256": return { $kind: "u256" };
		default: throw new Error(`Unexpected type ${type}`);
	}
	if ("Vector" in type) return {
		$kind: "vector",
		vector: normalizedTypeToMoveTypeSignatureBody(type.Vector)
	};
	if ("Struct" in type) return {
		$kind: "datatype",
		datatype: {
			typeName: `${type.Struct.address}::${type.Struct.module}::${type.Struct.name}`,
			typeParameters: type.Struct.typeArguments.map(normalizedTypeToMoveTypeSignatureBody)
		}
	};
	if ("TypeParameter" in type) return {
		$kind: "typeParameter",
		index: type.TypeParameter
	};
	throw new Error(`Unexpected type ${JSON.stringify(type)}`);
}

//#endregion
export { getPureBcsSchema, isTxContext, normalizedTypeToMoveTypeSignature };
//# sourceMappingURL=serializer.mjs.map