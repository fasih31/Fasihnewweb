import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Binary, Copy, ArrowDownUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Base64Converter() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      toast({
        title: "Encoded!",
        description: "Text successfully encoded to Base64"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text",
        variant: "destructive"
      });
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      toast({
        title: "Decoded!",
        description: "Base64 successfully decoded to text"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 string",
        variant: "destructive"
      });
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard"
    });
  };

  return (
    <Card data-testid="card-base64-converter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-base64-title">
          <Binary className="h-6 w-6 text-primary" />
          Base64 Encoder/Decoder
        </CardTitle>
        <CardDescription data-testid="text-base64-description">
          Encode and decode text to/from Base64 format
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="encode" data-testid="tabs-base64">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode" data-testid="tab-encode">Encode</TabsTrigger>
            <TabsTrigger value="decode" data-testid="tab-decode">Decode</TabsTrigger>
          </TabsList>
          
          <TabsContent value="encode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="encode-input" data-testid="label-encode-input">Text to Encode</Label>
              <Textarea
                id="encode-input"
                data-testid="input-encode"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to encode..."
                rows={6}
              />
            </div>
            <Button 
              onClick={encode}
              disabled={!input}
              className="w-full"
              data-testid="button-encode"
            >
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Encode to Base64
            </Button>
          </TabsContent>

          <TabsContent value="decode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decode-input" data-testid="label-decode-input">Base64 to Decode</Label>
              <Textarea
                id="decode-input"
                data-testid="input-decode"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Base64 string to decode..."
                rows={6}
                className="font-mono text-sm"
              />
            </div>
            <Button 
              onClick={decode}
              disabled={!input}
              className="w-full"
              data-testid="button-decode"
            >
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Decode from Base64
            </Button>
          </TabsContent>
        </Tabs>

        {output && (
          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label data-testid="label-output">Output</Label>
              <Button 
                onClick={copyOutput}
                variant="ghost"
                size="sm"
                data-testid="button-copy-output"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              rows={6}
              className="font-mono text-sm"
              data-testid="output-result"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
