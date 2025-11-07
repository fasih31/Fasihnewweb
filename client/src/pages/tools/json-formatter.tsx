import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Code, Check, AlertCircle, Copy } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
      toast({
        title: "Success!",
        description: "JSON formatted successfully",
      });
    } catch (err: any) {
      setError(err.message);
      setOutput("");
      toast({
        title: "Invalid JSON",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      toast({
        title: "Success!",
        description: "JSON minified successfully",
      });
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Formatted JSON copied to clipboard",
    });
  };

  return (
    <>
      <Helmet>
        <title>JSON Formatter & Validator - Format and Validate JSON Online | Fasih ur Rehman</title>
        <meta name="description" content="Format, validate, and beautify JSON data online. Free JSON formatter tool with syntax validation, minification, and error detection." />
        <meta name="keywords" content="JSON formatter, JSON validator, JSON beautifier, JSON minifier, format JSON online, validate JSON" />
        <meta property="og:title" content="JSON Formatter & Validator - Format and Validate JSON Online" />
        <meta property="og:description" content="Format and validate JSON with syntax highlighting and error detection. Free online JSON formatter tool." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fasihurrehman.com/tools/json-formatter" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navigation />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                JSON Formatter & Validator
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Format, validate, and beautify JSON data with syntax validation and error detection.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-6 w-6 text-blue-600" />
                    Input JSON
                  </CardTitle>
                  <CardDescription>
                    Paste your JSON data here
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder='{"key": "value"}'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    data-testid="input-json"
                    rows={20}
                    className="font-mono text-sm resize-none"
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={formatJSON} 
                      className="flex-1"
                      data-testid="button-format"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Format
                    </Button>
                    <Button 
                      onClick={minifyJSON} 
                      variant="outline"
                      className="flex-1"
                      data-testid="button-minify"
                    >
                      Minify
                    </Button>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-red-600 dark:text-red-400" data-testid="text-error">
                        {error}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code className="h-6 w-6 text-blue-600" />
                      Output
                    </div>
                    {output && (
                      <Button 
                        onClick={copyOutput} 
                        variant="ghost" 
                        size="sm"
                        data-testid="button-copy"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Formatted JSON will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {output ? (
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-[500px] text-sm" data-testid="text-output">
                      <code className="font-mono">{output}</code>
                    </pre>
                  ) : (
                    <div className="flex items-center justify-center h-[500px] text-gray-400 border-2 border-dashed dark:border-gray-700 rounded-lg">
                      <div className="text-center">
                        <Code className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p>Formatted JSON will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">JSON Formatter Features</h2>
              <ul className="grid md:grid-cols-2 gap-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Format and beautify JSON with proper indentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Validate JSON syntax and detect errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Minify JSON to reduce file size</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Copy formatted output with one click</span>
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
