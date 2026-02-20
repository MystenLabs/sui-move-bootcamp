import { PublicKey } from "../cryptography/publickey.mjs";
import { SignatureScheme } from "../cryptography/signature-scheme.mjs";
import "../cryptography/index.mjs";
import { ClientWithCoreApi } from "../client/core.mjs";

//#region src/verify/verify.d.ts
declare function verifySignature(bytes: Uint8Array, signature: string, options?: {
  address?: string;
}): Promise<PublicKey>;
declare function verifyPersonalMessageSignature(message: Uint8Array, signature: string, options?: {
  client?: ClientWithCoreApi;
  address?: string;
}): Promise<PublicKey>;
declare function verifyTransactionSignature(transaction: Uint8Array, signature: string, options?: {
  client?: ClientWithCoreApi;
  address?: string;
}): Promise<PublicKey>;
declare function publicKeyFromRawBytes(signatureScheme: SignatureScheme, bytes: Uint8Array, options?: {
  client?: ClientWithCoreApi;
  address?: string;
}): PublicKey;
declare function publicKeyFromSuiBytes(publicKey: string | Uint8Array, options?: {
  client?: ClientWithCoreApi;
  address?: string;
}): PublicKey;
//#endregion
export { publicKeyFromRawBytes, publicKeyFromSuiBytes, verifyPersonalMessageSignature, verifySignature, verifyTransactionSignature };
//# sourceMappingURL=verify.d.mts.map