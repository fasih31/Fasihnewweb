
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, DollarSign, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}

export default function StocksDetail() {
  const { data: stockData, isLoading, refetch } = useQuery<StockData[]>({
    queryKey: ["/api/stocks"],
    refetchInterval: 60000,
    staleTime: 30000,
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Live Stock Market Prices | Real-Time Stock Tracker | Fasih ur Rehman"
        description="Track real-time stock market prices for major tech companies. Get live updates on AAPL, GOOGL, MSFT, TSLA and more."
        keywords="stock market, live stock prices, stock tracker, tech stocks, market analysis"
        canonicalUrl="https://iamfasih.com/stocks"
      />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Stock Market Overview</h1>
                <p className="text-muted-foreground">Real-time stock prices from major tech companies</p>
              </div>
              <Button onClick={() => refetch()} disabled={isLoading} size="lg">
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-20"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 bg-muted rounded w-24 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-16"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stockData?.map((stock) => {
                const isPositive = parseFloat(stock.change) >= 0;
                return (
                  <Card key={stock.symbol} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        {stock.symbol}
                      </CardTitle>
                      <CardDescription>Live Price</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">
                        ${parseFloat(stock.price).toFixed(2)}
                      </div>
                      <div className={`flex items-center gap-1 text-lg ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                        <span>{isPositive ? "+" : ""}{stock.changePercent}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {isPositive ? "+" : ""}{parseFloat(stock.change).toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
