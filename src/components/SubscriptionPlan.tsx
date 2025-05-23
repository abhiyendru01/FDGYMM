
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Load Razorpay script - more reliable implementation
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      console.log("Razorpay already loaded");
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

interface SubscriptionPlanProps {
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

const SubscriptionPlan = ({ name, price, duration, features, popular = false }: SubscriptionPlanProps) => {
  const { user, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle subscription with improved Supabase integration
  const handleSubscribe = async () => {
    if (!isSignedIn || !user) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      // Create subscription in Supabase
      const { data: createSubscriptionData, error: createSubscriptionError } = await supabase.functions.invoke('create-subscription', {
        body: {
          user_id: user.id,
          plan_name: name,
          amount: price,
          duration: duration
        }
      });
      
      if (createSubscriptionError) {
        throw new Error(createSubscriptionError.message);
      }
      
      if (!createSubscriptionData || !createSubscriptionData.razorpay) {
        throw new Error("Failed to create subscription");
      }
      
      console.log("Subscription created:", createSubscriptionData);
      
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay checkout script");
      }
      
      // Initialize Razorpay with proper configuration
      const options = {
        key: createSubscriptionData.razorpay.key_id,
        amount: createSubscriptionData.razorpay.amount,
        currency: "INR",
        name: "FD GYM",
        description: `${name} Plan Subscription`,
        order_id: createSubscriptionData.razorpay.order_id,
        handler: async function (response: any) {
          console.log("Payment successful response:", response);
          
          // Verify payment through Supabase
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }
          });
          
          if (verifyError) {
            console.error("Payment verification error:", verifyError);
            toast({
              title: "Verification Failed",
              description: "There was an issue verifying your payment. Please contact support.",
              variant: "destructive",
            });
            return;
          }
          
          console.log("Payment verified:", verifyData);
          
          toast({
            title: "Payment Successful!",
            description: `You are now subscribed to the ${name} plan.`,
          });
          
          // Redirect to profile page after successful payment
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        },
        prefill: {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#E11D48",
        },
        modal: {
          ondismiss: function() {
            console.log("Razorpay checkout closed by user");
            setIsLoading(false);
          }
        }
      };

      // Create Razorpay instance and open payment modal
      const rzp = new window.Razorpay(options);
      console.log("Opening Razorpay checkout...");
      rzp.open();
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: error.message || "There was an error processing your subscription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div 
      className={cn(
        "glassmorphism rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-10px] group relative",
        popular ? "border-fdgym-neon-red" : "border-fdgym-dark-gray"
      )}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-fdgym-neon-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            POPULAR
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-orbitron text-xl font-bold mb-2 group-hover:text-fdgym-neon-red transition-colors">
          {name}
        </h3>
        
        <div className="flex items-end mb-6">
          <span className="text-3xl font-bold">₹{price}</span>
          <span className="text-fdgym-light-gray ml-2">/{duration}</span>
        </div>
        
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-fdgym-red mr-2 shrink-0 mt-0.5" />
              <span className="text-fdgym-light-gray text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          className={cn(
            "w-full",
            popular 
              ? "bg-fdgym-neon-red hover:bg-fdgym-red text-white" 
              : "bg-fdgym-dark-gray hover:bg-fdgym-red text-white"
          )}
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Subscribe Now"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
