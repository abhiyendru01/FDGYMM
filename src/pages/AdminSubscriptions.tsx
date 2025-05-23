
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Calendar, Search } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
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

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: { email_address: string }[];
  image_url?: string;
};

const AdminSubscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<(Subscription & { user?: User })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Check admin authentication
  const isAdminAuthenticated = localStorage.getItem('fdgym_admin_authenticated') === 'true';
  if (!isAdminAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      
      // Get users data
      const { data: userData, error: userError } = await supabase.functions.invoke('get-users');
      if (userError) {
        throw userError;
      }
      
      const users = userData?.users || [];
      
      // Get subscriptions data
      const { data: subscriptionsData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*');
      
      if (subscriptionError) {
        throw subscriptionError;
      }
      
      // Combine subscription data with user data
      const subscriptionsWithUsers = subscriptionsData.map((subscription: Subscription) => {
        const user = users.find((user: User) => user.id === subscription.user_id);
        return {
          ...subscription,
          user
        };
      });
      
      // Sort by created_at date, newest first
      subscriptionsWithUsers.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setSubscriptions(subscriptionsWithUsers);
      
      // Store subscriptions in localStorage for other admin pages
      localStorage.setItem('subscriptions', JSON.stringify(subscriptionsData));
      
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load subscriptions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter subscriptions based on search query
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const planName = subscription.plan_name.toLowerCase();
    const userName = subscription.user ? 
      `${subscription.user.first_name} ${subscription.user.last_name}`.toLowerCase() : '';
    const userEmail = subscription.user?.email_addresses?.[0]?.email_address?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    
    return planName.includes(query) || userName.includes(query) || userEmail.includes(query);
  });

  return (
    <div className="flex h-screen w-full bg-black">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-orbitron font-bold mb-6">Subscriptions</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="glassmorphism border-fdgym-dark-gray p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 text-green-500 rounded-full mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {subscriptions.filter(sub => sub.status === 'active').length}
                  </p>
                  <p className="text-sm text-fdgym-light-gray">Active Subscriptions</p>
                </div>
              </div>
            </Card>
            
            <Card className="glassmorphism border-fdgym-dark-gray p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {subscriptions.filter(sub => {
                      if (!sub.end_date) return false;
                      const endDate = new Date(sub.end_date);
                      const now = new Date();
                      const diff = endDate.getTime() - now.getTime();
                      const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
                      return daysRemaining <= 7 && daysRemaining > 0;
                    }).length}
                  </p>
                  <p className="text-sm text-fdgym-light-gray">Expiring This Week</p>
                </div>
              </div>
            </Card>
            
            <Card className="glassmorphism border-fdgym-dark-gray p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-fdgym-red/10 text-fdgym-red rounded-full mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    ₹{subscriptions
                      .filter(sub => sub.status === 'active')
                      .reduce((total, sub) => total + sub.amount, 0)
                    }
                  </p>
                  <p className="text-sm text-fdgym-light-gray">Total Revenue</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="glassmorphism border-fdgym-dark-gray p-6 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">All Subscriptions</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-fdgym-light-gray" />
                <Input 
                  placeholder="Search subscriptions..." 
                  className="pl-8 bg-fdgym-dark-gray border-fdgym-dark-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 text-fdgym-red animate-spin" />
                <span className="ml-2 text-fdgym-light-gray">Loading subscriptions...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-fdgym-dark-gray hover:bg-transparent">
                      <TableHead className="text-fdgym-light-gray">Member</TableHead>
                      <TableHead className="text-fdgym-light-gray">Plan</TableHead>
                      <TableHead className="text-fdgym-light-gray">Amount</TableHead>
                      <TableHead className="text-fdgym-light-gray">Start Date</TableHead>
                      <TableHead className="text-fdgym-light-gray">End Date</TableHead>
                      <TableHead className="text-fdgym-light-gray">Status</TableHead>
                      <TableHead className="text-fdgym-light-gray">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-fdgym-light-gray">
                          No subscriptions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSubscriptions.map((subscription) => (
                        <TableRow key={subscription.id} className="border-fdgym-dark-gray/50 hover:bg-fdgym-dark-gray/20">
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={subscription.user?.image_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"} 
                                  alt="User" 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <div>
                                <span>
                                  {subscription.user ? 
                                    `${subscription.user.first_name} ${subscription.user.last_name}` : 
                                    "Unknown User"}
                                </span>
                                <p className="text-xs text-fdgym-light-gray">
                                  {subscription.user?.email_addresses?.[0]?.email_address || "No email"}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{subscription.plan_name}</TableCell>
                          <TableCell>₹{subscription.amount}</TableCell>
                          <TableCell className="text-fdgym-light-gray">
                            {subscription.start_date ? format(new Date(subscription.start_date), 'PPP') : "N/A"}
                          </TableCell>
                          <TableCell className="text-fdgym-light-gray">
                            {subscription.end_date ? format(new Date(subscription.end_date), 'PPP') : "N/A"}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              subscription.status === 'active' 
                                ? 'bg-green-500/20 text-green-500' 
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {subscription.status === 'active' ? 'Active' : 'Pending'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              className="text-fdgym-red hover:text-fdgym-neon-red"
                              onClick={() => navigate(`/admin/users/${subscription.user_id}`)}
                            >
                              View User
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
