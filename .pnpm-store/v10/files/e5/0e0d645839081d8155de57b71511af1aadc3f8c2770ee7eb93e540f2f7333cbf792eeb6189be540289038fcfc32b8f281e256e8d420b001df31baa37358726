import { blake2b } from "@noble/hashes/blake2.js";

//#region src/transactions/hash.ts
/**
* Generates a Blake2b hash of typed data as a base64 string.
*
* @param typeTag type tag (e.g. TransactionData, SenderSignedData)
* @param data data to hash
*/
function hashTypedData(typeTag, data) {
	const typeTagBytes = Array.from(`${typeTag}::`).map((e) => e.charCodeAt(0));
	const dataWithTag = new Uint8Array(typeTagBytes.length + data.length);
	dataWithTag.set(typeTagBytes);
	dataWithTag.set(data, typeTagBytes.length);
	return blake2b(dataWithTag, { dkLen: 32 });
}

//#endregion
export { hashTypedData };
//# sourceMappingURL=hash.mjs.map