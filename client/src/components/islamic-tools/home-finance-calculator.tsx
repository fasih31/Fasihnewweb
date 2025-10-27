
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Home } from "lucide-react";
import { CalculatorCard } from "@/components/ui/calculator-card";
import { Card, CardContent } from "@/components/ui/card";

export function HomeFinanceCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [tenure, setTenure] = useState(20);
  const [profitRate, setProfitRate] = useState(7);

  const downPaymentAmount = (propertyPrice * downPayment) / 100;
  const financedAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = profitRate / 100 / 12;
  const numberOfPayments = tenure * 12;
  
  const ijarahMonthly = (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const ownershipShare = downPayment / 100;
  const bankShare = 1 - ownershipShare;
  const monthlyRent = (financedAmount * profitRate) / 100 / 12;
  const monthlyPurchase = financedAmount / numberOfPayments;
  const musharakahMonthly = monthlyRent + monthlyPurchase;

  return (
    <CalculatorCard
      title="Islamic Home Finance Calculator"
      description="Ijarah & Diminishing Musharakah"
      icon={Home}
      gradientFrom="from-purple-50"
      gradientTo="to-pink-50 dark:from-purple-950 dark:to-pink-950"
      borderColor="border-purple-200 dark:border-purple-800"
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Property Price (AED)</Label>
            <Input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(parseFloat(e.target.value) || 0)}
              className="text-base sm:text-lg h-11 sm:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Down Payment: {downPayment}%</Label>
            <Slider
              value={[downPayment]}
              onValueChange={([value]) => setDownPayment(value)}
              min={10}
              max={50}
              step={5}
              className="py-2"
            />
            <p className="text-xs sm:text-sm text-muted-foreground">
              AED {downPaymentAmount.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Tenure: {tenure} years</Label>
            <Slider
              value={[tenure]}
              onValueChange={([value]) => setTenure(value)}
              min={5}
              max={30}
              step={5}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Profit Rate: {profitRate}%</Label>
            <Slider
              value={[profitRate]}
              onValueChange={([value]) => setProfitRate(value)}
              min={3}
              max={15}
              step={0.5}
              className="py-2"
            />
          </div>
        </div>

        <Tabs defaultValue="ijarah" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ijarah" className="text-xs sm:text-sm">Ijarah (Lease)</TabsTrigger>
            <TabsTrigger value="musharakah" className="text-xs sm:text-sm">Diminishing Musharakah</TabsTrigger>
          </TabsList>

          <TabsContent value="ijarah" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Monthly Rent</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    AED {ijarahMonthly.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Payments</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    AED {(ijarahMonthly * numberOfPayments).toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Financed Amount</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    AED {financedAmount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">How Ijarah Works:</h4>
              <ul className="text-xs sm:text-sm space-y-1 text-muted-foreground leading-relaxed">
                <li>• Bank purchases the property</li>
                <li>• You lease it with fixed monthly rent</li>
                <li>• Option to purchase at end of term</li>
                <li>• Ownership transfers upon completion</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="musharakah" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    AED {musharakahMonthly.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Your Ownership</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {downPayment}%
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Bank Share</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {100 - downPayment}%
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">How Diminishing Musharakah Works:</h4>
              <ul className="text-xs sm:text-sm space-y-1 text-muted-foreground leading-relaxed">
                <li>• You and bank co-own the property</li>
                <li>• You pay rent on bank's share</li>
                <li>• You gradually purchase bank's share</li>
                <li>• Your ownership increases monthly</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CalculatorCard>
  );
}
