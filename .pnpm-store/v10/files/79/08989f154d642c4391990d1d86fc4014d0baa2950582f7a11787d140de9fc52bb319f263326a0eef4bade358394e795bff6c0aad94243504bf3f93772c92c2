import { SUI_ADDRESS_LENGTH, normalizeSuiAddress } from "../utils/sui-types.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { messageWithIntent } from "./intent.mjs";
import { SIGNATURE_FLAG_TO_SCHEME, SIGNATURE_SCHEME_TO_SIZE } from "./signature-scheme.mjs";
import { fromBase64, toBase64 } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2.js";
import { bytesToHex } from "@noble/hashes/utils.js";

//#region src/cryptography/publickey.ts
function bytesEqual(a, b) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
/**
* A public key
*/
var PublicKey = class {
	/**
	* Checks if two public keys are equal
	*/
	equals(publicKey) {
		return bytesEqual(this.toRawBytes(), publicKey.toRawBytes());
	}
	/**
	* Return the base-64 representation of the public key
	*/
	toBase64() {
		return toBase64(this.toRawBytes());
	}
	toString() {
		throw new Error("`toString` is not implemented on public keys. Use `toBase64()` or `toRawBytes()` instead.");
	}
	/**
	* Return the Sui representation of the public key encoded in
	* base-64. A Sui public key is formed by the concatenation
	* of the scheme flag with the raw bytes of the public key
	*/
	toSuiPublicKey() {
		return toBase64(this.toSuiBytes());
	}
	verifyWithIntent(bytes, signature, intent) {
		const digest = blake2b(messageWithIntent(intent, bytes), { dkLen: 32 });
		return this.verify(digest, signature);
	}
	/**
	* Verifies that the signature is valid for for the provided PersonalMessage
	*/
	verifyPersonalMessage(message, signature) {
		return this.verifyWithIntent(suiBcs.byteVector().serialize(message).toBytes(), signature, "PersonalMessage");
	}
	/**
	* Verifies that the signature is valid for for the provided Transaction
	*/
	verifyTransaction(transaction, signature) {
		return this.verifyWithIntent(transaction, signature, "TransactionData");
	}
	/**
	* Verifies that the public key is associated with the provided address
	*/
	verifyAddress(address) {
		return this.toSuiAddress() === address;
	}
	/**
	* Returns the bytes representation of the public key
	* prefixed with the signature scheme flag
	*/
	toSuiBytes() {
		const rawBytes = this.toRawBytes();
		const suiBytes = new Uint8Array(rawBytes.length + 1);
		suiBytes.set([this.flag()]);
		suiBytes.set(rawBytes, 1);
		return suiBytes;
	}
	/**
	* Return the Sui address associated with this Ed25519 public key
	*/
	toSuiAddress() {
		return normalizeSuiAddress(bytesToHex(blake2b(this.toSuiBytes(), { dkLen: 32 })).slice(0, SUI_ADDRESS_LENGTH * 2));
	}
};
function parseSerializedKeypairSignature(serializedSignature) {
	const bytes = fromBase64(serializedSignature);
	const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
	switch (signatureScheme) {
		case "ED25519":
		case "Secp256k1":
		case "Secp256r1":
			const size = SIGNATURE_SCHEME_TO_SIZE[signatureScheme];
			const signature = bytes.slice(1, bytes.length - size);
			return {
				serializedSignature,
				signatureScheme,
				signature,
				publicKey: bytes.slice(1 + signature.length),
				bytes
			};
		default: throw new Error("Unsupported signature scheme");
	}
}

//#endregion
export { PublicKey, bytesEqual, parseSerializedKeypairSignature };
//# sourceMappingURL=publickey.mjs.map