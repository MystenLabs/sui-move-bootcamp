import { PublicKey, PublicKeyInitData } from "../cryptography/publickey.mjs";
import { ClientWithCoreApi } from "../client/core.mjs";
import { ZkLoginSignatureInputs } from "./bcs.mjs";

//#region src/zklogin/publickey.d.ts

/**
 * A zkLogin public identifier
 */
declare class ZkLoginPublicIdentifier extends PublicKey {
  #private;
  /**
   * Create a new ZkLoginPublicIdentifier object
   * @param value zkLogin public identifier as buffer or base-64 encoded string
   */
  constructor(value: PublicKeyInitData, {
    client
  }?: {
    client?: ClientWithCoreApi;
  });
  static fromBytes(bytes: Uint8Array, {
    client,
    address,
    legacyAddress
  }?: {
    client?: ClientWithCoreApi;
    address?: string;
    legacyAddress?: boolean;
  }): ZkLoginPublicIdentifier;
  static fromProof(address: string, proof: ZkLoginSignatureInputs): ZkLoginPublicIdentifier;
  /**
   * Checks if two zkLogin public identifiers are equal
   */
  equals(publicKey: ZkLoginPublicIdentifier): boolean;
  toSuiAddress(): string;
  /**
   * Return the byte array representation of the zkLogin public identifier
   */
  toRawBytes(): Uint8Array<ArrayBuffer>;
  /**
   * Return the Sui address associated with this ZkLogin public identifier
   */
  flag(): number;
  /**
   * Verifies that the signature is valid for for the provided message
   */
  verify(_message: Uint8Array, _signature: Uint8Array | string): Promise<boolean>;
  /**
   * Verifies that the signature is valid for for the provided PersonalMessage
   */
  verifyPersonalMessage(message: Uint8Array, signature: Uint8Array | string): Promise<boolean>;
  /**
   * Verifies that the signature is valid for for the provided Transaction
   */
  verifyTransaction(transaction: Uint8Array, signature: Uint8Array | string): Promise<boolean>;
  /**
   * Verifies that the public key is associated with the provided address
   */
  verifyAddress(address: string): boolean;
}
declare function toZkLoginPublicIdentifier(addressSeed: bigint, iss: string, options: {
  client?: ClientWithCoreApi;
  legacyAddress: boolean;
}): ZkLoginPublicIdentifier;
//#endregion
export { ZkLoginPublicIdentifier, toZkLoginPublicIdentifier };
//# sourceMappingURL=publickey.d.mts.map