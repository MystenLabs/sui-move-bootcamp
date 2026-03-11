import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { ENV } from "./env";
import { env } from "node:process";

export const suiClient = new SuiClient({ url: getFullnodeUrl(ENV.SUI_NETWORK) });
