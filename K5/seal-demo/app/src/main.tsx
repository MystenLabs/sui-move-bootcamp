import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createDAppKit, DAppKitProvider } from "@mysten/dapp-kit-react";
import { SuiGrpcClient } from "@mysten/sui/grpc";

import App from "./App";
import {
  AGGREGATOR_URL,
  FULLNODE_URL,
  KEY_SERVER_OBJECT_ID,
  NETWORK,
} from "./config";
import { seal } from "./seal-extension";

import "./index.css";

const dAppKit = createDAppKit({
  networks: [NETWORK],
  createClient: (network) =>
    new SuiGrpcClient({
      baseUrl: FULLNODE_URL,
      network,
    }).$extend(
      seal({
        serverConfigs: [
          {
            objectId: KEY_SERVER_OBJECT_ID,
            weight: 1,
            aggregatorUrl: AGGREGATOR_URL,
          },
        ],
        verifyKeyServers: false,
      }),
    ),
});

declare module "@mysten/dapp-kit-react" {
  interface Register {
    dAppKit: typeof dAppKit;
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DAppKitProvider dAppKit={dAppKit}>
        <App />
      </DAppKitProvider>
    </QueryClientProvider>
  </StrictMode>,
);
