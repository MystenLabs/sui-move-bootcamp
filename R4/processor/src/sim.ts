/**
 * R4 Simulator Mode — Blockchain Robot Processor
 *
 * Polls the Sui blockchain for queued actions (same as processor.ts)
 * but sends commands to the SuiBotics simulator instead of physical hardware.
 *
 * Prerequisites:
 *   1. Deploy the R2 contract and set up .env (PACKAGE_ADDRESS, QUEUE_ID, etc.)
 *   2. Start the simulator: cd simulator && npm run dev
 *   3. Run this: npx tsx src/sim.ts
 */

import { VirtualSerialPort } from "../../../simulator/lib/virtual-serial.js";
import { readQueue, popAction } from "./blockchain.js";
import { ACTION_TO_COMMAND } from "./commands.js";
import { config } from "./config.js";

const port = new VirtualSerialPort();
let isRunning = true;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processLoop(): Promise<void> {
  console.log("");
  console.log("=".repeat(50));
  console.log("  R4: Blockchain Robot Processor (Simulator)");
  console.log("=".repeat(50));
  console.log("");
  console.log(`  Package:  ${config.packageAddress}`);
  console.log(`  Queue:    ${config.queueId}`);
  console.log(`  Polling:  every ${config.pollIntervalMs}ms`);
  console.log(`  Robot:    Virtual Bittle (simulator)`);
  console.log("");

  while (isRunning) {
    try {
      const state = await readQueue();
      const pending = state.actions?.length || 0;

      if (pending > 0) {
        const action = state.actions[0];
        console.log(`  [Queue] ${pending} action(s) pending. Next: "${action.name}"`);

        // Map action to serial command
        const mapping = ACTION_TO_COMMAND[action.name];
        if (mapping) {
          console.log(`  [Robot] Executing ${mapping.code} (${mapping.duration}ms)...`);
          port.write(mapping.code + "\n");
          await wait(mapping.duration);
          console.log(`  [Robot] Done.`);
        } else {
          console.log(`  [Robot] Unknown action "${action.name}", skipping.`);
        }

        // Pop from blockchain queue
        await popAction();
        console.log(`  [Chain] Action processed and removed from queue.\n`);
      } else {
        if (config.debug) console.log("  [Queue] Empty, waiting...");
      }
    } catch (err) {
      console.error(`  [Error] ${(err as Error).message}`);
    }

    await wait(config.pollIntervalMs);
  }
}

port.on("open", () => {
  console.log("  Connected to Virtual Bittle simulator.");

  port.on("data", (data: Buffer) => {
    const msg = data.toString().trim();
    if (msg && config.debug) console.log(`  [Serial] ${msg}`);
  });

  processLoop().catch(console.error);
});

port.on("error", (err: Error) => {
  console.error("Connection failed. Is the simulator running?");
  console.error("  Start it: cd simulator && npm run dev");
  console.error(`  Error: ${err.message}`);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("\n  Shutting down...");
  isRunning = false;
  port.close();
  process.exit(0);
});
