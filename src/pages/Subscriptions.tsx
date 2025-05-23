
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Shield, Dumbbell, Award } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import SubscriptionPlan from '@/components/SubscriptionPlan';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Subscription {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  duration: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  payment_id: string | null;
  created_at: string;
}

const Subscriptions = () => {
  const { user, isSignedIn } = useUser();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {
      checkUserSubscription();
    } else {
      setIsLoading(false);
    }
  }, [isSignedIn, user]);

  const checkUserSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking subscription:', error);
        toast({
          title: "Error",
          description: "Could not check your subscription status. Please try again later.",
          variant: "destructive",
        });
      }

      setHasSubscription(!!data);
    } catch (err) {
      console.error('Error checking subscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const basicPlan = {
    name: "Basic Plan",
    price: 1999,
    duration: "month",
    features: [
      "Full gym access",
      "Basic fitness assessment",
      "Access to group classes",
      "Locker room access",
      "Online workout resources"
    ]
  };

  const premiumPlan = {
    name: "Premium Plan",
    price: 4999,
    duration: "3 months",
    features: [
      "Full gym access 24/7",
      "Advanced fitness assessment",
      "Personal trainer (2 sessions)",
      "All group classes",
      "Nutrition consultation",
      "Towel service",
      "Protein shake per visit"
    ]
  };

  const elitePlan = {
    name: "Elite Plan",
    price: 9999,
    duration: "6 months",
    features: [
      "Unlimited gym access 24/7",
      "Complete fitness profile",
      "Personal trainer (8 sessions)",
      "All group classes with priority",
      "Custom nutrition plan",
      "Massage session monthly",
      "Full amenities access",
      "Membership freeze option"
    ]
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <p className="text-fdgym-light-gray">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {hasSubscription ? (
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">You Already Have an Active Subscription</h1>
              <p className="text-fdgym-light-gray max-w-2xl mx-auto mb-8">
                You're already subscribed to our services. Go to your profile to view your subscription details.
              </p>
              <Button 
                className="bg-fdgym-red hover:bg-fdgym-neon-red text-white"
                onClick={() => navigate('/profile')}
              >
                View My Profile
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Choose Your Membership Plan</h1>
                <p className="text-fdgym-light-gray max-w-2xl mx-auto">
                  Select the plan that best fits your fitness goals and budget. All plans include access to our state-of-the-art equipment and facilities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <SubscriptionPlan 
                  name={basicPlan.name}
                  price={basicPlan.price}
                  duration={basicPlan.duration}
                  features={basicPlan.features}
                />
                <SubscriptionPlan 
                  name={premiumPlan.name}
                  price={premiumPlan.price}
                  duration={premiumPlan.duration}
                  features={premiumPlan.features}
                  popular={true}
                />
                <SubscriptionPlan 
                  name={elitePlan.name}
                  price={elitePlan.price}
                  duration={elitePlan.duration}
                  features={elitePlan.features}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Subscriptions;
