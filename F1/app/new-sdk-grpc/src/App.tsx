import { ConnectButton } from "@mysten/dapp-kit-react";
import { HeroesList } from "./components/ui/HeroesList";
import { CreateHeroForm } from "./components/ui/CreateHeroForm";

function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Sui dApp Starter</h1>
          <ConnectButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 text-center">
        <CreateHeroForm />
      </div>

      <div className="container mx-auto px-4 py-8">
        <HeroesList />
      </div>
    </div>
  );
}

export default App;
