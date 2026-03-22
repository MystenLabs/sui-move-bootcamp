import { parseReading } from "./energy.js";
import type { EnergyReading, LoRaPacket } from "./types.js";

export function parseLoRaPacket(line: string): LoRaPacket {
  const packet = JSON.parse(line) as LoRaPacket;
  return {
    rssi: Number(packet.rssi),
    snr: Number(packet.snr),
    payload: parseReading(packet.payload),
  };
}

export function readingFromPacket(line: string): EnergyReading {
  return parseLoRaPacket(line).payload;
}
