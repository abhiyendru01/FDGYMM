
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AdminSidebar from "./components/AdminSidebar";
import { Button } from "./components/ui/button";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/AdminUsers";
import AdminWorkouts from "./pages/AdminWorkouts";
import AdminSubscriptions from "./pages/AdminSubscriptions";
import AdminAttendance from "./pages/AdminAttendance";
import AdminSettings from "./pages/AdminSettings";
import BMI from "./pages/BMI";
import Workouts from "./pages/Workouts";
import WorkoutDetail from "./pages/WorkoutDetail";
import PartnerGyms from "./pages/PartnerGyms";
import Subscriptions from "./pages/Subscriptions";
import UserDetail from "./pages/UserDetail";
import AuthGuard from "./components/AuthGuard";
import AboutUs from "./pages/AboutUs";

// Clerk publishable key
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YWxlcnQtZG9nLTI0LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (replacing cacheTime)
    },
  },
});

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/about-us" element={<AboutUs />} />
            
            {/* Protected routes */}
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/bmi" element={<AuthGuard><BMI /></AuthGuard>} />
            <Route path="/workouts" element={<AuthGuard><Workouts /></AuthGuard>} />
            <Route path="/workouts/:id" element={<AuthGuard><WorkoutDetail /></AuthGuard>} />
            <Route path="/partner-gyms" element={<AuthGuard><PartnerGyms /></AuthGuard>} />
            <Route path="/subscriptions" element={<AuthGuard><Subscriptions /></AuthGuard>} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:id" element={<UserDetail />} />
            <Route path="/admin/workouts" element={<AdminWorkouts />} />
            <Route path="/admin/attendance" element={<AdminAttendance />} />
            <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
