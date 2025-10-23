
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface ScanResult {
  url: string;
  hasHttps: boolean;
  hasMeta: boolean;
  hasTitle: boolean;
  hasOgTags: boolean;
  responsive: boolean;
  loadTime: number;
  status: number;
}

export function WebsiteScanner() {
  const [url, setUrl] = useState("");

  const scanMutation = useMutation<ScanResult, Error, string>({
    mutationFn: async (scanUrl) => {
      const response = await fetch('/api/scan-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scanUrl }),
      });
      if (!response.ok) throw new Error('Scan failed');
      return response.json();
    },
  });

  const handleScan = () => {
    if (!url) return;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    scanMutation.mutate(fullUrl);
  };

  const result = scanMutation.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Scanner & SEO Audit</CardTitle>
        <CardDescription>Analyze any website for SEO, security, and performance issues</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label>Website URL</Label>
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com or https://example.com"
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleScan} disabled={scanMutation.isPending || !url}>
              {scanMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Scan
            </Button>
          </div>
        </div>

        {scanMutation.isError && (
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-4">
              <p className="text-destructive font-medium">Failed to scan website. Please check the URL and try again.</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Scan Results for {result.url}</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    {result.hasHttps ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span>HTTPS Security</span>
                    <Badge variant={result.hasHttps ? "default" : "destructive"}>
                      {result.hasHttps ? "Enabled" : "Missing"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.hasTitle ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span>Title Tag</span>
                    <Badge variant={result.hasTitle ? "default" : "destructive"}>
                      {result.hasTitle ? "Found" : "Missing"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.hasMeta ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span>Meta Description</span>
                    <Badge variant={result.hasMeta ? "default" : "secondary"}>
                      {result.hasMeta ? "Found" : "Missing"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.hasOgTags ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span>Open Graph Tags</span>
                    <Badge variant={result.hasOgTags ? "default" : "secondary"}>
                      {result.hasOgTags ? "Found" : "Missing"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.responsive ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span>Mobile Responsive</span>
                    <Badge variant={result.responsive ? "default" : "secondary"}>
                      {result.responsive ? "Yes" : "Unknown"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.loadTime < 3000 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span>Load Time</span>
                    <Badge variant={result.loadTime < 3000 ? "default" : "secondary"}>
                      {result.loadTime}ms
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>HTTP Status:</strong> {result.status}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
