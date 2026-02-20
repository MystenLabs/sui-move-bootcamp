import { SIGNATURE_SCHEME_TO_FLAG } from "../../cryptography/signature-scheme.mjs";
import { PublicKey, bytesEqual, parseSerializedKeypairSignature } from "../../cryptography/publickey.mjs";
import { fromBase64 } from "@mysten/bcs";
import { ed25519 } from "@noble/curves/ed25519.js";

//#region src/keypairs/ed25519/publickey.ts
const PUBLIC_KEY_SIZE = 32;
/**
* An Ed25519 public key
*/
var Ed25519PublicKey = class extends PublicKey {
	static {
		this.SIZE = PUBLIC_KEY_SIZE;
	}
	/**
	* Create a new Ed25519PublicKey object
	* @param value ed25519 public key as buffer or base-64 encoded string
	*/
	constructor(value) {
		super();
		if (typeof value === "string") this.data = fromBase64(value);
		else if (value instanceof Uint8Array) this.data = value;
		else this.data = Uint8Array.from(value);
		if (this.data.length !== PUBLIC_KEY_SIZE) throw new Error(`Invalid public key input. Expected ${PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`);
	}
	/**
	* Checks if two Ed25519 public keys are equal
	*/
	equals(publicKey) {
		return super.equals(publicKey);
	}
	/**
	* Return the byte array representation of the Ed25519 public key
	*/
	toRawBytes() {
		return this.data;
	}
	/**
	* Return the Sui address associated with this Ed25519 public key
	*/
	flag() {
		return SIGNATURE_SCHEME_TO_FLAG["ED25519"];
	}
	/**
	* Verifies that the signature is valid for for the provided message
	*/
	async verify(message, signature) {
		let bytes;
		if (typeof signature === "string") {
			const parsed = parseSerializedKeypairSignature(signature);
			if (parsed.signatureScheme !== "ED25519") throw new Error("Invalid signature scheme");
			if (!bytesEqual(this.toRawBytes(), parsed.publicKey)) throw new Error("Signature does not match public key");
			bytes = parsed.signature;
		} else bytes = signature;
		return ed25519.verify(bytes, message, this.toRawBytes());
	}
};

//#endregion
export { Ed25519PublicKey };
//# sourceMappingURL=publickey.mjs.map