
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [gymName, setGymName] = useState('FD GYM');
  const [contactEmail, setContactEmail] = useState('contact@fdgym.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 9876543210');
  const [address, setAddress] = useState('123 Fitness Street, Workout City');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  // Check admin authentication
  const isAdminAuthenticated = localStorage.getItem('fdgym_admin_authenticated') === 'true';
  if (!isAdminAuthenticated) {
    navigate('/admin/login');
    return null;
  }
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate saving settings
    setTimeout(() => {
      // Save to localStorage
      const settings = {
        gymName,
        contactEmail,
        phoneNumber,
        address,
        username
      };
      
      localStorage.setItem('gym_settings', JSON.stringify(settings));
      
      // If password is set, update it
      if (password) {
        localStorage.setItem('admin_password', password);
      }
      
      toast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully.",
      });
      
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full bg-black">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-orbitron font-bold mb-6">Settings</h1>
          
          <Card className="glassmorphism border-fdgym-dark-gray p-6 rounded-xl mb-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveSettings();
            }}>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-fdgym-light-gray">Gym Name</label>
                    <Input 
                      type="text" 
                      className="bg-fdgym-dark-gray border-fdgym-dark-gray focus:ring-fdgym-red focus:border-fdgym-red"
                      value={gymName}
                      onChange={(e) => setGymName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-fdgym-light-gray">Contact Email</label>
                    <Input 
                      type="email" 
                      className="bg-fdgym-dark-gray border-fdgym-dark-gray focus:ring-fdgym-red focus:border-fdgym-red"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-fdgym-light-gray">Phone Number</label>
                    <Input 
                      type="text" 
                      className="bg-fdgym-dark-gray border-fdgym-dark-gray focus:ring-fdgym-red focus:border-fdgym-red"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-fdgym-light-gray">Address</label>
                    <Input 
                      type="text" 
                      className="bg-fdgym-dark-gray border-fdgym-dark-gray focus:ring-fdgym-red focus:border-fdgym-red"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mt-6">Admin Account</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-fdgym-light-gray">Username</label>
                    <Input 
                      type="text" 
                      className="bg-fdgym-dark-gray border-fdgym-dark-gray focus:ring-fdgym-red focus:border-fdgym-red"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-fdgym-light-gray">Change Password</label>
                    <Input 
                      type="password" 
                      className="bg-fdgym-dark-gray border-fdgym-dark-gray focus:ring-fdgym-red focus:border-fdgym-red"
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="mt-6 bg-fdgym-red hover:bg-fdgym-neon-red w-full md:w-auto"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </Card>
          
          <Card className="glassmorphism border-fdgym-dark-gray p-6 rounded-xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Integration</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-fdgym-dark-gray">
                <div>
                  <h3 className="font-medium">Razorpay</h3>
                  <p className="text-sm text-fdgym-light-gray">Payment gateway integration</p>
                </div>
                <div className="bg-green-500/20 text-green-500 text-xs font-medium px-3 py-1.5 rounded-full">
                  Connected
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-fdgym-light-gray">API Key</label>
                <Input 
                  type="text" 
                  className="bg-fdgym-dark-gray border-fdgym-dark-gray focus:ring-fdgym-red focus:border-fdgym-red"
                  value="rzp_test_kXdvIUTOdIictY"
                  readOnly
                />
                <p className="text-xs text-fdgym-light-gray">
                  This is your test API key. Use a production key for live payments.
                </p>
              </div>
              
              <Button
                variant="outline"
                className="mt-2 border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
              >
                Update Payment Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
