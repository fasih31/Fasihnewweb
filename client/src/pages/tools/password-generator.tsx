import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Copy, RefreshCw, Check } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePassword = () => {
    let chars = '';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars === '') {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length[0]; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (!password) return { label: "None", color: "bg-gray-300", percentage: 0 };
    if (length[0] < 8) return { label: "Weak", color: "bg-red-500", percentage: 25 };
    if (length[0] < 12) return { label: "Fair", color: "bg-orange-500", percentage: 50 };
    if (length[0] < 16) return { label: "Good", color: "bg-yellow-500", percentage: 75 };
    return { label: "Strong", color: "bg-green-500", percentage: 100 };
  };

  const strength = getStrength();

  return (
    <>
      <Helmet>
        <title>Secure Password Generator - Create Strong Random Passwords | Fasih ur Rehman</title>
        <meta name="description" content="Generate secure, random passwords with customizable length and character types. Create strong passwords to protect your online accounts. Free password generator tool." />
        <meta name="keywords" content="password generator, secure password, random password, strong password generator, password creator" />
        <meta property="og:title" content="Secure Password Generator - Create Strong Random Passwords" />
        <meta property="og:description" content="Generate secure passwords with custom length and character options. Free and secure password generation tool." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fasihurrehman.com/tools/password-generator" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navigation />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Password Generator
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Create secure, random passwords to protect your accounts. Customize length and character types for maximum security.
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-red-600" />
                  Generate Secure Password
                </CardTitle>
                <CardDescription>
                  Customize your password requirements below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {password && (
                  <div className="space-y-3">
                    <Label>Generated Password</Label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 font-mono text-lg break-all" data-testid="text-password">
                        {password}
                      </div>
                      <Button 
                        onClick={copyToClipboard} 
                        size="icon"
                        data-testid="button-copy"
                        variant="outline"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Password Strength:</span>
                        <span className="font-semibold" data-testid="text-strength">{strength.label}</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Password Length: {length[0]}</Label>
                    </div>
                    <Slider
                      value={length}
                      onValueChange={setLength}
                      max={64}
                      min={4}
                      step={1}
                      data-testid="slider-length"
                    />
                  </div>

                  <div className="space-y-3 pt-4 border-t dark:border-gray-700">
                    <Label>Character Types</Label>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="uppercase" 
                        checked={includeUppercase}
                        onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                        data-testid="checkbox-uppercase"
                      />
                      <label htmlFor="uppercase" className="text-sm cursor-pointer">
                        Uppercase Letters (A-Z)
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="lowercase" 
                        checked={includeLowercase}
                        onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                        data-testid="checkbox-lowercase"
                      />
                      <label htmlFor="lowercase" className="text-sm cursor-pointer">
                        Lowercase Letters (a-z)
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="numbers" 
                        checked={includeNumbers}
                        onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                        data-testid="checkbox-numbers"
                      />
                      <label htmlFor="numbers" className="text-sm cursor-pointer">
                        Numbers (0-9)
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="symbols" 
                        checked={includeSymbols}
                        onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                        data-testid="checkbox-symbols"
                      />
                      <label htmlFor="symbols" className="text-sm cursor-pointer">
                        Symbols (!@#$%^&*)
                      </label>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={generatePassword} 
                  className="w-full"
                  size="lg"
                  data-testid="button-generate"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Password
                </Button>
              </CardContent>
            </Card>

            <div className="mt-12 bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Password Security Tips</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                  <span>Use a minimum of 12 characters for strong security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                  <span>Include a mix of uppercase, lowercase, numbers, and symbols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                  <span>Never reuse passwords across different accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                  <span>Consider using a password manager to store generated passwords</span>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
