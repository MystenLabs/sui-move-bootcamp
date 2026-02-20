import { IntentScope } from "./intent.mjs";
import { PublicKey } from "./publickey.mjs";
import { SignatureScheme } from "./signature-scheme.mjs";
import { SuiClientTypes } from "../client/types.mjs";
import { Transaction } from "../transactions/Transaction.mjs";
import { ClientWithCoreApi } from "../client/core.mjs";
import "../client/index.mjs";

//#region src/cryptography/keypair.d.ts
declare const PRIVATE_KEY_SIZE = 32;
declare const LEGACY_PRIVATE_KEY_SIZE = 64;
declare const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
type ParsedKeypair = {
  scheme: SignatureScheme;
  secretKey: Uint8Array;
};
interface SignatureWithBytes {
  bytes: string;
  signature: string;
}
interface SignAndExecuteOptions {
  transaction: Transaction;
  client: ClientWithCoreApi;
}
/**
 * TODO: Document
 */
declare abstract class Signer {
  abstract sign(bytes: Uint8Array): Promise<Uint8Array<ArrayBuffer>>;
  /**
   * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
   * it ensures that a signed message is tied to a specific purpose and domain separator is provided
   */
  signWithIntent(bytes: Uint8Array, intent: IntentScope): Promise<SignatureWithBytes>;
  /**
   * Signs provided transaction by calling `signWithIntent()` with a `TransactionData` provided as intent scope
   */
  signTransaction(bytes: Uint8Array): Promise<SignatureWithBytes>;
  /**
   * Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
   */
  signPersonalMessage(bytes: Uint8Array): Promise<{
    bytes: string;
    signature: string;
  }>;
  signAndExecuteTransaction({
    transaction,
    client
  }: SignAndExecuteOptions): Promise<SuiClientTypes.TransactionResult<{
    transaction: true;
    effects: true;
  }>>;
  toSuiAddress(): string;
  /**
   * Get the key scheme of the keypair: Secp256k1 or ED25519
   */
  abstract getKeyScheme(): SignatureScheme;
  /**
   * The public key for this keypair
   */
  abstract getPublicKey(): PublicKey;
}
declare abstract class Keypair extends Signer {
  /**
   * This returns the Bech32 secret key string for this keypair.
   */
  abstract getSecretKey(): string;
}
/**
 * This returns an ParsedKeypair object based by validating the
 * 33-byte Bech32 encoded string starting with `suiprivkey`, and
 * parse out the signature scheme and the private key in bytes.
 */
declare function decodeSuiPrivateKey(value: string): ParsedKeypair;
/**
 * This returns a Bech32 encoded string starting with `suiprivkey`,
 * encoding 33-byte `flag || bytes` for the given the 32-byte private
 * key and its signature scheme.
 */
declare function encodeSuiPrivateKey(bytes: Uint8Array, scheme: SignatureScheme): string;
//#endregion
export { Keypair, LEGACY_PRIVATE_KEY_SIZE, PRIVATE_KEY_SIZE, ParsedKeypair, SUI_PRIVATE_KEY_PREFIX, SignatureWithBytes, Signer, decodeSuiPrivateKey, encodeSuiPrivateKey };
//# sourceMappingURL=keypair.d.mts.map