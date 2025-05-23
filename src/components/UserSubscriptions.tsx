
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Check, Loader2, CalendarDays, Clock, CreditCard, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

type Subscription = {
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
};

const UserSubscriptions = () => {
  const { user } = useUser();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active');
      
      if (error) {
        throw error;
      }
      
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription information. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDaysRemaining = (endDate: string | null) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getProgressPercentage = (startDate: string | null, endDate: string | null) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    const percentage = Math.floor((elapsed / totalDuration) * 100);
    return Math.min(Math.max(percentage, 0), 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="h-8 w-8 text-fdgym-red animate-spin" />
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <Card className="glassmorphism border-fdgym-dark-gray overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-fdgym-dark-gray to-fdgym-black">
          <CardTitle className="text-xl font-orbitron">Your Subscriptions</CardTitle>
          <CardDescription className="text-fdgym-light-gray">
            Upgrade to a premium plan for exclusive benefits
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-fdgym-dark-gray/50 to-black/30 rounded-xl border border-fdgym-dark-gray">
              <div className="flex flex-col items-center text-center">
                <CreditCard className="h-16 w-16 text-fdgym-red mb-4" />
                <h3 className="text-xl font-orbitron font-bold mb-2">Enhance Your Fitness Journey</h3>
                <p className="text-fdgym-light-gray mb-6">
                  Unlock premium features including personalized workout plans, nutrition guidance, 
                  and exclusive content with a FD GYM subscription.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-fdgym-red mr-2 mt-0.5" />
                    <span>Personal trainer sessions</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-fdgym-red mr-2 mt-0.5" />
                    <span>Custom workout plans</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-fdgym-red mr-2 mt-0.5" />
                    <span>Nutrition guidance</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-fdgym-red mr-2 mt-0.5" />
                    <span>Advanced progress tracking</span>
                  </div>
                </div>
                <Button 
                  className="mt-8 bg-gradient-to-r from-fdgym-red to-fdgym-neon-red text-white font-medium hover:from-fdgym-neon-red hover:to-fdgym-red px-8 py-6"
                  onClick={() => navigate('/subscriptions')}
                >
                  View Premium Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="text-center text-fdgym-light-gray text-sm">
              <p>
                Currently on the free plan. You can still access workouts and basic features.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glassmorphism border-fdgym-dark-gray overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-fdgym-dark-gray to-fdgym-black">
        <CardTitle className="text-xl font-orbitron">Your Subscriptions</CardTitle>
        <CardDescription className="text-fdgym-light-gray">
          Your active subscriptions at FD GYM
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {subscriptions.map((subscription) => {
          const daysRemaining = getDaysRemaining(subscription.end_date);
          const progressPercentage = getProgressPercentage(subscription.start_date, subscription.end_date);
          
          return (
            <div key={subscription.id} className="mb-6 last:mb-0">
              <div className="glassmorphism border-fdgym-red rounded-xl p-6 relative overflow-hidden">
                {/* Background gradient for premium feel */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-fdgym-red/20 to-fdgym-neon-red/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-orbitron text-xl font-bold bg-gradient-to-r from-fdgym-red to-fdgym-neon-red bg-clip-text text-transparent">
                    {subscription.plan_name}
                  </h3>
                  <div className="bg-green-500/20 text-green-500 text-xs font-medium px-3 py-1.5 rounded-full">
                    Active
                  </div>
                </div>
                
                <div className="text-3xl font-bold mb-4 flex items-end">
                  ₹{subscription.amount}
                  <span className="text-fdgym-light-gray text-sm ml-2">/ {subscription.duration}</span>
                </div>
                
                <div className="space-y-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CalendarDays className="h-5 w-5 text-fdgym-red mr-2" />
                      <span className="text-fdgym-light-gray">Start Date:</span>
                    </div>
                    <span>{subscription.start_date ? format(new Date(subscription.start_date), 'PPP') : "N/A"}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CalendarDays className="h-5 w-5 text-fdgym-red mr-2" />
                      <span className="text-fdgym-light-gray">Expiry Date:</span>
                    </div>
                    <span>{subscription.end_date ? format(new Date(subscription.end_date), 'PPP') : "N/A"}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-fdgym-red mr-2" />
                      <span className="text-fdgym-light-gray">Remaining:</span>
                    </div>
                    <span className="font-medium">{daysRemaining} days</span>
                  </div>
                </div>
                
                {/* Subscription progress bar */}
                <div className="w-full bg-fdgym-dark-gray h-2 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-fdgym-red to-fdgym-neon-red rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-fdgym-light-gray text-right mb-4">
                  {progressPercentage}% used
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
                  onClick={() => navigate('/workouts')}
                >
                  Explore Workouts
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UserSubscriptions;
