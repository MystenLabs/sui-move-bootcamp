import { PublicKey } from "../../cryptography/publickey.mjs";
import { SignatureScheme } from "../../cryptography/signature-scheme.mjs";
import { Keypair } from "../../cryptography/keypair.mjs";

//#region src/keypairs/secp256k1/keypair.d.ts
declare const DEFAULT_SECP256K1_DERIVATION_PATH = "m/54'/784'/0'/0/0";
/**
 * Secp256k1 Keypair data
 */
interface Secp256k1KeypairData {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}
/**
 * An Secp256k1 Keypair used for signing transactions.
 */
declare class Secp256k1Keypair extends Keypair {
  private keypair;
  /**
   * Create a new keypair instance.
   * Generate random keypair if no {@link Secp256k1Keypair} is provided.
   *
   * @param keypair secp256k1 keypair
   */
  constructor(keypair?: Secp256k1KeypairData);
  /**
   * Get the key scheme of the keypair Secp256k1
   */
  getKeyScheme(): SignatureScheme;
  /**
   * Generate a new random keypair
   */
  static generate(): Secp256k1Keypair;
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
  static fromSecretKey(secretKey: Uint8Array | string, options?: {
    skipValidation?: boolean;
  }): Secp256k1Keypair;
  /**
   * Generate a keypair from a 32 byte seed.
   *
   * @param seed seed byte array
   */
  static fromSeed(seed: Uint8Array): Secp256k1Keypair;
  /**
   * The public key for this keypair
   */
  getPublicKey(): PublicKey;
  /**
   * The Bech32 secret key string for this Secp256k1 keypair
   */
  getSecretKey(): string;
  /**
   * Return the signature for the provided data.
   */
  sign(data: Uint8Array): Promise<Uint8Array<ArrayBuffer>>;
  /**
   * Derive Secp256k1 keypair from mnemonics and path. The mnemonics must be normalized
   * and validated against the english wordlist.
   *
   * If path is none, it will default to m/54'/784'/0'/0/0, otherwise the path must
   * be compliant to BIP-32 in form m/54'/784'/{account_index}'/{change_index}/{address_index}.
   */
  static deriveKeypair(mnemonics: string, path?: string): Secp256k1Keypair;
}
//#endregion
export { DEFAULT_SECP256K1_DERIVATION_PATH, Secp256k1Keypair, Secp256k1KeypairData };
//# sourceMappingURL=keypair.d.mts.map