import {
  executeSponsoredTx,
  getSponsoredTx,
} from '@/lib/enoki/get-sponsored-tx';
import { decrementTransaction } from '@/lib/counter/counter-transactions';
import clientConfig from '@/lib/env-config-client';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { useMutation } from '@tanstack/react-query';

export interface DecrementParams {
  note: string;
}

/**
 * Hook for decrementing the counter with Enoki-sponsored transactions
 */
export const useDecrement = () => {
  const client = useSuiClient();
  const sender = useCurrentAccount();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return useMutation({
    mutationFn: async (params: DecrementParams) => {
      const { note } = params;

      // 1. Validate wallet connection
      if (!sender) {
        throw new Error('Wallet not connected');
      }

      // 2. Build the transaction
      const transaction = decrementTransaction(
        clientConfig.NEXT_PUBLIC_COUNTER_OBJECT_ID,
        note,
        clientConfig.NEXT_PUBLIC_PACKAGE_ADDRESS,
      );

      // 3. Build transaction bytes with onlyTransactionKind: true
      const txBytes = await transaction.build({
        client: client,
        onlyTransactionKind: true,
      });

      // 4. Get sponsored transaction from server
      const sponsoredTxn = await getSponsoredTx({
        sender: sender.address,
        txBytes: txBytes,
      });

      // 5. Sign the sponsored transaction bytes with user's wallet
      const { signature } = await signTransaction({
        transaction: sponsoredTxn.bytes,
      });

      // 6. Execute the sponsored transaction
      const result = await executeSponsoredTx({
        digest: sponsoredTxn.digest,
        signature: signature,
      });

      // 7. Wait for transaction confirmation
      const waitedResult = await client.waitForTransaction({
        digest: result.digest,
        options: {
          showEffects: true,
        },
      });

      return {
        digest: result.digest,
        result: waitedResult,
      };
    },
  });
};
