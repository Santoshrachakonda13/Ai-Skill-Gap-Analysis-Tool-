import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import Students from "@/pages/students";
import Assessments from "@/pages/assessments";
import Curriculum from "@/pages/curriculum";
import ProgressTracking from "@/pages/progress";
import Interventions from "@/pages/interventions";
import SettingsPage from "@/pages/settings";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/sidebar";
import { useAuth } from "@/hooks/useAuth";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show login/signup pages if not authenticated
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route component={LoginPage} />
      </Switch>
    );
  }

  // Show main application if authenticated
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/students" component={Students} />
          <Route path="/assessments" component={Assessments} />
          <Route path="/curriculum" component={Curriculum} />
          <Route path="/progress" component={ProgressTracking} />
          <Route path="/interventions" component={Interventions} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
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
