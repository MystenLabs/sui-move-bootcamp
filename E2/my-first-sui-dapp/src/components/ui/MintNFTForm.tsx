import { useCurrentAccount, useCurrentClient, useCurrentNetwork, useDAppKit } from "@mysten/dapp-kit-react";
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@mysten/sui/transactions";

export const MintNFTForm = () => {
  const client = useCurrentClient();
  const account = useCurrentAccount();
  const dAppKit = useDAppKit();
  const queryClient = useQueryClient();
  const network = useCurrentNetwork();

  const handleMint = () => {
    if (!account?.address) {
      alert("Wallet not connected!");
      return;
    }

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
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === network &&
            query.queryKey[1] === "getOwnedObjects",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!account) {
    return null;
  }
  return (
    <button
      onClick={handleMint}
      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      Mint Hero
    </button>
  );
};
