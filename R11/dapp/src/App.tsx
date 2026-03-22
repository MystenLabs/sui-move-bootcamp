import { useCurrentAccount } from "@mysten/dapp-kit-react";
import { ConnectButton } from "@mysten/dapp-kit-react/ui";
import {
  Badge,
  Box,
  Callout,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { PACKAGE_ID, METER_OBJECT_ID, SERVER_URL } from "./networkConfig";

type BridgeState = {
  count: number;
  lastDigest: string;
  latest: null | {
    meterId: string;
    watts: number;
    totalKwhMilli: number;
    timestampMs: number;
  };
};

function ConfigWarning() {
  if (!PACKAGE_ID || !METER_OBJECT_ID) {
    return (
        <Callout.Root color="yellow" size="2">
          <Callout.Text>
            Set `VITE_PACKAGE_ID` and `VITE_METER_OBJECT_ID` in `.env` after
          publishing the Move package.
          </Callout.Text>
        </Callout.Root>
    );
  }

  return null;
}

function StatusCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "blue" | "green" | "orange";
}) {
  return (
    <Card
      size="3"
      style={{
        background:
          "linear-gradient(180deg, rgba(14,20,29,0.92) 0%, rgba(10,14,20,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Flex direction="column" gap="2">
        <Badge color={tone} variant="soft" style={{ width: "fit-content" }}>
          {label}
        </Badge>
        <Text size="6" weight="bold">
          {value}
        </Text>
      </Flex>
    </Card>
  );
}

export default function App() {
  const account = useCurrentAccount();
  const [bridgeState, setBridgeState] = useState<BridgeState>({
    count: 0,
    lastDigest: "",
    latest: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadState() {
      try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as BridgeState;
        if (isMounted) {
          setBridgeState(data);
        }
      } catch {
        // Local bridge may not be running yet.
      }
    }

    loadState();
    const interval = window.setInterval(loadState, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <Box
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(255,140,0,0.16), transparent 35%), linear-gradient(180deg, #0a0f15 0%, #06090d 100%)",
      }}
    >
      <Container size="3" px="4" py="5">
        <Flex justify="between" align="center" wrap="wrap" gap="3" mb="5">
          <Box>
            <Heading size="8">R11 Energy Monitor</Heading>
            <Text size="3" color="gray">
              Simulation-first DePIN module for meter readings, rewards, and
              billing.
            </Text>
          </Box>
          <ConnectButton />
        </Flex>

        <Flex gap="3" mb="4" wrap="wrap">
          <Badge color="blue" variant="soft">
            Live Bridge Polling
          </Badge>
          <Badge color="green" variant="soft">
            {account ? "Wallet Connected" : "Wallet Optional"}
          </Badge>
        </Flex>

        <ConfigWarning />

        <Grid columns={{ initial: "1", md: "3" }} gap="3" my="5">
          <StatusCard label="Server" value={SERVER_URL} tone="blue" />
          <StatusCard
            label="Package"
            value={PACKAGE_ID || "unset"}
            tone="orange"
          />
          <StatusCard
            label="Meter Object"
            value={METER_OBJECT_ID || "unset"}
            tone="green"
          />
        </Grid>

        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card size="3">
            <Flex direction="column" gap="2">
              <Heading size="4">On-chain path</Heading>
              <Text color="gray">
                `energy_meter.move` emits readings, `watt.move` manages the
                reward coin, and `billing.move` escrows WATT for usage-based
                settlement.
              </Text>
            </Flex>
          </Card>

          <Card size="3">
            <Flex direction="column" gap="2">
              <Heading size="4">Bridge state</Heading>
              <Text color="gray">
                Readings received: {bridgeState.count}
              </Text>
              <Text color="gray">
                Latest watts: {bridgeState.latest?.watts ?? "n/a"}
              </Text>
              <Text color="gray">
                Last digest: {bridgeState.lastDigest || "not submitted yet"}
              </Text>
            </Flex>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
}
