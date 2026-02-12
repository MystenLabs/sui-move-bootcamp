import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";

export const MintNFTForm = () => {
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const queryClient = useQueryClient();
  const { mutateAsync } = useSignAndExecuteTransaction();

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

    mutateAsync({
      transaction: tx,
    })
      .then(async (resp) => {
        console.log(resp.digest);
        await suiClient.waitForTransaction({ digest: resp.digest });
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "testnet" &&
            query.queryKey[1] === "getOwnedObjects",
        });
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
