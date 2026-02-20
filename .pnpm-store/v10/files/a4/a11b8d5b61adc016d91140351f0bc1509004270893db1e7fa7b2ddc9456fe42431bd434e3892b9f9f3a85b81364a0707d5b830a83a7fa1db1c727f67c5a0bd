import { PublicKey, PublicKeyInitData } from "../../cryptography/publickey.mjs";

//#region src/keypairs/secp256k1/publickey.d.ts

/**
 * A Secp256k1 public key
 */
declare class Secp256k1PublicKey extends PublicKey {
  static SIZE: number;
  private data;
  /**
   * Create a new Secp256k1PublicKey object
   * @param value secp256k1 public key as buffer or base-64 encoded string
   */
  constructor(value: PublicKeyInitData);
  /**
   * Checks if two Secp256k1 public keys are equal
   */
  equals(publicKey: Secp256k1PublicKey): boolean;
  /**
   * Return the byte array representation of the Secp256k1 public key
   */
  toRawBytes(): Uint8Array<ArrayBuffer>;
  /**
   * Return the Sui address associated with this Secp256k1 public key
   */
  flag(): number;
  /**
   * Verifies that the signature is valid for for the provided message
   */
  verify(message: Uint8Array, signature: Uint8Array | string): Promise<boolean>;
}
//#endregion
export { Secp256k1PublicKey };
//# sourceMappingURL=publickey.d.mts.map