"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/shared/api/wagmi-config";
import { Account } from "@/shared/components/account";
import { WalletOptions } from "@/shared/components/wallet-options";
import { useAccount } from "wagmi";

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen p-8">
          <ConnectWallet />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
