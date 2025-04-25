import { ConnectWallet } from "@/shared/components/connect-wallet";
import { DailyCheckIn } from "@/shared/components/daily-check-in";
import { WandIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <WandIcon className="size-8 text-violet-800" />
        <h1 className="text-2xl font-bold">Wallet Wizard </h1>
      </div>
      <ConnectWallet />
      <DailyCheckIn />
    </div>
  );
}
