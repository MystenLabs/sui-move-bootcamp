import { poseidonHash } from "./poseidon.mjs";
import { hexToBytes } from "@noble/hashes/utils.js";

//#region src/zklogin/utils.ts
const MAX_KEY_CLAIM_NAME_LENGTH = 32;
const MAX_KEY_CLAIM_VALUE_LENGTH = 115;
const MAX_AUD_VALUE_LENGTH = 145;
const PACK_WIDTH = 248;
function findFirstNonZeroIndex(bytes) {
	for (let i = 0; i < bytes.length; i++) if (bytes[i] !== 0) return i;
	return -1;
}
function toPaddedBigEndianBytes(num, width) {
	return hexToBytes(num.toString(16).padStart(width * 2, "0").slice(-width * 2));
}
function toBigEndianBytes(num, width) {
	const bytes = toPaddedBigEndianBytes(num, width);
	const firstNonZeroIndex = findFirstNonZeroIndex(bytes);
	if (firstNonZeroIndex === -1) return new Uint8Array([0]);
	return bytes.slice(firstNonZeroIndex);
}
function getExtendedEphemeralPublicKey(publicKey) {
	return publicKey.toSuiPublicKey();
}
/**
* Splits an array into chunks of size chunk_size. If the array is not evenly
* divisible by chunk_size, the first chunk will be smaller than chunk_size.
*
* E.g., arrayChunk([1, 2, 3, 4, 5], 2) => [[1], [2, 3], [4, 5]]
*
* Note: Can be made more efficient by avoiding the reverse() calls.
*/
function chunkArray(array, chunk_size) {
	const chunks = Array(Math.ceil(array.length / chunk_size));
	const revArray = array.reverse();
	for (let i = 0; i < chunks.length; i++) chunks[i] = revArray.slice(i * chunk_size, (i + 1) * chunk_size).reverse();
	return chunks.reverse();
}
function bytesBEToBigInt(bytes) {
	const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
	if (hex.length === 0) return BigInt(0);
	return BigInt("0x" + hex);
}
function hashASCIIStrToField(str, maxSize) {
	if (str.length > maxSize) throw new Error(`String ${str} is longer than ${maxSize} chars`);
	return poseidonHash(chunkArray(str.padEnd(maxSize, String.fromCharCode(0)).split("").map((c) => c.charCodeAt(0)), PACK_WIDTH / 8).map((chunk) => bytesBEToBigInt(chunk)));
}
function genAddressSeed(salt, name, value, aud, max_name_length = MAX_KEY_CLAIM_NAME_LENGTH, max_value_length = MAX_KEY_CLAIM_VALUE_LENGTH, max_aud_length = MAX_AUD_VALUE_LENGTH) {
	return poseidonHash([
		hashASCIIStrToField(name, max_name_length),
		hashASCIIStrToField(value, max_value_length),
		hashASCIIStrToField(aud, max_aud_length),
		poseidonHash([BigInt(salt)])
	]);
}
function normalizeZkLoginIssuer(iss) {
	if (iss === "accounts.google.com") return "https://accounts.google.com";
	return iss;
}

//#endregion
export { genAddressSeed, getExtendedEphemeralPublicKey, hashASCIIStrToField, normalizeZkLoginIssuer, toBigEndianBytes, toPaddedBigEndianBytes };
//# sourceMappingURL=utils.mjs.map