
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-fdgym-red/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-fdgym-red/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A10_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="text-center relative z-10 max-w-md mx-auto">
          <div className="relative mb-6">
            <div className="text-[150px] font-orbitron font-black text-fdgym-dark-gray opacity-20 leading-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              404
            </div>
            <h1 className="text-7xl font-orbitron font-bold text-white relative z-10 animate-glow">404</h1>
          </div>
          
          <div className="glassmorphism border border-fdgym-red/30 p-8 rounded-xl mb-8 animate-fade-in">
            <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Page Not Found</h2>
            <p className="text-fdgym-light-gray mb-6">
              The page you're looking for doesn't exist or has been moved. 
              Please check the URL or navigate back to home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="relative group overflow-hidden bg-fdgym-red hover:bg-fdgym-neon-red text-white transition-all duration-300"
              >
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                  <span className="absolute inset-0 flex justify-center items-center bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform translate-x-full group-hover:translate-x-0 transition-all duration-700"></span>
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white transition-all duration-300"
              >
                <Link to="#" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
