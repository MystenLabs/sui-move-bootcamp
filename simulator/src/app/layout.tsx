import type { Metadata } from 'next';
import './globals.css';
import { SimulatorProvider } from '@/hooks/useSimulator';
import Navbar from '@/components/Navbar';
import SuiWalletProvider from '@/components/SuiWalletProvider';

export const metadata: Metadata = {
  title: 'SuiBotics Playground | Sui Testnet Robotics Lessons',
  description: 'Sui-branded light-mode robotics playground with Sui testnet wallet support for the R1-R10 lesson track.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SuiWalletProvider>
          <SimulatorProvider>
            <div className="flex h-screen flex-col">
              <Navbar />
              <main className="min-h-0 w-full flex-1 overflow-hidden px-3 pb-3 pt-3 sm:px-4">
                {children}
              </main>
            </div>
          </SimulatorProvider>
        </SuiWalletProvider>
      </body>
    </html>
  );
}
