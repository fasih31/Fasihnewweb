
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const MiniSparklineChart = ({ prices, isPositive }: { prices: number[]; isPositive: boolean }) => {
  if (!prices || prices.length === 0) return null;

  const width = 100;
  const height = 30;
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const range = max - min || 1;

  const points = prices.map((price, i) => {
    const x = (i / (prices.length - 1)) * width;
    const y = height - ((price - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#10b981' : '#ef4444'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export function CryptoTracker() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [view, setView] = useState<"all" | "favorites">("all");

  useEffect(() => {
    const stored = localStorage.getItem('cryptoFavorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (cryptoId: string) => {
    const newFavorites = favorites.includes(cryptoId)
      ? favorites.filter(id => id !== cryptoId)
      : [...favorites, cryptoId];
    setFavorites(newFavorites);
    localStorage.setItem('cryptoFavorites', JSON.stringify(newFavorites));
  };

  const { data: cryptos, isLoading, isError, error } = useQuery<CryptoData[]>({
    queryKey: ['crypto', refreshKey],
    queryFn: async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
      if (!response.ok) throw new Error('Failed to fetch crypto data');
      return response.json();
    },
    refetchInterval: 60000, // Refresh every minute
    retry: 3,
    retryDelay: 1000,
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

  const filteredCryptos = view === "favorites"
    ? cryptos?.filter(c => favorites.includes(c.id))
    : cryptos;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Cryptocurrency Market Tracker</CardTitle>
            <CardDescription>Real-time cryptocurrency prices powered by CoinGecko</CardDescription>
          </div>
          <Button
            data-testid="button-refresh"
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
              Unable to fetch live cryptocurrency data from CoinGecko API. Please check your internet connection and try refreshing.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={view} onValueChange={(v) => setView(v as typeof view)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger data-testid="tab-all" value="all">
              All Coins ({cryptos?.length || 0})
            </TabsTrigger>
            <TabsTrigger data-testid="tab-favorites" value="favorites">
              <Star className="h-4 w-4 mr-2" />
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={view} className="mt-0">
            <div className="space-y-3">
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full rounded-lg" />
                ))
              ) : filteredCryptos && filteredCryptos.length > 0 ? (
                filteredCryptos.map((crypto, index) => (
              <Card key={crypto.id} className="hover:shadow-md transition-all duration-200 border-l-4" style={{
                borderLeftColor: crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444'
              }}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center font-bold text-base">
                        {view === "all" ? index + 1 : "★"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-lg sm:text-xl">{crypto.name}</h3>
                          <Badge variant="secondary" className="text-xs">{crypto.symbol.toUpperCase()}</Badge>
                          <Button
                            data-testid={`button-favorite-${crypto.id}`}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleFavorite(crypto.id)}
                          >
                            <Star
                              className={`h-4 w-4 ${favorites.includes(crypto.id) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                            />
                          </Button>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">
                          {formatPrice(crypto.current_price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 sm:text-right">
                      {crypto.sparkline_in_7d?.price && (
                        <div className="hidden sm:block">
                          <MiniSparklineChart
                            prices={crypto.sparkline_in_7d.price}
                            isPositive={crypto.price_change_percentage_24h >= 0}
                          />
                        </div>
                      )}
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
          ) : view === "favorites" && favorites.length === 0 ? (
            <Card className="p-8 text-center">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-2">No favorites yet</p>
              <p className="text-sm text-muted-foreground">
                Click the star icon on any coin to add it to your favorites
              </p>
            </Card>
          ) : (
            <p className="text-center text-muted-foreground py-8">No data available</p>
          )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
