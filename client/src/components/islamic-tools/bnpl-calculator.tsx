
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Calculator } from "lucide-react";

export function BNPLCalculator() {
  const [productPrice, setProductPrice] = useState(1000);
  const [installments, setInstallments] = useState(3);
  const [markupPercent, setMarkupPercent] = useState(10);

  const totalCost = productPrice * (1 + markupPercent / 100);
  const monthlyPayment = totalCost / installments;
  const totalMarkup = totalCost - productPrice;

  return (
    <Card className="border-emerald-200 dark:border-emerald-800">
      <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Islamic BNPL Calculator</CardTitle>
            <CardDescription>Murabaha-based Buy Now, Pay Later</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label>Product Price (AED)</Label>
          <Input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
            className="text-lg h-12"
          />
        </div>

        <div className="space-y-2">
          <Label>Number of Installments: {installments} months</Label>
          <Slider
            value={[installments]}
            onValueChange={([value]) => setInstallments(value)}
            min={3}
            max={12}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label>Markup Percentage: {markupPercent}%</Label>
          <Slider
            value={[markupPercent]}
            onValueChange={([value]) => setMarkupPercent(value)}
            min={5}
            max={20}
            step={1}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                AED {monthlyPayment.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                AED {totalCost.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Markup</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                AED {totalMarkup.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="p-4 bg-muted rounded-lg space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="h-5 w-5 text-primary" />
            <h4 className="font-semibold">Payment Breakdown</h4>
          </div>
          {Array.from({ length: installments }, (_, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
              <span className="text-sm">Month {i + 1}</span>
              <Badge variant="outline">AED {monthlyPayment.toFixed(2)}</Badge>
            </div>
          ))}
        </div>

        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-800 dark:text-emerald-200">
            ✓ <strong>Shariah Compliant:</strong> No interest (Riba) - only transparent markup
            <br />✓ <strong>Fixed Cost:</strong> No hidden fees or variable charges
            <br />✓ <strong>Ethical:</strong> Late fees donated to charity
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
