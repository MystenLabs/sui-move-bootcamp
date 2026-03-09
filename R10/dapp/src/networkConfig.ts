import { createNetworkConfig } from "@mysten/dapp-kit";
import { getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getJsonRpcFullnodeUrl("devnet"),
      network: "devnet",
      variables: {
        packageId: import.meta.env.VITE_PACKAGE_ID || "",
        faucetId: import.meta.env.VITE_FAUCET_ID || "",
        robotPetId: import.meta.env.VITE_ROBOT_PET_ID || "",
        registryId: import.meta.env.VITE_REGISTRY_ID || "",
        wsUrl: import.meta.env.VITE_WS_URL || "ws://localhost:8080",
      },
    },
    testnet: {
      url: getJsonRpcFullnodeUrl("testnet"),
      network: "testnet",
      variables: {
        packageId: import.meta.env.VITE_PACKAGE_ID || "",
        faucetId: import.meta.env.VITE_FAUCET_ID || "",
        robotPetId: import.meta.env.VITE_ROBOT_PET_ID || "",
        registryId: import.meta.env.VITE_REGISTRY_ID || "",
        wsUrl: import.meta.env.VITE_WS_URL || "ws://localhost:8080",
      },
    },
    mainnet: {
      url: getJsonRpcFullnodeUrl("mainnet"),
      network: "mainnet",
      variables: {
        packageId: import.meta.env.VITE_PACKAGE_ID || "",
        faucetId: import.meta.env.VITE_FAUCET_ID || "",
        robotPetId: import.meta.env.VITE_ROBOT_PET_ID || "",
        registryId: import.meta.env.VITE_REGISTRY_ID || "",
        wsUrl: import.meta.env.VITE_WS_URL || "ws://localhost:8080",
      },
    },
  });

export { networkConfig, useNetworkVariable, useNetworkVariables };
