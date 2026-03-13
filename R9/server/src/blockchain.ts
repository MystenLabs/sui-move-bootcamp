/**
 * Blockchain Event Listener
 *
 * Subscribes to Sui blockchain events from the multiplayer queue contract.
 * Parses events and forwards them to the WebSocket server for broadcasting.
 *
 * ## How It Works
 * 1. Connects to Sui GraphQL endpoint
 * 2. Subscribes to events from the package
 * 3. Parses each event type
 * 4. Calls registered callbacks for each event
 *
 * ## Event Types Handled
 * - QueueCreated
 * - ActionQueued
 * - ActionProcessed
 * - UserStatsUpdated
 * - QueueStateChanged
 */

import { SuiGraphQLClient } from "@mysten/sui/graphql";
import type {
  ActionProcessedEvent,
  ActionQueuedEvent,
  QueueCreatedEvent,
  QueueStateChangedEvent,
  UserStatsUpdatedEvent,
} from "./types";

// Event type suffixes for matching
const EVENT_TYPES = {
  QueueCreated: "::multiplayer_queue::QueueCreated",
  ActionQueued: "::multiplayer_queue::ActionQueued",
  ActionProcessed: "::multiplayer_queue::ActionProcessed",
  UserStatsUpdated: "::multiplayer_queue::UserStatsUpdated",
  QueueStateChanged: "::multiplayer_queue::QueueStateChanged",
};

/**
 * Callbacks for different event types.
 */
export interface EventCallbacks {
  onQueueCreated?: (event: QueueCreatedEvent) => void;
  onActionQueued?: (event: ActionQueuedEvent) => void;
  onActionProcessed?: (event: ActionProcessedEvent) => void;
  onUserStatsUpdated?: (event: UserStatsUpdatedEvent) => void;
  onQueueStateChanged?: (event: QueueStateChangedEvent) => void;
  onError?: (error: Error) => void;
}

/**
 * Blockchain event listener class.
 *
 * Connects to Sui and subscribes to multiplayer queue events.
 */
export class BlockchainEventListener {
  private client: SuiGraphQLClient;
  private packageId: string;
  private callbacks: EventCallbacks;
  private unsubscribe: (() => void) | null = null;
  private pollInterval: NodeJS.Timeout | null = null;
  private lastCursor: string | null = null;

  constructor(
    rpcUrl: string,
    packageId: string,
    callbacks: EventCallbacks,
    network: string = "testnet",
  ) {
    this.client = new SuiGraphQLClient({ url: rpcUrl, network });
    this.packageId = packageId;
    this.callbacks = callbacks;
  }

  /**
   * Start listening for events.
   *
   * Uses polling since WebSocket subscriptions may not be available
   * on all RPC endpoints.
   */
  async start(pollIntervalMs: number = 2000): Promise<void> {
    console.log(
      `[Blockchain] Starting event listener for package ${this.packageId}`,
    );
    console.log(`[Blockchain] Polling every ${pollIntervalMs}ms`);

    // Initial query to get cursor
    const eventsResult = await this.client.query({
      query: `
        query LatestEvents($module: String!) {
          events(
            filter: { emittingModule: $module }
            last: 1
          ) {
            pageInfo {
              startCursor
              endCursor
            }
            nodes {
              type { repr }
              json
            }
          }
        }
      `,
      variables: {
        module: `${this.packageId}::multiplayer_queue`,
      },
    });

    const eventsData = eventsResult.data as any;
    if (eventsData?.events?.nodes?.length > 0) {
      this.lastCursor = eventsData.events.pageInfo.endCursor ?? null;
    }

    // Start polling
    this.pollInterval = setInterval(() => this.pollEvents(), pollIntervalMs);
  }

  /**
   * Poll for new events.
   */
  private async pollEvents(): Promise<void> {
    try {
      const eventsResult = await this.client.query({
        query: `
          query PollEvents($module: String!, $after: String) {
            events(
              filter: { emittingModule: $module }
              after: $after
              first: 50
            ) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                type { repr }
                json
              }
            }
          }
        `,
        variables: {
          module: `${this.packageId}::multiplayer_queue`,
          after: this.lastCursor,
        },
      });

      const eventsData = eventsResult.data as any;
      const nodes = eventsData?.events?.nodes || [];

      for (const event of nodes) {
        this.handleEvent(event.type.repr, event.json);
      }

      if (eventsData?.events?.pageInfo?.endCursor) {
        this.lastCursor = eventsData.events.pageInfo.endCursor;
      }
    } catch (error) {
      console.error("[Blockchain] Error polling events:", error);
      this.callbacks.onError?.(error as Error);
    }
  }

  /**
   * Handle a single event.
   */
  private handleEvent(eventType: string, data: unknown): void {
    try {
      if (eventType.endsWith(EVENT_TYPES.QueueCreated)) {
        this.callbacks.onQueueCreated?.(data as QueueCreatedEvent);
      } else if (eventType.endsWith(EVENT_TYPES.ActionQueued)) {
        this.callbacks.onActionQueued?.(data as ActionQueuedEvent);
      } else if (eventType.endsWith(EVENT_TYPES.ActionProcessed)) {
        this.callbacks.onActionProcessed?.(data as ActionProcessedEvent);
      } else if (eventType.endsWith(EVENT_TYPES.UserStatsUpdated)) {
        this.callbacks.onUserStatsUpdated?.(data as UserStatsUpdatedEvent);
      } else if (eventType.endsWith(EVENT_TYPES.QueueStateChanged)) {
        this.callbacks.onQueueStateChanged?.(data as QueueStateChangedEvent);
      }
    } catch (error) {
      console.error("[Blockchain] Error handling event:", error);
      this.callbacks.onError?.(error as Error);
    }
  }

  /**
   * Stop listening for events.
   */
  stop(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    console.log("[Blockchain] Event listener stopped");
  }

  /**
   * Get queue state from the blockchain.
   */
  async getQueueState(queueId: string): Promise<{
    name: string;
    queueLength: number;
    uniqueUsers: number;
    totalQueued: number;
    totalProcessed: number;
    maxPendingPerUser: number;
    cooldownMs: number;
    admin: string;
    isPaused: boolean;
  } | null> {
    try {
      const response = await this.client.getObject({
        objectId: queueId,
        include: { json: true },
      });

      const fields = response.object.json as Record<string, unknown> | null;
      if (fields) {
        return {
          name: fields.name as string,
          queueLength: Number((fields.actions as unknown[])?.length ?? 0),
          uniqueUsers: Number(fields.unique_users),
          totalQueued: Number(fields.total_queued),
          totalProcessed: Number(fields.total_processed),
          maxPendingPerUser: Number(fields.max_pending_per_user),
          cooldownMs: Number(fields.cooldown_ms),
          admin: fields.admin as string,
          isPaused: fields.is_paused as boolean,
        };
      }
      return null;
    } catch (error) {
      console.error("[Blockchain] Error getting queue state:", error);
      return null;
    }
  }
}
