import { IntentScope } from "../../cryptography/intent.mjs";
import { PublicKey } from "../../cryptography/publickey.mjs";
import { SignatureScheme } from "../../cryptography/signature-scheme.mjs";
import { SignatureWithBytes, Signer } from "../../cryptography/keypair.mjs";
import "../../cryptography/index.mjs";
import { AuthenticationCredential, RegistrationCredential } from "./types.mjs";

//#region src/keypairs/passkey/keypair.d.ts
type DeepPartialConfigKeys = 'rp' | 'user' | 'authenticatorSelection';
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
type BrowserPasswordProviderOptions = Pick<DeepPartial<PublicKeyCredentialCreationOptions>, DeepPartialConfigKeys> & Omit<Partial<PublicKeyCredentialCreationOptions>, DeepPartialConfigKeys | 'pubKeyCredParams' | 'challenge'>;
interface PasskeyProvider {
  create(): Promise<RegistrationCredential>;
  get(challenge: Uint8Array): Promise<AuthenticationCredential>;
}
declare class BrowserPasskeyProvider implements PasskeyProvider {
  #private;
  constructor(name: string, options: BrowserPasswordProviderOptions);
  create(): Promise<RegistrationCredential>;
  get(challenge: Uint8Array): Promise<AuthenticationCredential>;
}
/**
 * @experimental
 * A passkey signer used for signing transactions. This is a client side implementation for [SIP-9](https://github.com/sui-foundation/sips/blob/main/sips/sip-9.md).
 */
declare class PasskeyKeypair extends Signer {
  private publicKey;
  private provider;
  /**
   * Get the key scheme of passkey,
   */
  getKeyScheme(): SignatureScheme;
  /**
   * Creates an instance of Passkey signer. If no passkey wallet had created before,
   * use `getPasskeyInstance`. For example:
   * ```
   * let provider = new BrowserPasskeyProvider('Sui Passkey Example',{
   * 	  rpName: 'Sui Passkey Example',
   * 	  rpId: window.location.hostname,
   * } as BrowserPasswordProviderOptions);
   * const signer = await PasskeyKeypair.getPasskeyInstance(provider);
   * ```
   *
   * If there are existing passkey wallet, use `signAndRecover` to identify the correct
   * public key and then initialize the instance. See usage in `signAndRecover`.
   */
  constructor(publicKey: Uint8Array, provider: PasskeyProvider);
  /**
   * Creates an instance of Passkey signer invoking the passkey from navigator.
   * Note that this will invoke the passkey device to create a fresh credential.
   * Should only be called if passkey wallet is created for the first time.
   *
   * @param provider - the passkey provider.
   * @returns the passkey instance.
   */
  static getPasskeyInstance(provider: PasskeyProvider): Promise<PasskeyKeypair>;
  /**
   * Return the public key for this passkey.
   */
  getPublicKey(): PublicKey;
  /**
   * Return the signature for the provided data (i.e. blake2b(intent_message)).
   * This is sent to passkey as the challenge field.
   */
  sign(data: Uint8Array): Promise<Uint8Array<ArrayBuffer>>;
  /**
   * This overrides the base class implementation that accepts the raw bytes and signs its
   * digest of the intent message, then serialize it with the passkey flag.
   */
  signWithIntent(bytes: Uint8Array, intent: IntentScope): Promise<SignatureWithBytes>;
  /**
   * Given a message, asks the passkey device to sign it and return all (up to 4) possible public keys.
   * See: https://bitcoin.stackexchange.com/questions/81232/how-is-public-key-extracted-from-message-digital-signature-address
   *
   * This is useful if the user previously created passkey wallet with the origin, but the wallet session
   * does not have the public key / address. By calling this method twice with two different messages, the
   * wallet can compare the returned public keys and uniquely identify the previously created passkey wallet
   * using `findCommonPublicKey`.
   *
   * Alternatively, one call can be made and all possible public keys should be checked onchain to see if
   * there is any assets.
   *
   * Once the correct public key is identified, a passkey instance can then be initialized with this public key.
   *
   * Example usage to recover wallet with two signing calls:
   * ```
   * let provider = new BrowserPasskeyProvider('Sui Passkey Example',{
   *     rpName: 'Sui Passkey Example',
   * 	   rpId: window.location.hostname,
   * } as BrowserPasswordProviderOptions);
   * const testMessage = new TextEncoder().encode('Hello world!');
   * const possiblePks = await PasskeyKeypair.signAndRecover(provider, testMessage);
   * const testMessage2 = new TextEncoder().encode('Hello world 2!');
   * const possiblePks2 = await PasskeyKeypair.signAndRecover(provider, testMessage2);
   * const commonPk = findCommonPublicKey(possiblePks, possiblePks2);
   * const signer = new PasskeyKeypair(provider, commonPk.toRawBytes());
   * ```
   *
   * @param provider - the passkey provider.
   * @param message - the message to sign.
   * @returns all possible public keys.
   */
  static signAndRecover(provider: PasskeyProvider, message: Uint8Array): Promise<PublicKey[]>;
}
/**
 * Finds the unique public key that exists in both arrays, throws error if the common
 * pubkey does not equal to one.
 *
 * @param arr1 - The first pubkeys array.
 * @param arr2 - The second pubkeys array.
 * @returns The only common pubkey in both arrays.
 */
declare function findCommonPublicKey(arr1: PublicKey[], arr2: PublicKey[]): PublicKey;
//#endregion
export { BrowserPasskeyProvider, BrowserPasswordProviderOptions, PasskeyKeypair, PasskeyProvider, findCommonPublicKey };
//# sourceMappingURL=keypair.d.mts.map