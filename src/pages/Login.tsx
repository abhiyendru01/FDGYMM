
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import MainLayout from '@/layouts/MainLayout';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInComplete = () => {
    setIsLoading(true);
    toast({
      title: "Login successful",
      description: "You have been successfully logged in.",
      variant: "default",
    });
    // Short timeout to show the loading state briefly for better UX
    setTimeout(() => {
      navigate('/profile');
      setIsLoading(false);
    }, 500);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-orbitron font-bold">Welcome Back</h1>
            <p className="text-fdgym-light-gray mt-2">Login to access your FD GYM account</p>
          </div>
          
          {isLoading ? (
            <div className="glassmorphism rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="h-8 w-8 text-fdgym-red animate-spin" />
              <p className="text-white mt-4">Logging you in...</p>
            </div>
          ) : (
            <div className="glassmorphism rounded-xl p-6 sm:p-8">
              <SignIn 
                routing="path" 
                path="/login" 
                signUpUrl="/register"
                afterSignInUrl="/profile" 
                redirectUrl="/profile"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-fdgym-red hover:bg-fdgym-neon-red text-white',
                    formButtonReset: 'text-fdgym-red hover:text-fdgym-neon-red',
                    card: 'bg-transparent shadow-none',
                    headerTitle: 'text-white font-orbitron',
                    headerSubtitle: 'text-fdgym-light-gray',
                    socialButtonsBlockButton: 'border-fdgym-dark-gray text-white hover:bg-fdgym-dark-gray',
                    socialButtonsBlockButtonText: 'text-white',
                    formFieldLabel: 'text-fdgym-light-gray',
                    formFieldInput: 'bg-fdgym-dark-gray border-fdgym-dark-gray text-white',
                    footerActionLink: 'text-fdgym-red hover:text-fdgym-neon-red',
                    identityPreviewText: 'text-white',
                    identityPreviewEditButton: 'text-fdgym-red hover:text-fdgym-neon-red',
                  }
                }}
              />
            </div>
          )}
          
          <div className="text-center mt-6">
            <p className="text-fdgym-light-gray">
              Don't have an account?{' '}
              <Link to="/register" className="text-fdgym-red hover:text-fdgym-neon-red">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
