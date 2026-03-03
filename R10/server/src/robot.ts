/**
 * Robot Controller
 *
 * Handles execution of robot commands, either:
 * - Simulated (for testing without hardware)
 * - Physical (via serial port to Petoi Bittle)
 *
 * This module abstracts the robot interface so the server
 * doesn't need to know about the underlying hardware.
 */

import { config } from "./config";
import {
  ACTION_DURATIONS,
  ACTION_TO_SERIAL,
  type RobotAction,
  VALID_ACTIONS,
} from "./types";

// ============================================
// STATE
// ============================================

let isBusy = false;
let currentAction: RobotAction | null = null;

// Serial port (lazy loaded) - using 'any' to avoid coupling to serialport types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let serialPort: any = null;

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the robot connection.
 *
 * - In simulation mode: No-op
 * - In physical mode: Opens serial port
 */
export async function initializeRobot(): Promise<void> {
  if (config.simulateRobot) {
    console.log("Robot running in SIMULATION mode");
    return;
  }

  if (!config.serialPort) {
    console.warn(
      "No SERIAL_PORT configured. Robot will run in simulation mode.",
    );
    return;
  }

  try {
    // Dynamic import for serialport (optional dependency)
    const serialportModule = await import("serialport");
    const SerialPort = serialportModule.SerialPort;

    const port = new SerialPort({
      path: config.serialPort,
      baudRate: config.serialBaudRate,
    });

    await new Promise<void>((resolve, reject) => {
      port.on("open", () => {
        console.log(`Robot connected on ${config.serialPort}`);
        resolve();
      });
      port.on("error", reject);
    });

    serialPort = port;
  } catch (error) {
    console.error("Failed to connect to robot:", error);
    console.log("Falling back to simulation mode");
  }
}

/**
 * Close the robot connection.
 */
export async function closeRobot(): Promise<void> {
  if (serialPort && serialPort.isOpen) {
    await new Promise<void>((resolve) => {
      serialPort!.close(() => resolve());
    });
    serialPort = null;
  }
}

// ============================================
// COMMAND EXECUTION
// ============================================

/**
 * Check if the robot is currently busy executing a command.
 */
export function isRobotBusy(): boolean {
  return isBusy;
}

/**
 * Get the current action being executed.
 */
export function getCurrentAction(): RobotAction | null {
  return currentAction;
}

/**
 * Validate if an action is supported.
 */
export function isValidAction(action: string): action is RobotAction {
  return VALID_ACTIONS.includes(action as RobotAction);
}

/**
 * Execute a robot action.
 *
 * @param action - The action to execute
 * @returns Promise that resolves when action completes
 * @throws Error if robot is busy or action is invalid
 */
export async function executeAction(action: RobotAction): Promise<void> {
  if (!isValidAction(action)) {
    throw new Error(`Invalid action: ${action}`);
  }

  if (isBusy) {
    throw new Error("Robot is busy");
  }

  isBusy = true;
  currentAction = action;

  try {
    const duration = ACTION_DURATIONS[action];

    if (config.simulateRobot || !serialPort) {
      // Simulation: just wait for the duration
      if (config.debug) {
        console.log(`[SIMULATE] Executing ${action} for ${duration}ms`);
      }
      await sleep(duration);
    } else {
      // Physical robot: send serial command
      const serialCmd = ACTION_TO_SERIAL[action];
      await sendSerialCommand(serialCmd, duration);
    }

    if (config.debug) {
      console.log(`Action ${action} completed`);
    }
  } finally {
    isBusy = false;
    currentAction = null;
  }
}

// ============================================
// SERIAL COMMUNICATION
// ============================================

/**
 * Send a command to the physical robot via serial.
 *
 * @param command - The serial command string
 * @param duration - How long to wait for the action
 */
async function sendSerialCommand(
  command: string,
  duration: number,
): Promise<void> {
  if (!serialPort || !serialPort.isOpen) {
    throw new Error("Serial port not connected");
  }

  return new Promise((resolve, reject) => {
    // Send command with newline
    serialPort!.write(command + "\n", (err: Error | null) => {
      if (err) {
        reject(err);
        return;
      }

      if (config.debug) {
        console.log(`[SERIAL] Sent: ${command}`);
      }

      // Wait for action to complete
      setTimeout(resolve, duration);
    });
  });
}

// ============================================
// HELPERS
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
