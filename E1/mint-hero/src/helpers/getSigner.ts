import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

export const getSigner = ({ secretKey }: { secretKey: string }) => {
  const keypair = Ed25519Keypair.fromSecretKey(
    secretKey
  );
  return keypair;
};
