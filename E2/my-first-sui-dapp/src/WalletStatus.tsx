import { useCurrentAccount } from "@mysten/dapp-kit-react";
import { OwnedObjects } from "./OwnedObjects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export function WalletStatus() {
  const account = useCurrentAccount();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Status</CardTitle>
          <CardDescription>
            {account
              ? "Your wallet is connected"
              : "Connect your wallet to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {account ? (
            <p className="font-mono text-sm break-all">{account.address}</p>
          ) : (
            <p className="text-muted-foreground">
              Click the connect button above to link your Sui wallet.
            </p>
          )}
        </CardContent>
      </Card>

      <OwnedObjects />
    </div>
  );
}
