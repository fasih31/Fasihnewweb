import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { GoogleAnalytics } from "@/components/google-analytics";
import Home from "@/pages/home";
import AdminDashboard from "@/pages/admin";
import BlogArticle from "@/pages/blog-article";
import ProjectDetail from "@/pages/project-detail";
import SolutionDetail from "@/pages/solution-detail";
import Career from "@/pages/career";
import Tools from "@/pages/tools";
import IslamicFinTech from "@/pages/islamic-fintech";

import NotFound from "@/pages/not-found";
import { HelmetProvider } from "react-helmet-async";
import FinTechDomain from "@/pages/domains/fintech";
import EdTechDomain from "@/pages/domains/edtech";
import EcommerceDomain from "@/pages/domains/ecommerce";
import TelecomDomain from "@/pages/domains/telecom";
import AIMLDomain from "@/pages/domains/ai-ml";
import CryptoWeb3Domain from "@/pages/domains/crypto-web3";
import BlogPage from "@/pages/blog";
import IDEPage from "@/pages/ide";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/solutions/:id" component={SolutionDetail} />
      <Route path="/blog/:slug" component={BlogArticle} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/career" component={Career} />
      <Route path="/tools" component={Tools} />
      
      <Route path="/islamic-fintech" component={IslamicFinTech} />
      <Route path="/domains/fintech" component={FinTechDomain} />
      <Route path="/domains/edtech" component={EdTechDomain} />
      <Route path="/domains/ecommerce" component={EcommerceDomain} />
      <Route path="/domains/telecom" component={TelecomDomain} />
      <Route path="/domains/ai-ml" component={AIMLDomain} />
      <Route path="/domains/crypto-web3" component={CryptoWeb3Domain} />
      <Route path="/ide" component={IDEPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <GoogleAnalytics />
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;