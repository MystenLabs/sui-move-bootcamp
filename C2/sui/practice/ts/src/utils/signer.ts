import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { ENV } from "../config";

export const getSigner = (): Ed25519Keypair => {
  return Ed25519Keypair.fromSecretKey(ENV.USER_SECRET_KEY);
};
