import { useCurrentAccount, useCurrentClient } from "@mysten/dapp-kit-react";
import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export function OwnedObjects({ refreshKey }: { refreshKey: number }) {
  const account = useCurrentAccount();
  const client = useCurrentClient();

  const [data, setData] = useState<{ objects: { objectId: string }[] } | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObjects = useCallback(async () => {
    if (!account) return;
    setIsPending(true);
    setError(null);
    try {
      const result = await client.listOwnedObjects({
        owner: account.address,
        type: "0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::Hero",
      });
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch objects");
    } finally {
      setIsPending(false);
    }
  }, [client, account]);

  useEffect(() => {
    if (account) fetchObjects();
  }, [account?.address, refreshKey, fetchObjects]);

  if (!account) {
    return null;
  }

  if (error) {
    return <div className="text-destructive-foreground">Error: {error}</div>;
  }

  if (isPending || !data) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {data.objects.length === 0
            ? "No objects owned by the connected wallet"
            : "Objects owned by the connected wallet"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.objects.map((object) => (
            <p key={object.objectId} className="font-mono text-sm break-all">
              Object ID: {object.objectId}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
