/**
 * Bittle Demo - Run multiple commands in sequence
 *
 * This demo shows how to send multiple commands to the robot.
 *
 * Usage:
 *   SERIAL_PORT=/dev/cu.usbmodem* pnpm demo
 */

import { SerialPort } from "serialport";
import { COMMANDS, CommandName } from "./commands";

const SERIAL_PORT = process.env.SERIAL_PORT || "/dev/ttyACM0";
const BAUD_RATE = 115200;

// Helper to wait
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Send command and wait
async function sendCommand(port: SerialPort, name: CommandName, waitMs = 3000) {
  const command = COMMANDS[name];
  console.log(`> ${name} (${command})`);
  port.write(command + "\n");
  await wait(waitMs);
}

async function main() {
  console.log("=== Bittle Demo ===\n");
  console.log(`Connecting to ${SERIAL_PORT}...`);

  const port = new SerialPort({
    path: SERIAL_PORT,
    baudRate: BAUD_RATE,
  });

  await new Promise<void>((resolve, reject) => {
    port.on("open", resolve);
    port.on("error", reject);
  });

  console.log("Connected!\n");

  // Demo sequence
  console.log("Running demo sequence:\n");

  await sendCommand(port, "balance", 2000);
  await sendCommand(port, "sit", 2000);
  await sendCommand(port, "hi", 3000);
  await sendCommand(port, "stretch", 3000);
  await sendCommand(port, "balance", 2000);

  port.close();
  console.log("\nDemo complete!");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
