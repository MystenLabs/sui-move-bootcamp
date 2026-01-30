'use client';

import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
} from '@mysten/dapp-kit';

/**
 * zkLogin/Wallet connection button component
 *
 * With the new Enoki integration via registerEnokiWallets(),
 * zkLogin appears as a standard wallet option in dapp-kit's wallet picker.
 * Users can select "Sign in with Google" (or other providers) from the
 * wallet selection dialog, just like they would select Sui Wallet or Suiet.
 *
 * This means we can use the standard ConnectButton from dapp-kit!
 */
export function ZkLoginButton() {
  return <ConnectButton />;
}

/**
 * Custom styled connection button with more control over appearance
 * Shows connected address or prompts to connect
 */
export function CustomZkLoginButton() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  // If connected (either via wallet or zkLogin), show address and disconnect
  if (account) {
    const isZkLogin =
      account.label?.toLowerCase().includes('google') ||
      account.label?.toLowerCase().includes('enoki');

    return (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">
            {isZkLogin ? 'zkLogin' : 'Wallet'}
          </span>
          <span className="font-mono text-sm">
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Show connect button - this opens the wallet picker which includes zkLogin options
  return <ConnectButton connectText="Connect / Sign In" />;
}

/**
 * Status indicator showing connection type
 */
export function ConnectionStatus() {
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }

  const isZkLogin =
    account.label?.toLowerCase().includes('google') ||
    account.label?.toLowerCase().includes('enoki');

  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1 ${
        isZkLogin ? 'bg-blue-100' : 'bg-green-100'
      }`}
    >
      <div
        className={`h-2 w-2 rounded-full ${
          isZkLogin ? 'bg-blue-500' : 'bg-green-500'
        }`}
      />
      <span
        className={`text-xs font-medium ${
          isZkLogin ? 'text-blue-700' : 'text-green-700'
        }`}
      >
        {isZkLogin ? 'zkLogin' : 'Wallet'}: {account.address.slice(0, 6)}...
        {account.address.slice(-4)}
      </span>
    </div>
  );
}
