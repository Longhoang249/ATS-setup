import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BlogAdmin from "@/pages/BlogAdmin";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import ContactTest from "@/pages/ContactTest";
import FormTest from "@/pages/FormTest";
import SEOAnalytics from "@/pages/SEOAnalytics";
import SEOManager from "@/pages/SEOManager";
import { useEffect } from "react";
import { trackPageView } from "./lib/analytics";

function Router() {
  // Track page views when location changes
  const [location] = useLocation();
  
  useEffect(() => {
    // Send pageview to Google Analytics
    trackPageView(location);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/blog" component={BlogAdmin} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact-test" component={ContactTest} />
      <Route path="/form-test" component={FormTest} />
      <Route path="/admin/seo-analytics" component={SEOAnalytics} />
      <Route path="/admin/seo" component={SEOManager} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
