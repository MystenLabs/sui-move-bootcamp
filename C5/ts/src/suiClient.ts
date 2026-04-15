import { SuiGrpcClient } from "@mysten/sui/grpc";
import { getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";

export const suiClient = new SuiGrpcClient({
    baseUrl: getJsonRpcFullnodeUrl(process.env.NETWORK as "mainnet" | "testnet" | "devnet" | "localnet"),
    network: process.env.NETWORK as string,
});
