import { parseReading } from "./energy.js";
import type { EnergyReading } from "./types.js";

export function parseSerialLine(line: string): EnergyReading {
  return parseReading(JSON.parse(line));
}
