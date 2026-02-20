import { isValidBIP32Path, mnemonicToSeed } from "../../cryptography/mnemonics.mjs";
import { Keypair, decodeSuiPrivateKey, encodeSuiPrivateKey } from "../../cryptography/keypair.mjs";
import { Secp256k1PublicKey } from "./publickey.mjs";
import { blake2b } from "@noble/hashes/blake2.js";
import { secp256k1 } from "@noble/curves/secp256k1.js";
import { HDKey } from "@scure/bip32";

//#region src/keypairs/secp256k1/keypair.ts
const DEFAULT_SECP256K1_DERIVATION_PATH = "m/54'/784'/0'/0/0";
/**
* An Secp256k1 Keypair used for signing transactions.
*/
var Secp256k1Keypair = class Secp256k1Keypair extends Keypair {
	/**
	* Create a new keypair instance.
	* Generate random keypair if no {@link Secp256k1Keypair} is provided.
	*
	* @param keypair secp256k1 keypair
	*/
	constructor(keypair) {
		super();
		if (keypair) this.keypair = keypair;
		else {
			const secretKey = secp256k1.utils.randomSecretKey();
			this.keypair = {
				publicKey: secp256k1.getPublicKey(secretKey, true),
				secretKey
			};
		}
	}
	/**
	* Get the key scheme of the keypair Secp256k1
	*/
	getKeyScheme() {
		return "Secp256k1";
	}
	/**
	* Generate a new random keypair
	*/
	static generate() {
		return new Secp256k1Keypair();
	}
	/**
	* Create a keypair from a raw secret key byte array.
	*
	* This method should only be used to recreate a keypair from a previously
	* generated secret key. Generating keypairs from a random seed should be done
	* with the {@link Keypair.fromSeed} method.
	*
	* @throws error if the provided secret key is invalid and validation is not skipped.
	*
	* @param secretKey secret key byte array  or Bech32 secret key string
	* @param options: skip secret key validation
	*/
	static fromSecretKey(secretKey, options) {
		if (typeof secretKey === "string") {
			const decoded = decodeSuiPrivateKey(secretKey);
			if (decoded.scheme !== "Secp256k1") throw new Error(`Expected a Secp256k1 keypair, got ${decoded.scheme}`);
			return this.fromSecretKey(decoded.secretKey, options);
		}
		const publicKey = secp256k1.getPublicKey(secretKey, true);
		if (!options || !options.skipValidation) {
			const msgHash = blake2b(new TextEncoder().encode("sui validation"), { dkLen: 32 });
			const signature = secp256k1.sign(msgHash, secretKey, { prehash: false });
			if (!secp256k1.verify(signature, msgHash, publicKey, {
				lowS: true,
				prehash: false
			})) throw new Error("Provided secretKey is invalid");
		}
		return new Secp256k1Keypair({
			publicKey,
			secretKey
		});
	}
	/**
	* Generate a keypair from a 32 byte seed.
	*
	* @param seed seed byte array
	*/
	static fromSeed(seed) {
		return new Secp256k1Keypair({
			publicKey: secp256k1.getPublicKey(seed, true),
			secretKey: seed
		});
	}
	/**
	* The public key for this keypair
	*/
	getPublicKey() {
		return new Secp256k1PublicKey(this.keypair.publicKey);
	}
	/**
	* The Bech32 secret key string for this Secp256k1 keypair
	*/
	getSecretKey() {
		return encodeSuiPrivateKey(this.keypair.secretKey, this.getKeyScheme());
	}
	/**
	* Return the signature for the provided data.
	*/
	async sign(data) {
		return secp256k1.sign(data, this.keypair.secretKey, { lowS: true });
	}
	/**
	* Derive Secp256k1 keypair from mnemonics and path. The mnemonics must be normalized
	* and validated against the english wordlist.
	*
	* If path is none, it will default to m/54'/784'/0'/0/0, otherwise the path must
	* be compliant to BIP-32 in form m/54'/784'/{account_index}'/{change_index}/{address_index}.
	*/
	static deriveKeypair(mnemonics, path) {
		if (path == null) path = DEFAULT_SECP256K1_DERIVATION_PATH;
		if (!isValidBIP32Path(path)) throw new Error("Invalid derivation path");
		const key = HDKey.fromMasterSeed(mnemonicToSeed(mnemonics)).derive(path);
		if (key.publicKey == null || key.privateKey == null) throw new Error("Invalid key");
		return new Secp256k1Keypair({
			publicKey: key.publicKey,
			secretKey: key.privateKey
		});
	}
};

//#endregion
export { DEFAULT_SECP256K1_DERIVATION_PATH, Secp256k1Keypair };
//# sourceMappingURL=keypair.mjs.map