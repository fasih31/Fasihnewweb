
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Zap, TrendingUp, AlertCircle } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const measurePerformance = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        const performanceMetrics: PerformanceMetrics = {
          loadTime: Math.round(loadTime),
          domContentLoaded: Math.round(domContentLoaded),
          firstContentfulPaint: 0,
          largestContentfulPaint: 0,
          cumulativeLayoutShift: 0,
          firstInputDelay: 0,
        };

        // Get Web Vitals
        if ('PerformanceObserver' in window) {
          try {
            const paintObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                  performanceMetrics.firstContentfulPaint = Math.round(entry.startTime);
                }
              }
            });
            paintObserver.observe({ entryTypes: ['paint'] });
          } catch (e) {
            console.warn('Paint observer not supported');
          }
        }

        setMetrics(performanceMetrics);

        // Calculate performance score
        let calculatedScore = 100;
        if (loadTime > 3000) calculatedScore -= 20;
        if (loadTime > 5000) calculatedScore -= 30;
        if (domContentLoaded > 2000) calculatedScore -= 15;
        
        setScore(Math.max(0, calculatedScore));
      }
    };

    // Measure after page fully loads
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  if (!metrics) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 50) return 'secondary';
    return 'destructive';
  };

  return (
    <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Page Performance
        </CardTitle>
        <CardDescription>Real-time performance metrics for this page</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Performance Score</span>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <Badge variant={getScoreBadge(score)}>
                {score >= 90 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work'}
              </Badge>
            </div>
          </div>
          <Progress value={score} className="h-2" />
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Load Time</span>
            </div>
            <Badge variant={metrics.loadTime < 3000 ? 'default' : 'secondary'}>
              {(metrics.loadTime / 1000).toFixed(2)}s
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span>DOM Content Loaded</span>
            </div>
            <Badge variant={metrics.domContentLoaded < 2000 ? 'default' : 'secondary'}>
              {(metrics.domContentLoaded / 1000).toFixed(2)}s
            </Badge>
          </div>

          {metrics.firstContentfulPaint > 0 && (
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-green-500" />
                <span>First Contentful Paint</span>
              </div>
              <Badge variant={metrics.firstContentfulPaint < 1800 ? 'default' : 'secondary'}>
                {(metrics.firstContentfulPaint / 1000).toFixed(2)}s
              </Badge>
            </div>
          )}
        </div>

        {score < 70 && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-xs text-yellow-600 dark:text-yellow-500 font-medium mb-1">
              Performance Tips:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Optimize and compress images</li>
              <li>• Minimize JavaScript and CSS</li>
              <li>• Enable browser caching</li>
              <li>• Use a CDN for static assets</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
