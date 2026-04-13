import { getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { SuiGrpcClient } from "@mysten/sui/grpc";
import { SuiGraphQLClient } from "@mysten/sui/graphql";

export const grpcClient = new SuiGrpcClient({
    network: "testnet",
    baseUrl: getJsonRpcFullnodeUrl("testnet"),
});

export const graphqlClient = new SuiGraphQLClient({
    network: "testnet",
    url: "https://graphql.testnet.sui.io/graphql",
});
