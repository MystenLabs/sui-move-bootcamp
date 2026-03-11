import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  SUI_NETWORK: z.enum(["devnet", "testnet"]),
  USER_SECRET_KEY: z.string(),
  PACKAGE_ID: z.string(),
});

export const ENV = envSchema.parse(process.env);
