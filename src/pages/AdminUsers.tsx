
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Search, Filter } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminUserModal from '@/components/AdminUserModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: { email_address: string }[];
  phone_numbers?: { phone_number: string }[];
  image_url?: string;
  created_at: string;
  subscription_status?: string;
  subscription_plan?: string;
  subscription_end_date?: string;
};

const AdminUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check admin authentication
  const isAdminAuthenticated = localStorage.getItem('fdgym_admin_authenticated') === 'true';
  if (!isAdminAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      // Fetch users from Supabase function
      const { data, error } = await supabase.functions.invoke('get-users');
      
      if (error) {
        throw error;
      }

      const usersData = data?.users || [];
      
      // Fetch subscriptions to enrich user data
      const { data: subscriptions, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('status', 'active');
        
      if (subscriptionsError) {
        console.error("Error fetching subscriptions:", subscriptionsError);
      }
      
      // Enrich user data with subscription information
      const enhancedUsers = usersData.map((user: User) => {
        const activeSubscription = subscriptions?.find(
          (sub) => sub.user_id === user.id
        );
        
        if (activeSubscription) {
          return {
            ...user,
            subscription_status: 'active',
            subscription_plan: activeSubscription.plan_name,
            subscription_end_date: activeSubscription.end_date
          };
        }
        
        return {
          ...user,
          subscription_status: 'inactive'
        };
      });
      
      setUsers(enhancedUsers);
      
      // Store users in localStorage for other admin pages
      localStorage.setItem('users', JSON.stringify(enhancedUsers));
      
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    const email = user.email_addresses?.[0]?.email_address?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  const handleUserAdded = () => {
    fetchUsers();
    setIsAddModalOpen(false);
    toast({
      title: "Success",
      description: "User added successfully",
    });
  };

  return (
    <div className="flex h-screen w-full bg-black">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-orbitron font-bold">Users</h1>
            <Button 
              onClick={handleAddUser}
              className="bg-fdgym-red hover:bg-fdgym-neon-red"
            >
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>

          <div className="glassmorphism border-fdgym-dark-gray p-6 rounded-xl mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-fdgym-light-gray" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-8 bg-fdgym-dark-gray border-fdgym-dark-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-fdgym-dark-gray flex gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 text-fdgym-red animate-spin" />
                <span className="ml-2 text-fdgym-light-gray">Loading users...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-fdgym-dark-gray hover:bg-transparent">
                      <TableHead className="text-fdgym-light-gray">Name</TableHead>
                      <TableHead className="text-fdgym-light-gray">Email</TableHead>
                      <TableHead className="text-fdgym-light-gray">Subscription</TableHead>
                      <TableHead className="text-fdgym-light-gray">Created At</TableHead>
                      <TableHead className="text-fdgym-light-gray">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-fdgym-light-gray">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-fdgym-dark-gray/50 hover:bg-fdgym-dark-gray/20">
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={user.image_url || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"} 
                                  alt={user.first_name} 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <span>
                                {user.first_name || ''} {user.last_name || ''}
                                {!user.first_name && !user.last_name && "Unnamed User"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-fdgym-light-gray">
                            {user.email_addresses?.[0]?.email_address || "N/A"}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.subscription_status === 'active' 
                                ? 'bg-green-500/20 text-green-500' 
                                : 'bg-fdgym-dark-gray text-fdgym-light-gray'
                            }`}>
                              {user.subscription_status === 'active' ? user.subscription_plan : 'None'}
                            </span>
                          </TableCell>
                          <TableCell className="text-fdgym-light-gray">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              className="text-fdgym-red hover:text-fdgym-neon-red"
                              onClick={() => navigate(`/admin/users/${user.id}`)}
                            >
                              View
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

      <AdminUserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={handleUserAdded} 
      />
    </div>
  );
};

export default AdminUsers;
