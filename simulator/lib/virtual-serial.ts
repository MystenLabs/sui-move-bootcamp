/**
 * VirtualSerialPort — Zero-dependency drop-in replacement for `serialport`.
 *
 * Connects to the SuiBotics simulator's TCP serial bridge (default port 8375).
 * Uses only Node.js built-in `net` module — no npm packages needed.
 *
 * Usage in any R module:
 *   import { VirtualSerialPort as SerialPort } from "../../simulator/lib/virtual-serial.js";
 *   const port = new SerialPort();
 *   port.on("open", () => port.write("ksit\n"));
 *   port.on("data", (buf) => console.log(buf.toString()));
 */

import { Socket } from "net";
import { EventEmitter } from "events";

const SIM_HOST = process.env.SIM_HOST || "localhost";
const SIM_PORT = parseInt(process.env.SIM_PORT || "8375");

export class VirtualSerialPort extends EventEmitter {
  private socket: Socket;
  isOpen = false;

  constructor(_opts?: Record<string, unknown>) {
    super();
    this.socket = new Socket();

    this.socket.connect(SIM_PORT, SIM_HOST, () => {
      this.isOpen = true;
      this.emit("open");
    });

    this.socket.on("data", (data: Buffer) => {
      this.emit("data", data);
    });

    this.socket.on("error", (err: Error) => {
      this.emit("error", err);
    });

    this.socket.on("close", () => {
      this.isOpen = false;
      this.emit("close");
    });
  }

  write(data: string | Buffer, callback?: (err?: Error | null) => void): boolean {
    if (!this.isOpen) {
      callback?.(new Error("Port is not open"));
      return false;
    }
    this.socket.write(data.toString());
    callback?.(null);
    return true;
  }

  close(callback?: (err?: Error | null) => void): void {
    this.socket.end();
    this.isOpen = false;
    callback?.(null);
  }
}

export { VirtualSerialPort as SerialPort };
