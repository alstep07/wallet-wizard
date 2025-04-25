"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletOptions() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ConnectButton showBalance chainStatus="icon" accountStatus="full" />
    </div>
  );
}
