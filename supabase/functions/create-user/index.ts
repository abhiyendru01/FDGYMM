
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
    
    // Get request body
    const body = await req.json();
    const { first_name, last_name, email, password, phone } = body;
    
    if (!first_name || !last_name || !email || !password) {
      throw new Error("Missing required fields");
    }
    
    console.log(`Attempting to create user with email: ${email}`);
    
    // First try to create user with Clerk if we have the API key
    try {
      // Get Clerk API key from Supabase secrets
      const CLERK_SECRET_KEY = Deno.env.get("CLERK_SECRET_KEY");
      
      if (CLERK_SECRET_KEY) {
        console.log("Creating user with Clerk API...");
        
        // Create payload for Clerk API
        const clerkPayload = {
          email_addresses: [{ email_address: email }],
          phone_numbers: phone ? [{ phone_number: phone }] : undefined,
          password,
          first_name,
          last_name,
        };
        
        // Create user with Clerk API
        const clerkResponse = await fetch('https://api.clerk.dev/v1/users', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clerkPayload),
        });
        
        if (clerkResponse.ok) {
          const clerkData = await clerkResponse.json();
          console.log("Successfully created user with Clerk");
          
          // Return success
          return new Response(
            JSON.stringify({
              success: true,
              user: clerkData,
              message: "User created successfully via Clerk",
            }),
            {
              status: 201,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        } else {
          const errorText = await clerkResponse.text();
          console.warn("Failed to create user with Clerk API:", errorText);
          // We'll fall back to creating a local record
        }
      }
    } catch (clerkError) {
      console.warn("Error creating user with Clerk API:", clerkError);
      // We'll fall back to creating a local record
    }
    
    // If Clerk API is not available or fails, create a local record
    console.log("Creating local user record...");
    
    // Create user in Supabase auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
      user_metadata: { first_name, last_name, phone },
    });
    
    if (authError) {
      throw authError;
    }
    
    if (!authUser?.user) {
      throw new Error("Failed to create user");
    }
    
    console.log(`Successfully created local user: ${authUser.user.id}`);
    
    // Create additional user profile data if needed
    // This could be in a 'profiles' table or other table
    
    // Return the created user
    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: authUser.user.id,
          email,
          first_name,
          last_name,
          phone,
          created_at: new Date().toISOString(),
        },
        message: "User created successfully via Supabase",
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Error creating user:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to create user",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
