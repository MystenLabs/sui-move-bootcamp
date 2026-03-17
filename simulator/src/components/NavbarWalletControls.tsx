'use client';

import { ConnectButton } from '@mysten/dapp-kit-react/ui';
import { useWalletConnection } from '@mysten/dapp-kit-react';

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function NavbarWalletControls() {
  const connection = useWalletConnection();

  return (
    <div className="flex items-center gap-2">
      {connection.account ? (
        <div className="hidden rounded-full border border-[#d7e6f4] bg-white px-3 py-2 text-[11px] text-[#5d7893] lg:inline-flex">
          {shortenAddress(connection.account.address)}
        </div>
      ) : null}
      <ConnectButton>
        <span>Connect wallet</span>
      </ConnectButton>
    </div>
  );
}
