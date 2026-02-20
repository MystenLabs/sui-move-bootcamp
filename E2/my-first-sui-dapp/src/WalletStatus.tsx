import { useCurrentAccount } from "@mysten/dapp-kit-react";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import { OwnedObjects } from "./OwnedObjects";

export function WalletStatus({ refreshKey }: { refreshKey: number }) {
  const account = useCurrentAccount();

  return (
    <Container my="2">
      <Heading mb="2">Wallet Status</Heading>

      {account ? (
        <Flex direction="column">
          <Text>Wallet connected</Text>
          <Text>Address: {account.address}</Text>
        </Flex>
      ) : (
        <Text>Wallet not connected</Text>
      )}
      <OwnedObjects refreshKey={refreshKey} />
    </Container>
  );
}
