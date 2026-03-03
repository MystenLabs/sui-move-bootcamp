/**
 * Blockchain Integration
 *
 * Handles all interactions with the Sui blockchain:
 * - Fetching rental session data
 * - Verifying session state
 *
 * Note: The server only READS from the blockchain.
 * Session creation and ending are done by the dApp.
 */

import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { config } from "./config";
import type { SessionData } from "./types";

// ============================================
// SUI CLIENT
// ============================================

let suiClient: SuiClient | null = null;

/**
 * Get or create the Sui client
 */
export function getSuiClient(): SuiClient {
  if (!suiClient) {
    const rpcUrl =
      config.rpcUrl ||
      getFullnodeUrl(config.network as "testnet" | "devnet" | "mainnet");
    suiClient = new SuiClient({ url: rpcUrl });
  }
  return suiClient;
}

// ============================================
// SESSION FETCHING
// ============================================

/**
 * Fetch rental session data from the blockchain.
 *
 * @param sessionId - The object ID of the RentalSession
 * @returns Session data or null if not found
 */
export async function fetchSessionData(
  sessionId: string,
): Promise<SessionData | null> {
  const client = getSuiClient();

  try {
    const response = await client.getObject({
      id: sessionId,
      options: {
        showContent: true,
        showType: true,
      },
    });

    if (!response.data || !response.data.content) {
      if (config.debug) {
        console.log(`Session ${sessionId} not found`);
      }
      return null;
    }

    // Verify it's a RentalSession object
    const content = response.data.content;
    if (content.dataType !== "moveObject") {
      if (config.debug) {
        console.log(`Object ${sessionId} is not a Move object`);
      }
      return null;
    }

    const typeName = content.type;
    if (!typeName.includes("RentalSession")) {
      if (config.debug) {
        console.log(`Object ${sessionId} is not a RentalSession`);
      }
      return null;
    }

    // Extract fields
    const fields = content.fields as Record<string, unknown>;

    return {
      sessionId,
      robotName: fields.robot_name as string,
      user: fields.user as string,
      userPublicKey: hexToBytes(fields.user_public_key as string),
      operator: fields.operator as string,
      operatorPublicKey: hexToBytes(fields.operator_public_key as string),
      pricePerMinute: Number(fields.price_per_minute),
      escrowedAmount: Number(
        (fields.escrow as { value: string })?.value || "0",
      ),
      prepaidMinutes: Number(fields.prepaid_minutes),
      startTime: Number(fields.start_time),
      lastActivity: Number(fields.last_activity),
      sequenceNumber: Number(fields.sequence_number),
      isActive: fields.is_active as boolean,
    };
  } catch (error) {
    if (config.debug) {
      console.error(`Error fetching session ${sessionId}:`, error);
    }
    return null;
  }
}

/**
 * Check if a session has expired (based on prepaid time).
 *
 * @param session - The session data
 * @returns true if session has exceeded prepaid time
 */
export function isSessionExpired(session: SessionData): boolean {
  const now = Date.now();
  const elapsedMs = now - session.startTime;
  const elapsedMinutes = Math.floor(elapsedMs / 60000);
  return elapsedMinutes >= session.prepaidMinutes;
}

/**
 * Get remaining minutes in a session.
 *
 * @param session - The session data
 * @returns Remaining minutes (0 if expired)
 */
export function getRemainingMinutes(session: SessionData): number {
  const now = Date.now();
  const elapsedMs = now - session.startTime;
  const elapsedMinutes = Math.floor(elapsedMs / 60000);
  return Math.max(0, session.prepaidMinutes - elapsedMinutes);
}

/**
 * Get elapsed minutes in a session.
 *
 * @param session - The session data
 * @returns Elapsed minutes
 */
export function getElapsedMinutes(session: SessionData): number {
  const now = Date.now();
  const elapsedMs = now - session.startTime;
  return Math.floor(elapsedMs / 60000);
}

// ============================================
// HELPERS
// ============================================

/**
 * Convert hex string to Uint8Array.
 * Handles both "0x" prefixed and raw hex strings.
 */
function hexToBytes(hex: string | number[]): Uint8Array {
  // If it's already an array, convert directly
  if (Array.isArray(hex)) {
    return new Uint8Array(hex);
  }

  // Remove 0x prefix if present
  const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;

  // Convert hex string to bytes
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleanHex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
