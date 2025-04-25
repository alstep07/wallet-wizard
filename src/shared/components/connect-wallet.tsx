"use client";

import { useAccount } from "wagmi";
import { Account } from "./account";
import { WalletOptions } from "./wallet-options";

export function ConnectWallet() {
  const { isConnected, isConnecting } = useAccount();

  if (isConnecting) {
    return <div className="flex justify-center items-center gap-4">Connecting...</div>;
  }

  if (isConnected) return <Account />;

  return <WalletOptions />;
}
