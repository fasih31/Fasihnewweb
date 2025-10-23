
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦" },
];

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const { data: rates, isError } = useQuery<Record<string, number>>({
    queryKey: [`/api/currency-rates`],
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const convertedAmount = rates && amount
    ? (parseFloat(amount) * (rates[toCurrency] / rates[fromCurrency])).toFixed(2)
    : "0.00";

  const exchangeRate = rates
    ? (rates[toCurrency] / rates[fromCurrency]).toFixed(4)
    : "...";

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
  const toCurrencyData = currencies.find(c => c.code === toCurrency);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Currency Converter</CardTitle>
        <CardDescription>Convert between major world currencies with live exchange rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isError && (
          <Alert variant="destructive">
            <AlertDescription>
              Unable to fetch live exchange rates. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-chart-2/5">
            <CardContent className="p-6 space-y-4">
              <Label className="text-lg font-semibold">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{curr.flag}</span>
                        {curr.code} - {curr.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="h-12 text-lg"
              />
              <p className="text-2xl font-bold">
                {fromCurrencyData?.symbol} {parseFloat(amount || "0").toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-2/5 to-chart-3/5">
            <CardContent className="p-6 space-y-4">
              <Label className="text-lg font-semibold">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{curr.flag}</span>
                        {curr.code} - {curr.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="h-12 flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-muted-foreground">
                  1 {fromCurrency} = {exchangeRate} {toCurrency}
                </span>
              </div>
              <p className="text-3xl font-bold text-primary">
                {toCurrencyData?.symbol} {parseFloat(convertedAmount).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg" onClick={swapCurrencies} className="gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Swap Currencies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
