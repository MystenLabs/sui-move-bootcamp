import { PublicKey, PublicKeyInitData } from "../../cryptography/publickey.mjs";

//#region src/keypairs/ed25519/publickey.d.ts

/**
 * An Ed25519 public key
 */
declare class Ed25519PublicKey extends PublicKey {
  static SIZE: number;
  private data;
  /**
   * Create a new Ed25519PublicKey object
   * @param value ed25519 public key as buffer or base-64 encoded string
   */
  constructor(value: PublicKeyInitData);
  /**
   * Checks if two Ed25519 public keys are equal
   */
  equals(publicKey: Ed25519PublicKey): boolean;
  /**
   * Return the byte array representation of the Ed25519 public key
   */
  toRawBytes(): Uint8Array<ArrayBuffer>;
  /**
   * Return the Sui address associated with this Ed25519 public key
   */
  flag(): number;
  /**
   * Verifies that the signature is valid for for the provided message
   */
  verify(message: Uint8Array, signature: Uint8Array | string): Promise<boolean>;
}
//#endregion
export { Ed25519PublicKey };
//# sourceMappingURL=publickey.d.mts.map