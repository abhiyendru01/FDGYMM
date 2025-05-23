
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
    const { user_id, plan_name, amount, duration } = await req.json();
    
    // Validate required fields
    if (!user_id || !plan_name || !amount || !duration) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
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
    
    // Calculate duration in days for end date
    let durationDays = 30; // default to 30 days for "month"
    if (duration === "3 months") {
      durationDays = 90;
    } else if (duration === "6 months") {
      durationDays = 180;
    } else if (duration === "year") {
      durationDays = 365;
    }
    
    // Calculate end date
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);
    
    // Initialize Razorpay directly with fetch API instead of the SDK
    const razorpayUrl = "https://api.razorpay.com/v1/orders";
    const razorpay_key_id = 'rzp_test_kXdvIUTOdIictY';
    const razorpay_key_secret = 'uBUhU4SyokQFhotGToLXRg6C';
    
    // Create authorization header with API keys
    const authHeader = 'Basic ' + btoa(`${razorpay_key_id}:${razorpay_key_secret}`);
    
    // Create Razorpay order using fetch
    const orderResponse = await fetch(razorpayUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay amount is in paise (1/100 of INR)
        currency: "INR",
        receipt: `fd-gym-${user_id.substring(0, 8)}`,
        notes: {
          plan_name,
          user_id,
        },
      }),
    });
    
    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error('Razorpay order creation failed:', errorText);
      throw new Error(`Failed to create Razorpay order: ${errorText}`);
    }
    
    const order = await orderResponse.json();
    
    if (!order || !order.id) {
      console.error('Invalid Razorpay order response:', order);
      throw new Error("Failed to create Razorpay order: " + JSON.stringify(order));
    }
    
    // Create subscription record in Supabase
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .insert({
        user_id, // Now this will work with Clerk's text-based user IDs
        plan_name,
        amount,
        duration,
        status: "pending", // Will be updated to "active" after payment verification
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        razorpay_order_id: order.id,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        subscription: data,
        razorpay: {
          order_id: order.id,
          key_id: razorpay_key_id,
          amount: amount * 100,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Error creating subscription:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to create subscription",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
