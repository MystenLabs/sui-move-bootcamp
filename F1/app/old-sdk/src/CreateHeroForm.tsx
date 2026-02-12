import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";

export const CreateHeroForm = () => {
  const queryClient = useQueryClient();
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction, isPending } =
    useSignAndExecuteTransaction();

  const handleMint = async () => {
    if (!account) {
      alert("Connect your wallet");
      return;
    }
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
      await suiClient.waitForTransaction({ digest: resp.digest });
      await queryClient.invalidateQueries({
        queryKey: ["testnet", "getOwnedObjects"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["testnet", "getObject"],
      });
    });
  };

  if (!account) {
    return <div>Wallet not connected</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <Button onClick={handleMint}>Mint Hero</Button>;
};
