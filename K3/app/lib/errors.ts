/**
 * Custom error class for transaction errors with step information
 */
export class TransactionError extends Error {
  constructor(
    message: string,
    public readonly step:
      | 'build'
      | 'sponsor'
      | 'sign'
      | 'execute'
      | 'confirm'
      | 'wallet',
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'TransactionError';
  }
}

/**
 * Checks if error is a user rejection from wallet
 */
export function isUserRejection(error: unknown): boolean {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    return (
      msg.includes('user rejected') ||
      msg.includes('user denied') ||
      msg.includes('user cancelled') ||
      msg.includes('rejected by user') ||
      msg.includes('user declined')
    );
  }
  return false;
}
