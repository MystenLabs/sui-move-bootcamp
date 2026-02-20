import { isValidHardenedPath, mnemonicToSeedHex } from "../../cryptography/mnemonics.mjs";
import { Keypair, PRIVATE_KEY_SIZE, decodeSuiPrivateKey, encodeSuiPrivateKey } from "../../cryptography/keypair.mjs";
import { derivePath } from "./ed25519-hd-key.mjs";
import { Ed25519PublicKey } from "./publickey.mjs";
import { ed25519 } from "@noble/curves/ed25519.js";

//#region src/keypairs/ed25519/keypair.ts
const DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
/**
* An Ed25519 Keypair used for signing transactions.
*/
var Ed25519Keypair = class Ed25519Keypair extends Keypair {
	/**
	* Create a new Ed25519 keypair instance.
	* Generate random keypair if no {@link Ed25519Keypair} is provided.
	*
	* @param keypair Ed25519 keypair
	*/
	constructor(keypair) {
		super();
		if (keypair) this.keypair = {
			publicKey: keypair.publicKey,
			secretKey: keypair.secretKey.slice(0, 32)
		};
		else {
			const privateKey = ed25519.utils.randomSecretKey();
			this.keypair = {
				publicKey: ed25519.getPublicKey(privateKey),
				secretKey: privateKey
			};
		}
	}
	/**
	* Get the key scheme of the keypair ED25519
	*/
	getKeyScheme() {
		return "ED25519";
	}
	/**
	* Generate a new random Ed25519 keypair
	*/
	static generate() {
		const secretKey = ed25519.utils.randomSecretKey();
		return new Ed25519Keypair({
			publicKey: ed25519.getPublicKey(secretKey),
			secretKey
		});
	}
	/**
	* Create a Ed25519 keypair from a raw secret key byte array, also known as seed.
	* This is NOT the private scalar which is result of hashing and bit clamping of
	* the raw secret key.
	*
	* @throws error if the provided secret key is invalid and validation is not skipped.
	*
	* @param secretKey secret key as a byte array or Bech32 secret key string
	* @param options: skip secret key validation
	*/
	static fromSecretKey(secretKey, options) {
		if (typeof secretKey === "string") {
			const decoded = decodeSuiPrivateKey(secretKey);
			if (decoded.scheme !== "ED25519") throw new Error(`Expected a ED25519 keypair, got ${decoded.scheme}`);
			return this.fromSecretKey(decoded.secretKey, options);
		}
		const secretKeyLength = secretKey.length;
		if (secretKeyLength !== PRIVATE_KEY_SIZE) throw new Error(`Wrong secretKey size. Expected ${PRIVATE_KEY_SIZE} bytes, got ${secretKeyLength}.`);
		const keypair = {
			publicKey: ed25519.getPublicKey(secretKey),
			secretKey
		};
		if (!options || !options.skipValidation) {
			const signData = new TextEncoder().encode("sui validation");
			const signature = ed25519.sign(signData, secretKey);
			if (!ed25519.verify(signature, signData, keypair.publicKey)) throw new Error("provided secretKey is invalid");
		}
		return new Ed25519Keypair(keypair);
	}
	/**
	* The public key for this Ed25519 keypair
	*/
	getPublicKey() {
		return new Ed25519PublicKey(this.keypair.publicKey);
	}
	/**
	* The Bech32 secret key string for this Ed25519 keypair
	*/
	getSecretKey() {
		return encodeSuiPrivateKey(this.keypair.secretKey.slice(0, PRIVATE_KEY_SIZE), this.getKeyScheme());
	}
	/**
	* Return the signature for the provided data using Ed25519.
	*/
	async sign(data) {
		return ed25519.sign(data, this.keypair.secretKey);
	}
	/**
	* Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
	* and validated against the english wordlist.
	*
	* If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
	* be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
	*/
	static deriveKeypair(mnemonics, path) {
		if (path == null) path = DEFAULT_ED25519_DERIVATION_PATH;
		if (!isValidHardenedPath(path)) throw new Error("Invalid derivation path");
		const { key } = derivePath(path, mnemonicToSeedHex(mnemonics));
		return Ed25519Keypair.fromSecretKey(key);
	}
	/**
	* Derive Ed25519 keypair from mnemonicSeed and path.
	*
	* If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
	* be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
	*/
	static deriveKeypairFromSeed(seedHex, path) {
		if (path == null) path = DEFAULT_ED25519_DERIVATION_PATH;
		if (!isValidHardenedPath(path)) throw new Error("Invalid derivation path");
		const { key } = derivePath(path, seedHex);
		return Ed25519Keypair.fromSecretKey(key);
	}
};

//#endregion
export { DEFAULT_ED25519_DERIVATION_PATH, Ed25519Keypair };
//# sourceMappingURL=keypair.mjs.map