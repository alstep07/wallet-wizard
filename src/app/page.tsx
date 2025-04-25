import { ConnectWallet } from "@/shared/components/connect-wallet";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">WalletWizard</h1>
      <ConnectWallet />
    </div>
  );
}
