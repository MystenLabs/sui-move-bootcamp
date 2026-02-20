import { PublicKey } from "../cryptography/publickey.mjs";
import { SignatureScheme } from "../cryptography/signature-scheme.mjs";
import { Signer } from "../cryptography/keypair.mjs";
import { MultiSigSigner } from "./signer.mjs";
import { ClientWithCoreApi } from "../client/core.mjs";

//#region src/multisig/publickey.d.ts
type CompressedSignature = {
  ED25519: Uint8Array;
} | {
  Secp256k1: Uint8Array;
} | {
  Secp256r1: Uint8Array;
} | {
  ZkLogin: Uint8Array;
} | {
  Passkey: Uint8Array;
};
type PublicKeyEnum = {
  ED25519: Uint8Array;
} | {
  Secp256k1: Uint8Array;
} | {
  Secp256r1: Uint8Array;
} | {
  ZkLogin: Uint8Array;
} | {
  Passkey: Uint8Array;
};
type PubkeyEnumWeightPair = {
  pubKey: PublicKeyEnum;
  weight: number;
};
type MultiSigPublicKeyStruct = {
  pk_map: PubkeyEnumWeightPair[];
  threshold: number;
};
type MultiSigStruct = {
  sigs: CompressedSignature[];
  bitmap: number;
  multisig_pk: MultiSigPublicKeyStruct;
};
type ParsedPartialMultiSigSignature = {
  signatureScheme: SignatureScheme;
  signature: Uint8Array;
  publicKey: PublicKey;
  weight: number;
};
/**
 * A MultiSig public key
 */
declare class MultiSigPublicKey extends PublicKey {
  private rawBytes;
  private multisigPublicKey;
  private publicKeys;
  /**
   * Create a new MultiSigPublicKey object
   */
  constructor(
  /**
   *  MultiSig public key as buffer or base-64 encoded string
   */
  value: string | Uint8Array | MultiSigPublicKeyStruct, options?: {
    client?: ClientWithCoreApi;
  });
  /**
   * 	A static method to create a new MultiSig publickey instance from a set of public keys and their associated weights pairs and threshold.
   */
  static fromPublicKeys({
    threshold,
    publicKeys
  }: {
    threshold: number;
    publicKeys: {
      publicKey: PublicKey;
      weight: number;
    }[];
  }): MultiSigPublicKey;
  /**
   * Checks if two MultiSig public keys are equal
   */
  equals(publicKey: MultiSigPublicKey): boolean;
  /**
   * Return the byte array representation of the MultiSig public key
   */
  toRawBytes(): Uint8Array<ArrayBuffer>;
  getPublicKeys(): {
    weight: number;
    publicKey: PublicKey;
  }[];
  getThreshold(): number;
  getSigner(...signers: [signer: Signer]): MultiSigSigner;
  /**
   * Return the Sui address associated with this MultiSig public key
   */
  toSuiAddress(): string;
  /**
   * Return the Sui address associated with this MultiSig public key
   */
  flag(): number;
  /**
   * Verifies that the signature is valid for for the provided message
   */
  verify(message: Uint8Array, multisigSignature: string): Promise<boolean>;
  /**
   * Combines multiple partial signatures into a single multisig, ensuring that each public key signs only once
   * and that all the public keys involved are known and valid, and then serializes multisig into the standard format
   */
  combinePartialSignatures(signatures: string[]): string;
}
/**
 * Parse multisig structure into an array of individual signatures: signature scheme, the actual individual signature, public key and its weight.
 */
declare function parsePartialSignatures(multisig: MultiSigStruct, options?: {
  client?: ClientWithCoreApi;
}): ParsedPartialMultiSigSignature[];
//#endregion
export { MultiSigPublicKey, MultiSigStruct, parsePartialSignatures };
//# sourceMappingURL=publickey.d.mts.map