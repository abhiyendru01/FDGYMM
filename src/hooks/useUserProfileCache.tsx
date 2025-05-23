
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

interface UserProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: Array<{ email_address: string }>;
  phone_numbers?: Array<{ phone_number: string }>;
  image_url: string;
  metadata?: {
    height?: number;
    weight?: number;
    age?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

const CACHE_KEY = 'fdgym_user_profile_cache';
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds

export const useUserProfileCache = () => {
  const { user, isSignedIn } = useUser();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from API
      const { data, error } = await supabase.functions.invoke('get-user-detail', {
        body: { userId: user.id }
      });

      if (error) throw error;
      
      if (data?.user) {
        setProfileData(data.user);
        // Cache the profile data
        cacheData(data.user);
      }
    } catch (err: any) {
      console.error('Error fetching user profile:', err);
      setError(err.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Check cache first
        const cachedData = checkCache();
        if (cachedData) {
          setProfileData(cachedData);
          setLoading(false);
          return;
        }
        
        // If no cache, fetch from API
        await fetchProfileData();
      } catch (err: any) {
        console.error('Error loading user profile:', err);
        setError(err.message || 'Failed to load profile data');
        setLoading(false);
      }
    };

    if (isSignedIn && user?.id) {
      loadProfileData();
    } else {
      setLoading(false);
    }
  }, [isSignedIn, user?.id, fetchProfileData]);

  const checkCache = (): UserProfileData | null => {
    const cachedItem = localStorage.getItem(CACHE_KEY);
    if (!cachedItem) return null;
    
    try {
      const { data, timestamp } = JSON.parse(cachedItem);
      // Check if cache is still valid
      if (Date.now() - timestamp < CACHE_EXPIRY && data.id === user?.id) {
        return data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const cacheData = (data: UserProfileData) => {
    try {
      const cacheItem = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheItem));
    } catch (err) {
      console.error('Error caching profile data:', err);
    }
  };

  const updateCache = (newData: Partial<UserProfileData>) => {
    if (!profileData) return;
    
    const updatedData = {
      ...profileData,
      ...newData
    };
    
    setProfileData(updatedData);
    cacheData(updatedData);
  };

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    setProfileData(null);
  };

  const refreshProfile = () => {
    clearCache();
    fetchProfileData();
  };

  return { 
    profileData, 
    loading, 
    error, 
    updateCache, 
    clearCache,
    refreshProfile
  };
};
