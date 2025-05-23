
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Function to generate SHA-256 HMAC
async function generateSHA256HMAC(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(data)
  );
  
  // Convert to hex string
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error("Missing required payment verification parameters");
    }
    
    // Get Razorpay key secret from env
    const RAZORPAY_KEY_SECRET = 'uBUhU4SyokQFhotGToLXRg6C';
    if (!RAZORPAY_KEY_SECRET) {
      throw new Error("RAZORPAY_KEY_SECRET is not set");
    }
    
    // Verify the payment signature
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = await generateSHA256HMAC(RAZORPAY_KEY_SECRET, payload);
    
    const isSignatureValid = generated_signature === razorpay_signature;
    
    if (!isSignatureValid) {
      throw new Error("Payment verification failed: Invalid signature");
    }
    
    // Update subscription status to active
    const { data: subscription, error: subscriptionError } = await supabaseAdmin
      .from("subscriptions")
      .update({ 
        status: "active",
        payment_id: razorpay_payment_id
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .select()
      .single();
    
    if (subscriptionError) {
      console.error("Error updating subscription:", subscriptionError);
      throw new Error("Failed to update subscription status");
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified successfully",
        subscription,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    console.error("Error verifying payment:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to verify payment",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
