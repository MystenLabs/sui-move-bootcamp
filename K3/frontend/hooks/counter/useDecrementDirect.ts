import { createGrpcExecuteForNetwork } from '@/lib/grpc-execute';
import { decrementTransaction } from '@/lib/counter/counter-transactions';
import clientConfig from '@/lib/env-config-client';
import { TransactionError, isUserRejection } from '@/lib/errors';
import { createSuiGrpcClient } from '@/lib/sui-grpc-client';
import type { SuiNetworkName } from '@/lib/sui-grpc-client';
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { useMutation } from '@tanstack/react-query';

export interface DecrementDirectParams {
  note: string;
}

/**
 * Hook for decrementing the counter with direct (non-sponsored) transactions.
 * User pays their own gas fees. Execute and wait use Sui gRPC (F1-style).
 */
export const useDecrementDirect = () => {
  const { network } = useSuiClientContext();
  const sender = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction({
      execute: createGrpcExecuteForNetwork(network as SuiNetworkName),
    });

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

      // 3. Sign and execute via gRPC (F1-style write path)
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

      // 4. Wait for transaction confirmation via gRPC
      try {
        const grpcClient = createSuiGrpcClient(network as SuiNetworkName);
        const waitedResult = await grpcClient.core.waitForTransaction({
          digest: result.digest,
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
