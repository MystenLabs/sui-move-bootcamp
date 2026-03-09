import { createNetworkConfig } from "@mysten/dapp-kit";
import { getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getJsonRpcFullnodeUrl("devnet"),
      network: "devnet",
      variables: {
        packageId: "",
        queueId: "",
      },
    },
    testnet: {
      url: getJsonRpcFullnodeUrl("testnet"),
      network: "testnet",
      variables: {
        // Update these after deploying the contract
        packageId: import.meta.env.VITE_PACKAGE_ID || "",
        queueId: import.meta.env.VITE_QUEUE_ID || "",
      },
    },
    mainnet: {
      url: getJsonRpcFullnodeUrl("mainnet"),
      network: "mainnet",
      variables: {
        packageId: "",
        queueId: "",
      },
    },
  });

export { networkConfig, useNetworkVariable, useNetworkVariables };
