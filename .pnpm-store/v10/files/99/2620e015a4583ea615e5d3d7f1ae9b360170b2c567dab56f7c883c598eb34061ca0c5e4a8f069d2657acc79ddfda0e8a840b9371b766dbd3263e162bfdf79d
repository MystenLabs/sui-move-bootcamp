import { SignedTransaction, SuiSignTransaction, SuiSignTransactionFeature, SuiSignTransactionInput, SuiSignTransactionMethod, SuiSignTransactionVersion } from "./suiSignTransaction.mjs";
import { SuiSignAndExecuteTransaction, SuiSignAndExecuteTransactionFeature, SuiSignAndExecuteTransactionInput, SuiSignAndExecuteTransactionMethod, SuiSignAndExecuteTransactionOutput, SuiSignAndExecuteTransactionVersion } from "./suiSignAndExecuteTransaction.mjs";
import { SignedTransactionBlock, SuiSignTransactionBlock, SuiSignTransactionBlockFeature, SuiSignTransactionBlockInput, SuiSignTransactionBlockMethod, SuiSignTransactionBlockOutput, SuiSignTransactionBlockVersion } from "./suiSignTransactionBlock.mjs";
import { SuiSignAndExecuteTransactionBlock, SuiSignAndExecuteTransactionBlockFeature, SuiSignAndExecuteTransactionBlockInput, SuiSignAndExecuteTransactionBlockMethod, SuiSignAndExecuteTransactionBlockOutput, SuiSignAndExecuteTransactionBlockVersion } from "./suiSignAndExecuteTransactionBlock.mjs";
import { SuiSignMessage, SuiSignMessageFeature, SuiSignMessageInput, SuiSignMessageMethod, SuiSignMessageOutput, SuiSignMessageVersion } from "./suiSignMessage.mjs";
import { SignedPersonalMessage, SuiSignPersonalMessage, SuiSignPersonalMessageFeature, SuiSignPersonalMessageInput, SuiSignPersonalMessageMethod, SuiSignPersonalMessageOutput, SuiSignPersonalMessageVersion } from "./suiSignPersonalMessage.mjs";
import { SuiGetCapabilities, SuiGetCapabilitiesFeature, SuiGetCapabilitiesMethod, SuiGetCapabilitiesVersion } from "./suiGetCapabilities.mjs";
import { IdentifierRecord, StandardConnectFeature, StandardDisconnectFeature, StandardEventsFeature, WalletWithFeatures } from "@wallet-standard/core";

//#region src/features/index.d.ts

/**
 * Wallet Standard features that are unique to Sui, and that all Sui wallets are expected to implement.
 */
type SuiFeatures = Partial<SuiSignTransactionBlockFeature> & Partial<SuiSignAndExecuteTransactionBlockFeature> & SuiSignPersonalMessageFeature & SuiSignAndExecuteTransactionFeature & SuiSignTransactionFeature & Partial<SuiSignMessageFeature> & Partial<SuiGetCapabilitiesFeature>;
type SuiWalletFeatures = StandardConnectFeature & StandardEventsFeature & SuiFeatures & Partial<StandardDisconnectFeature>;
type WalletWithSuiFeatures = WalletWithFeatures<SuiWalletFeatures>;
/**
 * Represents a wallet with the absolute minimum feature set required to function in the Sui ecosystem.
 */
type WalletWithRequiredFeatures = WalletWithFeatures<MinimallyRequiredFeatures & Partial<SuiFeatures> & Partial<StandardDisconnectFeature> & IdentifierRecord<unknown>>;
type MinimallyRequiredFeatures = StandardConnectFeature & StandardEventsFeature;
//#endregion
export { MinimallyRequiredFeatures, SuiFeatures, SuiWalletFeatures, WalletWithRequiredFeatures, WalletWithSuiFeatures };
//# sourceMappingURL=index.d.mts.map