
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Home } from "lucide-react";

export function HomeFinanceCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [tenure, setTenure] = useState(20);
  const [profitRate, setProfitRate] = useState(7);

  const downPaymentAmount = (propertyPrice * downPayment) / 100;
  const financedAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = profitRate / 100 / 12;
  const numberOfPayments = tenure * 12;
  
  // Ijarah monthly rent
  const ijarahMonthly = (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  // Diminishing Musharakah
  const ownershipShare = downPayment / 100;
  const bankShare = 1 - ownershipShare;
  const monthlyRent = (financedAmount * profitRate) / 100 / 12;
  const monthlyPurchase = financedAmount / numberOfPayments;
  const musharakahMonthly = monthlyRent + monthlyPurchase;

  return (
    <Card className="border-purple-200 dark:border-purple-800">
      <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Home className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Islamic Home Finance Calculator</CardTitle>
            <CardDescription>Ijarah & Diminishing Musharakah</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Property Price (AED)</Label>
            <Input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(parseFloat(e.target.value) || 0)}
              className="text-lg h-12"
            />
          </div>

          <div className="space-y-2">
            <Label>Down Payment: {downPayment}%</Label>
            <Slider
              value={[downPayment]}
              onValueChange={([value]) => setDownPayment(value)}
              min={10}
              max={50}
              step={5}
            />
            <p className="text-sm text-muted-foreground">
              Amount: AED {downPaymentAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tenure: {tenure} years</Label>
            <Slider
              value={[tenure]}
              onValueChange={([value]) => setTenure(value)}
              min={5}
              max={25}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Profit Rate: {profitRate}%</Label>
            <Slider
              value={[profitRate]}
              onValueChange={([value]) => setProfitRate(value)}
              min={4}
              max={12}
              step={0.5}
            />
          </div>
        </div>

        <Tabs defaultValue="ijarah" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ijarah">Ijarah (Lease)</TabsTrigger>
            <TabsTrigger value="musharakah">Diminishing Musharakah</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ijarah" className="space-y-4 mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    AED {ijarahMonthly.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Payments</p>
                  <p className="text-xl font-bold">
                    AED {(ijarahMonthly * numberOfPayments).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Financed Amount</p>
                  <p className="text-xl font-bold">
                    AED {financedAmount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold mb-2">How Ijarah Works:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Bank purchases the property</li>
                <li>• You lease the property and pay monthly rent</li>
                <li>• Option to purchase at end of term</li>
                <li>• Ownership transfers after full payment</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="musharakah" className="space-y-4 mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    AED {musharakahMonthly.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Your Share</p>
                  <Badge variant="outline" className="text-lg">{downPayment}%</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Bank Share</p>
                  <Badge variant="secondary" className="text-lg">{100 - downPayment}%</Badge>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold mb-2">How Diminishing Musharakah Works:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• You and bank co-own the property</li>
                <li>• You pay rent on bank's share</li>
                <li>• You gradually purchase bank's share</li>
                <li>• Your ownership increases monthly</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
