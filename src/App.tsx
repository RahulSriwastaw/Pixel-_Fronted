import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import DesignDetail from "@/pages/DesignDetail";
import Order from "@/pages/Order";
import Dashboard from "@/pages/Dashboard";
import Creators from "@/pages/Creators";
import CreatorProfile from "@/pages/CreatorProfile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/design/:id" component={DesignDetail} />
          <Route path="/order/:id" component={Order} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/creators" component={Creators} />
          <Route path="/creator/:id" component={CreatorProfile} />
          {/* Add mock auth routes if needed, or redirect */}
          <Route path="/login" component={() => <div className="p-20 text-center">Login UI Mockup</div>} />
          <Route path="/signup" component={() => <div className="p-20 text-center">Signup UI Mockup</div>} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
