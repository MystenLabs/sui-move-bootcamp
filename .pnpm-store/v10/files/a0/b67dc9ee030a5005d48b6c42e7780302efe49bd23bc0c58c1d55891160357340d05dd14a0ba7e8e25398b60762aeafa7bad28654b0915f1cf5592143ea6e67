import { fromHex } from "@mysten/bcs";
import { sha512 } from "@noble/hashes/sha2.js";
import { hmac } from "@noble/hashes/hmac.js";

//#region src/keypairs/ed25519/ed25519-hd-key.ts
const ED25519_CURVE = "ed25519 seed";
const HARDENED_OFFSET = 2147483648;
const pathRegex = /* @__PURE__ */ new RegExp("^m(\\/[0-9]+')+$");
const replaceDerive = (val) => val.replace("'", "");
const getMasterKeyFromSeed = (seed) => {
	const I = hmac.create(sha512, new TextEncoder().encode(ED25519_CURVE)).update(fromHex(seed)).digest();
	return {
		key: I.slice(0, 32),
		chainCode: I.slice(32)
	};
};
const CKDPriv = ({ key, chainCode }, index) => {
	const indexBuffer = /* @__PURE__ */ new ArrayBuffer(4);
	new DataView(indexBuffer).setUint32(0, index);
	const data = new Uint8Array(1 + key.length + indexBuffer.byteLength);
	data.set(new Uint8Array(1).fill(0));
	data.set(key, 1);
	data.set(new Uint8Array(indexBuffer, 0, indexBuffer.byteLength), key.length + 1);
	const I = hmac.create(sha512, chainCode).update(data).digest();
	return {
		key: I.slice(0, 32),
		chainCode: I.slice(32)
	};
};
const isValidPath = (path) => {
	if (!pathRegex.test(path)) return false;
	return !path.split("/").slice(1).map(replaceDerive).some(isNaN);
};
const derivePath = (path, seed, offset = HARDENED_OFFSET) => {
	if (!isValidPath(path)) throw new Error("Invalid derivation path");
	const { key, chainCode } = getMasterKeyFromSeed(seed);
	return path.split("/").slice(1).map(replaceDerive).map((el) => parseInt(el, 10)).reduce((parentKeys, segment) => CKDPriv(parentKeys, segment + offset), {
		key,
		chainCode
	});
};

//#endregion
export { derivePath };
//# sourceMappingURL=ed25519-hd-key.mjs.map