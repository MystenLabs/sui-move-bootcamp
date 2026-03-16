import {
  CheckCircledIcon,
  ClockIcon,
  InfoCircledIcon,
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
  ScrollArea,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import {
  ACTION_COST,
  ACTION_INFO,
  RobotAction,
  VALID_ACTIONS,
} from "../constants";
import { useRobotPet, useTreatBalance } from "../hooks";

export function FeedRobot() {
  const [selectedAction, setSelectedAction] = useState<RobotAction | null>(
    null,
  );
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { totalBalance } = useTreatBalance();
  const { robotPetData, isLoading, feedRobot, isPending } = useRobotPet();

  const handleFeed = async () => {
    if (!selectedAction) return;

    setStatus(null);
    try {
      await feedRobot(selectedAction);
      setStatus({
        type: "success",
        message: `Successfully queued "${ACTION_INFO[selectedAction].label}" action!`,
      });
      setSelectedAction(null);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to queue action",
      });
    }
  };

  const canFeed =
    totalBalance >= BigInt(ACTION_COST) && selectedAction !== null;

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Heading size="4">Feed the Robot (Mode 1)</Heading>
          <Flex gap="2">
            <Badge color="blue" size="2">
              {ACTION_COST} TREAT per action
            </Badge>
            {robotPetData && (
              <Badge color="orange" size="2">
                Queue: {robotPetData.actionQueue.length}
              </Badge>
            )}
          </Flex>
        </Flex>

        <Text color="gray" size="2">
          Select an action and pay {ACTION_COST} TREAT to add it to the robot's
          queue. Actions are processed in order (FIFO).
        </Text>

        {isLoading ? (
          <Text>Loading robot data...</Text>
        ) : robotPetData ? (
          <>
            <Box>
              <Flex justify="between" mb="2">
                <Text size="2" weight="bold">
                  Robot: {robotPetData.name}
                </Text>
                <Text size="2" color="gray">
                  Processed: {robotPetData.totalActionsProcessed} /{" "}
                  {robotPetData.totalActionsQueued}
                </Text>
              </Flex>
            </Box>

            <Separator size="4" />

            <Box>
              <Text size="2" weight="bold" mb="2">
                Select Action:
              </Text>
              <Grid columns="4" gap="2">
                {VALID_ACTIONS.map((action) => (
                  <Button
                    key={action}
                    variant={selectedAction === action ? "solid" : "outline"}
                    size="2"
                    onClick={() => setSelectedAction(action)}
                  >
                    {ACTION_INFO[action].label}
                  </Button>
                ))}
              </Grid>
            </Box>

            {selectedAction && (
              <Callout.Root color="blue" size="1">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  <strong>{ACTION_INFO[selectedAction].label}</strong>:{" "}
                  {ACTION_INFO[selectedAction].description} (~
                  {ACTION_INFO[selectedAction].duration / 1000}s)
                </Callout.Text>
              </Callout.Root>
            )}

            {robotPetData.actionQueue.length > 0 && (
              <Box>
                <Text size="2" weight="bold" mb="2">
                  Current Queue:
                </Text>
                <ScrollArea style={{ maxHeight: 150 }}>
                  <Flex direction="column" gap="1">
                    {robotPetData.actionQueue.map((action, index) => (
                      <Flex
                        key={index}
                        justify="between"
                        align="center"
                        p="2"
                        style={{
                          background: "var(--gray-a3)",
                          borderRadius: 4,
                        }}
                      >
                        <Flex gap="2" align="center">
                          <Badge color="gray" variant="soft">
                            #{index + 1}
                          </Badge>
                          <Text size="2">{action.actionName}</Text>
                        </Flex>
                        <Flex gap="2" align="center">
                          <ClockIcon />
                          <Text size="1" color="gray">
                            {action.timestamp > 0
                              ? new Date(action.timestamp).toLocaleTimeString()
                              : "Pending"}
                          </Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </ScrollArea>
              </Box>
            )}
          </>
        ) : (
          <Callout.Root color="yellow" size="1">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              Robot Pet not configured. Check your .env file for
              VITE_ROBOT_PET_ID.
            </Callout.Text>
          </Callout.Root>
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
                <InfoCircledIcon />
              )}
            </Callout.Icon>
            <Callout.Text>{status.message}</Callout.Text>
          </Callout.Root>
        )}

        <Button
          size="3"
          onClick={handleFeed}
          disabled={!canFeed || isPending}
          style={{ cursor: !canFeed || isPending ? "not-allowed" : "pointer" }}
        >
          {isPending
            ? "Feeding..."
            : selectedAction
              ? `Feed: ${ACTION_INFO[selectedAction].label} (${ACTION_COST} TREAT)`
              : "Select an action"}
        </Button>

        {totalBalance < BigInt(ACTION_COST) && (
          <Text color="red" size="1">
            Insufficient TREAT tokens. Request from the faucet first.
          </Text>
        )}
      </Flex>
    </Card>
  );
}
