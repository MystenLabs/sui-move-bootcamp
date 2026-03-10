#!/usr/bin/env python3
"""
Bittle Device Detector

This script monitors for USB device connections and helps you find
the correct serial port for your Petoi Bittle X robot.

Usage:
    python3 detect-device.py

Then connect your Bittle via USB and watch for the serial port to appear.

Common serial port patterns:
    - macOS:  /dev/cu.usbmodem* or /dev/cu.usbserial*
    - Linux:  /dev/ttyACM0 or /dev/ttyUSB0
    - Windows: COM3, COM4, etc.
"""

import os
import sys
import time


def get_serial_ports():
    """Get list of potential serial ports in /dev"""
    try:
        devices = os.listdir("/dev")
        # Filter for likely serial ports
        serial_patterns = ["tty.usb", "cu.usb", "ttyACM", "ttyUSB"]
        ports = [
            f"/dev/{d}"
            for d in devices
            if any(pattern in d for pattern in serial_patterns)
        ]
        return sorted(ports)
    except Exception:
        return []


def main():
    print("=" * 50)
    print("Bittle Device Detector")
    print("=" * 50)
    print("\nMonitoring for USB serial devices...")
    print("Connect your Bittle via USB cable.\n")
    print("Press Ctrl+C to stop\n")

    previous_ports = set(get_serial_ports())

    if previous_ports:
        print("Currently connected serial ports:")
        for port in previous_ports:
            print(f"  {port}")
        print()

    try:
        while True:
            time.sleep(1)
            current_ports = set(get_serial_ports())

            # Check for new devices
            new_ports = current_ports - previous_ports
            removed_ports = previous_ports - current_ports

            if new_ports:
                print(f"[NEW] Device connected:")
                for port in new_ports:
                    print(f"  --> {port}")
                    print(f"\n  Use this port: SERIAL_PORT={port} pnpm start\n")

            if removed_ports:
                print(f"[REMOVED] Device disconnected:")
                for port in removed_ports:
                    print(f"  <-- {port}")

            previous_ports = current_ports

    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
