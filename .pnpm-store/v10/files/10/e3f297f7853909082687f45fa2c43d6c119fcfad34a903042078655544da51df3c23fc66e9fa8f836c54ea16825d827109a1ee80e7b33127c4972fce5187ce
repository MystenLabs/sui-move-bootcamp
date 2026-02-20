import { PublicKey, PublicKeyInitData } from "../../cryptography/publickey.mjs";

//#region src/keypairs/passkey/publickey.d.ts

/**
 * A passkey public key
 */
declare class PasskeyPublicKey extends PublicKey {
  static SIZE: number;
  private data;
  /**
   * Create a new PasskeyPublicKey object
   * @param value passkey public key as buffer or base-64 encoded string
   */
  constructor(value: PublicKeyInitData);
  /**
   * Checks if two passkey public keys are equal
   */
  equals(publicKey: PasskeyPublicKey): boolean;
  /**
   * Return the byte array representation of the Secp256r1 public key
   */
  toRawBytes(): Uint8Array<ArrayBuffer>;
  /**
   * Return the Sui address associated with this Secp256r1 public key
   */
  flag(): number;
  /**
   * Verifies that the signature is valid for for the provided message
   */
  verify(message: Uint8Array, signature: Uint8Array | string): Promise<boolean>;
}
//#endregion
export { PasskeyPublicKey };
//# sourceMappingURL=publickey.d.mts.map