import * as fs from "fs";
import * as path from "path";
import { GasResult } from "../types/gas";

const DEBUG_DIR = path.join(__dirname, "../../debug");

export const writeDebugFile = (filename: string, content: string) => {
  fs.writeFileSync(path.join(DEBUG_DIR, filename), content, "utf-8");
};

export const appendDebugFile = (filename: string, content: string) => {
  fs.appendFileSync(path.join(DEBUG_DIR, filename), content, "utf-8");
};

export const formatHeader = (title: string): string => {
  const line = "=".repeat(70);
  return `${line}\n${title}\n${line}\n`;
};

export const formatSection = (title: string): string => {
  const line = "-".repeat(50);
  return `\n${line}\n${title}\n${line}\n`;
};

export const formatGasTable = (results: GasResult[]): string => {
  let output = "\n  ┌─────────┬──────────────────┬──────────────────┬──────────────────┬──────────────────┐\n";
  output +=     "  │    n    │    Computation   │      Storage     │      Rebate      │       Total      │\n";
  output +=     "  ├─────────┼──────────────────┼──────────────────┼──────────────────┼──────────────────┤\n";
  for (const { n, gas } of results) {
    output += `  │ ${n.toString().padStart(5)}   │ ${gas.computationCost.padStart(16)} │ ${gas.storageCost.padStart(16)} │ ${gas.storageRebate.padStart(16)} │ ${gas.totalGas.padStart(16)} │\n`;
  }
  output +=     "  └─────────┴──────────────────┴──────────────────┴──────────────────┴──────────────────┘\n";
  return output;
};
