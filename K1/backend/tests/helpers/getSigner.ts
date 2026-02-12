import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromBase64 } from "@mysten/sui/utils";

export const getSigner = ({ secretKey }: { secretKey: string }) => {
  let privKeyArray = Uint8Array.from(Array.from(fromBase64(secretKey)));
  const keypair = Ed25519Keypair.fromSecretKey(
    Uint8Array.from(privKeyArray).slice(1)
  );
  return keypair;
};
