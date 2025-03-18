"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DownloadIcon, CheckIcon, CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

export default function InsightsPage() {
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  
  const generateReport = () => {
    setIsGenerating(true);
    setGeneratedReport(null);
    
    // Mock API call to generate report
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport(`
        # AI Analysis Report for ${selectedToken}
        
        ## Summary
        ${selectedToken} has shown strong performance over the past week with a 4.2% increase in price. 
        Trading volume has increased by 15% compared to the previous week, indicating growing interest.
        
        ## Sentiment Analysis
        Social media sentiment is predominantly positive (68%), with increased mentions on Twitter and Reddit.
        News coverage remains neutral with a slight positive bias.
        
        ## Technical Indicators
        - RSI: 58 (Neutral)
        - MACD: Bullish crossover detected
        - Moving Averages: Trading above 20-day and 50-day MA
        
        ## Risk Assessment
        Overall risk score: Medium (6.4/10)
        Liquidity is healthy with minimal slippage in major pools.
        
        ## Recommendations
        - Consider setting price alerts at $2,300 and $1,900 for significant movements
        - Monitor exchange inflows for potential selling pressure
        - Track whale wallet movements for early signals
      `);
    }, 3000);
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">
            AI-powered analysis and insights for your tokens
          </p>
        </div>
        <div className="flex items-center gap-2">
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
      </div>
      
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
                Comprehensive AI analysis for {selectedToken}
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
                    <svg
                      className="h-8 w-8 text-muted-foreground"
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
                      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.57 2.57" />
                      <path d="M21 3v9h-9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium">No Report Generated</h3>
                  <p className="text-muted-foreground max-w-md mt-2">
                    Click the "Generate Report" button to create an AI-powered analysis report for {selectedToken}.
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
          
          {generatedReport && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6.4/10</div>
                  <p className="text-xs text-muted-foreground">Medium Risk</p>
                  <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Social Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">Positive Mentions</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="default" className="bg-green-500">Bullish</Badge>
                    <Badge variant="outline">1,240 Mentions</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Technical Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Bullish</div>
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
                Analysis of {selectedToken} mentions across platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="h-64 w-full bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Sentiment analysis chart for {selectedToken}</p>
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
                AI-generated price forecasts for {selectedToken}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-muted rounded-md flex items-center justify-center mb-6">
                <p className="text-muted-foreground">Price prediction chart for {selectedToken}</p>
              </div>
              
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">24 Hour Forecast</div>
                  <div className="text-2xl font-bold">${selectedToken === 'ETH' ? '2,205.78' : selectedToken === 'USDC' ? '1.00' : '0.48'}</div>
                  <div className="text-sm text-green-500">+2.6%</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">7 Day Forecast</div>
                  <div className="text-2xl font-bold">${selectedToken === 'ETH' ? '2,350.12' : selectedToken === 'USDC' ? '1.00' : '0.52'}</div>
                  <div className="text-sm text-green-500">+9.3%</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">30 Day Forecast</div>
                  <div className="text-2xl font-bold">${selectedToken === 'ETH' ? '2,580.45' : selectedToken === 'USDC' ? '1.00' : '0.64'}</div>
                  <div className="text-sm text-green-500">+20.0%</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Prediction Accuracy</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI model's historical accuracy for {selectedToken} predictions:
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
                Unusual patterns and activities for {selectedToken}
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
                        A wallet holding 2.5% of total supply transferred 50,000 {selectedToken} to an exchange.
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
    </div>
  );
} 