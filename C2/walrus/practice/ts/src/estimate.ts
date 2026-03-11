import { SuiGrpcClient } from "@mysten/sui/grpc";
import { getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { walrus, WalrusClient } from "@mysten/walrus";
import fs from "fs";

const EPOCHS = 50;
const FROST_PER_WAL = 1000000000;

async function main() {
    // Initialize clients
    const suiClient = new SuiGrpcClient({
        network: "testnet",
        baseUrl: getJsonRpcFullnodeUrl("testnet"),
    });
    const walrusClient = new WalrusClient({
        suiClient: suiClient,
        network: "testnet"
    });

    // Medium File
    const mediumFileStats = await fs.promises.stat("../test_file_medium.txt");
    const {storageCost, writeCost, totalCost} = await walrusClient.storageCost(mediumFileStats.size, EPOCHS);
    console.log(`Medium File (${mediumFileStats.size / 1024} KB):`);
    console.log(`Storage Cost: ${Number(storageCost) / FROST_PER_WAL} WAL`);
    console.log(`Write Cost: ${Number(writeCost) / FROST_PER_WAL} WAL`);
    console.log(`Total Cost: ${Number(totalCost) / FROST_PER_WAL} WAL`);

    // Small File
    const smallFileStats = await fs.promises.stat("../test_file_small.txt");
    const {storageCost: smallStorageCost, writeCost: smallWriteCost, totalCost: smallTotalCost} = await walrusClient.storageCost(smallFileStats.size, EPOCHS);
    console.log(`\nSmall File (${smallFileStats.size / 1024} KB):`);
    console.log(`Storage Cost: ${Number(smallStorageCost) / FROST_PER_WAL} WAL`);
    console.log(`Write Cost: ${Number(smallWriteCost) / FROST_PER_WAL} WAL`);
    console.log(`Total Cost: ${Number(smallTotalCost) / FROST_PER_WAL} WAL`);
}

main();
