import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createDAppKit, DAppKitProvider } from "@mysten/dapp-kit-react";
import { SuiGrpcClient } from "@mysten/sui/grpc";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

const dAppKit = createDAppKit({
  networks: ["devnet", "testnet", "mainnet"],
  defaultNetwork: "testnet",
  createClient(network) {
    return new SuiGrpcClient({
      network,
      baseUrl:
        network === "mainnet"
          ? "https://fullnode.mainnet.sui.io:443"
          : network === "testnet"
            ? "https://fullnode.testnet.sui.io:443"
            : "https://fullnode.devnet.sui.io:443",
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <DAppKitProvider dAppKit={dAppKit}>
          <App />
        </DAppKitProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
