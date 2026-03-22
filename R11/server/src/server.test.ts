import assert from "node:assert/strict";
import test from "node:test";
import { parseLoRaPacket } from "./lora.js";
import { parseSerialLine } from "./serial.js";
import { describeSubmission, readingCallTarget } from "./sui.js";

test("parseSerialLine accepts simulator output", () => {
  const reading = parseSerialLine(
    JSON.stringify({
      meterId: "meter-lab-01",
      watts: 420,
      totalKwhMilli: 17,
      timestampMs: 1_700_000_000_000,
    }),
  );

  assert.equal(reading.meterId, "meter-lab-01");
  assert.equal(reading.watts, 420);
});

test("parseLoRaPacket unwraps payload", () => {
  const packet = parseLoRaPacket(
    JSON.stringify({
      rssi: -60,
      snr: 8.5,
      payload: {
        meterId: "meter-lab-01",
        watts: 512,
        totalKwhMilli: 18,
        timestampMs: 1_700_000_060_000,
      },
    }),
  );

  assert.equal(packet.payload.totalKwhMilli, 18);
  assert.equal(packet.rssi, -60);
});

test("describeSubmission builds a deterministic summary", () => {
  const summary = describeSubmission(
    {
      meterId: "meter-lab-01",
      watts: 600,
      totalKwhMilli: 22,
      timestampMs: 1_700_000_120_000,
    },
    "0xabc",
    "0x123",
    7,
  );

  assert.equal(summary.target, readingCallTarget("0xabc"));
  assert.equal(summary.meterObjectId, "0x123");
  assert.equal(summary.rewardDeltaMilli, 7);
});
