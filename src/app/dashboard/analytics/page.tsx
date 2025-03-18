"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AnalyticsPage() {
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [timeframe, setTimeframe] = useState("1w");
  const [transactions, setTransactions] = useState<Array<{
    type: string;
    time: string;
    amount: string;
    value: string;
  }>>([]);
  
  // Generate transactions only on the client side
  useEffect(() => {
    const newTransactions = Array.from({length: 5}).map((_, i) => ({
      type: Math.random() > 0.5 ? "Transfer" : "Swap",
      time: new Date().toLocaleTimeString(),
      amount: (Math.random() * 10).toFixed(4),
      value: (Math.random() * 1000).toFixed(2)
    }));
    setTransactions(newTransactions);
  }, []);
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            In-depth analysis of token performance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue={selectedToken} onValueChange={setSelectedToken}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETH">Ethereum</SelectItem>
              <SelectItem value="USDC">USD Coin</SelectItem>
              <SelectItem value="NEW">New Token</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">24H</SelectItem>
              <SelectItem value="1w">1W</SelectItem>
              <SelectItem value="1m">1M</SelectItem>
              <SelectItem value="1y">1Y</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Price Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Price Chart</CardTitle>
            <CardDescription>
              {selectedToken} price over {timeframe === '1d' ? 'the last 24 hours' : 
                timeframe === '1w' ? 'the last week' : 
                timeframe === '1m' ? 'the last month' : 
                timeframe === '1y' ? 'the last year' : 'all time'}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {/* In a real app, we'd use a chart library here */}
            <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Price chart for {selectedToken} over {timeframe}</p>
            </div>
          </CardContent>
        </Card>

        {/* Trading Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Trading Volume</CardTitle>
            <CardDescription>
              Daily trading volume for {selectedToken}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Volume chart for {selectedToken}</p>
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Liquidity Analysis</CardTitle>
            <CardDescription>
              DEX liquidity pools for {selectedToken}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Liquidity chart for {selectedToken}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="holders">Top Holders</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="correlation">Correlation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Latest {selectedToken} transfers on Base L2
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">
                        0x8fe{i}2a...{i}f3e
                      </div>
                      <div className="text-sm">
                        {transactions[i]?.type || "Loading..."} • {transactions[i]?.time || ""}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{transactions[i]?.amount || "0"} {selectedToken}</div>
                      <div className="text-sm text-muted-foreground">${transactions[i]?.value || "0"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="holders">
          <Card>
            <CardHeader>
              <CardTitle>Top Token Holders</CardTitle>
              <CardDescription>
                Addresses holding the largest amounts of {selectedToken}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">#{i + 1}</div>
                      <div className="font-mono text-xs">
                        0x3b{i}8c...{i}e9a
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{(100000 / (i + 1)).toFixed(2)} {selectedToken}</div>
                      <div className="text-sm text-muted-foreground">{(10 - i).toFixed(2)}% of supply</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Key Token Metrics</CardTitle>
              <CardDescription>
                Performance metrics for {selectedToken}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-2xl font-bold">${selectedToken === 'ETH' ? '258.2B' : selectedToken === 'USDC' ? '31.5B' : '10.5M'}</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">24h Volume</div>
                  <div className="text-2xl font-bold">${selectedToken === 'ETH' ? '12.4B' : selectedToken === 'USDC' ? '4.2B' : '850K'}</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Circulating Supply</div>
                  <div className="text-2xl font-bold">{selectedToken === 'ETH' ? '120.3M' : selectedToken === 'USDC' ? '31.5B' : '100M'}</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Holders</div>
                  <div className="text-2xl font-bold">{selectedToken === 'ETH' ? '2.4M' : selectedToken === 'USDC' ? '1.2M' : '8.5K'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="correlation">
          <Card>
            <CardHeader>
              <CardTitle>Price Correlation</CardTitle>
              <CardDescription>
                How {selectedToken} price correlates with other assets
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Correlation chart for {selectedToken}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 