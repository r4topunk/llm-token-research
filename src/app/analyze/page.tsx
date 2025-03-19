"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DownloadIcon, CheckIcon, CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

export default function AnalyzePage() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  
  const generateReport = async () => {
    if (!tokenAddress) {
      alert("Please enter a token address");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedReport(null);
    
    try {
      // Call the API endpoint
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: tokenAddress })
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze token');
      }
      
      const data = await response.json();
      setTokenSymbol(data.symbol);
      setGeneratedReport(data.report);
      setMetrics(data.metrics);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating report:", error);
      setIsGenerating(false);
      alert('Failed to analyze token. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Token AI Analyzer</h1>
          <p className="text-muted-foreground">
            AI-powered analysis and insights for any token
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Enter Token Address</CardTitle>
            <CardDescription>
              Paste any token address to generate an AI analysis report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input 
                className="flex-1"
                placeholder="0x..." 
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
              <Button 
                onClick={generateReport} 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {(isGenerating || generatedReport) && (
          <Tabs defaultValue="automated" className="space-y-4">
            <TabsList>
              <TabsTrigger value="automated">Automated Analysis</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="predictions">Price Predictions</TabsTrigger>
              <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
            </TabsList>
            
            <TabsContent value="automated">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Generated Analysis Report</CardTitle>
                  <CardDescription>
                    Comprehensive AI analysis for {tokenSymbol || "your token"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedReport ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <pre className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
                        {generatedReport}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted/50 p-4 mb-4">
                        <ReloadIcon className="h-8 w-8 text-muted-foreground animate-spin" />
                      </div>
                      <h3 className="text-lg font-medium">Generating Report...</h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Our AI is analyzing {tokenAddress} and generating a comprehensive report.
                      </p>
                    </div>
                  )}
                </CardContent>
                {generatedReport && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="gap-2">
                      <DownloadIcon className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <DownloadIcon className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              {metrics && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.riskScore}/10</div>
                      <p className="text-xs text-muted-foreground">Medium Risk</p>
                      <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${metrics.riskScore * 10}%` }}></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Social Sentiment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.sentiment.positive}%</div>
                      <p className="text-xs text-muted-foreground">Positive Mentions</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="default" className="bg-green-500">Bullish</Badge>
                        <Badge variant="outline">{metrics.sentiment.mentions} Mentions</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Technical Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.technical.rating}</div>
                      <p className="text-xs text-muted-foreground">8/10 indicators positive</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center text-green-500 font-medium text-sm">
                          <CheckIcon className="h-4 w-4 mr-1" /> MACD
                        </div>
                        <div className="flex items-center text-yellow-500 font-medium text-sm">
                          <CheckIcon className="h-4 w-4 mr-1" /> RSI
                        </div>
                        <div className="flex items-center text-red-500 font-medium text-sm">
                          <CrossCircledIcon className="h-4 w-4 mr-1" /> Stoch
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sentiment">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media & News Sentiment</CardTitle>
                  <CardDescription>
                    Analysis of {tokenSymbol || "token"} mentions across platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="h-64 w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Sentiment analysis chart for {tokenSymbol || "your token"}</p>
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Twitter</h4>
                        <Badge className="bg-green-500">Positive</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sentiment score: 7.2/10
                      </p>
                      <p className="text-sm mt-2">
                        3,240 mentions in the last 24 hours
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Reddit</h4>
                        <Badge className="bg-green-500">Positive</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sentiment score: 6.8/10
                      </p>
                      <p className="text-sm mt-2">
                        450 posts in the last 24 hours
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">News Articles</h4>
                        <Badge variant="outline">Neutral</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sentiment score: 5.5/10
                      </p>
                      <p className="text-sm mt-2">
                        24 articles in the last 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="predictions">
              <Card>
                <CardHeader>
                  <CardTitle>Price Predictions</CardTitle>
                  <CardDescription>
                    AI-generated price forecasts for {tokenSymbol || "your token"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-muted rounded-md flex items-center justify-center mb-6">
                    <p className="text-muted-foreground">Price prediction chart for {tokenSymbol || "your token"}</p>
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">24 Hour Forecast</div>
                      <div className="text-2xl font-bold">$2.45</div>
                      <div className="text-sm text-green-500">+2.6%</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">7 Day Forecast</div>
                      <div className="text-2xl font-bold">$2.78</div>
                      <div className="text-sm text-green-500">+9.3%</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">30 Day Forecast</div>
                      <div className="text-2xl font-bold">$3.12</div>
                      <div className="text-sm text-green-500">+20.0%</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Prediction Accuracy</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our AI model's historical accuracy for similar tokens:
                    </p>
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                      <div>
                        <div className="text-sm text-muted-foreground">24h Accuracy</div>
                        <div className="font-medium">82%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">7d Accuracy</div>
                        <div className="font-medium">75%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">30d Accuracy</div>
                        <div className="font-medium">63%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="anomalies">
              <Card>
                <CardHeader>
                  <CardTitle>Anomaly Detection</CardTitle>
                  <CardDescription>
                    Unusual patterns and activities for {tokenSymbol || "your token"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                          <svg
                            className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Unusual Trading Volume</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Trading volume spiked to 250% above the 30-day average at 2:45 AM UTC.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">Volume</Badge>
                            <Badge variant="outline">Medium Priority</Badge>
                            <span className="text-xs text-muted-foreground">12 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900">
                          <svg
                            className="h-5 w-5 text-red-600 dark:text-red-400"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" x2="12" y1="9" y2="13" />
                            <line x1="12" x2="12.01" y1="17" y2="17" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Large Whale Movement</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            A wallet holding 2.5% of total supply transferred 50,000 tokens to an exchange.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">Wallet</Badge>
                            <Badge variant="outline" className="bg-red-500 text-white">High Priority</Badge>
                            <span className="text-xs text-muted-foreground">3 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                          <svg
                            className="h-5 w-5 text-blue-600 dark:text-blue-400"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Social Media Spike</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Detected 5x increase in social media mentions with strongly positive sentiment.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">Social</Badge>
                            <Badge variant="outline">Low Priority</Badge>
                            <span className="text-xs text-muted-foreground">1 day ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
} 