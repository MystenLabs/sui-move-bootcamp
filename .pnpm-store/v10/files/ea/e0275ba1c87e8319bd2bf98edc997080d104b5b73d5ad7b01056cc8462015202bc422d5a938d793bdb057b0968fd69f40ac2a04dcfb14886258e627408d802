import { SIGNATURE_SCHEME_TO_FLAG } from "../../cryptography/signature-scheme.mjs";
import { PublicKey, bytesEqual } from "../../cryptography/publickey.mjs";
import { parseSerializedSignature } from "../../cryptography/signature.mjs";
import { fromBase64 } from "@mysten/bcs";
import { p256 } from "@noble/curves/nist.js";

//#region src/keypairs/secp256r1/publickey.ts
const SECP256R1_PUBLIC_KEY_SIZE = 33;
/**
* A Secp256r1 public key
*/
var Secp256r1PublicKey = class extends PublicKey {
	static {
		this.SIZE = SECP256R1_PUBLIC_KEY_SIZE;
	}
	/**
	* Create a new Secp256r1PublicKey object
	* @param value secp256r1 public key as buffer or base-64 encoded string
	*/
	constructor(value) {
		super();
		if (typeof value === "string") this.data = fromBase64(value);
		else if (value instanceof Uint8Array) this.data = value;
		else this.data = Uint8Array.from(value);
		if (this.data.length !== SECP256R1_PUBLIC_KEY_SIZE) throw new Error(`Invalid public key input. Expected ${SECP256R1_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`);
	}
	/**
	* Checks if two Secp256r1 public keys are equal
	*/
	equals(publicKey) {
		return super.equals(publicKey);
	}
	/**
	* Return the byte array representation of the Secp256r1 public key
	*/
	toRawBytes() {
		return this.data;
	}
	/**
	* Return the Sui address associated with this Secp256r1 public key
	*/
	flag() {
		return SIGNATURE_SCHEME_TO_FLAG["Secp256r1"];
	}
	/**
	* Verifies that the signature is valid for for the provided message
	*/
	async verify(message, signature) {
		let bytes;
		if (typeof signature === "string") {
			const parsed = parseSerializedSignature(signature);
			if (parsed.signatureScheme !== "Secp256r1") throw new Error("Invalid signature scheme");
			if (!bytesEqual(this.toRawBytes(), parsed.publicKey)) throw new Error("Signature does not match public key");
			bytes = parsed.signature;
		} else bytes = signature;
		return p256.verify(bytes, message, this.toRawBytes());
	}
};

//#endregion
export { Secp256r1PublicKey };
//# sourceMappingURL=publickey.mjs.map