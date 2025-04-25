import { useAccount, useDisconnect, useEnsName } from "wagmi";
import { Button } from "../ui/button";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="flex flex-col gap-4">
        {address && (
          <div className="text-sm">
            {ensName ? `${ensName} (${address})` : address}
          </div>
        )}
        <Button onClick={() => disconnect()} variant="outline">
          Disconnect
        </Button>
      </div>
    </div>
  );
}
