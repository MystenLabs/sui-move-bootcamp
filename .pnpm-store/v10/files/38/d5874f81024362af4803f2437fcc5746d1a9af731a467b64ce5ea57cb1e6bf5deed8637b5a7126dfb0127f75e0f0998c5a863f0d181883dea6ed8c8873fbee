import { IdentifierString } from "@wallet-standard/core";

//#region src/chains.d.ts
/** Sui Devnet */
declare const SUI_DEVNET_CHAIN = "sui:devnet";
/** Sui Testnet */
declare const SUI_TESTNET_CHAIN = "sui:testnet";
/** Sui Localnet */
declare const SUI_LOCALNET_CHAIN = "sui:localnet";
/** Sui Mainnet */
declare const SUI_MAINNET_CHAIN = "sui:mainnet";
declare const SUI_CHAINS: readonly ["sui:devnet", "sui:testnet", "sui:localnet", "sui:mainnet"];
type SuiChain = (typeof SUI_CHAINS)[number];
/**
 * Utility that returns whether or not a chain identifier is a valid Sui chain.
 * @param chain a chain identifier in the form of `${string}:{$string}`
 */
declare function isSuiChain(chain: IdentifierString): chain is SuiChain;
//#endregion
export { SUI_CHAINS, SUI_DEVNET_CHAIN, SUI_LOCALNET_CHAIN, SUI_MAINNET_CHAIN, SUI_TESTNET_CHAIN, SuiChain, isSuiChain };
//# sourceMappingURL=chains.d.mts.map