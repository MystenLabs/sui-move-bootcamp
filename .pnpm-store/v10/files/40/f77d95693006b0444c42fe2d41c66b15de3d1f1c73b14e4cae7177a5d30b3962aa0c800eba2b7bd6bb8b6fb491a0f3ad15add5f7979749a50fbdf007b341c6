//#region src/cryptography/mnemonics.d.ts
/**
 * Parse and validate a path that is compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
 *
 * @param path path string (e.g. `m/44'/784'/0'/0'/0'`).
 */
declare function isValidHardenedPath(path: string): boolean;
/**
 * Parse and validate a path that is compliant to BIP-32 in form m/54'/784'/{account_index}'/{change_index}/{address_index}
 * for Secp256k1 and m/74'/784'/{account_index}'/{change_index}/{address_index} for Secp256r1.
 *
 * Note that the purpose for Secp256k1 is registered as 54, to differentiate from Ed25519 with purpose 44.
 *
 * @param path path string (e.g. `m/54'/784'/0'/0/0`).
 */
declare function isValidBIP32Path(path: string): boolean;
/**
 * Uses KDF to derive 64 bytes of key data from mnemonic with empty password.
 *
 * @param mnemonics 12 words string split by spaces.
 */
declare function mnemonicToSeed(mnemonics: string): Uint8Array;
/**
 * Derive the seed in hex format from a 12-word mnemonic string.
 *
 * @param mnemonics 12 words string split by spaces.
 */
declare function mnemonicToSeedHex(mnemonics: string): string;
//#endregion
export { isValidBIP32Path, isValidHardenedPath, mnemonicToSeed, mnemonicToSeedHex };
//# sourceMappingURL=mnemonics.d.mts.map