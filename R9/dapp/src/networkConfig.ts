/**
 * Contract addresses from environment variables.
 *
 * Network configuration is handled by createDAppKit in main.tsx
 * using @mysten/dapp-kit-react with SuiGrpcClient.
 */

export const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID || "";
export const QUEUE_ID = import.meta.env.VITE_QUEUE_ID || "";
