import { messageWithIntent } from "./intent.mjs";
import { SIGNATURE_FLAG_TO_SCHEME, SIGNATURE_SCHEME_TO_FLAG } from "./signature-scheme.mjs";
import { toSerializedSignature } from "./signature.mjs";
import { bcs, toBase64 } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2.js";
import { bech32 } from "@scure/base";

//#region src/cryptography/keypair.ts
const PRIVATE_KEY_SIZE = 32;
const LEGACY_PRIVATE_KEY_SIZE = 64;
const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
/**
* TODO: Document
*/
var Signer = class {
	/**
	* Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
	* it ensures that a signed message is tied to a specific purpose and domain separator is provided
	*/
	async signWithIntent(bytes, intent) {
		const digest = blake2b(messageWithIntent(intent, bytes), { dkLen: 32 });
		return {
			signature: toSerializedSignature({
				signature: await this.sign(digest),
				signatureScheme: this.getKeyScheme(),
				publicKey: this.getPublicKey()
			}),
			bytes: toBase64(bytes)
		};
	}
	/**
	* Signs provided transaction by calling `signWithIntent()` with a `TransactionData` provided as intent scope
	*/
	async signTransaction(bytes) {
		return this.signWithIntent(bytes, "TransactionData");
	}
	/**
	* Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
	*/
	async signPersonalMessage(bytes) {
		const { signature } = await this.signWithIntent(bcs.byteVector().serialize(bytes).toBytes(), "PersonalMessage");
		return {
			bytes: toBase64(bytes),
			signature
		};
	}
	async signAndExecuteTransaction({ transaction, client }) {
		transaction.setSenderIfNotSet(this.toSuiAddress());
		const bytes = await transaction.build({ client });
		const { signature } = await this.signTransaction(bytes);
		return client.core.executeTransaction({
			transaction: bytes,
			signatures: [signature],
			include: {
				transaction: true,
				effects: true
			}
		});
	}
	toSuiAddress() {
		return this.getPublicKey().toSuiAddress();
	}
};
var Keypair = class extends Signer {};
/**
* This returns an ParsedKeypair object based by validating the
* 33-byte Bech32 encoded string starting with `suiprivkey`, and
* parse out the signature scheme and the private key in bytes.
*/
function decodeSuiPrivateKey(value) {
	const { prefix, words } = bech32.decode(value);
	if (prefix !== SUI_PRIVATE_KEY_PREFIX) throw new Error("invalid private key prefix");
	const extendedSecretKey = new Uint8Array(bech32.fromWords(words));
	const secretKey = extendedSecretKey.slice(1);
	return {
		scheme: SIGNATURE_FLAG_TO_SCHEME[extendedSecretKey[0]],
		secretKey
	};
}
/**
* This returns a Bech32 encoded string starting with `suiprivkey`,
* encoding 33-byte `flag || bytes` for the given the 32-byte private
* key and its signature scheme.
*/
function encodeSuiPrivateKey(bytes, scheme) {
	if (bytes.length !== PRIVATE_KEY_SIZE) throw new Error("Invalid bytes length");
	const flag = SIGNATURE_SCHEME_TO_FLAG[scheme];
	const privKeyBytes = new Uint8Array(bytes.length + 1);
	privKeyBytes.set([flag]);
	privKeyBytes.set(bytes, 1);
	return bech32.encode(SUI_PRIVATE_KEY_PREFIX, bech32.toWords(privKeyBytes));
}

//#endregion
export { Keypair, LEGACY_PRIVATE_KEY_SIZE, PRIVATE_KEY_SIZE, SUI_PRIVATE_KEY_PREFIX, Signer, decodeSuiPrivateKey, encodeSuiPrivateKey };
//# sourceMappingURL=keypair.mjs.map