import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your Base L2 tokens and get real-time insights
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,582.23</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128.5M</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 price, 1 volume</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="trending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trending">Trending Tokens</TabsTrigger>
          <TabsTrigger value="watchlist">Your Watchlist</TabsTrigger>
          <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending">
          <Card>
            <CardHeader>
              <CardTitle>Trending Tokens</CardTitle>
              <CardDescription>
                Top performing tokens on Base L2 in the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Token List - Will replace with dynamic data */}
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10"></div>
                      <div>
                        <p className="font-medium">Token {i + 1}</p>
                        <p className="text-sm text-muted-foreground">TKN{i + 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(Math.random() * 100).toFixed(2)}</p>
                      <p className={`text-sm ${Math.random() > 0.5 ? "text-green-500" : "text-red-500"}`}>
                        {Math.random() > 0.5 ? "+" : "-"}{(Math.random() * 20).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
              <CardDescription>
                Tokens you're monitoring on Base L2
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8">
                You haven't added any tokens to your watchlist yet. Go to the Token Registry to add tokens.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                Notifications based on your alert criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-3">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Price Alert: Token 2 exceeded threshold of $30</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">Today, 10:45 AM</p>
                </div>
                <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-3">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Volume Alert: Token 5 trading volume spike detected</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400">Yesterday, 4:20 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 