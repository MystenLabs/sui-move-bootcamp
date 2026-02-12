import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { Flex, Heading, Text } from "@radix-ui/themes";

export function OwnedObjects() {
  const account = useCurrentAccount();

  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      filter: {
        StructType:
          "0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::Hero",
      },
    },
    {
      enabled: !!account,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  );

  if (!account) {
    return null;
  }

  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }

  return (
    <Flex direction="column" my="2">
      {data.data.length === 0 ? (
        <Text>No objects owned by the connected wallet</Text>
      ) : (
        <Heading size="4">Objects owned by the connected wallet</Heading>
      )}
      {data.data.map((object) => (
        <Flex key={object.data?.objectId}>
          <Text>Object ID: {object.data?.objectId}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
