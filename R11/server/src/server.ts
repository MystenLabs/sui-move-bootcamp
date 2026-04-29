import { createServer } from "node:http";
import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { config, validateConfig } from "./config.js";
import { readingDelta } from "./energy.js";
import { readingFromPacket } from "./lora.js";
import { parseSerialLine } from "./serial.js";
import { describeSubmission, submitReading } from "./sui.js";
import type { EnergyReading } from "./types.js";

const history: EnergyReading[] = [];
let lastDigest = "";

validateConfig();

function parseLine(line: string): EnergyReading {
  return config.transport === "lora" ? readingFromPacket(line) : parseSerialLine(line);
}

createServer((_req, res) => {
  const latest = history.at(-1) ?? null;
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ latest, count: history.length, lastDigest }));
}).listen(config.httpPort, config.httpHost, () => {
  stdout.write(
    `R11 bridge listening on http://${config.httpHost}:${config.httpPort} using ${config.transport} transport\n`,
  );
});

const rl = createInterface({ input: stdin, crlfDelay: Infinity });
rl.on("line", async (line) => {
  if (!line.trim()) {
    return;
  }

  try {
    const reading = parseLine(line);
    const delta = readingDelta(history.at(-1) ?? null, reading);
    history.push(reading);

    if (config.autoSubmit) {
      lastDigest = await submitReading(reading, delta);
      stdout.write(`submitted_digest=${lastDigest}\n`);
    } else {
      stdout.write(
        `${JSON.stringify(
          describeSubmission(reading, config.packageId, config.meterObjectId, delta),
        )}\n`,
      );
    }

    stdout.write(`delta_kwh_milli=${delta}\n`);
  } catch (error) {
    stdout.write(`bridge_error=${(error as Error).message}\n`);
  }
});
