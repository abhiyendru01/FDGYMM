
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  
  try {
    // Create Supabase client with admin privileges
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          persistSession: false,
        },
      }
    );
    
    // Get request body with user ID
    const body = await req.json().catch(() => ({}));
    const { userId } = body;
    
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    console.log(`Fetching user details for user ID: ${userId}`);
    
    // First, attempt to get the user from Clerk API if we have an API key
    try {
      // Get Clerk API key from Supabase secrets
      const CLERK_SECRET_KEY = Deno.env.get("CLERK_SECRET_KEY");
      if (CLERK_SECRET_KEY) {
        // Fetch user from Clerk API
        const clerkResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (clerkResponse.ok) {
          const userData = await clerkResponse.json();
          console.log("Successfully fetched user from Clerk API");
          
          // Also fetch subscription data from Supabase
          const { data: subscriptionData } = await supabaseAdmin
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .single();
            
          // Merge Clerk user data with subscription data
          const enhancedUserData = {
            ...userData,
            subscription: subscriptionData || null,
          };
          
          // Return enhanced user data
          return new Response(
            JSON.stringify({
              success: true,
              user: enhancedUserData,
            }),
            {
              status: 200,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        } else {
          console.warn("Failed to fetch from Clerk API, falling back to mock data");
        }
      }
    } catch (clerkError) {
      console.warn("Error fetching from Clerk API:", clerkError);
      // We'll fallback to mock user data
    }
    
    // If Clerk API fetch fails, return mock data for demo purposes
    console.log("Generating mock user data for user ID:", userId);
    
    // Create mock user data based on the ID
    const mockUser = {
      id: userId,
      first_name: "Demo",
      last_name: "User",
      email_addresses: [{ email_address: "user@example.com" }],
      phone_numbers: [{ phone_number: "+1234567890" }],
      image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      metadata: {
        height: 175,
        weight: 70,
        age: 28
      }
    };
    
    // Check if the user has a subscription
    const { data: subscriptionData } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();
    
    // Merge mock user data with real subscription data
    const enhancedMockUser = {
      ...mockUser,
      subscription: subscriptionData || null,
    };
    
    // Return the mock user data
    return new Response(
      JSON.stringify({
        success: true,
        user: enhancedMockUser,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Error getting user detail:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to get user details",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
