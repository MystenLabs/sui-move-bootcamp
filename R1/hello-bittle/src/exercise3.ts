/**
 * Exercise 3: Read Serial Response
 *
 * This demonstrates how to read data sent back from Bittle.
 * Bittle sends status messages, sensor data, and debug information over serial.
 *
 * Usage:
 *   SERIAL_PORT=/dev/cu.usbmodem* pnpm tsx src/exercise3.ts
 */

import { SerialPort } from "serialport";
import { COMMANDS } from "./commands";

// Configuration
const SERIAL_PORT = process.env.SERIAL_PORT || "/dev/ttyACM0";
const BAUD_RATE = 115200;

async function main() {
  console.log(`Connecting to Bittle on ${SERIAL_PORT}...`);

  // Open serial connection
  const port = new SerialPort({
    path: SERIAL_PORT,
    baudRate: BAUD_RATE,
  });

  // Listen for data from Bittle
  port.on("data", (data: Buffer) => {
    const message = data.toString().trim();
    if (message) {
      console.log("Bittle says:", message);
    }
  });

  // Wait for port to open
  await new Promise<void>((resolve, reject) => {
    port.on("open", resolve);
    port.on("error", reject);
  });

  console.log("Connected! Listening for responses from Bittle...\n");

  // Send a command and observe the response
  console.log("Sending 'hi' command...");
  port.write(COMMANDS.hi + "\n");

  // Wait for command to execute
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Send another command
  console.log("\nSending 'sit' command...");
  port.write(COMMANDS.sit + "\n");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return to balance position
  console.log("\nSending 'balance' command...");
  port.write(COMMANDS.balance + "\n");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("\nClosing connection...");
  port.close();
  console.log("Done!");
}

main().catch(console.error);
