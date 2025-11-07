import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const popularCurrencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
];

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const { data: rates, isLoading } = useQuery<Record<string, number>>({
    queryKey: ["/api/currency-rates"],
  });

  const convertedAmount = rates && amount
    ? (parseFloat(amount) * rates[toCurrency] / rates[fromCurrency]).toFixed(2)
    : "0.00";

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <Helmet>
        <title>Currency Converter - Real-Time Exchange Rates | Fasih ur Rehman</title>
        <meta name="description" content="Convert currencies with real-time exchange rates. Support for 150+ currencies including USD, EUR, GBP, JPY, INR, PKR and more. Free online currency conversion tool." />
        <meta name="keywords" content="currency converter, exchange rates, forex converter, currency exchange, USD to EUR, currency calculator" />
        <meta property="og:title" content="Currency Converter - Real-Time Exchange Rates" />
        <meta property="og:description" content="Convert between 150+ currencies with live exchange rates. Fast, accurate, and free currency conversion tool." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fasihurrehman.com/tools/currency-converter" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navbar />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Currency Converter
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Convert between 150+ world currencies with real-time exchange rates. Accurate, fast, and always up-to-date.
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  Convert Currency
                </CardTitle>
                <CardDescription>
                  Enter amount and select currencies to convert
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    data-testid="input-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="from-currency">From</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger id="from-currency" data-testid="select-from-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {popularCurrencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center md:mb-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={swapCurrencies}
                      data-testid="button-swap"
                      className="rounded-full"
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to-currency">To</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger id="to-currency" data-testid="select-to-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {popularCurrencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Amount</div>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400" data-testid="text-result">
                    {popularCurrencies.find(c => c.code === toCurrency)?.symbol} {convertedAmount}
                  </div>
                  {rates && (
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
                    </div>
                  )}
                </div>

                {isLoading && (
                  <div className="text-center text-gray-500">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                    <p className="mt-2">Loading exchange rates...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-12 bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Real-Time Exchange Rates</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our currency converter uses live exchange rates from reliable financial data providers. 
                    Rates are updated regularly to ensure accuracy for your currency conversions. Perfect for 
                    travelers, businesses, and anyone dealing with international transactions.
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
