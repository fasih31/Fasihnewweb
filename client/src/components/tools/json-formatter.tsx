import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Code2, Copy, FileJson, Minimize2 } from "lucide-react";

export function JSONFormatter() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      toast({
        title: "Success!",
        description: "JSON formatted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive"
      });
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      toast({
        title: "Success!",
        description: "JSON minified successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive"
      });
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      toast({
        title: "Valid JSON!",
        description: "Your JSON is valid"
      });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: error instanceof Error ? error.message : "Syntax error",
        variant: "destructive"
      });
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Formatted JSON copied to clipboard"
    });
  };

  return (
    <Card data-testid="card-json-formatter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-json-title">
          <FileJson className="h-6 w-6 text-primary" />
          JSON Formatter & Validator
        </CardTitle>
        <CardDescription data-testid="text-json-description">
          Format, minify, and validate JSON data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="json-input" data-testid="label-json-input">Input JSON</Label>
          <Textarea
            id="json-input"
            data-testid="input-json"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            rows={10}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={formatJSON}
            disabled={!input}
            data-testid="button-format-json"
          >
            <Code2 className="h-4 w-4 mr-2" />
            Format
          </Button>
          <Button 
            onClick={minifyJSON}
            disabled={!input}
            variant="outline"
            data-testid="button-minify-json"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Minify
          </Button>
          <Button 
            onClick={validateJSON}
            disabled={!input}
            variant="outline"
            data-testid="button-validate-json"
          >
            Validate
          </Button>
        </div>

        {output && (
          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label data-testid="label-json-output">Output</Label>
              <Button 
                onClick={copyOutput}
                variant="ghost"
                size="sm"
                data-testid="button-copy-json"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              rows={10}
              className="font-mono text-sm"
              data-testid="output-json"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
