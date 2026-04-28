/**
 * R1 Interactive Simulator — Control the virtual Bittle in real-time
 *
 * Prerequisites:
 *   1. Start the simulator: cd simulator && npm run dev
 *   2. Run this: npx tsx src/sim-interactive.ts
 */

import readline from "readline";
import { VirtualSerialPort } from "../../../simulator/lib/virtual-serial.js";
import { COMMANDS } from "./commands.js";

const port = new VirtualSerialPort();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

port.on("open", () => {
  console.log("");
  console.log("=".repeat(50));
  console.log("  R1: Interactive Robot Control (Simulator)");
  console.log("=".repeat(50));
  console.log("");
  console.log("Available commands:");

  const entries = Object.entries(COMMANDS);
  for (const [name, cmd] of entries) {
    console.log(`  ${name.padEnd(15)} → ${cmd.code}`);
  }
  console.log("");
  console.log("Type a command name or raw serial code (e.g. 'sit' or 'ksit'):");
  console.log("Type 'quit' to exit.\n");

  port.on("data", (data: Buffer) => {
    const msg = data.toString().trim();
    if (msg) console.log(`  << ${msg}`);
  });

  rl.on("line", (input) => {
    const trimmed = input.trim();
    if (trimmed === "quit" || trimmed === "exit") {
      port.close();
      rl.close();
      process.exit(0);
    }

    // Check if it's a command name
    const cmd = COMMANDS[trimmed as keyof typeof COMMANDS];
    if (cmd) {
      console.log(`  >> ${cmd.code}`);
      port.write(cmd.code + "\n");
    } else if (trimmed.startsWith("k")) {
      // Raw serial command
      console.log(`  >> ${trimmed}`);
      port.write(trimmed + "\n");
    } else {
      console.log(`  Unknown command. Try: ${Object.keys(COMMANDS).join(", ")}`);
    }
  });
});

port.on("error", (err: Error) => {
  console.error("Connection failed. Is the simulator running?");
  console.error("  Start it: cd simulator && npm run dev");
  console.error(`  Error: ${err.message}`);
  process.exit(1);
});
