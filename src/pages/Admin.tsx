
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminSidebar from '@/components/AdminSidebar';
import { Loader2 } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = () => {
      const isAdminAuthenticated = localStorage.getItem('fdgym_admin_authenticated') === 'true';
      if (!isAdminAuthenticated) {
        navigate('/admin/login');
      } else {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-users');
      if (error) throw error;
      return data?.users || [];
    },
    enabled: !isLoading,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 text-fdgym-red animate-spin" />
        <span className="ml-2 text-fdgym-light-gray">Loading admin panel...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-black">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-orbitron font-bold mb-6">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glassmorphism border-fdgym-red p-6 rounded-xl">
              <h3 className="text-sm font-medium text-fdgym-light-gray">Total Users</h3>
              <p className="text-4xl font-bold mt-2">{users.length}</p>
            </div>
            <div className="glassmorphism border-fdgym-red p-6 rounded-xl">
              <h3 className="text-sm font-medium text-fdgym-light-gray">Active Subscriptions</h3>
              <p className="text-4xl font-bold mt-2">
                {users.filter(user => user.subscription_status === 'active').length}
              </p>
            </div>
            <div className="glassmorphism border-fdgym-red p-6 rounded-xl">
              <h3 className="text-sm font-medium text-fdgym-light-gray">Total Workouts</h3>
              <p className="text-4xl font-bold mt-2">24</p>
            </div>
            <div className="glassmorphism border-fdgym-red p-6 rounded-xl">
              <h3 className="text-sm font-medium text-fdgym-light-gray">Check-ins Today</h3>
              <p className="text-4xl font-bold mt-2">19</p>
            </div>
          </div>
          
          <div className="glassmorphism border-fdgym-dark-gray p-6 rounded-xl">
            <h2 className="text-xl font-orbitron font-bold mb-4">Recent Users</h2>
            {isLoadingUsers ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 text-fdgym-red animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-fdgym-dark-gray">
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Subscription</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Created At</th>
                      <th className="text-left py-3 px-4 font-medium text-fdgym-light-gray">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 5).map((user) => (
                      <tr key={user.id} className="border-b border-fdgym-dark-gray/50 hover:bg-fdgym-dark-gray/20">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              <img src={user.image_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"} alt={user.first_name} className="w-full h-full object-cover" />
                            </div>
                            <span>{user.first_name} {user.last_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-fdgym-light-gray">
                          {user.email_addresses?.[0]?.email_address || "user@example.com"}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.subscription_status === 'active' 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-fdgym-dark-gray text-fdgym-light-gray'
                          }`}>
                            {user.subscription_status === 'active' ? 'Active' : 'None'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-fdgym-light-gray">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            className="text-fdgym-red hover:text-fdgym-neon-red"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="mt-4 flex justify-end">
                  <button 
                    className="text-fdgym-red hover:text-fdgym-neon-red"
                    onClick={() => navigate('/admin/users')}
                  >
                    View All Users
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
