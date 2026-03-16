/**
 * Cryptographic Utilities
 *
 * Handles Ed25519 signature verification for command authentication.
 * Uses the same message format as rental_session.move.
 *
 * ## Message Format
 * The signed message format is:
 *   session_id (32 bytes) || sequence_number (8 bytes, big-endian) || command
 *
 * This matches the `build_command_message` function in the Move contract.
 */

import * as ed25519 from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import { config } from "./config";

// Configure ed25519 to use sha512
ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m));

// ============================================
// MESSAGE BUILDING
// ============================================

/**
 * Build the message that should be signed for a command.
 *
 * This MUST match the format in rental_session.move::build_command_message
 *
 * @param sessionId - The session object ID (0x prefixed hex string)
 * @param sequence - The sequence number (must be current + 1)
 * @param command - The command string (e.g., "sit", "wave")
 * @returns The message bytes to be signed
 */
export function buildCommandMessage(
  sessionId: string,
  sequence: number,
  command: string,
): Uint8Array {
  // Session ID: 32 bytes (remove 0x prefix)
  const sessionIdHex = sessionId.startsWith("0x")
    ? sessionId.slice(2)
    : sessionId;
  const sessionIdBytes = hexToBytes(sessionIdHex);

  // Sequence: 8 bytes, big-endian
  const sequenceBytes = new Uint8Array(8);
  let seq = BigInt(sequence);
  for (let i = 7; i >= 0; i--) {
    sequenceBytes[i] = Number(seq & 0xffn);
    seq >>= 8n;
  }

  // Command: variable length UTF-8
  const commandBytes = new TextEncoder().encode(command);

  // Concatenate: session_id || sequence || command
  const message = new Uint8Array(
    sessionIdBytes.length + sequenceBytes.length + commandBytes.length,
  );
  message.set(sessionIdBytes, 0);
  message.set(sequenceBytes, sessionIdBytes.length);
  message.set(commandBytes, sessionIdBytes.length + sequenceBytes.length);

  return message;
}

// ============================================
// SIGNATURE VERIFICATION
// ============================================

/**
 * Verify an Ed25519 signature.
 *
 * @param signature - The signature (64 bytes, hex encoded)
 * @param message - The message that was signed
 * @param publicKey - The signer's public key (32 bytes)
 * @returns true if signature is valid
 */
export async function verifySignature(
  signature: string | Uint8Array,
  message: Uint8Array,
  publicKey: Uint8Array,
): Promise<boolean> {
  try {
    // Convert signature from hex if needed
    const sigBytes =
      typeof signature === "string" ? hexToBytes(signature) : signature;

    // Verify signature
    const isValid = await ed25519.verifyAsync(sigBytes, message, publicKey);

    if (config.debug && !isValid) {
      console.log("Signature verification failed:");
      console.log("  Signature:", bytesToHex(sigBytes));
      console.log("  Message:", bytesToHex(message));
      console.log("  Public Key:", bytesToHex(publicKey));
    }

    return isValid;
  } catch (error) {
    if (config.debug) {
      console.error("Signature verification error:", error);
    }
    return false;
  }
}

/**
 * Verify a command signature from a user.
 *
 * Convenience function that builds the message and verifies in one call.
 *
 * @param sessionId - The session object ID
 * @param sequence - The expected sequence number
 * @param command - The command string
 * @param signature - The signature (hex encoded)
 * @param userPublicKey - The user's Ed25519 public key
 * @returns true if signature is valid
 */
export async function verifyCommandSignature(
  sessionId: string,
  sequence: number,
  command: string,
  signature: string,
  userPublicKey: Uint8Array,
): Promise<boolean> {
  const message = buildCommandMessage(sessionId, sequence, command);
  return verifySignature(signature, message, userPublicKey);
}

// ============================================
// HELPERS
// ============================================

/**
 * Convert hex string to Uint8Array.
 */
function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleanHex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/**
 * Convert Uint8Array to hex string.
 */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
