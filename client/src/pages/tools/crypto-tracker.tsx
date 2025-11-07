import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CryptoTrackerPage() {
  const { data: cryptoData, isLoading } = useQuery<any[]>({
    queryKey: ["/api/crypto"],
  });

  return (
    <>
      <Helmet>
        <title>Crypto Market Tracker - Real-Time Cryptocurrency Prices | Fasih ur Rehman</title>
        <meta name="description" content="Track real-time cryptocurrency prices, market cap, 24h volume, and price changes. Monitor Bitcoin, Ethereum, and top 10 cryptocurrencies with live market data." />
        <meta name="keywords" content="cryptocurrency tracker, bitcoin price, ethereum price, crypto market, cryptocurrency prices, real-time crypto data" />
        <meta property="og:title" content="Crypto Market Tracker - Real-Time Cryptocurrency Prices" />
        <meta property="og:description" content="Track real-time cryptocurrency prices, market cap, and 24h volume for Bitcoin, Ethereum, and top cryptocurrencies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fasihurrehman.com/tools/crypto-tracker" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navbar />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Cryptocurrency Market Tracker
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Monitor real-time cryptocurrency prices, market capitalization, 24-hour volume, and price changes for the top digital assets.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="space-y-2">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="crypto-grid">
                {cryptoData?.map((crypto) => (
                  <Card key={crypto.id} className="hover:shadow-lg transition-shadow" data-testid={`crypto-card-${crypto.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={crypto.image} alt={crypto.name} className="w-10 h-10" data-testid={`crypto-image-${crypto.id}`} />
                          <div>
                            <CardTitle className="text-xl" data-testid={`crypto-name-${crypto.id}`}>{crypto.name}</CardTitle>
                            <CardDescription className="uppercase" data-testid={`crypto-symbol-${crypto.id}`}>{crypto.symbol}</CardDescription>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                          crypto.price_change_percentage_24h >= 0 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span className="text-sm font-semibold" data-testid={`crypto-change-${crypto.id}`}>
                            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-sm">Current Price</span>
                        </div>
                        <div className="text-3xl font-bold" data-testid={`crypto-price-${crypto.id}`}>
                          ${crypto.current_price.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap</div>
                          <div className="font-semibold" data-testid={`crypto-marketcap-${crypto.id}`}>
                            ${(crypto.market_cap / 1e9).toFixed(2)}B
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">24h Volume</div>
                          <div className="font-semibold" data-testid={`crypto-volume-${crypto.id}`}>
                            ${(crypto.total_volume / 1e9).toFixed(2)}B
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Price Range (24h)</div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-600 dark:text-red-400" data-testid={`crypto-low-${crypto.id}`}>
                            L: ${crypto.low_24h.toLocaleString()}
                          </span>
                          <span className="text-green-600 dark:text-green-400" data-testid={`crypto-high-${crypto.id}`}>
                            H: ${crypto.high_24h.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Real-Time Market Data</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    This cryptocurrency tracker provides live market data powered by CoinGecko API. Prices are updated in real-time 
                    to help you make informed decisions about your crypto investments. Monitor market trends, track price movements, 
                    and stay updated with the latest cryptocurrency market information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
