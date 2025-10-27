
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, TrendingUp } from "lucide-react";

interface SEOCheck {
  name: string;
  status: "pass" | "fail" | "warning";
  message: string;
  score: number;
}

export function SEOAnalyzer() {
  const [checks, setChecks] = useState<SEOCheck[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const performSEOAudit = () => {
      const results: SEOCheck[] = [];
      let totalScore = 0;

      // Title check
      const title = document.title;
      if (title && title.length >= 50 && title.length <= 60) {
        results.push({ name: "Title Tag", status: "pass", message: `Perfect length (${title.length} chars)`, score: 10 });
        totalScore += 10;
      } else if (title) {
        results.push({ name: "Title Tag", status: "warning", message: `Length ${title.length} chars (optimal: 50-60)`, score: 5 });
        totalScore += 5;
      } else {
        results.push({ name: "Title Tag", status: "fail", message: "Missing title tag", score: 0 });
      }

      // Meta description check
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
      if (metaDesc && metaDesc.length >= 150 && metaDesc.length <= 160) {
        results.push({ name: "Meta Description", status: "pass", message: `Perfect length (${metaDesc.length} chars)`, score: 10 });
        totalScore += 10;
      } else if (metaDesc) {
        results.push({ name: "Meta Description", status: "warning", message: `Length ${metaDesc.length} chars (optimal: 150-160)`, score: 5 });
        totalScore += 5;
      } else {
        results.push({ name: "Meta Description", status: "fail", message: "Missing meta description", score: 0 });
      }

      // Keywords check
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute("content");
      if (keywords && keywords.length > 100) {
        results.push({ name: "Keywords", status: "pass", message: "Comprehensive keywords present", score: 10 });
        totalScore += 10;
      } else {
        results.push({ name: "Keywords", status: "warning", message: "Keywords could be more comprehensive", score: 5 });
        totalScore += 5;
      }

      // H1 check
      const h1Tags = document.querySelectorAll("h1");
      if (h1Tags.length === 1) {
        results.push({ name: "H1 Tag", status: "pass", message: "Single H1 tag found", score: 10 });
        totalScore += 10;
      } else if (h1Tags.length > 1) {
        results.push({ name: "H1 Tag", status: "warning", message: `Multiple H1 tags (${h1Tags.length})`, score: 5 });
        totalScore += 5;
      } else {
        results.push({ name: "H1 Tag", status: "fail", message: "No H1 tag found", score: 0 });
      }

      // Canonical URL check
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        results.push({ name: "Canonical URL", status: "pass", message: "Canonical tag present", score: 10 });
        totalScore += 10;
      } else {
        results.push({ name: "Canonical URL", status: "warning", message: "Missing canonical tag", score: 5 });
        totalScore += 5;
      }

      // Open Graph check
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogTitle && ogDesc && ogImage) {
        results.push({ name: "Open Graph", status: "pass", message: "Complete OG tags", score: 10 });
        totalScore += 10;
      } else {
        results.push({ name: "Open Graph", status: "warning", message: "Incomplete OG tags", score: 5 });
        totalScore += 5;
      }

      // Structured Data check
      const structuredData = document.querySelector('script[type="application/ld+json"]');
      if (structuredData) {
        results.push({ name: "Structured Data", status: "pass", message: "Schema.org markup present", score: 10 });
        totalScore += 10;
      } else {
        results.push({ name: "Structured Data", status: "fail", message: "Missing schema markup", score: 0 });
      }

      // Mobile viewport check
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        results.push({ name: "Mobile Viewport", status: "pass", message: "Viewport meta tag present", score: 10 });
        totalScore += 10;
      } else {
        results.push({ name: "Mobile Viewport", status: "fail", message: "Missing viewport tag", score: 0 });
      }

      // Image alt text check
      const images = document.querySelectorAll("img");
      const imagesWithAlt = Array.from(images).filter(img => img.hasAttribute("alt"));
      const altPercentage = images.length > 0 ? (imagesWithAlt.length / images.length) * 100 : 100;
      if (altPercentage === 100) {
        results.push({ name: "Image Alt Text", status: "pass", message: "All images have alt text", score: 10 });
        totalScore += 10;
      } else if (altPercentage >= 80) {
        results.push({ name: "Image Alt Text", status: "warning", message: `${altPercentage.toFixed(0)}% images have alt text`, score: 7 });
        totalScore += 7;
      } else {
        results.push({ name: "Image Alt Text", status: "fail", message: `Only ${altPercentage.toFixed(0)}% images have alt text`, score: 3 });
        totalScore += 3;
      }

      // Language declaration check
      const htmlLang = document.documentElement.getAttribute("lang");
      if (htmlLang) {
        results.push({ name: "Language Declaration", status: "pass", message: `Language set to ${htmlLang}`, score: 10 });
        totalScore += 10;
      } else {
        results.push({ name: "Language Declaration", status: "fail", message: "Missing lang attribute", score: 0 });
      }

      setChecks(results);
      setOverallScore(Math.round((totalScore / 100) * 100));
    };

    performSEOAudit();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "fail":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              SEO Analysis
            </CardTitle>
            <CardDescription>On-page SEO optimization score and recommendations</CardDescription>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </div>
            <Badge variant={overallScore >= 90 ? "default" : overallScore >= 70 ? "secondary" : "destructive"}>
              {overallScore >= 90 ? "Excellent" : overallScore >= 70 ? "Good" : "Needs Work"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checks.map((check, index) => (
            <div key={index} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                {getStatusIcon(check.status)}
                <div>
                  <p className="font-medium text-sm">{check.name}</p>
                  <p className="text-sm text-muted-foreground">{check.message}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">{check.score}/10</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
