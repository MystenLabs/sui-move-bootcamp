import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromBase64 } from "@mysten/sui/utils";

export const getSigner = ({ secretKey }: { secretKey: string }) => {
  const keypair = Ed25519Keypair.fromSecretKey(
    secretKey
  );
  return keypair;
};
