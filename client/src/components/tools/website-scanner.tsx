
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CheckCircle, XCircle, AlertCircle, Loader2, FileText, Image as ImageIcon, Code, Shield } from "lucide-react";
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
  headers: Record<string, string>;
  technologies: string[];
  screenshots: {
    desktop: string;
    mobile: string;
  };
  ocr: {
    extractedText: string;
    confidence: number;
  };
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  security: {
    ssl: boolean;
    headers: {
      hsts: boolean;
      csp: boolean;
      xframe: boolean;
      xss: boolean;
    };
    vulnerabilities: string[];
  };
  htmlStructure: {
    totalElements: number;
    headings: Record<string, number>;
    forms: number;
    scripts: number;
    stylesheets: number;
  };
  domainInfo: {
    registrar?: string;
    createdDate?: string;
    expiryDate?: string;
  };
}

export function WebsiteScanner() {
  const [url, setUrl] = useState("");

  const scanMutation = useMutation<ScanResult, Error, string>({
    mutationFn: async (scanUrl) => {
      const response = await fetch('/api/scan-website-advanced', {
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" />
          Advanced Website Scanner
        </CardTitle>
        <CardDescription>
          Deep analysis with OCR, screenshots, Lighthouse audit, security scan & technology detection
        </CardDescription>
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
              Deep Scan
            </Button>
          </div>
        </div>

        {scanMutation.isPending && (
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <div>
                  <p className="font-medium">Performing deep analysis...</p>
                  <p className="text-sm text-muted-foreground">
                    Running OCR, taking screenshots, analyzing security, and more
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {scanMutation.isError && (
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-4">
              <p className="text-destructive font-medium">
                Failed to scan website. Please check the URL and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Tabs defaultValue="overview" className="space-y-4">
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <TabsList className="inline-flex w-auto min-w-full sm:grid sm:w-full sm:grid-cols-3 lg:grid-cols-6 gap-1 p-1">
                <TabsTrigger value="overview" className="whitespace-nowrap px-4 py-2.5 text-xs sm:text-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="lighthouse" className="whitespace-nowrap px-4 py-2.5 text-xs sm:text-sm">
                  Lighthouse
                </TabsTrigger>
                <TabsTrigger value="security" className="whitespace-nowrap px-4 py-2.5 text-xs sm:text-sm">
                  Security
                </TabsTrigger>
                <TabsTrigger value="screenshots" className="whitespace-nowrap px-4 py-2.5 text-xs sm:text-sm">
                  Screenshots
                </TabsTrigger>
                <TabsTrigger value="ocr" className="whitespace-nowrap px-4 py-2.5 text-xs sm:text-sm">
                  OCR Text
                </TabsTrigger>
                <TabsTrigger value="tech" className="whitespace-nowrap px-4 py-2.5 text-xs sm:text-sm">
                  Tech Stack
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
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

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background/50 rounded-lg">
                      <p className="text-sm font-medium mb-2">HTML Structure</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Total Elements: {result.htmlStructure.totalElements}</p>
                        <p>Forms: {result.htmlStructure.forms}</p>
                        <p>Scripts: {result.htmlStructure.scripts}</p>
                        <p>Stylesheets: {result.htmlStructure.stylesheets}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <p className="text-sm font-medium mb-2">HTTP Info</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Status: {result.status}</p>
                        <p>Server: {result.headers['server'] || 'Unknown'}</p>
                        <p>Content-Type: {result.headers['content-type'] || 'Unknown'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lighthouse Tab */}
            <TabsContent value="lighthouse" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lighthouse Audit Scores</CardTitle>
                  <CardDescription>Google Lighthouse performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Performance</span>
                      <span className={`text-2xl font-bold ${getScoreColor(result.lighthouse.performance)}`}>
                        {result.lighthouse.performance}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${result.lighthouse.performance}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Accessibility</span>
                      <span className={`text-2xl font-bold ${getScoreColor(result.lighthouse.accessibility)}`}>
                        {result.lighthouse.accessibility}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${result.lighthouse.accessibility}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Best Practices</span>
                      <span className={`text-2xl font-bold ${getScoreColor(result.lighthouse.bestPractices)}`}>
                        {result.lighthouse.bestPractices}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${result.lighthouse.bestPractices}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">SEO</span>
                      <span className={`text-2xl font-bold ${getScoreColor(result.lighthouse.seo)}`}>
                        {result.lighthouse.seo}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${result.lighthouse.seo}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      {result.security.ssl ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>SSL Certificate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.security.headers.hsts ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>HSTS Header</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.security.headers.csp ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>Content Security Policy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.security.headers.xframe ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>X-Frame-Options</span>
                    </div>
                  </div>
                  {result.security.vulnerabilities.length > 0 && (
                    <div className="mt-4 p-4 bg-destructive/10 rounded-lg">
                      <p className="font-medium text-destructive mb-2">Security Vulnerabilities:</p>
                      <ul className="text-sm space-y-1">
                        {result.security.vulnerabilities.map((vuln, idx) => (
                          <li key={idx} className="text-destructive">⚠️ {vuln}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Screenshots Tab */}
            <TabsContent value="screenshots" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Website Screenshots</CardTitle>
                  <CardDescription>Desktop and mobile views</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Desktop View</p>
                    <img 
                      src={result.screenshots.desktop} 
                      alt="Desktop screenshot" 
                      className="w-full border rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="font-medium mb-2">Mobile View</p>
                    <img 
                      src={result.screenshots.mobile} 
                      alt="Mobile screenshot" 
                      className="max-w-sm border rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* OCR Tab */}
            <TabsContent value="ocr" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    OCR Extracted Text
                  </CardTitle>
                  <CardDescription>
                    Text extracted from website screenshot (Confidence: {result.ocr.confidence}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {result.ocr.extractedText || "No text extracted"}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tech Stack Tab */}
            <TabsContent value="tech" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Detected Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.technologies.length > 0 ? (
                      result.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">{tech}</Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No technologies detected</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
