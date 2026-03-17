'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useWalletConnection, useWallets, useDAppKit } from '@mysten/dapp-kit-react';
import type { UiWallet } from '@wallet-standard/ui';

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function NavbarWalletControls() {
  const connection = useWalletConnection();
  const [modalOpen, setModalOpen] = useState(false);

  if (connection.account) {
    return <ConnectedControls address={connection.account.address} />;
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="rounded-full bg-[#011829] px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#17324d]"
      >
        Connect wallet
      </button>
      {modalOpen && <ConnectModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function ConnectedControls({ address }: { address: string }) {
  const dAppKit = useDAppKit();
  const [disconnecting, setDisconnecting] = useState(false);

  const handleDisconnect = useCallback(async () => {
    setDisconnecting(true);
    try {
      await dAppKit.disconnectWallet();
    } finally {
      setDisconnecting(false);
    }
  }, [dAppKit]);

  return (
    <div className="flex items-center gap-2">
      <div className="hidden rounded-full border border-[#d7e6f4] bg-white px-3 py-2 text-[11px] text-[#5d7893] lg:inline-flex">
        {shortenAddress(address)}
      </div>
      <button
        onClick={handleDisconnect}
        disabled={disconnecting}
        className="rounded-full border border-[#d7e6f4] bg-white px-4 py-2 text-[12px] font-medium text-[#5d7893] transition hover:border-[#bfd6ea] hover:text-[#17324d] disabled:opacity-50"
      >
        {disconnecting ? 'Disconnecting...' : 'Disconnect'}
      </button>
    </div>
  );
}

function ConnectModal({ onClose }: { onClose: () => void }) {
  const wallets = useWallets();
  const dAppKit = useDAppKit();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock body scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleConnect = useCallback(
    async (wallet: UiWallet) => {
      setConnecting(wallet.name);
      setError(null);
      try {
        await dAppKit.connectWallet({ wallet });
        onClose();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Connection failed';
        setError(msg);
      } finally {
        setConnecting(null);
      }
    },
    [dAppKit, onClose],
  );

  const modal = (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
      className="flex items-center justify-center"
    >
      {/* Backdrop — full-page blur overlay */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        className="bg-[#011829]/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        style={{ position: 'relative', zIndex: 1 }}
        className="mx-4 w-full max-w-[460px] rounded-[24px] border border-[#d7e6f4] bg-white shadow-[0_32px_80px_rgba(1,24,41,0.28)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d7e6f4] px-6 py-5">
          <h2 className="text-[18px] font-medium tracking-[-0.03em] text-[#011829]">
            Connect a Wallet
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d7e6f4] bg-[#f8fbff] text-[#5d7893] transition hover:border-[#bfd6ea] hover:text-[#17324d]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1 1 13" />
            </svg>
          </button>
        </div>

        {/* Wallet list */}
        <div className="px-4 py-4">
          {wallets.length === 0 ? (
            <div className="py-8 text-center text-[13px] text-[#6f8ba6]">
              No wallets detected. Install a Sui wallet extension to continue.
            </div>
          ) : (
            <div className="space-y-1.5">
              {wallets.map((wallet) => {
                const isConnecting = connecting === wallet.name;
                return (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet)}
                    disabled={connecting !== null}
                    className="flex w-full items-center gap-4 rounded-[16px] border border-transparent px-4 py-3.5 text-left transition hover:border-[#d7e6f4] hover:bg-[#f8fbff] disabled:opacity-50"
                  >
                    {wallet.icon ? (
                      <img
                        src={wallet.icon}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-[10px]"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#e8f0f8] text-[14px] font-medium text-[#5d7893]">
                        {wallet.name.charAt(0)}
                      </div>
                    )}
                    <span className="flex-1 text-[15px] font-medium text-[#011829]">
                      {wallet.name}
                    </span>
                    {isConnecting && (
                      <span className="text-[12px] text-[#6f8ba6]">Connecting...</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {error && (
            <div className="mt-3 rounded-[12px] border border-[#f5d0d3] bg-[#fef5f5] px-4 py-3 text-[12px] text-[#d15b64]">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
