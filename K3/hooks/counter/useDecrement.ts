import { decrementTransaction } from '@/lib/counter/counter-transactions';
import {
  executeSponsoredTx,
  getSponsoredTx,
} from '@/lib/enoki/get-sponsored-tx';
import clientConfig from '@/lib/env-config-client';
import { TransactionError, isUserRejection } from '@/lib/errors';
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
        throw new TransactionError('Wallet not connected', 'wallet');
      }

      // 2. Build the transaction
      let txBytes: Uint8Array;
      try {
        const transaction = decrementTransaction(
          clientConfig.NEXT_PUBLIC_COUNTER_OBJECT_ID,
          note,
          clientConfig.NEXT_PUBLIC_PACKAGE_ADDRESS,
        );

        txBytes = await transaction.build({
          client: client,
          onlyTransactionKind: true,
        });
      } catch (error) {
        throw new TransactionError(
          'Failed to build transaction',
          'build',
          error,
        );
      }

      // 3. Get sponsored transaction from server
      let sponsoredTxn: Awaited<ReturnType<typeof getSponsoredTx>>;
      try {
        sponsoredTxn = await getSponsoredTx({
          sender: sender.address,
          txBytes: txBytes,
        });
      } catch (error) {
        throw new TransactionError(
          'Failed to get sponsorship from Enoki',
          'sponsor',
          error,
        );
      }

      // 4. Sign the sponsored transaction bytes with user's wallet
      let signature: string;
      try {
        const signResult = await signTransaction({
          transaction: sponsoredTxn.bytes,
        });
        signature = signResult.signature;
      } catch (error) {
        if (isUserRejection(error)) {
          throw new TransactionError(
            'Transaction signing cancelled',
            'sign',
            error,
          );
        }
        throw new TransactionError('Failed to sign transaction', 'sign', error);
      }

      // 5. Execute the sponsored transaction
      let result: Awaited<ReturnType<typeof executeSponsoredTx>>;
      try {
        result = await executeSponsoredTx({
          digest: sponsoredTxn.digest,
          signature: signature,
        });
      } catch (error) {
        throw new TransactionError(
          'Failed to execute transaction',
          'execute',
          error,
        );
      }

      // 6. Wait for transaction confirmation
      try {
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
      } catch (error) {
        throw new TransactionError(
          'Failed to confirm transaction',
          'confirm',
          error,
        );
      }
    },
  });
};
