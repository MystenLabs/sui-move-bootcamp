/**
 * Serial Communication - Send commands to Bittle robot
 *
 * This module handles the physical connection to the robot.
 */

import { SerialPort } from "serialport";
import { BittleCommand } from "./commands";
import { BAUD_RATE, DEBUG, SERIAL_PORT } from "./config";

let port: SerialPort | null = null;

/**
 * Connect to the robot via serial port
 */
export async function connect(): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`Connecting to robot on ${SERIAL_PORT}...`);

    port = new SerialPort({
      path: SERIAL_PORT,
      baudRate: BAUD_RATE,
    });

    port.on("open", () => {
      console.log("Robot connected!");
      resolve(true);
    });

    port.on("error", (err) => {
      console.error("Serial port error:", err.message);
      port = null;
      resolve(false);
    });

    port.on("close", () => {
      console.log("Serial port closed");
      port = null;
    });

    // Log data from robot (for debugging)
    if (DEBUG) {
      port.on("data", (data) => {
        console.log("Robot says:", data.toString().trim());
      });
    }
  });
}

/**
 * Check if robot is connected
 */
export function isConnected(): boolean {
  return port !== null && port.isOpen;
}

/**
 * Send a command to the robot
 */
export async function sendCommand(command: BittleCommand): Promise<void> {
  if (!port || !port.isOpen) {
    throw new Error("Robot not connected");
  }

  return new Promise((resolve, reject) => {
    // Send the command with newline
    const data = command.code + "\n";

    if (DEBUG) {
      console.log(`Sending: ${command.code}`);
    }

    port!.write(data, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Wait for the action to complete
      setTimeout(resolve, command.duration);
    });
  });
}

/**
 * Disconnect from the robot
 */
export async function disconnect(): Promise<void> {
  if (port && port.isOpen) {
    return new Promise((resolve) => {
      port!.close(() => {
        port = null;
        resolve();
      });
    });
  }
}
