"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function AuthPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  
  // Mock wallet connection
  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate connecting to wallet
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setWalletAddress("0x1234...5678");
    }, 1500);
  };
  
  return (
    <main className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-2">
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back</span>
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to monitor your tokens on Base L2
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isConnected ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-700 dark:text-green-300 font-medium">Wallet Connected</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">{walletAddress}</p>
            </div>
          ) : (
            <Button 
              className="w-full" 
              onClick={connectWallet} 
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isConnected && (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </main>
  );
} 