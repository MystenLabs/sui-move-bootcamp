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

import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { config } from "./config";
import type { SessionData } from "./types";

// ============================================
// SUI CLIENT
// ============================================

const GRAPHQL_URLS: Record<string, string> = {
  mainnet: "https://graphql.mainnet.sui.io/graphql",
  testnet: "https://graphql.testnet.sui.io/graphql",
  devnet: "https://graphql.devnet.sui.io/graphql",
  localnet: "http://127.0.0.1:9125/graphql",
};

let suiClient: SuiGraphQLClient | null = null;

/**
 * Get or create the Sui client
 */
export function getSuiClient(): SuiGraphQLClient {
  if (!suiClient) {
    const network = config.network || "testnet";
    const graphqlUrl =
      config.graphqlUrl || GRAPHQL_URLS[network] || GRAPHQL_URLS.testnet;
    suiClient = new SuiGraphQLClient({ url: graphqlUrl, network });
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
      objectId: sessionId,
      include: { json: true },
    });

    if (!response.object) {
      if (config.debug) {
        console.log(`Session ${sessionId} not found`);
      }
      return null;
    }

    // Verify it's a RentalSession object
    const typeName = response.object.type;
    if (!typeName.includes("RentalSession")) {
      if (config.debug) {
        console.log(`Object ${sessionId} is not a RentalSession`);
      }
      return null;
    }

    // Extract fields
    const fields = response.object.json as Record<string, unknown>;
    if (!fields) {
      if (config.debug) {
        console.log(`Object ${sessionId} has no JSON fields`);
      }
      return null;
    }

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
 * Convert a public key field to Uint8Array.
 *
 * Handles multiple formats that Sui clients may return for vector<u8>:
 * - number[]: JSON array of byte values (common from gRPC/GraphQL)
 * - "0x..." prefixed hex string
 * - Raw hex string
 * - Base64 encoded string (some SDK versions)
 */
function hexToBytes(value: string | number[]): Uint8Array {
  // If it's already an array of numbers, convert directly
  if (Array.isArray(value)) {
    return new Uint8Array(value);
  }

  // Remove 0x prefix if present
  if (value.startsWith("0x") || value.startsWith("0X")) {
    const cleanHex = value.slice(2);
    return hexStringToBytes(cleanHex);
  }

  // Check if it looks like hex (only hex chars, even length)
  if (/^[0-9a-fA-F]+$/.test(value) && value.length % 2 === 0) {
    return hexStringToBytes(value);
  }

  // Try base64 decoding as fallback
  try {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    // If all else fails, treat as hex
    return hexStringToBytes(value);
  }
}

function hexStringToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
