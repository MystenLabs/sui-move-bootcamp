import { SIGNATURE_SCHEME_TO_FLAG } from "../../cryptography/signature-scheme.mjs";
import { PublicKey, bytesEqual, parseSerializedKeypairSignature } from "../../cryptography/publickey.mjs";
import { fromBase64 } from "@mysten/bcs";
import { secp256k1 } from "@noble/curves/secp256k1.js";

//#region src/keypairs/secp256k1/publickey.ts
const SECP256K1_PUBLIC_KEY_SIZE = 33;
/**
* A Secp256k1 public key
*/
var Secp256k1PublicKey = class extends PublicKey {
	static {
		this.SIZE = SECP256K1_PUBLIC_KEY_SIZE;
	}
	/**
	* Create a new Secp256k1PublicKey object
	* @param value secp256k1 public key as buffer or base-64 encoded string
	*/
	constructor(value) {
		super();
		if (typeof value === "string") this.data = fromBase64(value);
		else if (value instanceof Uint8Array) this.data = value;
		else this.data = Uint8Array.from(value);
		if (this.data.length !== SECP256K1_PUBLIC_KEY_SIZE) throw new Error(`Invalid public key input. Expected ${SECP256K1_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`);
	}
	/**
	* Checks if two Secp256k1 public keys are equal
	*/
	equals(publicKey) {
		return super.equals(publicKey);
	}
	/**
	* Return the byte array representation of the Secp256k1 public key
	*/
	toRawBytes() {
		return this.data;
	}
	/**
	* Return the Sui address associated with this Secp256k1 public key
	*/
	flag() {
		return SIGNATURE_SCHEME_TO_FLAG["Secp256k1"];
	}
	/**
	* Verifies that the signature is valid for for the provided message
	*/
	async verify(message, signature) {
		let bytes;
		if (typeof signature === "string") {
			const parsed = parseSerializedKeypairSignature(signature);
			if (parsed.signatureScheme !== "Secp256k1") throw new Error("Invalid signature scheme");
			if (!bytesEqual(this.toRawBytes(), parsed.publicKey)) throw new Error("Signature does not match public key");
			bytes = parsed.signature;
		} else bytes = signature;
		return secp256k1.verify(bytes, message, this.toRawBytes());
	}
};

//#endregion
export { Secp256k1PublicKey };
//# sourceMappingURL=publickey.mjs.map