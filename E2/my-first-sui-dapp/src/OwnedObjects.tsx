import { useCurrentAccount, useCurrentClient, useCurrentNetwork } from "@mysten/dapp-kit-react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const client = useCurrentClient();
  const network = useCurrentNetwork();

  const { data, isPending, error } = useQuery({
    queryKey: [network, "getOwnedObjects", account?.address],
    queryFn: () =>
      client.listOwnedObjects({
        owner: account!.address,
        type: "0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::Hero",
      }),
    enabled: !!account,
  });

  if (!account) {
    return null;
  }

  if (error) {
    return <div className="text-destructive-foreground">Error: {error.message}</div>;
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
