import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
            <DollarSign className="h-5 w-5" />
            Market Snapshot
          </CardTitle>
          <CardDescription>Loading stock prices...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Market Snapshot
        </CardTitle>
        <CardDescription>Real-time stock prices from major tech companies</CardDescription>
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
