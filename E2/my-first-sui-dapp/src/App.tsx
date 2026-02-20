import { ConnectButton } from "@mysten/dapp-kit-react";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";
import { MintNFTForm } from "./MintNFTForm";
import { useState } from "react";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>dApp Starter Template</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          <WalletStatus refreshKey={refreshKey} />
        </Container>
      </Container>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          <MintNFTForm onMinted={() => setRefreshKey((k) => k + 1)} />
        </Container>
      </Container>
    </>
  );
}

export default App;
