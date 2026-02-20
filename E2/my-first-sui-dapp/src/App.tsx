import { ConnectButton } from "@mysten/dapp-kit-react";
import { WalletStatus } from "./WalletStatus";
import { MintNFTForm } from "./components/ui/MintNFTForm";
import { useState } from "react";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">dApp Starter Template</h1>
          <ConnectButton />
        </div>
      </header>

      <main className="container mx-auto space-y-8 px-4 py-8">
        <WalletStatus refreshKey={refreshKey} />
        <MintNFTForm onMinted={() => setRefreshKey((k) => k + 1)} />
      </main>
    </div>
  );
}

export default App;
