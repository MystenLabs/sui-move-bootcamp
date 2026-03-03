import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { MultiplayerQueue } from "./MultiplayerQueue";

function App() {
  const account = useCurrentAccount();

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        align="center"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
          background: "var(--color-background)",
          top: 0,
          zIndex: 100,
        }}
      >
        <Flex align="center" gap="3">
          <Heading size="5">Multiplayer Robot Queue</Heading>
          {account && (
            <Text size="2" color="gray">
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </Text>
          )}
        </Flex>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container size="3" p="4">
        <MultiplayerQueue />
      </Container>
    </>
  );
}

export default App;
