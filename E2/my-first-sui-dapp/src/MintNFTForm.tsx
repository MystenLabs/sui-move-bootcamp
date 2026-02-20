import { useCurrentAccount, useCurrentClient, useDAppKit } from "@mysten/dapp-kit-react";
import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@radix-ui/themes";

export const MintNFTForm = ({ onMinted }: { onMinted: () => void }) => {
  const client = useCurrentClient();
  const account = useCurrentAccount();
  const dAppKit = useDAppKit();

  const handleMint = () => {
    if (!account?.address) {
      alert("Wallet not connected!");
      return;
    }
    // TODO: add the implementation
    const tx = new Transaction();
    const hero = tx.moveCall({
      target: `0xc413c2e2c1ac0630f532941be972109eae5d6734e540f20109d75a59a1efea1e::hero::mint_hero`,
      arguments: [],
      typeArguments: [],
    });
    tx.transferObjects([hero], account?.address);

    dAppKit
      .signAndExecuteTransaction({
        transaction: tx,
      })
      .then(async (resp) => {
        console.log(resp.Transaction?.digest);
        await client.waitForTransaction({ result: resp });
        onMinted();
      })
      .catch((err) => {
        console.log(err);
        console.log("You rejected it!!!");
        alert("Oops...");
      });

    console.log(tx);
  };

  if (!account) {
    return null;
  }
  return <Button onClick={handleMint}>Mint Hero</Button>;
};
