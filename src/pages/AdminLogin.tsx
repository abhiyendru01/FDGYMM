
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        toast({
          title: "Login successful",
          description: "Welcome back, administrator!",
          variant: "default",
        });
        
        // Store admin status in localStorage
        localStorage.setItem('fdgym_admin_authenticated', 'true');
        
        // Redirect to admin panel
        navigate('/admin');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-fdgym-dark-gray">
        <div className="w-full max-w-md relative z-10">
          {/* Animated background elements */}
          <div className="absolute -z-10 top-1/4 -left-16 w-64 h-64 bg-fdgym-red/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -z-10 bottom-1/4 -right-16 w-64 h-64 bg-fdgym-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          
          <div className="text-center mb-10 animate-fade-in">
            <Shield className="h-16 w-16 text-fdgym-red mx-auto mb-4" />
            <h1 className="text-4xl font-orbitron font-bold neon-text">Admin Access</h1>
            <p className="text-fdgym-light-gray mt-2">Secure login for administrative control</p>
          </div>
          
          <div className="glassmorphism rounded-xl p-8 border border-fdgym-red/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-fdgym-light-gray mb-1">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-fdgym-dark-gray/50 border-fdgym-dark-gray text-white"
                  placeholder="Enter admin username"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-fdgym-light-gray mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-fdgym-dark-gray/50 border-fdgym-dark-gray text-white pr-10"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fdgym-light-gray hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full relative overflow-hidden group bg-gradient-to-r from-fdgym-red to-fdgym-neon-red text-white hover:from-fdgym-neon-red hover:to-fdgym-red transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </div>
                ) : (
                  <>
                    <span>Access Admin Panel</span>
                    <span className="absolute inset-0 flex justify-center items-center bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform translate-x-full group-hover:translate-x-0 transition-all duration-700"></span>
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-fdgym-light-gray">
              Return to{' '}
              <a href="/" className="text-fdgym-red hover:text-fdgym-neon-red transition-colors">
                Home
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLogin;
