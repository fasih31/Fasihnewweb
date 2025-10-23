
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const lengthUnits = {
  meter: 1,
  kilometer: 0.001,
  centimeter: 100,
  millimeter: 1000,
  mile: 0.000621371,
  yard: 1.09361,
  foot: 3.28084,
  inch: 39.3701,
};

const weightUnits = {
  kilogram: 1,
  gram: 1000,
  milligram: 1000000,
  ton: 0.001,
  pound: 2.20462,
  ounce: 35.274,
};

export function UnitConverter() {
  const [lengthValue, setLengthValue] = useState("1");
  const [lengthFrom, setLengthFrom] = useState("meter");
  const [lengthTo, setLengthTo] = useState("foot");

  const [weightValue, setWeightValue] = useState("1");
  const [weightFrom, setWeightFrom] = useState("kilogram");
  const [weightTo, setWeightTo] = useState("pound");

  const convertLength = () => {
    const meters = parseFloat(lengthValue) / lengthUnits[lengthFrom as keyof typeof lengthUnits];
    return (meters * lengthUnits[lengthTo as keyof typeof lengthUnits]).toFixed(4);
  };

  const convertWeight = () => {
    const kg = parseFloat(weightValue) / weightUnits[weightFrom as keyof typeof weightUnits];
    return (kg * weightUnits[weightTo as keyof typeof weightUnits]).toFixed(4);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Converter</CardTitle>
        <CardDescription>Convert between different units of measurement</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="length">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="length">Length</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
          </TabsList>

          <TabsContent value="length" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  type="number"
                  value={lengthValue}
                  onChange={(e) => setLengthValue(e.target.value)}
                  placeholder="Enter value"
                />
              </div>
              <div className="space-y-2">
                <Label>From Unit</Label>
                <Select value={lengthFrom} onValueChange={setLengthFrom}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(lengthUnits).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>To Unit</Label>
              <Select value={lengthTo} onValueChange={setLengthTo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(lengthUnits).map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="text-3xl font-bold text-foreground">
                  {convertLength()} {lengthTo}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weight" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  type="number"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  placeholder="Enter value"
                />
              </div>
              <div className="space-y-2">
                <Label>From Unit</Label>
                <Select value={weightFrom} onValueChange={setWeightFrom}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(weightUnits).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>To Unit</Label>
              <Select value={weightTo} onValueChange={setWeightTo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(weightUnits).map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="text-3xl font-bold text-foreground">
                  {convertWeight()} {weightTo}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
