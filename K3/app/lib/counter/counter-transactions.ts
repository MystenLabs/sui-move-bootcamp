import { Transaction } from '@mysten/sui/transactions';

/**
 * Creates a transaction for incrementing the counter
 * @param counterObjectId - The shared Counter object ID
 * @param note - The note to attach to the operation
 * @param packageAddress - The package address
 * @returns A Transaction object ready to be built and signed
 */
export const incrementTransaction = (
  counterObjectId: string,
  note: string,
  packageAddress: string,
): Transaction => {
  const tx = new Transaction();
  tx.moveCall({
    package: packageAddress,
    module: 'counter',
    function: 'increment',
    arguments: [tx.object(counterObjectId), tx.pure.string(note)],
  });
  return tx;
};

/**
 * Creates a transaction for decrementing the counter
 * @param counterObjectId - The shared Counter object ID
 * @param note - The note to attach to the operation
 * @param packageAddress - The package address
 * @returns A Transaction object ready to be built and signed
 */
export const decrementTransaction = (
  counterObjectId: string,
  note: string,
  packageAddress: string,
): Transaction => {
  const tx = new Transaction();
  tx.moveCall({
    package: packageAddress,
    module: 'counter',
    function: 'decrement',
    arguments: [tx.object(counterObjectId), tx.pure.string(note)],
  });
  return tx;
};
