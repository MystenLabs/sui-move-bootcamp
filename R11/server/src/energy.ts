import type { EnergyReading } from "./types.js";

const MAX_WATTS = 50_000;

export function parseReading(raw: unknown): EnergyReading {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Expected an object payload");
  }

  const record = raw as Record<string, unknown>;
  const reading: EnergyReading = {
    meterId: String(record.meterId ?? ""),
    watts: Number(record.watts ?? 0),
    totalKwhMilli: Number(record.totalKwhMilli ?? 0),
    timestampMs: Number(record.timestampMs ?? 0),
  };

  validateReading(reading);
  return reading;
}

export function validateReading(reading: EnergyReading): void {
  if (!reading.meterId) {
    throw new Error("meterId is required");
  }

  if (!Number.isFinite(reading.watts) || reading.watts < 0 || reading.watts > MAX_WATTS) {
    throw new Error(`watts must be between 0 and ${MAX_WATTS}`);
  }

  if (!Number.isFinite(reading.totalKwhMilli) || reading.totalKwhMilli < 0) {
    throw new Error("totalKwhMilli must be non-negative");
  }

  if (!Number.isFinite(reading.timestampMs) || reading.timestampMs <= 0) {
    throw new Error("timestampMs must be positive");
  }
}

export function readingDelta(
  previous: EnergyReading | null,
  current: EnergyReading,
): number {
  if (!previous) {
    return current.totalKwhMilli;
  }

  return Math.max(0, current.totalKwhMilli - previous.totalKwhMilli);
}
