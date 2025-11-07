import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

const AdminDashboard = lazy(() => import("@/pages/admin"));
const BlogArticle = lazy(() => import("@/pages/blog-article"));
const ProjectDetail = lazy(() => import("@/pages/project-detail"));
const SolutionDetail = lazy(() => import("@/pages/solution-detail"));
const Career = lazy(() => import("@/pages/career"));
const Tools = lazy(() => import("@/pages/tools"));
const Calculators = lazy(() => import("@/pages/calculators"));
const IslamicFinTech = lazy(() => import("@/pages/islamic-fintech"));
const SEOAnalyzerTool = lazy(() => import("@/pages/seo-analyzer-tool"));
const WebsiteScannerTool = lazy(() => import("@/pages/website-scanner-tool"));
const CodePlaygroundTool = lazy(() => import("@/pages/code-playground-tool"));
const MarketingAssets = lazy(() => import("@/pages/marketing-assets"));
const CryptoTrackerTool = lazy(() => import("@/pages/tools/crypto-tracker"));
const CurrencyConverterTool = lazy(() => import("@/pages/tools/currency-converter"));
const QRGeneratorTool = lazy(() => import("@/pages/tools/qr-generator"));
const PasswordGeneratorTool = lazy(() => import("@/pages/tools/password-generator"));
const JSONFormatterTool = lazy(() => import("@/pages/tools/json-formatter"));
const LoremIpsumTool = lazy(() => import("@/pages/tools/lorem-ipsum"));
const FinTechDomain = lazy(() => import("@/pages/domains/fintech"));
const EdTechDomain = lazy(() => import("@/pages/domains/edtech"));
const EcommerceDomain = lazy(() => import("@/pages/domains/ecommerce"));
const TelecomDomain = lazy(() => import("@/pages/domains/telecom"));
const AIMLDomain = lazy(() => import("@/pages/domains/ai-ml"));
const CryptoWeb3Domain = lazy(() => import("@/pages/domains/crypto-web3"));
const BlogPage = lazy(() => import("@/pages/blog"));
const IDEPage = lazy(() => import("@/pages/ide"));
const ExpertisePage = lazy(() => import("@/pages/expertise"));
const StocksDetail = lazy(() => import("@/pages/stocks-detail"));
const NewsDetail = lazy(() => import("@/pages/news-detail"));
const Library = lazy(() => import("@/pages/library"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-background dark:bg-gray-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/solutions/:id" component={SolutionDetail} />
        <Route path="/blog/:slug" component={BlogArticle} />
        <Route path="/project/:id" component={ProjectDetail} />
        <Route path="/career" component={Career} />
        <Route path="/tools" component={Tools} />
        <Route path="/calculators" component={Calculators} />
        <Route path="/tools/seo-analyzer" component={SEOAnalyzerTool} />
        <Route path="/tools/website-scanner" component={WebsiteScannerTool} />
        <Route path="/tools/code-playground" component={CodePlaygroundTool} />
        <Route path="/tools/crypto-tracker" component={CryptoTrackerTool} />
        <Route path="/tools/currency-converter" component={CurrencyConverterTool} />
        <Route path="/tools/qr-generator" component={QRGeneratorTool} />
        <Route path="/tools/password-generator" component={PasswordGeneratorTool} />
        <Route path="/tools/json-formatter" component={JSONFormatterTool} />
        <Route path="/tools/lorem-ipsum" component={LoremIpsumTool} />
        <Route path="/marketing-assets" component={MarketingAssets} />
        <Route path="/expertise" component={ExpertisePage} />
        <Route path="/islamic-fintech" component={IslamicFinTech} />
        <Route path="/domains/fintech" component={FinTechDomain} />
        <Route path="/domains/edtech" component={EdTechDomain} />
        <Route path="/domains/ecommerce" component={EcommerceDomain} />
        <Route path="/domains/telecom" component={TelecomDomain} />
        <Route path="/domains/ai-ml" component={AIMLDomain} />
        <Route path="/domains/crypto-web3" component={CryptoWeb3Domain} />
        <Route path="/ide" component={IDEPage} />
        <Route path="/stocks" component={StocksDetail} />
        <Route path="/news" component={NewsDetail} />
        <Route path="/library" component={Library} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark">
          <QueryClientProvider client={queryClient}>
            <GoogleAnalytics />
            <ScrollToTop />
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;