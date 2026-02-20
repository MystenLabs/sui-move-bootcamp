import { bcs as suiBcs } from "../bcs/index.mjs";
import { SIGNATURE_FLAG_TO_SCHEME, SIGNATURE_SCHEME_TO_FLAG } from "./signature-scheme.mjs";
import { parseSerializedKeypairSignature } from "./publickey.mjs";
import { parseSerializedPasskeySignature } from "../keypairs/passkey/publickey.mjs";
import { parseSerializedZkLoginSignature } from "../zklogin/publickey.mjs";
import { fromBase64, toBase64 } from "@mysten/bcs";

//#region src/cryptography/signature.ts
/**
* Takes in a signature, its associated signing scheme and a public key, then serializes this data
*/
function toSerializedSignature({ signature, signatureScheme, publicKey }) {
	if (!publicKey) throw new Error("`publicKey` is required");
	const pubKeyBytes = publicKey.toRawBytes();
	const serializedSignature = new Uint8Array(1 + signature.length + pubKeyBytes.length);
	serializedSignature.set([SIGNATURE_SCHEME_TO_FLAG[signatureScheme]]);
	serializedSignature.set(signature, 1);
	serializedSignature.set(pubKeyBytes, 1 + signature.length);
	return toBase64(serializedSignature);
}
/**
* Decodes a serialized signature into its constituent components: the signature scheme, the actual signature, and the public key
*/
function parseSerializedSignature(serializedSignature) {
	const bytes = fromBase64(serializedSignature);
	const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
	switch (signatureScheme) {
		case "Passkey": return parseSerializedPasskeySignature(serializedSignature);
		case "MultiSig": return {
			serializedSignature,
			signatureScheme,
			multisig: suiBcs.MultiSig.parse(bytes.slice(1)),
			bytes,
			signature: void 0
		};
		case "ZkLogin": return parseSerializedZkLoginSignature(serializedSignature);
		case "ED25519":
		case "Secp256k1":
		case "Secp256r1": return parseSerializedKeypairSignature(serializedSignature);
		default: throw new Error("Unsupported signature scheme");
	}
}

//#endregion
export { parseSerializedSignature, toSerializedSignature };
//# sourceMappingURL=signature.mjs.map