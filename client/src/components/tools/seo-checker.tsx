
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  TrendingUp,
  Globe,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Zap,
  Shield,
  Smartphone
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface SEOAnalysis {
  url: string;
  score: number;
  performance: {
    loadTime: number;
    pageSize: number;
    requests: number;
    firstContentfulPaint: number;
    timeToInteractive: number;
  };
  technical: {
    hasHttps: boolean;
    hasRobotsTxt: boolean;
    hasSitemap: boolean;
    hasCanonical: boolean;
    hasViewport: boolean;
    hasCharset: boolean;
    hasLangAttribute: boolean;
    hasFavicon: boolean;
    hasServiceWorker: boolean;
    isAMPEnabled: boolean;
  };
  content: {
    title: { exists: boolean; length: number; text?: string };
    metaDescription: { exists: boolean; length: number; text?: string };
    h1Tags: number;
    h2Tags: number;
    h3Tags: number;
    totalWords: number;
    readabilityScore: number;
    keywordDensity: Record<string, number>;
  };
  images: {
    total: number;
    withAlt: number;
    withoutAlt: number;
    oversized: number;
    totalSize: number;
    optimizationSuggestions: string[];
  };
  links: {
    internal: number;
    external: number;
    broken: number;
    nofollow: number;
    dofollow: number;
  };
  mobile: {
    isMobileFriendly: boolean;
    hasResponsiveDesign: boolean;
    usesFlexibleImages: boolean;
    fontSizeReadable: boolean;
    touchElementsSpaced: boolean;
  };
  social: {
    hasOgTags: boolean;
    hasTwitterCard: boolean;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
  };
  schema: {
    hasStructuredData: boolean;
    types: string[];
    validationErrors: string[];
  };
  security: {
    hasSSL: boolean;
    hasSTS: boolean;
    hasCSP: boolean;
    hasXFrameOptions: boolean;
    vulnerabilities: string[];
  };
  accessibility: {
    score: number;
    issues: Array<{ type: string; message: string; severity: string }>;
  };
  recommendations: Array<{ category: string; priority: string; message: string }>;
}

