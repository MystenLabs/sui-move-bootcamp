import { useCurrentAccount, useCurrentClient } from "@mysten/dapp-kit-react";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useState, useEffect, useCallback } from "react";

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
    return <Flex>Error: {error}</Flex>;
  }

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }

  return (
    <Flex direction="column" my="2">
      {data.objects.length === 0 ? (
        <Text>No objects owned by the connected wallet</Text>
      ) : (
        <Heading size="4">Objects owned by the connected wallet</Heading>
      )}
      {data.objects.map((object) => (
        <Flex key={object.objectId}>
          <Text>Object ID: {object.objectId}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
