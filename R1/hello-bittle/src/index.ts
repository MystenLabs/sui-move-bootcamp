/**
 * Hello Bittle - Minimal Serial Control
 *
 * This is the simplest possible code to control a Petoi Bittle X robot.
 * It sends a single command via serial port.
 *
 * Usage:
 *   SERIAL_PORT=/dev/cu.usbmodem* pnpm start
 */

import { SerialPort } from "serialport";
import { COMMANDS } from "./commands";

// Configuration
const SERIAL_PORT = process.env.SERIAL_PORT || "/dev/ttyACM0";
const BAUD_RATE = 115200; // Bittle uses 115200 baud

async function main() {
  console.log(`Connecting to Bittle on ${SERIAL_PORT}...`);

  // Open serial connection
  const port = new SerialPort({
    path: SERIAL_PORT,
    baudRate: BAUD_RATE,
  });

  // Wait for port to open
  await new Promise<void>((resolve, reject) => {
    port.on("open", resolve);
    port.on("error", reject);
  });

  console.log("Connected!");

  // Send a command (wave hello)
  const command = COMMANDS.hi;
  console.log(`Sending command: ${command}`);

  port.write(command + "\n");

  // Wait for command to execute
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Return to balance position
  console.log("Returning to balance...");
  port.write(COMMANDS.balance + "\n");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Close connection
  port.close();
  console.log("Done!");
}

main().catch(console.error);
