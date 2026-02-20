import { PasskeyAuthenticator } from "../../bcs/bcs.mjs";
import { SIGNATURE_SCHEME_TO_FLAG } from "../../cryptography/signature-scheme.mjs";
import { PublicKey, bytesEqual } from "../../cryptography/publickey.mjs";
import { fromBase64, toBase64 } from "@mysten/bcs";
import { p256 } from "@noble/curves/nist.js";
import { sha256 } from "@noble/hashes/sha2.js";

//#region src/keypairs/passkey/publickey.ts
const PASSKEY_PUBLIC_KEY_SIZE = 33;
const PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;
const PASSKEY_SIGNATURE_SIZE = 64;
/** Fixed DER header for secp256r1 SubjectPublicKeyInfo
DER structure for P-256 SPKI:
30 -- SEQUENCE
59 -- length (89 bytes)
30 -- SEQUENCE
13 -- length (19 bytes)
06 -- OBJECT IDENTIFIER
07 -- length
2A 86 48 CE 3D 02 01 -- id-ecPublicKey
06 -- OBJECT IDENTIFIER
08 -- length
2A 86 48 CE 3D 03 01 07 -- secp256r1/prime256v1
03 -- BIT STRING
42 -- length (66 bytes)
00 -- padding
===== above bytes are considered header =====
04 || x || y -- uncompressed point (65 bytes: 0x04 || 32-byte x || 32-byte y)
*/
const SECP256R1_SPKI_HEADER = new Uint8Array([
	48,
	89,
	48,
	19,
	6,
	7,
	42,
	134,
	72,
	206,
	61,
	2,
	1,
	6,
	8,
	42,
	134,
	72,
	206,
	61,
	3,
	1,
	7,
	3,
	66,
	0
]);
/**
* A passkey public key
*/
var PasskeyPublicKey = class extends PublicKey {
	static {
		this.SIZE = PASSKEY_PUBLIC_KEY_SIZE;
	}
	/**
	* Create a new PasskeyPublicKey object
	* @param value passkey public key as buffer or base-64 encoded string
	*/
	constructor(value) {
		super();
		if (typeof value === "string") this.data = fromBase64(value);
		else if (value instanceof Uint8Array) this.data = value;
		else this.data = Uint8Array.from(value);
		if (this.data.length !== PASSKEY_PUBLIC_KEY_SIZE) throw new Error(`Invalid public key input. Expected ${PASSKEY_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`);
	}
	/**
	* Checks if two passkey public keys are equal
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
		return SIGNATURE_SCHEME_TO_FLAG["Passkey"];
	}
	/**
	* Verifies that the signature is valid for for the provided message
	*/
	async verify(message, signature) {
		const parsed = parseSerializedPasskeySignature(signature);
		const clientDataJSON = JSON.parse(parsed.clientDataJson);
		if (clientDataJSON.type !== "webauthn.get") return false;
		if (!bytesEqual(message, fromBase64(clientDataJSON.challenge.replace(/-/g, "+").replace(/_/g, "/")))) return false;
		const pk = parsed.userSignature.slice(1 + PASSKEY_SIGNATURE_SIZE);
		if (!bytesEqual(this.toRawBytes(), pk)) return false;
		const payload = new Uint8Array([...parsed.authenticatorData, ...sha256(new TextEncoder().encode(parsed.clientDataJson))]);
		const sig = parsed.userSignature.slice(1, PASSKEY_SIGNATURE_SIZE + 1);
		return p256.verify(sig, payload, pk);
	}
};
/**
* Parses a DER SubjectPublicKeyInfo into an uncompressed public key. This also verifies
* that the curve used is P-256 (secp256r1).
*
* @param data: DER SubjectPublicKeyInfo
* @returns uncompressed public key (`0x04 || x || y`)
*/
function parseDerSPKI(derBytes) {
	if (derBytes.length !== SECP256R1_SPKI_HEADER.length + PASSKEY_UNCOMPRESSED_PUBLIC_KEY_SIZE) throw new Error("Invalid DER length");
	for (let i = 0; i < SECP256R1_SPKI_HEADER.length; i++) if (derBytes[i] !== SECP256R1_SPKI_HEADER[i]) throw new Error("Invalid spki header");
	if (derBytes[SECP256R1_SPKI_HEADER.length] !== 4) throw new Error("Invalid point marker");
	return derBytes.slice(SECP256R1_SPKI_HEADER.length);
}
/**
* Parse signature from bytes or base64 string into the following fields.
*/
function parseSerializedPasskeySignature(signature) {
	const bytes = typeof signature === "string" ? fromBase64(signature) : signature;
	if (bytes[0] !== SIGNATURE_SCHEME_TO_FLAG.Passkey) throw new Error("Invalid signature scheme");
	const dec = PasskeyAuthenticator.parse(bytes.slice(1));
	return {
		signatureScheme: "Passkey",
		serializedSignature: toBase64(bytes),
		signature: bytes,
		authenticatorData: dec.authenticatorData,
		clientDataJson: dec.clientDataJson,
		userSignature: new Uint8Array(dec.userSignature),
		publicKey: new Uint8Array(dec.userSignature.slice(1 + PASSKEY_SIGNATURE_SIZE))
	};
}

//#endregion
export { PASSKEY_PUBLIC_KEY_SIZE, PASSKEY_SIGNATURE_SIZE, PasskeyPublicKey, parseDerSPKI, parseSerializedPasskeySignature };
//# sourceMappingURL=publickey.mjs.map