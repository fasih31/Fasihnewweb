
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  const { data: cryptos, isLoading, isError } = useQuery<CryptoData[]>({
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
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Cryptocurrency Market Tracker</CardTitle>
            <CardDescription>Real-time cryptocurrency prices powered by CoinGecko</CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setRefreshKey(prev => prev + 1)}
            disabled={isLoading}
            className="shrink-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unable to fetch live data. Displaying sample data.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg" />
            ))
          ) : cryptos && cryptos.length > 0 ? (
            cryptos.map((crypto, index) => (
              <Card key={crypto.id} className="hover:shadow-md transition-all duration-200 border-l-4" style={{
                borderLeftColor: crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444'
              }}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center font-bold text-base">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-lg sm:text-xl">{crypto.name}</h3>
                          <Badge variant="secondary" className="text-xs">{crypto.symbol.toUpperCase()}</Badge>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">
                          {formatPrice(crypto.current_price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 sm:text-right">
                      <div className={`flex items-center gap-1.5 ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                        <span className="font-bold text-base sm:text-lg whitespace-nowrap">
                          {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline">Market Cap:</span>
                          <span className="sm:hidden">MCap:</span>
                          <span className="font-semibold">{formatMarketCap(crypto.market_cap)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline">Volume 24h:</span>
                          <span className="sm:hidden">Vol:</span>
                          <span className="font-semibold">{formatMarketCap(crypto.total_volume)}</span>
                        </div>
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
  );
}