export function SEOChecker() {
  const [url, setUrl] = useState("");

  const analyzeMutation = useMutation<SEOAnalysis, Error, string>({
    mutationFn: async (analyzeUrl) => {
      const response = await fetch('/api/seo-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: analyzeUrl }),
      });
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    },
  });

  const handleAnalyze = () => {
    if (!url) return;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    analyzeMutation.mutate(fullUrl);
  };

  const result = analyzeMutation.data;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 70) return "secondary";
    return "destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Advanced SEO Analyzer
        </CardTitle>
        <CardDescription>
          Comprehensive SEO audit with performance, accessibility, and technical analysis
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
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAnalyze} disabled={analyzeMutation.isPending || !url}>
              {analyzeMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Analyze
            </Button>
          </div>
        </div>

        {analyzeMutation.isError && (
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-4">
              <p className="text-destructive font-medium">
                Failed to analyze website. Please check the URL and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {result && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-2xl">SEO Score</h3>
                    <p className="text-sm text-muted-foreground">{result.url}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}
                    </div>
                    <Badge variant={getScoreBadge(result.score)}>
                      {result.score >= 90 ? "Excellent" : result.score >= 70 ? "Good" : "Needs Work"}
                    </Badge>
                  </div>
                </div>
                <Progress value={result.score} className="h-2" />
              </CardContent>
            </Card>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="performance" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="performance">
                  <Zap className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Performance</span>
                </TabsTrigger>
                <TabsTrigger value="technical">
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Technical</span>
                </TabsTrigger>
                <TabsTrigger value="content">
                  <FileText className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Content</span>
                </TabsTrigger>
                <TabsTrigger value="images">
                  <ImageIcon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Images</span>
                </TabsTrigger>
                <TabsTrigger value="links">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Links</span>
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Mobile</span>
                </TabsTrigger>
                <TabsTrigger value="social">
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Social</span>
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
              </TabsList>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <MetricRow 
                      label="Load Time" 
                      value={`${result.performance.loadTime}ms`}
                      status={result.performance.loadTime < 3000 ? "pass" : "warning"}
                    />
                    <MetricRow 
                      label="Page Size" 
                      value={`${(result.performance.pageSize / 1024).toFixed(2)} KB`}
                      status={result.performance.pageSize < 500000 ? "pass" : "warning"}
                    />
                    <MetricRow 
                      label="HTTP Requests" 
                      value={result.performance.requests.toString()}
                      status={result.performance.requests < 50 ? "pass" : "warning"}
                    />
                    <MetricRow 
                      label="First Contentful Paint" 
                      value={`${result.performance.firstContentfulPaint}ms`}
                      status={result.performance.firstContentfulPaint < 1800 ? "pass" : "warning"}
                    />
                    <MetricRow 
                      label="Time to Interactive" 
                      value={`${result.performance.timeToInteractive}ms`}
                      status={result.performance.timeToInteractive < 3800 ? "pass" : "warning"}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Technical Tab */}
              <TabsContent value="technical" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Technical SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CheckItem label="HTTPS Enabled" status={result.technical.hasHttps} />
                    <CheckItem label="Robots.txt Present" status={result.technical.hasRobotsTxt} />
                    <CheckItem label="Sitemap.xml Present" status={result.technical.hasSitemap} />
                    <CheckItem label="Canonical URL" status={result.technical.hasCanonical} />
                    <CheckItem label="Viewport Meta Tag" status={result.technical.hasViewport} />
                    <CheckItem label="Charset Declaration" status={result.technical.hasCharset} />
                    <CheckItem label="Lang Attribute" status={result.technical.hasLangAttribute} />
                    <CheckItem label="Favicon" status={result.technical.hasFavicon} />
                    <CheckItem label="Service Worker" status={result.technical.hasServiceWorker} />
                    <CheckItem label="AMP Enabled" status={result.technical.isAMPEnabled} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Content Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Title Tag</span>
                        <Badge variant={result.content.title.length >= 50 && result.content.title.length <= 60 ? "default" : "secondary"}>
                          {result.content.title.length} chars
                        </Badge>
                      </div>
                      {result.content.title.text && (
                        <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                          {result.content.title.text}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Meta Description</span>
                        <Badge variant={result.content.metaDescription.length >= 150 && result.content.metaDescription.length <= 160 ? "default" : "secondary"}>
                          {result.content.metaDescription.length} chars
                        </Badge>
                      </div>
                      {result.content.metaDescription.text && (
                        <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                          {result.content.metaDescription.text}
                        </p>
                      )}
                    </div>
                    <MetricRow label="H1 Tags" value={result.content.h1Tags.toString()} status={result.content.h1Tags === 1 ? "pass" : "warning"} />
                    <MetricRow label="H2 Tags" value={result.content.h2Tags.toString()} status={result.content.h2Tags > 0 ? "pass" : "warning"} />
                    <MetricRow label="Total Words" value={result.content.totalWords.toString()} status={result.content.totalWords > 300 ? "pass" : "warning"} />
                    <MetricRow label="Readability Score" value={`${result.content.readabilityScore}/100`} status={result.content.readabilityScore > 60 ? "pass" : "warning"} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Images Tab */}
              <TabsContent value="images" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-primary" />
                      Image Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <MetricRow label="Total Images" value={result.images.total.toString()} />
                    <MetricRow label="With Alt Text" value={result.images.withAlt.toString()} status={result.images.withAlt === result.images.total ? "pass" : "warning"} />
                    <MetricRow label="Without Alt Text" value={result.images.withoutAlt.toString()} status={result.images.withoutAlt === 0 ? "pass" : "fail"} />
                    <MetricRow label="Oversized Images" value={result.images.oversized.toString()} status={result.images.oversized === 0 ? "pass" : "warning"} />
                    <MetricRow label="Total Image Size" value={`${(result.images.totalSize / 1024).toFixed(2)} KB`} />
                    {result.images.optimizationSuggestions.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-2">Optimization Suggestions:</p>
                        <ul className="text-sm space-y-1">
                          {result.images.optimizationSuggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-muted-foreground">• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Links Tab */}
              <TabsContent value="links" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-primary" />
                      Link Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <MetricRow label="Internal Links" value={result.links.internal.toString()} />
                    <MetricRow label="External Links" value={result.links.external.toString()} />
                    <MetricRow label="Broken Links" value={result.links.broken.toString()} status={result.links.broken === 0 ? "pass" : "fail"} />
                    <MetricRow label="Nofollow Links" value={result.links.nofollow.toString()} />
                    <MetricRow label="Dofollow Links" value={result.links.dofollow.toString()} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Mobile Tab */}
              <TabsContent value="mobile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      Mobile Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CheckItem label="Mobile Friendly" status={result.mobile.isMobileFriendly} />
                    <CheckItem label="Responsive Design" status={result.mobile.hasResponsiveDesign} />
                    <CheckItem label="Flexible Images" status={result.mobile.usesFlexibleImages} />
                    <CheckItem label="Readable Font Size" status={result.mobile.fontSizeReadable} />
                    <CheckItem label="Touch Elements Spaced" status={result.mobile.touchElementsSpaced} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Social Tab */}
              <TabsContent value="social" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Social Media Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CheckItem label="Open Graph Tags" status={result.social.hasOgTags} />
                    <CheckItem label="Twitter Card" status={result.social.hasTwitterCard} />
                    {result.social.ogTitle && (
                      <div>
                        <p className="font-medium text-sm mb-1">OG Title:</p>
                        <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{result.social.ogTitle}</p>
                      </div>
                    )}
                    {result.social.ogDescription && (
                      <div>
                        <p className="font-medium text-sm mb-1">OG Description:</p>
                        <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{result.social.ogDescription}</p>
                      </div>
                    )}
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
                  <CardContent className="space-y-3">
                    <CheckItem label="SSL/HTTPS" status={result.security.hasSSL} />
                    <CheckItem label="HSTS Header" status={result.security.hasSTS} />
                    <CheckItem label="Content Security Policy" status={result.security.hasCSP} />
                    <CheckItem label="X-Frame-Options" status={result.security.hasXFrameOptions} />
                    {result.security.vulnerabilities.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-2 text-destructive">Security Issues:</p>
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
            </Tabs>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Prioritized action items to improve your SEO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      {rec.priority === "high" && <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />}
                      {rec.priority === "medium" && <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
                      {rec.priority === "low" && <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "secondary" : "default"}>
                            {rec.priority.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{rec.category}</span>
                        </div>
                        <p className="text-sm">{rec.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MetricRow({ label, value, status }: { label: string; value: string; status?: "pass" | "warning" | "fail" }) {
  return (
    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm">{value}</span>
        {status === "pass" && <CheckCircle className="h-4 w-4 text-green-500" />}
        {status === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
        {status === "fail" && <XCircle className="h-4 w-4 text-red-500" />}
      </div>
    </div>
  );
}

function CheckItem({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
      <span className="text-sm font-medium">{label}</span>
      {status ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500" />
      )}
    </div>
  );
}
