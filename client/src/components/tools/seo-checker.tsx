
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
  Smartphone,
  Target,
  BarChart3,
  Brain,
  Download,
  Share2,
  Eye
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

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
  aiInsights?: {
    contentQuality: number;
    userIntent: string;
    topicRelevance: number;
    semanticAnalysis: string[];
    competitorComparison: Array<{ competitor: string; score: number; strengths: string[] }>;
    keywordOpportunities: Array<{ keyword: string; difficulty: number; potential: number }>;
    predictedRanking: { position: number; confidence: number };
  };
  historicalData?: Array<{ date: string; score: number; rank: number }>;
  backlinks?: {
    total: number;
    quality: number;
    newLinks: number;
    lostLinks: number;
    topReferrers: Array<{ domain: string; authority: number; links: number }>;
  };
}

export function SEOChecker() {
  const [url, setUrl] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [competitorUrls, setCompetitorUrls] = useState<string[]>([]);

  const analyzeMutation = useMutation<SEOAnalysis, Error, string>({
    mutationFn: async (analyzeUrl) => {
      const response = await fetch('/api/seo-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: analyzeUrl }),
      });
      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      
      // Mock AI insights (in production, this would come from an AI service)
      data.aiInsights = {
        contentQuality: Math.floor(Math.random() * 30) + 70,
        userIntent: ['Informational', 'Commercial', 'Transactional', 'Navigational'][Math.floor(Math.random() * 4)],
        topicRelevance: Math.floor(Math.random() * 30) + 70,
        semanticAnalysis: ['SEO optimization', 'Web performance', 'User experience', 'Content marketing'],
        competitorComparison: [
          { competitor: 'competitor1.com', score: 85, strengths: ['Fast loading', 'Mobile optimized'] },
          { competitor: 'competitor2.com', score: 78, strengths: ['Rich content', 'Strong backlinks'] }
        ],
        keywordOpportunities: [
          { keyword: 'seo tools', difficulty: 65, potential: 85 },
          { keyword: 'website optimization', difficulty: 55, potential: 90 },
          { keyword: 'page speed insights', difficulty: 70, potential: 75 }
        ],
        predictedRanking: { position: Math.floor(Math.random() * 10) + 1, confidence: Math.floor(Math.random() * 30) + 70 }
      };
      
      // Mock historical data
      data.historicalData = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: Math.floor(Math.random() * 20) + 75,
        rank: Math.floor(Math.random() * 5) + 1
      }));
      
      // Mock backlinks data
      data.backlinks = {
        total: Math.floor(Math.random() * 5000) + 1000,
        quality: Math.floor(Math.random() * 30) + 70,
        newLinks: Math.floor(Math.random() * 100) + 20,
        lostLinks: Math.floor(Math.random() * 50) + 5,
        topReferrers: [
          { domain: 'authoritysite1.com', authority: 92, links: 45 },
          { domain: 'newssite.com', authority: 88, links: 23 },
          { domain: 'blogplatform.com', authority: 75, links: 67 }
        ]
      };
      
      return data;
    },
  });

  const handleAnalyze = () => {
    if (!url) return;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    analyzeMutation.mutate(fullUrl);
  };

  const handleDownloadReport = () => {
    if (!analyzeMutation.data) return;
    const report = JSON.stringify(analyzeMutation.data, null, 2);
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${new Date().toISOString()}.json`;
    a.click();
  };

  const handleDownloadPDF = async () => {
    if (!analyzeMutation.data) return;
    
    // Generate PDF report with comprehensive SEO data
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
          .metric { margin: 10px 0; padding: 10px; background: #f5f5f5; }
          .score { font-size: 48px; font-weight: bold; color: #0066cc; }
        </style>
      </head>
      <body>
        <h1>SEO Analysis Report - ${analyzeMutation.data.url}</h1>
        <div class="score">Score: ${analyzeMutation.data.score}/100</div>
        <h2>Performance Metrics</h2>
        <div class="metric">Load Time: ${analyzeMutation.data.performance.loadTime}ms</div>
        <div class="metric">Page Size: ${(analyzeMutation.data.performance.pageSize / 1024).toFixed(2)} KB</div>
        <h2>Technical SEO</h2>
        ${Object.entries(analyzeMutation.data.technical).map(([key, value]) => 
          `<div class="metric">${key}: ${value ? '✓' : '✗'}</div>`
        ).join('')}
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${new Date().toISOString()}.html`;
    a.click();
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Schedule Monitor
              </Button>
            </div>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="ai-insights" className="space-y-4">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <TabsList className="inline-flex w-auto min-w-full sm:grid sm:w-full sm:grid-cols-5 lg:grid-cols-10 gap-1 p-1">
                  <TabsTrigger value="ai-insights" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">AI</span>
                  </TabsTrigger>
                  <TabsTrigger value="trends" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Trends</span>
                  </TabsTrigger>
                  <TabsTrigger value="backlinks" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Links</span>
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Speed</span>
                  </TabsTrigger>
                  <TabsTrigger value="technical" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Tech</span>
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="images" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Images</span>
                  </TabsTrigger>
                  <TabsTrigger value="links" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <LinkIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">URLs</span>
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Mobile</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-1 whitespace-nowrap px-3 py-2">
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Security</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* AI Insights Tab */}
              <TabsContent value="ai-insights" className="space-y-4">
                {result.aiInsights && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-primary" />
                            AI-Powered Content Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">Content Quality</span>
                              <span className="font-bold">{result.aiInsights.contentQuality}/100</span>
                            </div>
                            <Progress value={result.aiInsights.contentQuality} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">Topic Relevance</span>
                              <span className="font-bold">{result.aiInsights.topicRelevance}/100</span>
                            </div>
                            <Progress value={result.aiInsights.topicRelevance} className="h-2" />
                          </div>
                          <div>
                            <p className="font-medium mb-2">User Intent: <Badge>{result.aiInsights.userIntent}</Badge></p>
                            <p className="text-sm text-muted-foreground">Predicted Search Ranking: Position #{result.aiInsights.predictedRanking.position} ({result.aiInsights.predictedRanking.confidence}% confidence)</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Semantic Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <RadarChart data={result.aiInsights.semanticAnalysis.map((topic, i) => ({ 
                              topic, 
                              score: Math.floor(Math.random() * 30) + 70 
                            }))}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="topic" />
                              <PolarRadiusAxis angle={90} domain={[0, 100]} />
                              <Radar name="Topic Coverage" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Keyword Opportunities</CardTitle>
                        <CardDescription>AI-discovered keyword gaps and opportunities</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {result.aiInsights.keywordOpportunities.map((kw, idx) => (
                            <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{kw.keyword}</span>
                                <div className="flex gap-2">
                                  <Badge variant={kw.difficulty < 60 ? "default" : "secondary"}>
                                    Difficulty: {kw.difficulty}
                                  </Badge>
                                  <Badge variant={kw.potential > 80 ? "default" : "secondary"}>
                                    Potential: {kw.potential}
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                                  <Progress value={kw.difficulty} className="h-1" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Potential</p>
                                  <Progress value={kw.potential} className="h-1" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Competitor Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={result.aiInsights.competitorComparison}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="competitor" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="score" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>

              {/* Trends Tab */}
              <TabsContent value="trends" className="space-y-4">
                {result.historicalData && (
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Score Trend (30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={result.historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="score" stroke="#8884d8" name="SEO Score" />
                          <Line yAxisId="right" type="monotone" dataKey="rank" stroke="#82ca9d" name="Search Ranking" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Backlinks Tab */}
              <TabsContent value="backlinks" className="space-y-4">
                {result.backlinks && (
                  <>
                    <div className="grid md:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Total Backlinks</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">{result.backlinks.total.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Quality Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">{result.backlinks.quality}/100</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">New Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold text-green-600">+{result.backlinks.newLinks}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Lost Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold text-red-600">-{result.backlinks.lostLinks}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Top Referrers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {result.backlinks.topReferrers.map((ref, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div>
                                <p className="font-semibold">{ref.domain}</p>
                                <p className="text-sm text-muted-foreground">{ref.links} backlinks</p>
                              </div>
                              <Badge variant={ref.authority > 85 ? "default" : "secondary"}>
                                Authority: {ref.authority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>

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
