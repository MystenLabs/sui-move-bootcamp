import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiGrpcClient } from "@mysten/sui/grpc";
import dotenv from "dotenv";
import { decodeBcsEvent } from "./utils/parseEvent";

dotenv.config();

const grpcClient = new SuiGrpcClient({
  network: "testnet",
  baseUrl: getFullnodeUrl("testnet"),
});

// Construct the full event name for UserRegistered
const FULL_EVENT_NAME =
  process.env.PACKAGE_ID +
  "::" +
  process.env.MODULE_NAME +
  "::" +
  "UserRegistered";

const processCheckpoint = async (response: any): Promise<void> => {
  const checkpoint = response.checkpoint;
  if (!checkpoint) {
    return;
  }

  if (!checkpoint.transactions || checkpoint.transactions.length === 0) {
    return;
  }

  for (const transaction of checkpoint.transactions) {
    if (!transaction.events?.events || transaction.events.events.length === 0) {
      continue;
    }

    for (const event of transaction.events.events) {
      try {
        if (FULL_EVENT_NAME !== event.eventType) {
          continue;
        }
        console.log("Event Data:", decodeBcsEvent(event));
      } catch (error) {
        console.error("Error while parsing event:", error);
      }
    }
  }
};
const main = async () => {
  const stream = grpcClient.subscriptionService.subscribeCheckpoints({
    readMask: {
      paths: [
        // "sequenceNumber",
        // "digest",
        // "transactions.digest",
        "transactions.events",
        // "transactions.timestamp",
      ],
    },
  });
  console.log("Subscribed to checkpoint stream...");
  try {
    for await (const response of stream.responses) {
      try {
        await processCheckpoint(response);
      } catch (error) {
        console.log("Error while processing checkpoint:", error);
      }
    }
  } catch (error) {
    throw error;
  }
};
main().catch((err) => {
  console.error("Error in main:", err);
});
