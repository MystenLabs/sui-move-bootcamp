/**
 * Test Serial Connection
 *
 * Tests the connection to the Bittle robot without blockchain.
 * Use this to verify your robot is connected correctly.
 *
 * Usage:
 *   SERIAL_PORT=/dev/cu.usbmodem* pnpm test-serial
 */

import { ACTION_TO_COMMAND } from "./commands";
import { BAUD_RATE, SERIAL_PORT } from "./config";
import { connect, disconnect, sendCommand } from "./serial";

async function main() {
  console.log("=== Serial Connection Test ===\n");
  console.log(`Port: ${SERIAL_PORT}`);
  console.log(`Baud: ${BAUD_RATE}`);
  console.log();

  // Connect
  const connected = await connect();

  if (!connected) {
    console.log("Failed to connect to robot!");
    console.log("\nTroubleshooting:");
    console.log("1. Check USB cable is connected");
    console.log("2. Find your port: python3 detect-device.py (from Module 1)");
    console.log(
      "3. Set correct port: SERIAL_PORT=/dev/cu.usbmodem* pnpm test-serial",
    );
    process.exit(1);
  }

  console.log("Connected! Running test sequence...\n");

  // Test sequence
  const testActions = ["balance", "sit", "wave", "balance"];

  for (const action of testActions) {
    const command = ACTION_TO_COMMAND[action];
    if (command) {
      console.log(`> ${action}: ${command.description}`);
      await sendCommand(command);
      console.log("  Done!\n");

      // Small pause between commands
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // Disconnect
  await disconnect();
  console.log("Test complete!");
}

main().catch(console.error);
