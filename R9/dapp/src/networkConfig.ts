import { createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        packageId: "",
        queueId: "",
      },
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        // Update these after deploying the contract
        packageId: import.meta.env.VITE_PACKAGE_ID || "",
        queueId: import.meta.env.VITE_QUEUE_ID || "",
      },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        packageId: "",
        queueId: "",
      },
    },
  });

export { networkConfig, useNetworkVariable, useNetworkVariables };
