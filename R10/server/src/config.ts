/**
 * Server Configuration
 *
 * Loads configuration from environment variables with sensible defaults.
 * All sensitive values (like private keys) should be in .env file.
 */

import "dotenv/config";

/**
 * Configuration object with all server settings
 */
export const config = {
  // Server
  port: parseInt(process.env.WEBSOCKET_PORT || "8080", 10),

  // Sui Network
  network: process.env.NETWORK || "testnet",
  rpcUrl:
    process.env.SUI_RPC_URL ||
    `https://fullnode.${process.env.NETWORK || "testnet"}.sui.io`,

  // Contract addresses
  packageId: process.env.PACKAGE_ADDRESS || "",
  registryId: process.env.REGISTRY_ID || "",

  // Timeouts (in milliseconds)
  pingInterval: parseInt(process.env.PING_INTERVAL_MS || "30000", 10),
  sessionCheckInterval: parseInt(
    process.env.SESSION_CHECK_INTERVAL_MS || "60000",
    10,
  ),
  clientTimeout: parseInt(process.env.CLIENT_TIMEOUT_MS || "120000", 10),

  // Robot simulation (set to true if no physical robot connected)
  simulateRobot: process.env.SIMULATE_ROBOT === "true",

  // Serial port (for physical robot)
  serialPort: process.env.SERIAL_PORT || "",
  serialBaudRate: parseInt(process.env.SERIAL_BAUD_RATE || "115200", 10),

  // Debug mode
  debug: process.env.DEBUG === "true",
} as const;

/**
 * Validate required configuration
 */
export function validateConfig(): void {
  const errors: string[] = [];

  if (!config.packageId) {
    errors.push("PACKAGE_ADDRESS is required");
  }

  if (!config.registryId) {
    errors.push("REGISTRY_ID is required");
  }

  if (errors.length > 0) {
    console.error("Configuration errors:");
    errors.forEach((e) => console.error(`  - ${e}`));
    console.error("\nPlease check your .env file");
    process.exit(1);
  }
}

/**
 * Log current configuration (hiding sensitive values)
 */
export function logConfig(): void {
  console.log("Server Configuration:");
  console.log(`  Port: ${config.port}`);
  console.log(`  Network: ${config.network}`);
  console.log(`  RPC URL: ${config.rpcUrl}`);
  console.log(`  Package ID: ${config.packageId}`);
  console.log(`  Registry ID: ${config.registryId}`);
  console.log(`  Simulate Robot: ${config.simulateRobot}`);
  if (!config.simulateRobot && config.serialPort) {
    console.log(`  Serial Port: ${config.serialPort}`);
  }
  console.log(`  Debug: ${config.debug}`);
}
