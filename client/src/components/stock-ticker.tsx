import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}

export function StockTicker() {
  const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA"];

  const { data: stockData, isLoading } = useQuery<StockData[]>({
    queryKey: ["/api/stocks"],
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center animate-pulse">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 bg-muted rounded w-24"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Market Snapshot
            </CardTitle>
            <CardDescription>Real-time stock prices from major tech companies</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/stocks">View All</a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stockData?.map((stock) => {
            const isPositive = parseFloat(stock.change) >= 0;
            return (
              <div key={stock.symbol} className="space-y-2">
                <div className="font-semibold text-sm">{stock.symbol}</div>
                <div className="text-2xl font-bold">${parseFloat(stock.price).toFixed(2)}</div>
                <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{isPositive ? "+" : ""}{stock.changePercent}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}