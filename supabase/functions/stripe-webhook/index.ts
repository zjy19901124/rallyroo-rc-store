import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.91.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error("Missing required environment variables");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-11-20.acacia" });
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    console.error("Missing Stripe signature");
    return new Response(
      JSON.stringify({ error: "Missing Stripe signature" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let event: Stripe.Event;
  const body = await req.text();

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    console.log(`Webhook received: ${event.type}`);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(
      JSON.stringify({ error: "Invalid signature" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Handle relevant events
  if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
    try {
      let customerEmail = "";
      let amountTotal = 0;
      let currency = "aud";
      let stripePaymentIntentId = "";
      let stripeCheckoutSessionId = "";
      let stripePaymentLinkId = "";
      let items: { name: string; quantity: number; price: number; image?: string }[] = [];
      let shipping = null;

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        customerEmail = session.customer_details?.email || session.customer_email || "";
        amountTotal = session.amount_total || 0;
        currency = session.currency || "aud";
        stripePaymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || "";
        stripeCheckoutSessionId = session.id;
        stripePaymentLinkId = typeof session.payment_link === "string" ? session.payment_link : session.payment_link?.id || "";

        // Get line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        items = lineItems.data.map((item: Stripe.LineItem) => ({
          name: item.description || "Product",
          quantity: item.quantity || 1,
          price: (item.amount_total || 0) / (item.quantity || 1) / 100,
        }));

        // Get shipping details
        if (session.shipping_details) {
          shipping = {
            name: session.shipping_details.name || "",
            address_line1: session.shipping_details.address?.line1 || "",
            address_line2: session.shipping_details.address?.line2 || "",
            suburb: session.shipping_details.address?.city || "",
            state: session.shipping_details.address?.state || "",
            postcode: session.shipping_details.address?.postal_code || "",
            phone: session.customer_details?.phone || "",
          };
        }
      } else if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        customerEmail = paymentIntent.receipt_email || "";
        amountTotal = paymentIntent.amount;
        currency = paymentIntent.currency;
        stripePaymentIntentId = paymentIntent.id;

        // For payment intents without sessions, use metadata if available
        if (paymentIntent.metadata?.items) {
          try {
            items = JSON.parse(paymentIntent.metadata.items);
          } catch (e) {
            console.log("Could not parse items from metadata");
          }
        }
      }

      if (!customerEmail) {
        console.log("No customer email found, skipping order creation");
        return new Response(
          JSON.stringify({ received: true, message: "No customer email, skipping" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if order already exists
      const { data: existingOrder } = await supabase
        .from("orders")
        .select("id")
        .eq("stripe_payment_intent_id", stripePaymentIntentId)
        .maybeSingle();

      if (existingOrder) {
        console.log(`Order already exists for payment intent ${stripePaymentIntentId}`);
        return new Response(
          JSON.stringify({ received: true, message: "Order already exists" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Try to find user by email
      const { data: authUsers } = await supabase.auth.admin.listUsers();
      const matchingUser = authUsers?.users?.find(
        (u) => u.email?.toLowerCase() === customerEmail.toLowerCase()
      );
      const userId = matchingUser?.id || null;

      // Create order
      const { error: orderError } = await supabase.from("orders").insert({
        user_id: userId,
        customer_email: customerEmail,
        stripe_checkout_session_id: stripeCheckoutSessionId || null,
        stripe_payment_link_id: stripePaymentLinkId || null,
        stripe_payment_intent_id: stripePaymentIntentId,
        amount_total: amountTotal,
        currency: currency,
        status: "paid",
        items: items,
        shipping: shipping,
      });

      if (orderError) {
        console.error("Failed to create order:", orderError);
        return new Response(
          JSON.stringify({ error: "Failed to create order" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log(`Order created for ${customerEmail} (user: ${userId || "guest"})`);

    } catch (err) {
      console.error("Error processing webhook:", err);
      return new Response(
        JSON.stringify({ error: "Error processing webhook" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // Handle refunds
  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    const paymentIntentId = typeof charge.payment_intent === "string" 
      ? charge.payment_intent 
      : charge.payment_intent?.id;

    if (paymentIntentId) {
      const { error } = await supabase
        .from("orders")
        .update({ status: "refunded" })
        .eq("stripe_payment_intent_id", paymentIntentId);

      if (error) {
        console.error("Failed to update order status to refunded:", error);
      } else {
        console.log(`Order marked as refunded for payment intent ${paymentIntentId}`);
      }
    }
  }

  return new Response(
    JSON.stringify({ received: true }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
