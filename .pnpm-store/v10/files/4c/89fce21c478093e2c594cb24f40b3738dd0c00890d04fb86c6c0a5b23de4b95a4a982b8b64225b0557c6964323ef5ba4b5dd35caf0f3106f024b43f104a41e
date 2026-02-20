import { isValidBIP32Path, mnemonicToSeed } from "../../cryptography/mnemonics.mjs";
import { Keypair, decodeSuiPrivateKey, encodeSuiPrivateKey } from "../../cryptography/keypair.mjs";
import { Secp256r1PublicKey } from "./publickey.mjs";
import { blake2b } from "@noble/hashes/blake2.js";
import { p256 } from "@noble/curves/nist.js";
import { HDKey } from "@scure/bip32";

//#region src/keypairs/secp256r1/keypair.ts
const DEFAULT_SECP256R1_DERIVATION_PATH = "m/74'/784'/0'/0/0";
/**
* An Secp256r1 Keypair used for signing transactions.
*/
var Secp256r1Keypair = class Secp256r1Keypair extends Keypair {
	/**
	* Create a new keypair instance.
	* Generate random keypair if no {@link Secp256r1Keypair} is provided.
	*
	* @param keypair Secp256r1 keypair
	*/
	constructor(keypair) {
		super();
		if (keypair) this.keypair = keypair;
		else {
			const secretKey = p256.utils.randomSecretKey();
			this.keypair = {
				publicKey: p256.getPublicKey(secretKey, true),
				secretKey
			};
		}
	}
	/**
	* Get the key scheme of the keypair Secp256r1
	*/
	getKeyScheme() {
		return "Secp256r1";
	}
	/**
	* Generate a new random keypair
	*/
	static generate() {
		return new Secp256r1Keypair();
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
	* @param secretKey secret key byte array or Bech32 secret key string
	* @param options: skip secret key validation
	*/
	static fromSecretKey(secretKey, options) {
		if (typeof secretKey === "string") {
			const decoded = decodeSuiPrivateKey(secretKey);
			if (decoded.scheme !== "Secp256r1") throw new Error(`Expected a Secp256r1 keypair, got ${decoded.scheme}`);
			return this.fromSecretKey(decoded.secretKey, options);
		}
		const publicKey = p256.getPublicKey(secretKey, true);
		if (!options || !options.skipValidation) {
			const msgHash = blake2b(new TextEncoder().encode("sui validation"), { dkLen: 32 });
			const signature = p256.sign(msgHash, secretKey, {
				lowS: true,
				prehash: false
			});
			if (!p256.verify(signature, msgHash, publicKey, {
				lowS: true,
				prehash: false
			})) throw new Error("Provided secretKey is invalid");
		}
		return new Secp256r1Keypair({
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
		return new Secp256r1Keypair({
			publicKey: p256.getPublicKey(seed, true),
			secretKey: seed
		});
	}
	/**
	* The public key for this keypair
	*/
	getPublicKey() {
		return new Secp256r1PublicKey(this.keypair.publicKey);
	}
	/**
	* The Bech32 secret key string for this Secp256r1 keypair
	*/
	getSecretKey() {
		return encodeSuiPrivateKey(this.keypair.secretKey, this.getKeyScheme());
	}
	/**
	* Return the signature for the provided data.
	*/
	async sign(data) {
		return p256.sign(data, this.keypair.secretKey, { lowS: true });
	}
	/**
	* Derive Secp256r1 keypair from mnemonics and path. The mnemonics must be normalized
	* and validated against the english wordlist.
	*
	* If path is none, it will default to m/74'/784'/0'/0/0, otherwise the path must
	* be compliant to BIP-32 in form m/74'/784'/{account_index}'/{change_index}/{address_index}.
	*/
	static deriveKeypair(mnemonics, path) {
		if (path == null) path = DEFAULT_SECP256R1_DERIVATION_PATH;
		if (!isValidBIP32Path(path)) throw new Error("Invalid derivation path");
		const privateKey = HDKey.fromMasterSeed(mnemonicToSeed(mnemonics)).derive(path).privateKey;
		return Secp256r1Keypair.fromSecretKey(privateKey);
	}
};

//#endregion
export { DEFAULT_SECP256R1_DERIVATION_PATH, Secp256r1Keypair };
//# sourceMappingURL=keypair.mjs.map