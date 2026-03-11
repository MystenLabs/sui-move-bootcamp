import {
  CheckCircledIcon,
  CrossCircledIcon,
  InfoCircledIcon,
  PlayIcon,
  StopIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Grid,
  Heading,
  Separator,
  Slider,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";
import {
  ACTION_INFO,
  MAX_RENTAL_MINUTES,
  MIN_RENTAL_MINUTES,
  RobotAction,
  VALID_ACTIONS,
} from "../constants";
import { useRentalSession, useRobotRegistry, useTreatBalance } from "../hooks";
import { WS_URL } from "../networkConfig";

// Generate Ed25519 keypair for session authentication
async function generateEd25519Keypair(): Promise<{
  publicKey: Uint8Array;
  privateKey: Uint8Array;
}> {
  const keyPair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, [
    "sign",
    "verify",
  ]);

  const publicKeyBuffer = await crypto.subtle.exportKey(
    "raw",
    keyPair.publicKey,
  );
  const privateKeyBuffer = await crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey,
  );

  return {
    publicKey: new Uint8Array(publicKeyBuffer),
    privateKey: new Uint8Array(privateKeyBuffer),
  };
}

interface WebSocketControllerProps {
  sessionId: string;
  operatorPublicKey: string;
  onCommand: (action: RobotAction) => void;
}

function WebSocketController({
  sessionId,
  onCommand,
}: WebSocketControllerProps) {
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  const connect = useCallback(() => {
    if (!WS_URL) return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      setConnected(true);
      // Authenticate with session ID
      socket.send(
        JSON.stringify({
          type: "auth",
          sessionId,
        }),
      );
    };

    socket.onclose = () => {
      setConnected(false);
      setWs(null);
    };

    socket.onerror = () => {
      setConnected(false);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "ack") {
          setLastCommand(data.command);
        }
      } catch {
        // Ignore parse errors
      }
    };

    setWs(socket);
  }, [sessionId]);

  const disconnect = useCallback(() => {
    if (ws) {
      ws.close();
      setWs(null);
      setConnected(false);
    }
  }, [ws]);

  const sendCommand = useCallback(
    (action: RobotAction) => {
      if (ws && connected) {
        ws.send(
          JSON.stringify({
            type: "command",
            action,
            timestamp: Date.now(),
          }),
        );
        onCommand(action);
      }
    },
    [ws, connected, onCommand],
  );

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return (
    <Box>
      <Flex justify="between" align="center" mb="3">
        <Flex gap="2" align="center">
          <Badge color={connected ? "green" : "gray"} variant="soft">
            {connected ? "Connected" : "Disconnected"}
          </Badge>
          {lastCommand && (
            <Text size="1" color="gray">
              Last: {lastCommand}
            </Text>
          )}
        </Flex>
        {!connected ? (
          <Button size="1" onClick={connect}>
            <PlayIcon /> Connect
          </Button>
        ) : (
          <Button size="1" color="red" onClick={disconnect}>
            <StopIcon /> Disconnect
          </Button>
        )}
      </Flex>

      <Grid columns="4" gap="2">
        {VALID_ACTIONS.map((action) => (
          <Button
            key={action}
            size="2"
            variant="outline"
            disabled={!connected}
            onClick={() => sendCommand(action)}
          >
            {ACTION_INFO[action].label}
          </Button>
        ))}
      </Grid>
    </Box>
  );
}

