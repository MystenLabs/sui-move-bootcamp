import { SIGNATURE_FLAG_TO_SCHEME } from "../cryptography/signature-scheme.mjs";
import { PasskeyPublicKey } from "../keypairs/passkey/publickey.mjs";
import { ZkLoginPublicIdentifier } from "../zklogin/publickey.mjs";
import { parseSerializedSignature } from "../cryptography/signature.mjs";
import { Ed25519PublicKey } from "../keypairs/ed25519/publickey.mjs";
import { Secp256k1PublicKey } from "../keypairs/secp256k1/publickey.mjs";
import { Secp256r1PublicKey } from "../keypairs/secp256r1/publickey.mjs";
import { MultiSigPublicKey } from "../multisig/publickey.mjs";
import { fromBase64 } from "@mysten/bcs";

//#region src/verify/verify.ts
async function verifySignature(bytes, signature, options) {
	const parsedSignature = parseSignature(signature);
	if (!await parsedSignature.publicKey.verify(bytes, parsedSignature.serializedSignature)) throw new Error(`Signature is not valid for the provided data`);
	if (options?.address && !parsedSignature.publicKey.verifyAddress(options.address)) throw new Error(`Signature is not valid for the provided address`);
	return parsedSignature.publicKey;
}
async function verifyPersonalMessageSignature(message, signature, options = {}) {
	const parsedSignature = parseSignature(signature, options);
	if (!await parsedSignature.publicKey.verifyPersonalMessage(message, parsedSignature.serializedSignature)) throw new Error(`Signature is not valid for the provided message`);
	if (options?.address && !parsedSignature.publicKey.verifyAddress(options.address)) throw new Error(`Signature is not valid for the provided address`);
	return parsedSignature.publicKey;
}
async function verifyTransactionSignature(transaction, signature, options = {}) {
	const parsedSignature = parseSignature(signature, options);
	if (!await parsedSignature.publicKey.verifyTransaction(transaction, parsedSignature.serializedSignature)) throw new Error(`Signature is not valid for the provided Transaction`);
	if (options?.address && !parsedSignature.publicKey.verifyAddress(options.address)) throw new Error(`Signature is not valid for the provided address`);
	return parsedSignature.publicKey;
}
function parseSignature(signature, options = {}) {
	const parsedSignature = parseSerializedSignature(signature);
	if (parsedSignature.signatureScheme === "MultiSig") return {
		...parsedSignature,
		publicKey: new MultiSigPublicKey(parsedSignature.multisig.multisig_pk)
	};
	const publicKey = publicKeyFromRawBytes(parsedSignature.signatureScheme, parsedSignature.publicKey, options);
	return {
		...parsedSignature,
		publicKey
	};
}
function publicKeyFromRawBytes(signatureScheme, bytes, options = {}) {
	let publicKey;
	switch (signatureScheme) {
		case "ED25519":
			publicKey = new Ed25519PublicKey(bytes);
			break;
		case "Secp256k1":
			publicKey = new Secp256k1PublicKey(bytes);
			break;
		case "Secp256r1":
			publicKey = new Secp256r1PublicKey(bytes);
			break;
		case "MultiSig":
			publicKey = new MultiSigPublicKey(bytes);
			break;
		case "ZkLogin":
			publicKey = ZkLoginPublicIdentifier.fromBytes(bytes, options);
			break;
		case "Passkey":
			publicKey = new PasskeyPublicKey(bytes);
			break;
		default: throw new Error(`Unsupported signature scheme ${signatureScheme}`);
	}
	if (options.address && publicKey.toSuiAddress() !== options.address) throw new Error(`Public key bytes do not match the provided address`);
	return publicKey;
}
function publicKeyFromSuiBytes(publicKey, options = {}) {
	const bytes = typeof publicKey === "string" ? fromBase64(publicKey) : publicKey;
	const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
	return publicKeyFromRawBytes(signatureScheme, bytes.slice(1), options);
}

//#endregion
export { publicKeyFromRawBytes, publicKeyFromSuiBytes, verifyPersonalMessageSignature, verifySignature, verifyTransactionSignature };
//# sourceMappingURL=verify.mjs.map