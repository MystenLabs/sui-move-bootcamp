import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";
import { useNetworkVariable } from "./networkConfig";

// Valid actions that can be queued
const VALID_ACTIONS = [
  { name: "sit", label: "Sit" },
  { name: "stand", label: "Stand" },
  { name: "wave", label: "Wave" },
  { name: "walk_forward", label: "Walk Forward" },
  { name: "walk_backward", label: "Walk Backward" },
  { name: "turn_left", label: "Turn Left" },
  { name: "turn_right", label: "Turn Right" },
  { name: "jump", label: "Jump" },
  { name: "balance", label: "Balance" },
  { name: "push_up", label: "Push Up" },
];

interface QueueState {
  queueLength: number;
  uniqueUsers: number;
  totalQueued: number;
  totalProcessed: number;
  isPaused: boolean;
  maxPendingPerUser: number;
  cooldownMs: number;
  admin: string;
  name: string;
}

interface QueuedAction {
  actionName: string;
  sender: string;
  isPriority: boolean;
  timestamp: number;
}

interface EventLogEntry {
  type: string;
  message: string;
  timestamp: Date;
}

export function MultiplayerQueue() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const packageId = useNetworkVariable("packageId");
  const queueId = useNetworkVariable("queueId");

  const [queueState, setQueueState] = useState<QueueState | null>(null);
  const [pendingActions, setPendingActions] = useState<QueuedAction[]>([]);
  const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [wsUrl] = useState(
    import.meta.env.VITE_WS_URL || "ws://localhost:8080",
  );
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const { mutate: signAndExecute, isPending: isTxPending } =
    useSignAndExecuteTransaction();

  // Add event to log
  const addEvent = useCallback((type: string, message: string) => {
    setEventLog((prev) => [
      { type, message, timestamp: new Date() },
      ...prev.slice(0, 99), // Keep last 100 events
    ]);
  }, []);

  // Fetch queue state from blockchain
  const fetchQueueState = useCallback(async () => {
    if (!queueId || !client) return;

    try {
      const obj = await client.getObject({
        id: queueId,
        options: { showContent: true },
      });

      if (obj.data?.content?.dataType === "moveObject") {
        const fields = obj.data.content.fields as Record<string, unknown>;
        setQueueState({
          queueLength: Number(
            (fields.actions as { length?: number })?.length || 0,
          ),
          uniqueUsers: Number(fields.unique_users || 0),
          totalQueued: Number(fields.total_queued || 0),
          totalProcessed: Number(fields.total_processed || 0),
          isPaused: Boolean(fields.is_paused),
          maxPendingPerUser: Number(fields.max_pending_per_user || 3),
          cooldownMs: Number(fields.cooldown_ms || 30000),
          admin: String(fields.admin || ""),
          name: String(fields.name || ""),
        });
      }
    } catch (error) {
      console.error("Failed to fetch queue state:", error);
    }
  }, [queueId, client]);

  // Connect to WebSocket for real-time updates
  useEffect(() => {
    let ws: WebSocket | null = null;

    const connect = () => {
      try {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          setWsConnected(true);
          addEvent("system", "Connected to WebSocket server");
        };

        ws.onclose = () => {
          setWsConnected(false);
          addEvent("system", "Disconnected from WebSocket server");
        };

        ws.onerror = () => {
          setWsConnected(false);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            handleWsMessage(message);
          } catch {
            console.error("Failed to parse WebSocket message");
          }
        };
      } catch {
        console.error("Failed to connect to WebSocket");
      }
    };

    const handleWsMessage = (message: {
      type: string;
      data: Record<string, unknown>;
    }) => {
      switch (message.type) {
        case "welcome":
          addEvent(
            "system",
            `Server v${(message.data as { serverVersion?: string }).serverVersion}`,
          );
          break;

        case "queue_state":
          setQueueState((prev) => ({
            ...prev!,
            queueLength: Number(message.data.queueLength || 0),
            uniqueUsers: Number(message.data.uniqueUsers || 0),
            totalQueued: Number(message.data.totalQueued || 0),
            totalProcessed: Number(message.data.totalProcessed || 0),
          }));
          if (message.data.pendingActions) {
            setPendingActions(
              message.data.pendingActions as unknown as QueuedAction[],
            );
          }
          addEvent("queue_state", `Queue: ${message.data.queueLength} pending`);
          break;

        case "action_queued":
          setQueueState((prev) =>
            prev
              ? { ...prev, queueLength: Number(message.data.queueLength || 0) }
              : prev,
          );
          setPendingActions((prev) => [
            ...prev,
            {
              actionName: String(message.data.actionName),
              sender: String(message.data.sender),
              isPriority: Boolean(message.data.isPriority),
              timestamp: Number(message.data.timestamp),
            },
          ]);
          addEvent(
            "action_queued",
            `${message.data.actionName} by ${formatAddress(String(message.data.sender))}${message.data.isPriority ? " [PRIORITY]" : ""}`,
          );
          break;

        case "action_processed":
          setQueueState((prev) =>
            prev
              ? {
                  ...prev,
                  queueLength: Number(message.data.remainingInQueue || 0),
                }
              : prev,
          );
          setPendingActions((prev) => prev.slice(1));
          addEvent(
            "action_processed",
            `${message.data.actionName} (wait: ${(Number(message.data.waitTimeMs) / 1000).toFixed(1)}s)`,
          );
          break;
      }
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [wsUrl, addEvent]);

  // Initial fetch
  useEffect(() => {
    fetchQueueState();
  }, [fetchQueueState]);

  // Cooldown timer tick
  useEffect(() => {
    if (!cooldownEndTime) {
      setCooldownRemaining(0);
      return;
    }

    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(0, cooldownEndTime - now);
      setCooldownRemaining(remaining);

      if (remaining <= 0) {
        setCooldownEndTime(null);
      }
    };

    // Initial tick
    tick();

    // Update every 100ms for smooth countdown
    const interval = setInterval(tick, 100);

    return () => clearInterval(interval);
  }, [cooldownEndTime]);

  // Queue an action
  const queueAction = async (actionName: string, isPriority: boolean) => {
    if (!account || !packageId || !queueId) return;

    setIsLoading(true);

    try {
      const tx = new Transaction();

      tx.moveCall({
        target: `${packageId}::multiplayer_queue::${isPriority ? "queue_priority_action" : "queue_action"}`,
        arguments: [
          tx.object(queueId),
          tx.pure.string(actionName),
          tx.object(SUI_CLOCK_OBJECT_ID), // Clock
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            addEvent(
              "success",
              `${actionName} queued! Tx: ${result.digest.slice(0, 8)}...`,
            );
            fetchQueueState();
            // Start cooldown timer
            const cooldownMs = queueState?.cooldownMs || 30000;
            setCooldownEndTime(Date.now() + cooldownMs);
          },
          onError: (error) => {
            addEvent("error", `Failed to queue: ${error.message}`);
          },
        },
      );
    } catch (error) {
      addEvent(
        "error",
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address || address.length < 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Check if configuration is complete
  if (!packageId || !queueId) {
    return (
      <Card>
        <Heading size="4" mb="2">
          Configuration Required
        </Heading>
        <Text>
          Please set VITE_PACKAGE_ID and VITE_QUEUE_ID in your .env file, or
          update networkConfig.ts with the deployed contract addresses.
        </Text>
        <Box mt="3">
          <Text size="2" color="gray">
            1. Deploy the Move contract: cd ../move && sui client publish
          </Text>
          <br />
          <Text size="2" color="gray">
            2. Create a queue: cd ../client && pnpm create-queue "My Queue"
          </Text>
          <br />
          <Text size="2" color="gray">
            3. Add to .env: VITE_PACKAGE_ID=0x... VITE_QUEUE_ID=0x...
          </Text>
        </Box>
      </Card>
    );
  }

  return (
    <Flex direction="column" gap="4">
      {/* Connection Status */}
      <Flex justify="between" align="center">
        <Heading size="5">{queueState?.name || "Multiplayer Queue"}</Heading>
        <Flex gap="2" align="center">
          <Badge color={wsConnected ? "green" : "red"}>
            {wsConnected ? "Live" : "Offline"}
          </Badge>
          {!wsConnected && (
            <Text size="1" color="gray">
              WS: {wsUrl}
            </Text>
          )}
        </Flex>
      </Flex>

      {/* Stats Cards */}
      <Grid columns="4" gap="3">
        <Card>
          <Flex direction="column" align="center">
            <Text size="6" weight="bold" color="crimson">
              {queueState?.queueLength || 0}
            </Text>
            <Text size="2" color="gray">
              In Queue
            </Text>
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" align="center">
            <Text size="6" weight="bold" color="blue">
              {queueState?.uniqueUsers || 0}
            </Text>
            <Text size="2" color="gray">
              Unique Users
            </Text>
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" align="center">
            <Text size="6" weight="bold" color="green">
              {queueState?.totalQueued || 0}
            </Text>
            <Text size="2" color="gray">
              Total Queued
            </Text>
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" align="center">
            <Text size="6" weight="bold" color="orange">
              {queueState?.totalProcessed || 0}
            </Text>
            <Text size="2" color="gray">
              Processed
            </Text>
          </Flex>
        </Card>
      </Grid>

      {/* Action Buttons */}
      {account ? (
        <Card>
          <Flex justify="between" align="center" mb="3">
            <Heading size="3">Queue Actions</Heading>
            {cooldownRemaining > 0 && (
              <Badge color="orange" size="2">
                Cooldown: {(cooldownRemaining / 1000).toFixed(1)}s
              </Badge>
            )}
          </Flex>
          <Grid columns="5" gap="2">
            {VALID_ACTIONS.map((action) => (
              <Button
                key={action.name}
                variant="soft"
                disabled={isLoading || isTxPending || cooldownRemaining > 0}
                onClick={() => queueAction(action.name, false)}
              >
                {action.label}
              </Button>
            ))}
          </Grid>
          <Separator my="3" size="4" />
          <Flex justify="between" align="center">
            <Text size="2" color="gray">
              Max {queueState?.maxPendingPerUser || 3} pending actions per user
              | Cooldown:{" "}
              {((queueState?.cooldownMs || 30000) / 1000).toFixed(0)}s
            </Text>
            {cooldownRemaining > 0 && (
              <Box
                style={{
                  width: "100px",
                  height: "4px",
                  background: "var(--gray-a5)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <Box
                  style={{
                    width: `${(cooldownRemaining / (queueState?.cooldownMs || 30000)) * 100}%`,
                    height: "100%",
                    background: "var(--orange-9)",
                    transition: "width 0.1s linear",
                  }}
                />
              </Box>
            )}
          </Flex>
        </Card>
      ) : (
        <Card>
          <Text>Connect your wallet to queue actions</Text>
        </Card>
      )}

      {/* Current Queue */}
      <Card>
        <Heading size="3" mb="3">
          Current Queue
        </Heading>
        {pendingActions.length === 0 ? (
          <Text color="gray">Queue is empty</Text>
        ) : (
          <Flex direction="column" gap="2">
            {pendingActions.map((action, index) => (
              <Flex
                key={`${action.sender}-${action.timestamp}-${index}`}
                align="center"
                gap="3"
                p="2"
                style={{
                  background: "var(--gray-a3)",
                  borderRadius: "var(--radius-2)",
                  borderLeft: action.isPriority
                    ? "3px solid var(--purple-9)"
                    : "none",
                }}
              >
                <Badge color="crimson">{index + 1}</Badge>
                <Text weight="bold">{action.actionName}</Text>
                {action.isPriority && <Badge color="purple">PRIORITY</Badge>}
                <Text size="2" color="gray">
                  {formatAddress(action.sender)}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Card>

      {/* Event Log */}
      <Card>
        <Heading size="3" mb="3">
          Event Log
        </Heading>
        <Box
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
        >
          {eventLog.length === 0 ? (
            <Text color="gray">No events yet</Text>
          ) : (
            eventLog.map((event, index) => (
              <Flex key={index} gap="2" py="1">
                <Text color="gray">{event.timestamp.toLocaleTimeString()}</Text>
                <Badge
                  color={
                    event.type === "error"
                      ? "red"
                      : event.type === "success"
                        ? "green"
                        : event.type === "action_queued"
                          ? "blue"
                          : event.type === "action_processed"
                            ? "orange"
                            : "gray"
                  }
                >
                  {event.type}
                </Badge>
                <Text>{event.message}</Text>
              </Flex>
            ))
          )}
        </Box>
      </Card>
    </Flex>
  );
}
