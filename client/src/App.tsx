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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/solutions/:id" component={SolutionDetail} />
      <Route path="/blog/:slug" component={BlogArticle} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/career" component={Career} />
      <Route path="/tools" component={Tools} />
      <Route path="/islamic-fintech" component={IslamicFinTech} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <GoogleAnalytics />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;