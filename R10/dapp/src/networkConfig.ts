/**
 * Contract addresses from environment variables.
 *
 * Network configuration is handled by createDAppKit in main.tsx
 * using @mysten/dapp-kit-react with SuiGrpcClient.
 */

export const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID || "";
export const FAUCET_ID = import.meta.env.VITE_FAUCET_ID || "";
export const ROBOT_PET_ID = import.meta.env.VITE_ROBOT_PET_ID || "";
export const REGISTRY_ID = import.meta.env.VITE_REGISTRY_ID || "";
export const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8080";
