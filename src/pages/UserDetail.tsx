import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/layouts/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, User, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

// Type definitions
type UserData = {
  id: string;
  first_name?: string;
  last_name?: string;
  email_addresses: {email_address: string}[];
  phone_numbers?: {phone_number: string}[];
  image_url?: string;
  created_at: string;
  updated_at: string;
  metadata?: {
    height?: number;
    weight?: number;
    age?: number;
  }
};

type Subscription = {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  status: string;
  start_date: string;
  end_date: string;
};

const UserDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: currentUser } = useUser();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      // Check local storage for admin authentication
      const isAdminAuthenticated = localStorage.getItem('fdgym_admin_authenticated') === 'true';
      
      if (isAdminAuthenticated) {
        setIsAdmin(true);
      } else {
        // If not admin, redirect to admin login page
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate('/admin/login');
      }
    };
    
    checkAdminStatus();
  }, [navigate, toast]);

  // Fetch user data from Clerk
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAdmin || !id) return;
      
      setIsLoading(true);
      try {
        console.log('Fetching user details for ID:', id);
        // Fetch user from Clerk API
        const { data, error } = await supabase.functions.invoke('get-user-detail', {
          body: { userId: id }
        });
        
        if (error) {
          console.error('Error from Supabase function:', error);
          throw error;
        }
        
        console.log('User detail data received:', data);
        
        if (!data?.user) {
          console.error('User not found');
          throw new Error("User not found");
        }
        
        setUserData(data.user);
        
        // Fetch subscription data if any
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', id)
          .eq('status', 'active')
          .single();
        
        if (!subscriptionError && subscriptionData) {
          setSubscription(subscriptionData);
        }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load user data. Please check console for details.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [id, isAdmin, toast]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Skeleton className="h-8 w-32" />
            </div>
            <Card className="glassmorphism border-fdgym-dark-gray">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-60" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex space-x-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!isAdmin || !userData) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="glassmorphism p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
              <p className="mb-6">The requested user data could not be found or you don't have permission to view it.</p>
              <Button onClick={() => navigate('/admin')} className="bg-fdgym-red hover:bg-fdgym-neon-red">
                Return to Admin Panel
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 text-fdgym-light-gray hover:text-white"
            onClick={() => navigate('/admin')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Admin Panel
          </Button>
          
          <Card className="glassmorphism border-fdgym-dark-gray mb-6">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userData.image_url} alt={userData.first_name} />
                    <AvatarFallback className="bg-fdgym-dark-gray text-lg">
                      {userData.first_name?.charAt(0) || (userData.email_addresses && userData.email_addresses[0]?.email_address.charAt(0)) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <CardTitle className="text-2xl font-orbitron">
                      {userData.first_name || ''} {userData.last_name || 'No Name Provided'}
                    </CardTitle>
                    <CardDescription className="text-fdgym-light-gray">
                      User ID: {userData.id}
                    </CardDescription>
                  </div>
                </div>
                
                {subscription && (
                  <div className="mt-4 md:mt-0">
                    <div className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium bg-green-500/10 text-green-500">
                      {subscription.plan_name}
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="bg-fdgym-dark-gray mb-6">
                  <TabsTrigger value="details" className="data-[state=active]:bg-fdgym-red">User Details</TabsTrigger>
                  <TabsTrigger value="subscription" className="data-[state=active]:bg-fdgym-red">Subscription</TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:bg-fdgym-red">Activity Log</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-fdgym-red mr-2" />
                        <div>
                          <div className="text-fdgym-light-gray text-sm">Email</div>
                          <div className="font-medium">
                            {userData.email_addresses && userData.email_addresses[0]?.email_address || 'No email provided'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-fdgym-red mr-2" />
                        <div>
                          <div className="text-fdgym-light-gray text-sm">Phone</div>
                          <div className="font-medium">
                            {userData.phone_numbers?.[0]?.phone_number || 'Not provided'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-fdgym-red mr-2" />
                        <div>
                          <div className="text-fdgym-light-gray text-sm">Joined On</div>
                          <div className="font-medium">
                            {userData.created_at && format(new Date(userData.created_at), 'PPP')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {userData.metadata?.age && (
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-fdgym-red mr-2" />
                          <div>
                            <div className="text-fdgym-light-gray text-sm">Age</div>
                            <div className="font-medium">{userData.metadata.age} years</div>
                          </div>
                        </div>
                      )}
                      
                      {userData.metadata?.height && (
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-fdgym-red mr-2" />
                          <div>
                            <div className="text-fdgym-light-gray text-sm">Height</div>
                            <div className="font-medium">{userData.metadata.height} cm</div>
                          </div>
                        </div>
                      )}
                      
                      {userData.metadata?.weight && (
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-fdgym-red mr-2" />
                          <div>
                            <div className="text-fdgym-light-gray text-sm">Weight</div>
                            <div className="font-medium">{userData.metadata.weight} kg</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="subscription" className="space-y-6">
                  {subscription ? (
                    <div className="glassmorphism rounded-lg p-6 border-fdgym-dark-gray">
                      <h3 className="text-xl font-orbitron font-bold mb-4">{subscription.plan_name}</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-fdgym-light-gray text-sm">Amount</div>
                            <div className="font-medium text-lg">₹{subscription.amount}</div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-fdgym-light-gray text-sm">Status</div>
                            <div className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500">
                              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-fdgym-light-gray text-sm">Start Date</div>
                            <div className="font-medium">
                              {format(new Date(subscription.start_date), 'PPP')}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-fdgym-light-gray text-sm">Expiry Date</div>
                            <div className="font-medium">
                              {format(new Date(subscription.end_date), 'PPP')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <div className="flex justify-end">
                            <Button variant="outline" className="border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Manage Subscription
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-fdgym-light-gray">
                      <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No Active Subscription</h3>
                      <p>This user doesn't have an active subscription plan.</p>
                      <Button 
                        className="mt-4 bg-fdgym-red hover:bg-fdgym-neon-red"
                        onClick={() => navigate('/subscriptions')}
                      >
                        View Subscription Plans
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-6">
                  <div className="text-center py-8 text-fdgym-light-gray">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Activity Log Coming Soon</h3>
                    <p>User activity tracking is under development.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDetail;
