/**
 * List all robots in the registry
 *
 * Usage: pnpm list-robots
 */

import { REGISTRY_ID, suiClient, validateConfig } from "./config";

async function main() {
  // Validate configuration
  validateConfig(["REGISTRY_ID"]);

  console.log("=== Robot Registry ===");
  console.log(`Registry ID: ${REGISTRY_ID}`);
  console.log(`Network: ${process.env.NETWORK || "testnet"}`);
  console.log("");

  try {
    // Get registry object
    const registry = await suiClient.getObject({
      id: REGISTRY_ID,
      options: { showContent: true },
    });

    if (registry.data?.content?.dataType !== "moveObject") {
      console.error("Could not read registry");
      process.exit(1);
    }

    const fields = registry.data.content.fields as any;
    const robotNames = fields.robot_names || [];
    const activeCount = fields.active_count || 0;
    const totalRegistered = fields.total_registered || 0;

    console.log(`Total Registered: ${totalRegistered}`);
    console.log(`Currently Active: ${activeCount}`);
    console.log("");

    if (robotNames.length === 0) {
      console.log("No robots registered yet.");
      console.log("\nTo register a robot, run: pnpm register-robot");
      return;
    }

    // Get robot details from the Table
    // Note: Reading Table entries requires dynamic field queries
    const robotsTableId = fields.robots?.fields?.id?.id;

    if (!robotsTableId) {
      // Just list names if we can't access the Table
      console.log("Registered Robots:");
      robotNames.forEach((name: string, i: number) => {
        console.log(`  ${i + 1}. ${name}`);
      });
      return;
    }

    // Query dynamic fields (robot entries)
    console.log("Available Robots:\n");

    for (const robotName of robotNames) {
      try {
        // Query dynamic field for this robot name
        const robotField = await suiClient.getDynamicFieldObject({
          parentId: robotsTableId,
          name: {
            type: "0x1::string::String",
            value: robotName,
          },
        });

        if (robotField.data?.content?.dataType === "moveObject") {
          const robotData = (robotField.data.content.fields as any).value;

          console.log(`  ${robotData.name}`);
          console.log(`    Type: ${robotData.robot_type}`);
          console.log(`    Description: ${robotData.description}`);
          console.log(`    Price: ${robotData.price_per_minute} TREAT/min`);
          console.log(
            `    Available: ${robotData.is_available ? "Yes" : "No"}`,
          );
          console.log(`    Sessions: ${robotData.total_sessions}`);
          console.log(`    Total Minutes: ${robotData.total_minutes}`);
          console.log("");
        }
      } catch (error) {
        // If we can't read the dynamic field, just show the name
        console.log(`  ${robotName} (details unavailable)`);
      }
    }
  } catch (error: any) {
    console.error("Failed to read registry:", error.message);
    process.exit(1);
  }
}

main();
