
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
    
    // Get request body with user data
    const body = await req.json().catch(() => ({}));
    const { 
      userId, 
      first_name, 
      last_name, 
      image_url,
      metadata 
    } = body;
    
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    console.log(`Updating profile for user ID: ${userId}`, body);
    
    // Get Clerk API key from Supabase secrets
    const CLERK_SECRET_KEY = Deno.env.get("CLERK_SECRET_KEY");
    if (!CLERK_SECRET_KEY) {
      throw new Error("Clerk API key is not configured");
    }
    
    // Prepare update data
    const updateData: Record<string, any> = {};
    
    // Conditionally add fields only if they're provided
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (image_url !== undefined) updateData.image_url = image_url;
    
    // Handle metadata updates if provided
    if (metadata) {
      // First, get the current user to access existing metadata
      const userResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw new Error(`Failed to get user from Clerk: ${errorText}`);
      }
      
      const userData = await userResponse.json();
      
      // Merge existing metadata with new metadata
      const currentMetadata = userData.metadata || {};
      updateData.metadata = {
        ...currentMetadata,
        ...metadata
      };
    }
    
    // Only proceed with update if there's something to update
    if (Object.keys(updateData).length > 0) {
      // Update user in Clerk
      const updateResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to update user in Clerk: ${errorText}`);
      }
      
      const updatedUser = await updateResponse.json();
      console.log("Successfully updated user in Clerk");
      
      // Return the updated user data
      return new Response(
        JSON.stringify({
          success: true,
          user: updatedUser,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      console.log("No updates provided");
      return new Response(
        JSON.stringify({
          success: true,
          message: "No updates provided",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
  } catch (error) {
    console.error("Error updating user profile:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to update user profile",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
