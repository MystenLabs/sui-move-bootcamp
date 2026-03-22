#!/usr/bin/env python3
"""Wrap deterministic readings in LoRa-style packets."""

from __future__ import annotations

import argparse
import json
from dataclasses import asdict

from energy_sim import generate_readings


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--count", type=int, default=10)
    parser.add_argument("--start-ms", type=int, default=1_700_000_000_000)
    parser.add_argument("--step-ms", type=int, default=60_000)
    args = parser.parse_args()

    for index, reading in enumerate(
        generate_readings(args.count, args.start_ms, args.step_ms)
    ):
        packet = {
            "rssi": -52 - index,
            "snr": 9.5,
            "payload": asdict(reading),
        }
        print(json.dumps(packet))


if __name__ == "__main__":
    main()
