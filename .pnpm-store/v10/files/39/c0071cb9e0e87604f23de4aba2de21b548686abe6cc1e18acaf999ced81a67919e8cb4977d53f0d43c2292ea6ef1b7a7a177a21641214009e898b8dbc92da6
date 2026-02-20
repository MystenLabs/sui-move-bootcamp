import { PublicKey } from "./publickey.mjs";
import { SignatureScheme } from "./signature-scheme.mjs";
import { MultiSigStruct } from "../multisig/publickey.mjs";

//#region src/cryptography/signature.d.ts

/**
 * Pair of signature and corresponding public key
 */
type SerializeSignatureInput = {
  signatureScheme: SignatureScheme;
  /** Base64-encoded signature */
  signature: Uint8Array;
  /** Base64-encoded public key */
  publicKey?: PublicKey;
};
/**
 * Takes in a signature, its associated signing scheme and a public key, then serializes this data
 */
declare function toSerializedSignature({
  signature,
  signatureScheme,
  publicKey
}: SerializeSignatureInput): string;
/**
 * Decodes a serialized signature into its constituent components: the signature scheme, the actual signature, and the public key
 */
declare function parseSerializedSignature(serializedSignature: string): {
  serializedSignature: string;
  signatureScheme: "ED25519" | "Secp256k1" | "Secp256r1";
  signature: Uint8Array<ArrayBuffer>;
  publicKey: Uint8Array<ArrayBuffer>;
  bytes: Uint8Array<ArrayBuffer>;
} | {
  signatureScheme: "Passkey";
  serializedSignature: string;
  signature: Uint8Array<ArrayBufferLike>;
  authenticatorData: Uint8Array<ArrayBufferLike>;
  clientDataJson: string;
  userSignature: Uint8Array<ArrayBuffer>;
  publicKey: Uint8Array<ArrayBuffer>;
} | {
  serializedSignature: string;
  signatureScheme: "ZkLogin";
  zkLogin: {
    inputs: {
      proofPoints: {
        a: string[];
        b: string[][];
        c: string[];
      };
      issBase64Details: {
        value: string;
        indexMod4: number;
      };
      headerBase64: string;
      addressSeed: string;
    };
    maxEpoch: string;
    userSignature: Uint8Array<ArrayBufferLike>;
    iss: string;
    addressSeed: bigint;
  };
  signature: Uint8Array<ArrayBufferLike>;
  publicKey: Uint8Array<ArrayBuffer>;
} | {
  serializedSignature: string;
  signatureScheme: "MultiSig";
  multisig: MultiSigStruct;
  bytes: Uint8Array<ArrayBuffer>;
  signature: undefined;
};
//#endregion
export { SerializeSignatureInput, parseSerializedSignature, toSerializedSignature };
//# sourceMappingURL=signature.d.mts.map