//#region src/features/suiGetCapabilities.d.ts
declare const SuiGetCapabilities = "sui:getCapabilities";
/** The latest API version of the getCapabilities API. */
type SuiGetCapabilitiesVersion = '1.0.0';
/**
 * A Wallet Standard feature for reporting intents supported by the wallet.
 */
type SuiGetCapabilitiesFeature = {
  [SuiGetCapabilities]: {
    version: SuiGetCapabilitiesVersion;
    getCapabilities: SuiGetCapabilitiesMethod;
  };
};
type SuiGetCapabilitiesMethod = () => Promise<{
  supportedIntents?: string[];
}>;
//#endregion
export { SuiGetCapabilities, SuiGetCapabilitiesFeature, SuiGetCapabilitiesMethod, SuiGetCapabilitiesVersion };
//# sourceMappingURL=suiGetCapabilities.d.mts.map