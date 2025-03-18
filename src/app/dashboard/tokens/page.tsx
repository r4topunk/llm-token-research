"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, Cross2Icon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function TokensPage() {
  const [tokens, setTokens] = useState([
    { id: 1, name: "Ethereum", symbol: "ETH", address: "0x4200000000000000000000000000000000000006", marketCap: "$258.2B", price: "$2,150.45", change24h: "+2.4%" },
    { id: 2, name: "USD Coin", symbol: "USDC", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", marketCap: "$31.5B", price: "$1.00", change24h: "+0.01%" },
  ]);
  const [showAddTokenDialog, setShowAddTokenDialog] = useState(false);
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<null | 'success' | 'error'>(null);

  const validateTokenAddress = () => {
    if (!newTokenAddress) return;
    
    setIsValidating(true);
    
    // Mock validation - simulate network request
    setTimeout(() => {
      setIsValidating(false);
      
      // Simple validation - Base L2 addresses must be valid Ethereum addresses (0x + 40 hex chars)
      const isValid = /^0x[a-fA-F0-9]{40}$/.test(newTokenAddress);
      setValidationStatus(isValid ? 'success' : 'error');
    }, 1500);
  };

  const addToken = () => {
    if (validationStatus !== 'success') return;
    
    // In a real app, we would fetch token data from an API
    const newToken = {
      id: tokens.length + 1,
      name: "New Token",
      symbol: "NEW",
      address: newTokenAddress,
      marketCap: "$10.5M",
      price: "$0.45",
      change24h: "+5.7%",
    };
    
    setTokens([...tokens, newToken]);
    setShowAddTokenDialog(false);
    setNewTokenAddress("");
    setValidationStatus(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Token Registry</h1>
          <p className="text-muted-foreground">
            Add and manage tokens to monitor on Base L2
          </p>
        </div>
        <Dialog open={showAddTokenDialog} onOpenChange={setShowAddTokenDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Token
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new token</DialogTitle>
              <DialogDescription>
                Enter the contract address of the token you want to monitor.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormLabel htmlFor="token-address">Token Address</FormLabel>
                <div className="flex gap-2">
                  <Input
                    id="token-address"
                    placeholder="0x..."
                    value={newTokenAddress}
                    onChange={(e) => {
                      setNewTokenAddress(e.target.value);
                      setValidationStatus(null);
                    }}
                  />
                  <Button 
                    onClick={validateTokenAddress} 
                    variant="outline" 
                    disabled={isValidating || !newTokenAddress}
                  >
                    {isValidating ? "Checking..." : "Check"}
                  </Button>
                </div>
                {validationStatus === 'success' && (
                  <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <CheckIcon className="h-4 w-4" />
                    Valid token address
                  </p>
                )}
                {validationStatus === 'error' && (
                  <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                    <Cross2Icon className="h-4 w-4" />
                    Invalid token address
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddTokenDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addToken} disabled={validationStatus !== 'success'}>
                Add Token
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Registered Tokens</CardTitle>
          <CardDescription>
            Tokens you're currently monitoring on Base L2
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell className="font-medium">{token.name}</TableCell>
                  <TableCell>{token.symbol}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {token.address.slice(0, 6)}...{token.address.slice(-4)}
                  </TableCell>
                  <TableCell>{token.marketCap}</TableCell>
                  <TableCell>{token.price}</TableCell>
                  <TableCell className={token.change24h.startsWith('+') ? "text-green-600" : "text-red-600"}>
                    {token.change24h}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">View</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" 
                        onClick={() => setTokens(tokens.filter(t => t.id !== token.id))}>
                        <span className="sr-only">Delete</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 