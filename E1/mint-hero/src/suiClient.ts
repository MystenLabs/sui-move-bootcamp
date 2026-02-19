import { SuiGrpcClient } from "@mysten/sui/grpc";
import { ENV } from "./env";
export const suiClient = new SuiGrpcClient({
  baseUrl: `https://fullnode.${ENV.SUI_NETWORK}.sui.io:443`,
  network: ENV.SUI_NETWORK,
});
