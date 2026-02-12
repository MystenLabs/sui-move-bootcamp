import {
  useCurrentAccount,
  useCurrentClient,
  useDAppKit
} from "@mysten/dapp-kit-react";
import { Transaction } from "@mysten/sui/transactions";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const CreateHeroForm = () => {
  const queryClient = useQueryClient();
  const suiClient = useCurrentClient();
  const [isPending, setIsPending] = useState(false);
  const {signAndExecuteTransaction} = useDAppKit();
  const account = useCurrentAccount();

  const handleMint = async () => {
    if (!account) {
      alert("Connect your wallet");
      return;
    }
    setIsPending(true);

    const tx = new Transaction();

    // TODO: Populate the commands of the transaction to:
    // TODO: * mint a hero
    // TODO: * mint a weapon
    // TODO: * equip the weapon to the hero
    // TODO: * transfer the hero to the current wallet's address
    const hero = tx.moveCall({
      target: `${import.meta.env.VITE_PACKAGE_ID}::hero::new_hero`,
      arguments: [
        tx.pure.string("My Hero"),
        tx.pure.u64(100),
        tx.object(import.meta.env.VITE_HEROES_REGISTRY_ID),
      ],
    });
    const weapon = tx.moveCall({
      target: `${import.meta.env.VITE_PACKAGE_ID}::hero::new_weapon`,
      arguments: [tx.pure.string("My Weapon"), tx.pure.u64(1000)],
    });
    tx.moveCall({
      target: `${import.meta.env.VITE_PACKAGE_ID}::hero::equip_weapon`,
      arguments: [hero, weapon],
    });
    tx.transferObjects([hero], account.address);

    await signAndExecuteTransaction({
      transaction: tx,
    }).then(async (resp) => {
      await suiClient.waitForTransaction({ digest: resp.Transaction!.digest });
      await queryClient.invalidateQueries({
        queryKey: ["getObject"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["ownedObjects", account.address],
      });
    });

    setIsPending(false);
  };
  

  if (!account) {
    return <div>Wallet not connected</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <button className="m-auto p-2 bg-green-600" onClick={handleMint}>Mint Hero</button>;
};
