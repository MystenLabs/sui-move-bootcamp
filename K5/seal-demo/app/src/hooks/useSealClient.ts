import { useCurrentClient } from "@mysten/dapp-kit-react";

/** Typed handle to the Seal extension that is registered in `main.tsx`. */
export function useSealClient() {
  return useCurrentClient().seal;
}

/** The Sui client itself, already extended with `.seal`. */
export function useSuiClient() {
  return useCurrentClient();
}
