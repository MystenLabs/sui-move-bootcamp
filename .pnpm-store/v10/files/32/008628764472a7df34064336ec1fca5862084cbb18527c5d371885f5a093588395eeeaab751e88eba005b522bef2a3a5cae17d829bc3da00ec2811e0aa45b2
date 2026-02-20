import { SignatureScheme } from "../cryptography/signature-scheme.mjs";
import { Signer } from "../cryptography/keypair.mjs";
import { MultiSigPublicKey } from "./publickey.mjs";
import "../cryptography/index.mjs";

//#region src/multisig/signer.d.ts
declare class MultiSigSigner extends Signer {
  #private;
  constructor(pubkey: MultiSigPublicKey, signers?: Signer[]);
  getKeyScheme(): SignatureScheme;
  getPublicKey(): MultiSigPublicKey;
  sign(_data: Uint8Array): never;
  signTransaction(bytes: Uint8Array): Promise<{
    signature: string;
    bytes: string;
  }>;
  signPersonalMessage(bytes: Uint8Array): Promise<{
    signature: string;
    bytes: string;
  }>;
}
//#endregion
export { MultiSigSigner };
//# sourceMappingURL=signer.d.mts.map