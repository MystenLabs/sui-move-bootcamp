import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Callout,
  Card,
  Container,
  Flex,
  Heading,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { Faucet, FeedRobot, RobotRental } from "./components";
import { useTreatBalance } from "./hooks";
import { useNetworkVariable } from "./networkConfig";

function WalletRequired({ children }: { children: React.ReactNode }) {
  const account = useCurrentAccount();

  if (!account) {
    return (
      <Card size="3">
        <Flex direction="column" gap="3" align="center" py="6">
          <Text size="4" weight="bold">
            Connect Your Wallet
          </Text>
          <Text color="gray" align="center">
            Connect your Sui wallet to interact with the Robot Rental Platform.
          </Text>
          <ConnectButton />
        </Flex>
      </Card>
    );
  }

  return <>{children}</>;
}

function ConfigWarning() {
  const packageId = useNetworkVariable("packageId");
  const faucetId = useNetworkVariable("faucetId");

  if (!packageId || !faucetId) {
    return (
      <Callout.Root color="yellow" size="2" mb="4">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          <strong>Configuration Required:</strong> Please set VITE_PACKAGE_ID
          and VITE_FAUCET_ID in your .env file after deploying the contracts.
        </Callout.Text>
      </Callout.Root>
    );
  }

  return null;
}

function Header() {
  const account = useCurrentAccount();
  const { totalBalance, isLoading } = useTreatBalance();

  return (
    <Flex
      position="sticky"
      px="4"
      py="3"
      justify="between"
      align="center"
      style={{
        borderBottom: "1px solid var(--gray-a2)",
        background: "var(--color-background)",
        top: 0,
        zIndex: 100,
      }}
    >
      <Flex gap="3" align="center">
        <Heading size="5">Robot Rental Platform</Heading>
        <Badge color="blue" variant="soft">
          Module 10
        </Badge>
      </Flex>

      <Flex gap="3" align="center">
        {account && (
          <Badge color="green" size="2" variant="soft">
            {isLoading ? "..." : totalBalance.toString()} TREAT
          </Badge>
        )}
        <ConnectButton />
      </Flex>
    </Flex>
  );
}

function MainContent() {
  const [activeTab, setActiveTab] = useState("faucet");

  return (
    <Box>
      <ConfigWarning />

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List size="2" mb="4">
          <Tabs.Trigger value="faucet">Get TREAT Tokens</Tabs.Trigger>
          <Tabs.Trigger value="mode1">Mode 1: Feed Robot</Tabs.Trigger>
          <Tabs.Trigger value="mode2">Mode 2: Rent Robot</Tabs.Trigger>
        </Tabs.List>

        <Box>
          <Tabs.Content value="faucet">
            <Faucet />
          </Tabs.Content>

          <Tabs.Content value="mode1">
            <FeedRobot />
          </Tabs.Content>

          <Tabs.Content value="mode2">
            <RobotRental />
          </Tabs.Content>
        </Box>
      </Tabs.Root>

      <Card mt="4" size="2">
        <Heading size="3" mb="2">
          How It Works
        </Heading>
        <Flex direction="column" gap="2">
          <Text size="2">
            <strong>Mode 1 (Feed Robot):</strong> Pay 1 TREAT per action.
            Actions are queued and processed in order. Simple, pay-per-action
            model.
          </Text>
          <Text size="2">
            <strong>Mode 2 (Rent Robot):</strong> Prepay for rental time.
            Control the robot in real-time via WebSocket. Unused time is
            refunded.
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}

function App() {
  return (
    <Flex direction="column" style={{ minHeight: "100vh" }}>
      <Header />

      <Container size="2" py="4" px="4" style={{ flex: 1 }}>
        <WalletRequired>
          <MainContent />
        </WalletRequired>
      </Container>

      <Box
        py="3"
        style={{
          borderTop: "1px solid var(--gray-a2)",
          textAlign: "center",
        }}
      >
        <Text size="1" color="gray">
          Robot Rental Platform - Module 10 | Built with Sui &amp; React
        </Text>
      </Box>
    </Flex>
  );
}

export default App;
