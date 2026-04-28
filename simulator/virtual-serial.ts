/**
 * VirtualSerialPort — Drop-in replacement for the `serialport` library.
 *
 * Instead of talking to a physical USB device, this connects to the
 * SuiBotics simulator via WebSocket, letting you run all R-module code
 * without any hardware.
 *
 * Usage (in any R module):
 *
 *   // Replace:
 *   // import { SerialPort } from "serialport";
 *   // const port = new SerialPort({ path: "/dev/ttyACM0", baudRate: 115200 });
 *
 *   // With:
 *   import { VirtualSerialPort as SerialPort } from "../simulator/virtual-serial";
 *   const port = new SerialPort({ simulatorUrl: "ws://localhost:3000/serial" });
 */

import WebSocket from "ws";
import { EventEmitter } from "events";

interface VirtualSerialOptions {
  /** WebSocket URL of the simulator's serial endpoint */
  simulatorUrl?: string;
  /** Ignored — included for API compat with serialport */
  path?: string;
  /** Ignored — included for API compat with serialport */
  baudRate?: number;
}

export class VirtualSerialPort extends EventEmitter {
  private ws: WebSocket;
  private url: string;
  isOpen = false;

  constructor(options: VirtualSerialOptions = {}) {
    super();
    this.url = options.simulatorUrl || "ws://localhost:3000/serial";

    this.ws = new WebSocket(this.url);

    this.ws.on("open", () => {
      this.isOpen = true;
      this.emit("open");
    });

    this.ws.on("message", (data: WebSocket.Data) => {
      const buf = Buffer.from(data.toString());
      this.emit("data", buf);
    });

    this.ws.on("error", (err: Error) => {
      this.emit("error", err);
    });

    this.ws.on("close", () => {
      this.isOpen = false;
      this.emit("close");
    });
  }

  write(data: string | Buffer, callback?: (err?: Error | null) => void): boolean {
    if (!this.isOpen) {
      const err = new Error("Port is not open");
      if (callback) callback(err);
      return false;
    }

    try {
      this.ws.send(data.toString());
      if (callback) callback(null);
      return true;
    } catch (err) {
      if (callback) callback(err as Error);
      return false;
    }
  }

  close(callback?: (err?: Error | null) => void): void {
    this.ws.close();
    this.isOpen = false;
    if (callback) callback(null);
  }
}

// Also export as SerialPort for easier drop-in replacement
export { VirtualSerialPort as SerialPort };
