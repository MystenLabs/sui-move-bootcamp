import { incrementTransaction } from '@/lib/counter/counter-transactions';
import clientConfig from '@/lib/env-config-client';
import { TransactionError, isUserRejection } from '@/lib/errors';
import {
  useCurrentClient,
  useCurrentAccount,
  useDAppKit,
} from '@mysten/dapp-kit-react';
import { useMutation } from '@tanstack/react-query';

export interface IncrementDirectParams {
  note: string;
}

/**
 * Hook for incrementing the counter with direct (non-sponsored) transactions.
 * User pays their own gas fees. Execute and wait use Sui gRPC (F1-style).
 */
export const useIncrementDirect = () => {
  const client = useCurrentClient();
  const sender = useCurrentAccount();
  const dAppKit = useDAppKit();

  return useMutation({
    mutationFn: async (params: IncrementDirectParams) => {
      const { note } = params;

      // 1. Validate wallet connection
      if (!sender) {
        throw new TransactionError('Wallet not connected', 'wallet');
      }

      // 2. Build the transaction
      const transaction = incrementTransaction(
        clientConfig.NEXT_PUBLIC_COUNTER_OBJECT_ID,
        note,
        clientConfig.NEXT_PUBLIC_PACKAGE_ADDRESS,
      );

      // 3. Sign and execute via gRPC (F1-style write path)
      let digest: string;
      try {
        const result = await dAppKit.signAndExecuteTransaction({
          transaction,
        });
        const txResult =
          result.$kind === 'Transaction'
            ? result.Transaction
            : result.FailedTransaction;
        digest = txResult.digest;
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

      // 4. Wait for transaction confirmation via gRPC
      try {
        const waitedResult = await client.core.waitForTransaction({
          digest: digest,
        });

        return {
          digest: digest,
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
