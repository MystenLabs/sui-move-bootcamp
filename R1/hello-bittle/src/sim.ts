/**
 * R1 Simulator Mode — Hello Bittle without hardware
 *
 * Runs the same demo as demo.ts but connects to the SuiBotics simulator
 * instead of a physical Petoi Bittle robot.
 *
 * Prerequisites:
 *   1. Start the simulator: cd simulator && npm run dev
 *   2. Run this: npx tsx src/sim.ts
 */

import { VirtualSerialPort } from "../../../simulator/lib/virtual-serial.js";
import { COMMANDS } from "./commands.js";

const port = new VirtualSerialPort();

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendCommand(
  name: string,
  duration: number
): Promise<void> {
  const cmd = COMMANDS[name as keyof typeof COMMANDS];
  if (!cmd) {
    console.log(`  Unknown command: ${name}`);
    return;
  }
  process.stdout.write(`  Sending "${name}" (${cmd.code})... `);
  port.write(cmd.code + "\n");
  await wait(duration);
  console.log("done");
}

port.on("open", async () => {
  console.log("");
  console.log("=".repeat(50));
  console.log("  R1: Hello Bittle — Simulator Mode");
  console.log("  Connected to Virtual Bittle");
  console.log("=".repeat(50));
  console.log("");

  // Listen for responses
  port.on("data", (data: Buffer) => {
    const msg = data.toString().trim();
    if (msg) console.log(`  Bittle says: ${msg}`);
  });

  // Run the demo sequence
  console.log("Running demo sequence...\n");

  await sendCommand("hi", 3000);
  await sendCommand("sit", 2000);
  await sendCommand("balance", 2000);
  await sendCommand("walkForward", 4000);
  await sendCommand("jump", 2000);
  await sendCommand("pushUp", 5000);
  await sendCommand("stretch", 3000);
  await sendCommand("playDead", 3000);
  await sendCommand("balance", 2000);

  console.log("\nDemo complete!");
  console.log("Try the interactive mode: npx tsx src/sim-interactive.ts\n");
  port.close();
  process.exit(0);
});

port.on("error", (err: Error) => {
  console.error("Connection failed. Is the simulator running?");
  console.error("  Start it: cd simulator && npm run dev");
  console.error(`  Error: ${err.message}`);
  process.exit(1);
});