export function RobotRental() {
  const [robotName, setRobotName] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [userKeyPair, setUserKeyPair] = useState<{
    publicKey: Uint8Array;
    privateKey: Uint8Array;
  } | null>(null);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { totalBalance } = useTreatBalance();
  const { registryData } = useRobotRegistry();
  const { sessionData, startSession, endSession, isPending, refetchSession } =
    useRentalSession(activeSessionId || undefined);

  // Generate keypair on mount
  useEffect(() => {
    generateEd25519Keypair().then(setUserKeyPair).catch(console.error);
  }, []);

  const handleStartSession = async () => {
    if (!robotName || !userKeyPair) return;

    setStatus(null);
    try {
      const result = await startSession(
        robotName,
        userKeyPair.publicKey,
        minutes,
      );

      // Extract session ID from transaction events
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const events = (result as any)?.events || [];
      const sessionEvent = events.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => e.type?.includes("SessionStarted"),
      );

      if (sessionEvent?.parsedJson?.session_id) {
        setActiveSessionId(sessionEvent.parsedJson.session_id);
        setStatus({
          type: "success",
          message: `Rental session started for ${minutes} minutes!`,
        });
      } else {
        setStatus({
          type: "success",
          message: "Session started! Check your owned objects for the session.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to start session",
      });
    }
  };

  const handleEndSession = async () => {
    if (!activeSessionId) return;

    setStatus(null);
    try {
      await endSession(activeSessionId);
      setActiveSessionId(null);
      setStatus({
        type: "success",
        message: "Session ended successfully!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to end session",
      });
    }
  };

  const pricePerMinute = 1; // Default assumption
  const totalCost = pricePerMinute * minutes;
  const canStart =
    totalBalance >= BigInt(totalCost) &&
    robotName.trim() !== "" &&
    userKeyPair !== null;

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Heading size="4">Rent a Robot (Mode 2)</Heading>
          <Badge color="purple" size="2">
            Real-time Control
          </Badge>
        </Flex>

        <Text color="gray" size="2">
          Rent a robot for a period of time and control it in real-time via
          WebSocket. Pay upfront and get refunded for unused time.
        </Text>

        {!activeSessionId ? (
          <>
            <Box>
              <Text size="2" weight="bold" mb="2">
                Robot Name:
              </Text>
              <TextField.Root
                placeholder="Enter robot name (e.g., Bittle-1)"
                value={robotName}
                onChange={(e) => setRobotName(e.target.value)}
              />
              {registryData && registryData.robotNames.length > 0 && (
                <Flex gap="1" mt="2" wrap="wrap">
                  {registryData.robotNames.map((name) => (
                    <Badge
                      key={name}
                      color="gray"
                      variant="soft"
                      style={{ cursor: "pointer" }}
                      onClick={() => setRobotName(name)}
                    >
                      {name}
                    </Badge>
                  ))}
                </Flex>
              )}
            </Box>

            <Box>
              <Flex justify="between" mb="2">
                <Text size="2" weight="bold">
                  Rental Duration:
                </Text>
                <Text size="2">
                  {minutes} minutes ({totalCost} TREAT)
                </Text>
              </Flex>
              <Slider
                value={[minutes]}
                onValueChange={(values) => setMinutes(values[0])}
                min={MIN_RENTAL_MINUTES}
                max={MAX_RENTAL_MINUTES}
                step={1}
              />
              <Flex justify="between" mt="1">
                <Text size="1" color="gray">
                  {MIN_RENTAL_MINUTES} min
                </Text>
                <Text size="1" color="gray">
                  {MAX_RENTAL_MINUTES} min
                </Text>
              </Flex>
            </Box>

            <Callout.Root color="blue" size="1">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                {pricePerMinute} TREAT per minute. Unused time is refunded when
                you end the session.
              </Callout.Text>
            </Callout.Root>
          </>
        ) : (
          <>
            <Callout.Root color="green" size="1">
              <Callout.Icon>
                <CheckCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Active rental session! Control the robot in real-time below.
              </Callout.Text>
            </Callout.Root>

            {sessionData && (
              <Box>
                <Flex justify="between" mb="2">
                  <Text size="2">Robot: {sessionData.robotName}</Text>
                  <Text size="2">
                    Prepaid: {sessionData.prepaidMinutes} min
                  </Text>
                </Flex>
                <Flex justify="between">
                  <Text size="2" color="gray">
                    Escrowed: {sessionData.escrowedAmount} TREAT
                  </Text>
                  <Text size="2" color="gray">
                    Sequence: {sessionData.sequenceNumber}
                  </Text>
                </Flex>
              </Box>
            )}

            <Separator size="4" />

            <Box>
              <Text size="2" weight="bold" mb="2">
                Real-time Control:
              </Text>
              <WebSocketController
                sessionId={activeSessionId}
                operatorPublicKey={sessionData?.operatorPublicKey || ""}
                onCommand={(action) => {
                  refetchSession();
                  console.log("Command sent:", action);
                }}
              />
            </Box>
          </>
        )}

        {status && (
          <Callout.Root
            color={status.type === "success" ? "green" : "red"}
            size="1"
          >
            <Callout.Icon>
              {status.type === "success" ? (
                <CheckCircledIcon />
              ) : (
                <CrossCircledIcon />
              )}
            </Callout.Icon>
            <Callout.Text>{status.message}</Callout.Text>
          </Callout.Root>
        )}

        {!activeSessionId ? (
          <Button
            size="3"
            onClick={handleStartSession}
            disabled={!canStart || isPending}
          >
            {isPending ? "Starting..." : `Start Rental (${totalCost} TREAT)`}
          </Button>
        ) : (
          <Button
            size="3"
            color="red"
            onClick={handleEndSession}
            disabled={isPending}
          >
            {isPending ? "Ending..." : "End Rental Session"}
          </Button>
        )}

        {!activeSessionId && totalBalance < BigInt(totalCost) && (
          <Text color="red" size="1">
            Insufficient TREAT tokens. Request from the faucet first.
          </Text>
        )}
      </Flex>
    </Card>
  );
}
