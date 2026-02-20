import { SignatureScheme } from "../../cryptography/signature-scheme.mjs";
import { Keypair } from "../../cryptography/keypair.mjs";
import { Ed25519PublicKey } from "./publickey.mjs";

//#region src/keypairs/ed25519/keypair.d.ts
declare const DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
/**
 * Ed25519 Keypair data. The publickey is the 32-byte public key and
 * the secretkey is 64-byte, where the first 32 bytes is the secret
 * key and the last 32 bytes is the public key.
 */
interface Ed25519KeypairData {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}
/**
 * An Ed25519 Keypair used for signing transactions.
 */
declare class Ed25519Keypair extends Keypair {
  private keypair;
  /**
   * Create a new Ed25519 keypair instance.
   * Generate random keypair if no {@link Ed25519Keypair} is provided.
   *
   * @param keypair Ed25519 keypair
   */
  constructor(keypair?: Ed25519KeypairData);
  /**
   * Get the key scheme of the keypair ED25519
   */
  getKeyScheme(): SignatureScheme;
  /**
   * Generate a new random Ed25519 keypair
   */
  static generate(): Ed25519Keypair;
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
  static fromSecretKey(secretKey: Uint8Array | string, options?: {
    skipValidation?: boolean;
  }): Ed25519Keypair;
  /**
   * The public key for this Ed25519 keypair
   */
  getPublicKey(): Ed25519PublicKey;
  /**
   * The Bech32 secret key string for this Ed25519 keypair
   */
  getSecretKey(): string;
  /**
   * Return the signature for the provided data using Ed25519.
   */
  sign(data: Uint8Array): Promise<Uint8Array<ArrayBuffer>>;
  /**
   * Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
   * and validated against the english wordlist.
   *
   * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
   * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
   */
  static deriveKeypair(mnemonics: string, path?: string): Ed25519Keypair;
  /**
   * Derive Ed25519 keypair from mnemonicSeed and path.
   *
   * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
   * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
   */
  static deriveKeypairFromSeed(seedHex: string, path?: string): Ed25519Keypair;
}
//#endregion
export { DEFAULT_ED25519_DERIVATION_PATH, Ed25519Keypair, Ed25519KeypairData };
//# sourceMappingURL=keypair.d.mts.map