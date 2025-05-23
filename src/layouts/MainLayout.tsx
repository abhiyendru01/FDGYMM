
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate page loading for smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated gradient background */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-fdgym-red/10 to-transparent opacity-60"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A10_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Blurred circles */}
        <div className="absolute top-[20%] left-[15%] w-[30vw] h-[30vw] bg-fdgym-red/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[25vw] h-[25vw] bg-fdgym-red/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s", animationDuration: "7s" }}></div>
      </div>
      
      <Navbar />
      
      <main className={`flex-grow pt-20 z-10 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
