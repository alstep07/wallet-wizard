"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Button } from "../ui/button";

const DAILY_CHECK_IN_ADDRESS = "0x6296ebd5fd4022f27628aa04b94d06b5dfffe825";

const DAILY_CHECK_IN_ABI = [
  {
    inputs: [],
    name: "checkIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getUser",
    outputs: [
      {
        internalType: "uint256",
        name: "streak",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastCheckIn",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "uint256",
        name: "lastCheckIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "streak",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function DailyCheckIn() {
  const { address } = useAccount();
  const [streak, setStreak] = useState<number>(0);
  const [lastCheckIn, setLastCheckIn] = useState<number>(0);

  const {
    data: userData,
    refetch: refetchUserData,
    error: userDataError,
  } = useReadContract({
    address: DAILY_CHECK_IN_ADDRESS as `0x${string}`,
    abi: DAILY_CHECK_IN_ABI,
    functionName: "getUser",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
      retry: 3,
      retryDelay: 1000,
    },
  });

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isCheckingIn, isSuccess: isCheckInSuccess } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (userData) {
      const [streak, lastCheckIn] = userData;
      setStreak(Number(streak));
      setLastCheckIn(Number(lastCheckIn));
    }
  }, [userData, userDataError, address]);

  useEffect(() => {
    if (isCheckInSuccess) {
      refetchUserData();
    }
  }, [isCheckInSuccess, refetchUserData]);

  const formatDate = (timestamp: number) => {
    if (timestamp === 0) return "";
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const handleCheckIn = () => {
    if (!address) return;
    writeContract(
      {
        address: DAILY_CHECK_IN_ADDRESS as `0x${string}`,
        abi: DAILY_CHECK_IN_ABI,
        functionName: "checkIn",
      },
      {
        onError: (error) => {
          console.error("Check-in error:", error);
        },
        onSuccess: (hash) => {
          console.log("Check-in transaction hash:", hash);
          setTimeout(() => {
            refetchUserData();
          }, 2000);
        },
      },
    );
  };

  if (!address) {
    return null;
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4 p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Daily Check-In</h2>
      <div className="text-center">
        <p>Current Streak: {streak} days</p>
        {lastCheckIn > 0 && (
          <p className="text-sm text-gray-500">
            Last check-in: {formatDate(lastCheckIn)}
          </p>
        )}
      </div>
      <Button
        onClick={handleCheckIn}
        disabled={isCheckingIn}
        className="w-full"
      >
        {isCheckingIn ? "Checking in..." : "Check In"}
      </Button>
    </div>
  );
}
