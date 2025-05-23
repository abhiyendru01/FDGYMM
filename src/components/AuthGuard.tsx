
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoaded) {
        if (!isSignedIn) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this page",
            variant: "destructive",
          });
          
          // Redirect to login with return URL
          navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`, { replace: true });
        } else if (isSignedIn && user) {
          // Ensure we have a storage bucket for profile images
          try {
            // Check if the profiles bucket exists
            const { data, error } = await supabase.storage.getBucket('profiles');
            if (error && error.message.includes('does not exist')) {
              // Create the bucket if it doesn't exist
              await supabase.functions.invoke('create-storage-bucket');
            }
          } catch (err) {
            console.error("Error checking/creating storage bucket:", err);
          }
        }
        
        // Short timeout to prevent flash of loading state
        setTimeout(() => {
          setIsChecking(false);
        }, 300);
      }
    };
    
    checkAuth();
  }, [isSignedIn, isLoaded, navigate, location.pathname, user]);

  if (!isLoaded || isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-fdgym-red animate-spin mb-4" />
        <p className="text-fdgym-light-gray text-lg">Verifying your access...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
