import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div className="flex items-center gap-4">
      {ensAvatar && (
        <img
          alt="ENS Avatar"
          src={ensAvatar}
          className="w-8 h-8 rounded-full"
        />
      )}
      <div className="flex flex-col">
        {address && (
          <div className="text-sm">
            {ensName ? `${ensName} (${address})` : address}
          </div>
        )}
        <button
          onClick={() => disconnect()}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Disconnect
        </button>
      </div>
    </div>
  )
} 