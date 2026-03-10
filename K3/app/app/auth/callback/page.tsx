'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * OAuth callback page for zkLogin authentication
 * 
 * With registerEnokiWallets(), the OAuth callback is handled automatically
 * by the Enoki wallet registration. This page serves as the redirect target
 * and will redirect back to the home page once the flow completes.
 * 
 * The wallet connection state is managed by dapp-kit after the callback.
 */
export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // The Enoki wallet registration handles the OAuth callback automatically.
    // We just need to wait a moment for it to process, then redirect home.
    // The wallet will be connected via dapp-kit's standard mechanisms.
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto" />
        <p className="text-lg text-gray-600">Completing sign in...</p>
        <p className="text-sm text-gray-400 mt-2">
          Generating zero-knowledge proof
        </p>
      </div>
    </div>
  );
}
