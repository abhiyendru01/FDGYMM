
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Loader2, Save, Upload, User, Mail, Edit, Camera } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import UserSubscriptions from '@/components/UserSubscriptions';
import { useUserProfileCache } from '@/hooks/useUserProfileCache';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const { profileData, loading, updateCache, refreshProfile } = useUserProfileCache();
  
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Setting form values from profile when loaded
  useEffect(() => {
    if (profileData) {
      setHeight(profileData.metadata?.height || '');
      setWeight(profileData.metadata?.weight || '');
      setAge(profileData.metadata?.age || '');
      setFirstName(profileData.first_name || '');
      setLastName(profileData.last_name || '');
      setProfileImageUrl(profileData.image_url || '');
    }
    
    // Always get email directly from Clerk
    if (user) {
      const primaryEmail = user.primaryEmailAddress?.emailAddress;
      setEmail(primaryEmail || '');
    }
  }, [profileData, user]);

  const handleSaveMetrics = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      // Update cache first for immediate feedback
      updateCache({
        metadata: {
          ...profileData?.metadata,
          height: height || undefined,
          weight: weight || undefined,
          age: age || undefined
        }
      });
      
      // Also save to Supabase function for persistence
      const { error } = await supabase.functions.invoke('update-user-profile', {
        body: { 
          userId: user.id,
          metadata: {
            height: height || undefined,
            weight: weight || undefined,
            age: age || undefined
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Metrics saved",
        description: "Your body metrics have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving metrics",
        description: error.message || "There was a problem updating your metrics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Profile image must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, GIF, etc).",
          variant: "destructive",
        });
        return;
      }
      
      setProfileImageFile(file);
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImageUrl(imageUrl);
    }
  };

  const handleUploadProfileImage = async () => {
    if (!user || !profileImageFile) return;
    
    setIsUploadingImage(true);
    
    try {
      const fileExt = profileImageFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('profiles')
        .upload(filePath, profileImageFile, {
          upsert: true,
          contentType: profileImageFile.type
        });
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      // Update user profile with new image URL
      const { error } = await supabase.functions.invoke('update-user-profile', {
        body: { 
          userId: user.id,
          image_url: publicUrl
        }
      });
      
      if (error) throw error;
      
      // Update local cache
      updateCache({
        image_url: publicUrl
      });
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      });
      
      // Refresh profile data
      refreshProfile();
      
    } catch (error: any) {
      toast({
        title: "Error updating profile picture",
        description: error.message || "There was a problem uploading your profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      // Update user profile data
      const { error } = await supabase.functions.invoke('update-user-profile', {
        body: { 
          userId: user.id,
          first_name: firstName,
          last_name: lastName
        }
      });
      
      if (error) throw error;
      
      // Update local cache
      updateCache({
        first_name: firstName,
        last_name: lastName
      });
      
      // Reset edit mode
      setIsEditingProfile(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
      // Refresh profile data to get the latest updates
      refreshProfile();
      
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <MainLayout>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-fdgym-red animate-spin" />
          <span className="ml-2 text-fdgym-light-gray">Loading profile...</span>
        </div>
      </MainLayout>
    );
  }

  if (!isSignedIn) {
    navigate('/login');
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
            {/* Profile avatar and basic info */}
            <div className="glassmorphism border-fdgym-dark-gray p-8 rounded-xl w-full md:w-auto md:min-w-[300px] flex flex-col items-center">
              {isEditingProfile ? (
                <div className="mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-2 border-2 border-fdgym-red relative group">
                    {profileImageUrl ? (
                      <img 
                        src={profileImageUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-fdgym-dark-gray flex items-center justify-center">
                        <User className="h-16 w-16 text-fdgym-light-gray" />
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-8 w-8 text-white" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleProfileImageChange}
                      />
                    </label>
                  </div>
                  {profileImageFile && (
                    <Button
                      size="sm"
                      className="w-full mt-2 bg-fdgym-red hover:bg-fdgym-neon-red text-white"
                      onClick={handleUploadProfileImage}
                      disabled={isUploadingImage}
                    >
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </>
                      )}
                    </Button>
                  )}
                  <p className="text-xs text-center text-fdgym-light-gray mt-2">Click image to change</p>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-fdgym-red">
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src={profileData?.image_url || user?.imageUrl} 
                      alt={`${firstName} ${lastName}`}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="bg-fdgym-dark-gray text-fdgym-light-gray">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              {isEditingProfile ? (
                <div className="w-full space-y-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-fdgym-dark-gray border-fdgym-dark-gray text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-fdgym-dark-gray border-fdgym-dark-gray text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center mt-1 bg-fdgym-dark-gray border border-fdgym-dark-gray rounded-md px-3 py-2 text-fdgym-light-gray">
                      <Mail className="h-4 w-4 mr-2 text-fdgym-light-gray" />
                      <span className="text-sm truncate">{email}</span>
                    </div>
                    <p className="text-xs text-fdgym-light-gray mt-1">Email address from your account</p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-orbitron font-bold mb-1 text-center">
                    {profileData?.first_name || user?.firstName} {profileData?.last_name || user?.lastName}
                  </h2>
                  <div className="flex items-center mb-4 text-fdgym-light-gray">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm truncate">{email}</span>
                  </div>
                </>
              )}
              
              {isEditingProfile ? (
                <div className="flex space-x-2 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
                    onClick={() => setIsEditingProfile(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-fdgym-red hover:bg-fdgym-neon-red text-white"
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="w-full space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
                    onClick={() => setIsEditingProfile(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
                    onClick={() => navigate('/subscriptions')}
                  >
                    Manage Subscription
                  </Button>
                </div>
              )}
            </div>

            {/* Main content area with tabs */}
            <div className="flex-1">
              <Tabs defaultValue="dashboard">
                <TabsList className="grid w-full grid-cols-3 glassmorphism border-fdgym-dark-gray mb-6">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="body-metrics">Body Metrics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard">
                  <div className="space-y-6">
                    <UserSubscriptions />
                    
                    <Card className="glassmorphism border-fdgym-dark-gray overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-fdgym-dark-gray to-fdgym-black">
                        <CardTitle className="text-xl font-orbitron">Recent Activity</CardTitle>
                        <CardDescription className="text-fdgym-light-gray">
                          Your recent workouts and gym visits
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="text-center py-8 text-fdgym-light-gray">
                          No recent activity to display.
                        </div>
                        <Button 
                          className="w-full mt-4 bg-fdgym-red hover:bg-fdgym-neon-red text-white"
                          onClick={() => navigate('/workouts')}
                        >
                          Browse Workouts
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Body Metrics Tab */}
                <TabsContent value="body-metrics">
                  <Card className="glassmorphism border-fdgym-dark-gray overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-fdgym-dark-gray to-fdgym-black">
                      <CardTitle className="text-xl font-orbitron">Body Metrics</CardTitle>
                      <CardDescription className="text-fdgym-light-gray">
                        Manage your physical measurements
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input 
                            id="height"
                            type="number" 
                            placeholder="Enter your height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="bg-fdgym-dark-gray border-fdgym-dark-gray text-white"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input 
                            id="weight"
                            type="number" 
                            placeholder="Enter your weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="bg-fdgym-dark-gray border-fdgym-dark-gray text-white"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="age">Age</Label>
                          <Input 
                            id="age"
                            type="number" 
                            placeholder="Enter your age"
                            value={age}
                            onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value))}
                            className="bg-fdgym-dark-gray border-fdgym-dark-gray text-white"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-8 bg-fdgym-red hover:bg-fdgym-neon-red text-white"
                        onClick={handleSaveMetrics}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Metrics
                          </>
                        )}
                      </Button>
                      
                      <div className="mt-6 p-4 border border-fdgym-dark-gray rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Why track your metrics?</h3>
                        <p className="text-fdgym-light-gray">
                          Keeping track of your body metrics helps you monitor your fitness journey
                          and tailor workouts to your specific needs.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white"
                          onClick={() => navigate('/bmi')}
                        >
                          Calculate BMI
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                  <Card className="glassmorphism border-fdgym-dark-gray overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-fdgym-dark-gray to-fdgym-black">
                      <CardTitle className="text-xl font-orbitron">Account Settings</CardTitle>
                      <CardDescription className="text-fdgym-light-gray">
                        Manage your account preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Email Notifications</h3>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="email-workouts"
                            className="rounded border-fdgym-dark-gray bg-fdgym-dark-gray text-fdgym-red focus:ring-fdgym-red"
                          />
                          <label htmlFor="email-workouts" className="text-sm text-fdgym-light-gray">
                            Receive workout recommendations
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <input
                            type="checkbox"
                            id="email-promotions"
                            className="rounded border-fdgym-dark-gray bg-fdgym-dark-gray text-fdgym-red focus:ring-fdgym-red"
                          />
                          <label htmlFor="email-promotions" className="text-sm text-fdgym-light-gray">
                            Receive promotional offers
                          </label>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-fdgym-dark-gray">
                        <Button 
                          className="bg-fdgym-red hover:bg-fdgym-neon-red text-white"
                        >
                          Save Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
