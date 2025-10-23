
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
}

export function CryptoTracker() {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: cryptos, isLoading } = useQuery<CryptoData[]>({
    queryKey: [`/api/crypto`, refreshKey],
    refetchInterval: 60000, // Refresh every minute
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatMarketCap = (cap: number) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
    return `$${cap.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cryptocurrency Market Tracker</CardTitle>
              <CardDescription>Real-time cryptocurrency prices and market data</CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setRefreshKey(prev => prev + 1)}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))
            ) : cryptos && cryptos.length > 0 ? (
              cryptos.map((crypto) => (
                <Card key={crypto.id} className="hover-elevate transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">{crypto.name}</h3>
                            <Badge variant="secondary">{crypto.symbol.toUpperCase()}</Badge>
                          </div>
                          <p className="text-2xl font-bold text-foreground mt-1">
                            {formatPrice(crypto.current_price)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center gap-1 ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span className="font-semibold">
                            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>Cap: {formatMarketCap(crypto.market_cap)}</div>
                          <div>Vol: {formatMarketCap(crypto.total_volume)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No data available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
