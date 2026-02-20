import { poseidonHash } from "./poseidon.mjs";
import { toPaddedBigEndianBytes } from "./utils.mjs";
import { toHex } from "@mysten/bcs";
import { randomBytes } from "@noble/hashes/utils.js";
import { base64urlnopad } from "@scure/base";

//#region src/zklogin/nonce.ts
const NONCE_LENGTH = 27;
function toBigIntBE(bytes) {
	const hex = toHex(bytes);
	if (hex.length === 0) return BigInt(0);
	return BigInt(`0x${hex}`);
}
function generateRandomness() {
	return String(toBigIntBE(randomBytes(16)));
}
function generateNonce(publicKey, maxEpoch, randomness) {
	const publicKeyBytes = toBigIntBE(publicKey.toSuiBytes());
	const Z = toPaddedBigEndianBytes(poseidonHash([
		publicKeyBytes / 2n ** 128n,
		publicKeyBytes % 2n ** 128n,
		maxEpoch,
		BigInt(randomness)
	]), 20);
	const nonce = base64urlnopad.encode(Z);
	if (nonce.length !== NONCE_LENGTH) throw new Error(`Length of nonce ${nonce} (${nonce.length}) is not equal to ${NONCE_LENGTH}`);
	return nonce;
}

//#endregion
export { generateNonce, generateRandomness };
//# sourceMappingURL=nonce.mjs.map