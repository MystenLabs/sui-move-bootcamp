import { decrementTransaction } from '@/lib/counter/counter-transactions';
import clientConfig from '@/lib/env-config-client';
import { TransactionError, isUserRejection } from '@/lib/errors';
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { useMutation } from '@tanstack/react-query';

export interface DecrementDirectParams {
  note: string;
}

/**
 * Hook for decrementing the counter with direct (non-sponsored) transactions.
 * User pays their own gas fees.
 */
export const useDecrementDirect = () => {
  const client = useSuiClient();
  const sender = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

  return useMutation({
    mutationFn: async (params: DecrementDirectParams) => {
      const { note } = params;

      // 1. Validate wallet connection
      if (!sender) {
        throw new TransactionError('Wallet not connected', 'wallet');
      }

      // 2. Build the transaction
      const transaction = decrementTransaction(
        clientConfig.NEXT_PUBLIC_COUNTER_OBJECT_ID,
        note,
        clientConfig.NEXT_PUBLIC_PACKAGE_ADDRESS,
      );

      // 3. Sign and execute the transaction (user pays gas)
      let result: Awaited<ReturnType<typeof signAndExecuteTransaction>>;
      try {
        result = await signAndExecuteTransaction({
          transaction,
        });
      } catch (error) {
        if (isUserRejection(error)) {
          throw new TransactionError(
            'Transaction signing cancelled',
            'sign',
            error,
          );
        }
        throw new TransactionError(
          'Failed to sign and execute transaction',
          'execute',
          error,
        );
      }

      // 4. Wait for transaction confirmation
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
