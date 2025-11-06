import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Key, Copy, RefreshCw, Shield } from "lucide-react";

export function PasswordGenerator() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard"
    });
  };

  const getStrength = () => {
    if (!password) return { label: "", color: "", percent: 0 };
    let score = 0;
    if (password.length >= 12) score += 25;
    if (password.length >= 16) score += 25;
    if (/[a-z]/.test(password)) score += 12.5;
    if (/[A-Z]/.test(password)) score += 12.5;
    if (/[0-9]/.test(password)) score += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) score += 12.5;

    if (score < 40) return { label: "Weak", color: "text-red-500", percent: score };
    if (score < 70) return { label: "Medium", color: "text-yellow-500", percent: score };
    return { label: "Strong", color: "text-green-500", percent: score };
  };

  const strength = getStrength();

  return (
    <Card data-testid="card-password-generator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-password-title">
          <Key className="h-6 w-6 text-primary" />
          Password Generator
        </CardTitle>
        <CardDescription data-testid="text-password-description">
          Generate secure, random passwords with customizable options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label data-testid="label-password-length">Password Length: {length[0]}</Label>
            </div>
            <Slider
              value={length}
              onValueChange={setLength}
              min={8}
              max={64}
              step={1}
              data-testid="slider-password-length"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="uppercase" 
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                data-testid="checkbox-uppercase"
              />
              <label htmlFor="uppercase" className="text-sm cursor-pointer" data-testid="label-uppercase">
                Include Uppercase (A-Z)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lowercase" 
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                data-testid="checkbox-lowercase"
              />
              <label htmlFor="lowercase" className="text-sm cursor-pointer" data-testid="label-lowercase">
                Include Lowercase (a-z)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="numbers" 
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                data-testid="checkbox-numbers"
              />
              <label htmlFor="numbers" className="text-sm cursor-pointer" data-testid="label-numbers">
                Include Numbers (0-9)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="symbols" 
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                data-testid="checkbox-symbols"
              />
              <label htmlFor="symbols" className="text-sm cursor-pointer" data-testid="label-symbols">
                Include Symbols (!@#$%...)
              </label>
            </div>
          </div>

          <Button 
            onClick={generatePassword}
            className="w-full"
            data-testid="button-generate-password"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Password
          </Button>
        </div>

        {password && (
          <div className="space-y-4 border-t pt-6">
            <div className="space-y-2">
              <Label data-testid="label-generated-password">Generated Password</Label>
              <div className="flex gap-2">
                <Input 
                  value={password} 
                  readOnly 
                  className="font-mono"
                  data-testid="input-generated-password"
                />
                <Button 
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  data-testid="button-copy-password"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2" data-testid="label-strength">
                  <Shield className="h-4 w-4" />
                  Strength
                </Label>
                <span className={`font-semibold ${strength.color}`} data-testid="text-strength">
                  {strength.label}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    strength.label === "Weak" ? "bg-red-500" :
                    strength.label === "Medium" ? "bg-yellow-500" : "bg-green-500"
                  }`}
                  style={{ width: `${strength.percent}%` }}
                  data-testid="progress-strength"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
