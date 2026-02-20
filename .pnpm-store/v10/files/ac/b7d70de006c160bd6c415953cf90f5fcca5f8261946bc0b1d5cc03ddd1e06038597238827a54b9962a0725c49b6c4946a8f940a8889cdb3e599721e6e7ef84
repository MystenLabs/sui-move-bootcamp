import { PasskeyAuthenticator } from "../../bcs/bcs.mjs";
import { messageWithIntent } from "../../cryptography/intent.mjs";
import { SIGNATURE_SCHEME_TO_FLAG } from "../../cryptography/signature-scheme.mjs";
import { PASSKEY_PUBLIC_KEY_SIZE, PASSKEY_SIGNATURE_SIZE, PasskeyPublicKey, parseDerSPKI } from "./publickey.mjs";
import { Signer } from "../../cryptography/keypair.mjs";
import { toBase64 } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2.js";
import { p256 } from "@noble/curves/nist.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { randomBytes } from "@noble/hashes/utils.js";

//#region src/keypairs/passkey/keypair.ts
var BrowserPasskeyProvider = class {
	#name;
	#options;
	constructor(name, options) {
		this.#name = name;
		this.#options = options;
	}
	async create() {
		return await navigator.credentials.create({ publicKey: {
			timeout: this.#options.timeout ?? 6e4,
			...this.#options,
			rp: {
				name: this.#name,
				...this.#options.rp
			},
			user: {
				name: this.#name,
				displayName: this.#name,
				...this.#options.user,
				id: randomBytes(10)
			},
			challenge: new TextEncoder().encode("Create passkey wallet on Sui"),
			pubKeyCredParams: [{
				alg: -7,
				type: "public-key"
			}],
			authenticatorSelection: {
				authenticatorAttachment: "cross-platform",
				residentKey: "required",
				requireResidentKey: true,
				userVerification: "required",
				...this.#options.authenticatorSelection
			}
		} });
	}
	async get(challenge) {
		return await navigator.credentials.get({ publicKey: {
			challenge,
			userVerification: this.#options.authenticatorSelection?.userVerification || "required",
			timeout: this.#options.timeout ?? 6e4
		} });
	}
};
/**
* @experimental
* A passkey signer used for signing transactions. This is a client side implementation for [SIP-9](https://github.com/sui-foundation/sips/blob/main/sips/sip-9.md).
*/
var PasskeyKeypair = class PasskeyKeypair extends Signer {
	/**
	* Get the key scheme of passkey,
	*/
	getKeyScheme() {
		return "Passkey";
	}
	/**
	* Creates an instance of Passkey signer. If no passkey wallet had created before,
	* use `getPasskeyInstance`. For example:
	* ```
	* let provider = new BrowserPasskeyProvider('Sui Passkey Example',{
	* 	  rpName: 'Sui Passkey Example',
	* 	  rpId: window.location.hostname,
	* } as BrowserPasswordProviderOptions);
	* const signer = await PasskeyKeypair.getPasskeyInstance(provider);
	* ```
	*
	* If there are existing passkey wallet, use `signAndRecover` to identify the correct
	* public key and then initialize the instance. See usage in `signAndRecover`.
	*/
	constructor(publicKey, provider) {
		super();
		this.publicKey = publicKey;
		this.provider = provider;
	}
	/**
	* Creates an instance of Passkey signer invoking the passkey from navigator.
	* Note that this will invoke the passkey device to create a fresh credential.
	* Should only be called if passkey wallet is created for the first time.
	*
	* @param provider - the passkey provider.
	* @returns the passkey instance.
	*/
	static async getPasskeyInstance(provider) {
		const credential = await provider.create();
		if (!credential.response.getPublicKey()) throw new Error("Invalid credential create response");
		else {
			const derSPKI = credential.response.getPublicKey();
			const pubkeyUncompressed = parseDerSPKI(new Uint8Array(derSPKI));
			return new PasskeyKeypair(p256.Point.fromBytes(pubkeyUncompressed).toBytes(true), provider);
		}
	}
	/**
	* Return the public key for this passkey.
	*/
	getPublicKey() {
		return new PasskeyPublicKey(this.publicKey);
	}
	/**
	* Return the signature for the provided data (i.e. blake2b(intent_message)).
	* This is sent to passkey as the challenge field.
	*/
	async sign(data) {
		const credential = await this.provider.get(data);
		const authenticatorData = new Uint8Array(credential.response.authenticatorData);
		const clientDataJSON = new Uint8Array(credential.response.clientDataJSON);
		const clientDataJSONString = new TextDecoder().decode(clientDataJSON);
		const sig = p256.Signature.fromBytes(new Uint8Array(credential.response.signature), "der");
		const normalized = (sig.hasHighS() ? new p256.Signature(sig.r, p256.Point.Fn.neg(sig.s)) : sig).toBytes("compact");
		if (normalized.length !== PASSKEY_SIGNATURE_SIZE || this.publicKey.length !== PASSKEY_PUBLIC_KEY_SIZE) throw new Error("Invalid signature or public key length");
		const arr = new Uint8Array(1 + normalized.length + this.publicKey.length);
		arr.set([SIGNATURE_SCHEME_TO_FLAG["Secp256r1"]]);
		arr.set(normalized, 1);
		arr.set(this.publicKey, 1 + normalized.length);
		return PasskeyAuthenticator.serialize({
			authenticatorData,
			clientDataJson: clientDataJSONString,
			userSignature: arr
		}).toBytes();
	}
	/**
	* This overrides the base class implementation that accepts the raw bytes and signs its
	* digest of the intent message, then serialize it with the passkey flag.
	*/
	async signWithIntent(bytes, intent) {
		const digest = blake2b(messageWithIntent(intent, bytes), { dkLen: 32 });
		const signature = await this.sign(digest);
		const serializedSignature = new Uint8Array(1 + signature.length);
		serializedSignature.set([SIGNATURE_SCHEME_TO_FLAG[this.getKeyScheme()]]);
		serializedSignature.set(signature, 1);
		return {
			signature: toBase64(serializedSignature),
			bytes: toBase64(bytes)
		};
	}
	/**
	* Given a message, asks the passkey device to sign it and return all (up to 4) possible public keys.
	* See: https://bitcoin.stackexchange.com/questions/81232/how-is-public-key-extracted-from-message-digital-signature-address
	*
	* This is useful if the user previously created passkey wallet with the origin, but the wallet session
	* does not have the public key / address. By calling this method twice with two different messages, the
	* wallet can compare the returned public keys and uniquely identify the previously created passkey wallet
	* using `findCommonPublicKey`.
	*
	* Alternatively, one call can be made and all possible public keys should be checked onchain to see if
	* there is any assets.
	*
	* Once the correct public key is identified, a passkey instance can then be initialized with this public key.
	*
	* Example usage to recover wallet with two signing calls:
	* ```
	* let provider = new BrowserPasskeyProvider('Sui Passkey Example',{
	*     rpName: 'Sui Passkey Example',
	* 	   rpId: window.location.hostname,
	* } as BrowserPasswordProviderOptions);
	* const testMessage = new TextEncoder().encode('Hello world!');
	* const possiblePks = await PasskeyKeypair.signAndRecover(provider, testMessage);
	* const testMessage2 = new TextEncoder().encode('Hello world 2!');
	* const possiblePks2 = await PasskeyKeypair.signAndRecover(provider, testMessage2);
	* const commonPk = findCommonPublicKey(possiblePks, possiblePks2);
	* const signer = new PasskeyKeypair(provider, commonPk.toRawBytes());
	* ```
	*
	* @param provider - the passkey provider.
	* @param message - the message to sign.
	* @returns all possible public keys.
	*/
	static async signAndRecover(provider, message) {
		const credential = await provider.get(message);
		const fullMessage = messageFromAssertionResponse(credential.response);
		const sig = p256.Signature.fromBytes(new Uint8Array(credential.response.signature), "der");
		const res = [];
		const msgHash = sha256(fullMessage);
		for (let i = 0; i < 4; i++) {
			const s = sig.addRecoveryBit(i);
			try {
				const pk = new PasskeyPublicKey(s.recoverPublicKey(msgHash).toBytes(true));
				res.push(pk);
			} catch {
				continue;
			}
		}
		return res;
	}
};
/**
* Finds the unique public key that exists in both arrays, throws error if the common
* pubkey does not equal to one.
*
* @param arr1 - The first pubkeys array.
* @param arr2 - The second pubkeys array.
* @returns The only common pubkey in both arrays.
*/
function findCommonPublicKey(arr1, arr2) {
	const matchingPubkeys = [];
	for (const pubkey1 of arr1) for (const pubkey2 of arr2) if (pubkey1.equals(pubkey2)) matchingPubkeys.push(pubkey1);
	if (matchingPubkeys.length !== 1) throw new Error("No unique public key found");
	return matchingPubkeys[0];
}
/**
* Constructs the message that the passkey signature is produced over as authenticatorData || sha256(clientDataJSON).
*/
function messageFromAssertionResponse(response) {
	const authenticatorData = new Uint8Array(response.authenticatorData);
	const clientDataJSONDigest = sha256(new Uint8Array(response.clientDataJSON));
	return new Uint8Array([...authenticatorData, ...clientDataJSONDigest]);
}

//#endregion
export { BrowserPasskeyProvider, PasskeyKeypair, findCommonPublicKey };
//# sourceMappingURL=keypair.mjs.map