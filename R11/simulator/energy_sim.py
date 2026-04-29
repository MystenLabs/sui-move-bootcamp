#!/usr/bin/env python3
"""Deterministic energy reading generator for R11."""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass, asdict


@dataclass
class Reading:
    meterId: str
    watts: int
    totalKwhMilli: int
    timestampMs: int


def generate_readings(count: int, start_ms: int, step_ms: int) -> list[Reading]:
    readings: list[Reading] = []
    total_kwh_milli = 0

    for index in range(count):
        watts = 320 + ((index * 73) % 540)
        total_kwh_milli += max(1, watts * step_ms // 3_600_000)
        readings.append(
            Reading(
                meterId="meter-lab-01",
                watts=watts,
                totalKwhMilli=total_kwh_milli,
                timestampMs=start_ms + (index * step_ms),
            )
        )

    return readings


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--count", type=int, default=10)
    parser.add_argument("--start-ms", type=int, default=1_700_000_000_000)
    parser.add_argument("--step-ms", type=int, default=60_000)
    args = parser.parse_args()

    for reading in generate_readings(args.count, args.start_ms, args.step_ms):
        print(json.dumps(asdict(reading)))


if __name__ == "__main__":
    main()
