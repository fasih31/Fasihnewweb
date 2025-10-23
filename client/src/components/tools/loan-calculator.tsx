
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return isNaN(payment) ? 0 : payment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan & Mortgage Calculator</CardTitle>
        <CardDescription>Calculate monthly payments and total interest for loans and mortgages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Loan Amount: ${loanAmount.toLocaleString()}</Label>
            <Slider
              value={[loanAmount]}
              onValueChange={([value]) => setLoanAmount(value)}
              min={10000}
              max={1000000}
              step={5000}
            />
          </div>

          <div className="space-y-2">
            <Label>Interest Rate: {interestRate}%</Label>
            <Slider
              value={[interestRate]}
              onValueChange={([value]) => setInterestRate(value)}
              min={1}
              max={15}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Loan Term: {loanTerm} years</Label>
            <Slider
              value={[loanTerm]}
              onValueChange={([value]) => setLoanTerm(value)}
              min={1}
              max={30}
              step={1}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Monthly Payment</p>
              <p className="text-2xl font-bold text-foreground">
                ${monthlyPayment.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-2/10 to-chart-3/10 border-chart-2/20">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Payment</p>
              <p className="text-2xl font-bold text-foreground">
                ${totalPayment.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-3/10 to-primary/10 border-chart-3/20">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Interest</p>
              <p className="text-2xl font-bold text-foreground">
                ${totalInterest.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
