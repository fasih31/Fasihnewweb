import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function URLShortener() {
  const { toast } = useToast();
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [customAlias, setCustomAlias] = useState("");

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const shortenUrl = async () => {
    if (!longUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(longUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    setIsShortening(true);
    try {
      const response = await fetch('/api/shorten-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: longUrl,
          customAlias: customAlias || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
      toast({
        title: "URL Shortened!",
        description: "Your short URL is ready to use",
      });
    } catch (error: any) {
      toast({
        title: "Shortening Failed",
        description: error.message || "Could not shorten URL",
        variant: "destructive",
      });
    } finally {
      setIsShortening(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const reset = () => {
    setLongUrl("");
    setShortUrl("");
    setCustomAlias("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-6 w-6 text-primary" />
          URL Shortener
        </CardTitle>
        <CardDescription>
          Create short, memorable links for easy sharing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!shortUrl ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Long URL</Label>
              <Input
                data-testid="input-long-url"
                type="url"
                placeholder="https://example.com/very-long-url-to-shorten"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && shortenUrl()}
              />
            </div>

            <div className="space-y-2">
              <Label>Custom Alias (Optional)</Label>
              <Input
                data-testid="input-custom-alias"
                placeholder="my-custom-link"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty for a random short code
              </p>
            </div>

            <Button
              data-testid="button-shorten"
              onClick={shortenUrl}
              disabled={isShortening}
              className="w-full"
            >
              {isShortening ? "Shortening..." : "Shorten URL"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription>
                Your URL has been shortened successfully!
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Short URL</Label>
              <div className="flex gap-2">
                <Input
                  data-testid="input-short-url"
                  value={shortUrl}
                  readOnly
                  className="font-mono"
                />
                <Button
                  data-testid="button-copy"
                  variant="outline"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Original Length</p>
                <p className="text-2xl font-bold">{longUrl.length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Shortened Length</p>
                <p className="text-2xl font-bold">{shortUrl.length}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                data-testid="button-open-link"
                variant="outline"
                className="flex-1"
                onClick={() => window.open(longUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Original
              </Button>
              <Button
                data-testid="button-create-another"
                variant="default"
                className="flex-1"
                onClick={reset}
              >
                Create Another
              </Button>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
              <p className="text-sm font-medium mb-2">Original URL:</p>
              <p className="text-xs text-muted-foreground break-all">{longUrl}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
