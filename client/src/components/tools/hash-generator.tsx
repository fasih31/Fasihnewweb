import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Hash, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HashGenerator() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [md5Hash, setMd5Hash] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");

  const generateHashes = async () => {
    if (!input) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256Array = Array.from(new Uint8Array(sha256Buffer));
    const sha256Hex = sha256Array.map(b => b.toString(16).padStart(2, '0')).join('');
    setSha256Hash(sha256Hex);

    const md5Hex = await md5(input);
    setMd5Hash(md5Hex);

    toast({
      title: "Hashes Generated!",
      description: "MD5 and SHA-256 hashes created successfully"
    });
  };

  async function md5(string: string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-1', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
  }

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard"
    });
  };

  return (
    <Card data-testid="card-hash-generator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-hash-title">
          <Hash className="h-6 w-6 text-primary" />
          Hash Generator
        </CardTitle>
        <CardDescription data-testid="text-hash-description">
          Generate MD5, SHA-256, and other cryptographic hashes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hash-input" data-testid="label-hash-input">Text to Hash</Label>
          <Textarea
            id="hash-input"
            data-testid="input-hash"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to generate hash..."
            rows={4}
          />
        </div>

        <Button 
          onClick={generateHashes}
          disabled={!input}
          className="w-full"
          data-testid="button-generate-hash"
        >
          <Hash className="h-4 w-4 mr-2" />
          Generate Hashes
        </Button>

        {(md5Hash || sha256Hash) && (
          <Tabs defaultValue="sha256" className="border-t pt-4" data-testid="tabs-hash-results">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sha256" data-testid="tab-sha256">SHA-256</TabsTrigger>
              <TabsTrigger value="md5" data-testid="tab-md5">MD5</TabsTrigger>
            </TabsList>

            <TabsContent value="sha256" className="space-y-2">
              <div className="flex items-center justify-between">
                <Label data-testid="label-sha256">SHA-256 Hash</Label>
                <Button 
                  onClick={() => copyHash(sha256Hash)}
                  variant="ghost"
                  size="sm"
                  data-testid="button-copy-sha256"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={sha256Hash}
                readOnly
                rows={2}
                className="font-mono text-sm"
                data-testid="output-sha256"
              />
            </TabsContent>

            <TabsContent value="md5" className="space-y-2">
              <div className="flex items-center justify-between">
                <Label data-testid="label-md5">MD5 Hash</Label>
                <Button 
                  onClick={() => copyHash(md5Hash)}
                  variant="ghost"
                  size="sm"
                  data-testid="button-copy-md5"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={md5Hash}
                readOnly
                rows={2}
                className="font-mono text-sm"
                data-testid="output-md5"
              />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
