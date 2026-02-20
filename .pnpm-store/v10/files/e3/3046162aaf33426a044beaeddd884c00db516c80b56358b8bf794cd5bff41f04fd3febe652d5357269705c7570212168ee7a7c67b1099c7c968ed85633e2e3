import { isValidNamedPackage } from "./move-registry.mjs";
import { fromBase58, splitGenericParameters } from "@mysten/bcs";

//#region src/utils/sui-types.ts
const TX_DIGEST_LENGTH = 32;
/** Returns whether the tx digest is valid based on the serialization format */
function isValidTransactionDigest(value) {
	try {
		return fromBase58(value).length === TX_DIGEST_LENGTH;
	} catch {
		return false;
	}
}
const SUI_ADDRESS_LENGTH = 32;
function isValidSuiAddress(value) {
	return isHex(value) && getHexByteLength(value) === SUI_ADDRESS_LENGTH;
}
function isValidSuiObjectId(value) {
	return isValidSuiAddress(value);
}
const MOVE_IDENTIFIER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*$/;
function isValidMoveIdentifier(name) {
	return MOVE_IDENTIFIER_REGEX.test(name);
}
const PRIMITIVE_TYPE_TAGS = [
	"bool",
	"u8",
	"u16",
	"u32",
	"u64",
	"u128",
	"u256",
	"address",
	"signer"
];
const VECTOR_TYPE_REGEX = /^vector<(.+)>$/;
function isValidTypeTag(type) {
	if (PRIMITIVE_TYPE_TAGS.includes(type)) return true;
	const vectorMatch = type.match(VECTOR_TYPE_REGEX);
	if (vectorMatch) return isValidTypeTag(vectorMatch[1]);
	if (type.includes("::")) return isValidStructTag(type);
	return false;
}
function isValidParsedStructTag(tag) {
	if (!isValidSuiAddress(tag.address) && !isValidNamedPackage(tag.address)) return false;
	if (!isValidMoveIdentifier(tag.module) || !isValidMoveIdentifier(tag.name)) return false;
	return tag.typeParams.every((param) => {
		if (typeof param === "string") return isValidTypeTag(param);
		return isValidParsedStructTag(param);
	});
}
function isValidStructTag(type) {
	try {
		return isValidParsedStructTag(parseStructTag(type));
	} catch {
		return false;
	}
}
function parseTypeTag(type) {
	if (!type.includes("::")) return type;
	return parseStructTag(type);
}
function parseStructTag(type) {
	const parts = type.split("::");
	if (parts.length < 3) throw new Error(`Invalid struct tag: ${type}`);
	const [address, module] = parts;
	const isMvrPackage = isValidNamedPackage(address);
	const rest = type.slice(address.length + module.length + 4);
	const name = rest.includes("<") ? rest.slice(0, rest.indexOf("<")) : rest;
	const typeParams = rest.includes("<") ? splitGenericParameters(rest.slice(rest.indexOf("<") + 1, rest.lastIndexOf(">"))).map((typeParam) => parseTypeTag(typeParam.trim())) : [];
	return {
		address: isMvrPackage ? address : normalizeSuiAddress(address),
		module,
		name,
		typeParams
	};
}
function normalizeStructTag(type) {
	const { address, module, name, typeParams } = typeof type === "string" ? parseStructTag(type) : type;
	return `${address}::${module}::${name}${typeParams?.length > 0 ? `<${typeParams.map((typeParam) => typeof typeParam === "string" ? typeParam : normalizeStructTag(typeParam)).join(",")}>` : ""}`;
}
/**
* Perform the following operations:
* 1. Make the address lower case
* 2. Prepend `0x` if the string does not start with `0x`.
* 3. Add more zeros if the length of the address(excluding `0x`) is less than `SUI_ADDRESS_LENGTH`
*
* WARNING: if the address value itself starts with `0x`, e.g., `0x0x`, the default behavior
* is to treat the first `0x` not as part of the address. The default behavior can be overridden by
* setting `forceAdd0x` to true
*
*/
function normalizeSuiAddress(value, forceAdd0x = false) {
	let address = value.toLowerCase();
	if (!forceAdd0x && address.startsWith("0x")) address = address.slice(2);
	return `0x${address.padStart(SUI_ADDRESS_LENGTH * 2, "0")}`;
}
function normalizeSuiObjectId(value, forceAdd0x = false) {
	return normalizeSuiAddress(value, forceAdd0x);
}
function isHex(value) {
	return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}
function getHexByteLength(value) {
	return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}

//#endregion
export { SUI_ADDRESS_LENGTH, isValidStructTag, isValidSuiAddress, isValidSuiObjectId, isValidTransactionDigest, normalizeStructTag, normalizeSuiAddress, normalizeSuiObjectId, parseStructTag };
//# sourceMappingURL=sui-types.mjs.map