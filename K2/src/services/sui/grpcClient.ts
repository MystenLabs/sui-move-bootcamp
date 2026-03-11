import { SuiGrpcClient } from "@mysten/sui/grpc";
import { CONFIG } from "../../config";

export const suiGrpcClient = new SuiGrpcClient({
  network: "devnet",
  baseUrl: CONFIG.app.grpcUrl,
});
