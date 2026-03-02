import { CheckCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Slider,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { MAX_PER_DAY, MAX_PER_REQUEST } from "../constants";
import { useFaucet, useTreatBalance } from "../hooks";

export function Faucet() {
  const [amount, setAmount] = useState(5);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { totalBalance, isLoading: balanceLoading } = useTreatBalance();
  const { requestTokens, isPending, faucetData } = useFaucet();

  const handleRequest = async () => {
    setStatus(null);
    try {
      await requestTokens(amount);
      setStatus({
        type: "success",
        message: `Successfully received ${amount} TREAT tokens!`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to request tokens",
      });
    }
  };

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Heading size="4">TREAT Token Faucet</Heading>
          <Badge color="green" size="2">
            Balance: {balanceLoading ? "..." : totalBalance.toString()} TREAT
          </Badge>
        </Flex>

        <Text color="gray" size="2">
          Request TREAT tokens to feed the robot dog or pay for rental sessions.
        </Text>

        <Box>
          <Flex justify="between" mb="2">
            <Text size="2">Amount to request:</Text>
            <Text size="2" weight="bold">
              {amount} TREAT
            </Text>
          </Flex>
          <Slider
            value={[amount]}
            onValueChange={(values) => setAmount(values[0])}
            min={1}
            max={MAX_PER_REQUEST}
            step={1}
          />
          <Flex justify="between" mt="1">
            <Text size="1" color="gray">
              1
            </Text>
            <Text size="1" color="gray">
              {MAX_PER_REQUEST}
            </Text>
          </Flex>
        </Box>

        <Callout.Root color="blue" size="1">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Max {MAX_PER_REQUEST} per request, {MAX_PER_DAY} per day.
            {faucetData && (
              <> Total supply: {faucetData.totalSupply.toString()} TREAT</>
            )}
          </Callout.Text>
        </Callout.Root>

        {status && (
          <Callout.Root
            color={status.type === "success" ? "green" : "red"}
            size="1"
          >
            <Callout.Icon>
              {status.type === "success" ? (
                <CheckCircledIcon />
              ) : (
                <InfoCircledIcon />
              )}
            </Callout.Icon>
            <Callout.Text>{status.message}</Callout.Text>
          </Callout.Root>
        )}

        <Button
          size="3"
          onClick={handleRequest}
          disabled={isPending}
          style={{ cursor: isPending ? "wait" : "pointer" }}
        >
          {isPending ? "Requesting..." : `Request ${amount} TREAT`}
        </Button>
      </Flex>
    </Card>
  );
}
