/* payments-config.js
 * Central switchboard for payments. Edit only this file when going live.
 */

window.UDL_PAY_CONFIG = {
  /* ======== GLOBAL TOGGLES ======== */
  ENABLE_PAYPAL: false,      // set true when your PayPal client-id is live
  ENABLE_BANK_GATEWAY: false,// set true when your bank/processor is live

  /* ======== CALLBACKS / WEBHOOKS (your server) ======== */
  // Implement these endpoints in your backend. Use them for post-payment provisioning/logging.
  SERVER:{
    SUBSCRIBER_WEBHOOK: "/api/payments/subscriber/confirm", // POST
    ATTORNEY_WEBHOOK:   "/api/payments/attorney/confirm"    // POST
  },

  /* ======== PAYPAL SETTINGS ======== */
  PAYPAL:{
    CLIENT_ID: "YOUR_PAYPAL_CLIENT_ID", // << paste from PayPal
    CURRENCY: "USD"
  },

  /* For PayPal Subscriptions you must create "Plan IDs" in your PayPal dashboard.
     Option A (simple): one Plan ID per SKU (no discounts).
     Option B (discount): create separate discounted Plan IDs (e.g., WNEU20).
     Option C: do discounts server-side with your bank gateway instead of PayPal plans.
  */

  // Client/subscriber plans (public site)
  SUBSCRIBER_PLANS:{
    starter:      { label:"Starter — $19 / month",  price:19, interval:"month", paypalPlanId:"P-SUB-STARTER" },
    standard:     { label:"Standard — $29 / month", price:29, interval:"month", paypalPlanId:"P-SUB-STANDARD" },
    premium:      { label:"Premium — $49 / month",  price:49, interval:"month", paypalPlanId:"P-SUB-PREMIUM" }
  },

  // Attorney plans (panel memberships)
  ATTORNEY_PLANS:{
    panel:        { label:"Panel Membership — $79 / month",        price:79,  interval:"month", paypalPlanId:"P-ATTY-PANEL" },
    "panel-pro":  { label:"Panel + Call Routing Pro — $129 / month", price:129, interval:"month", paypalPlanId:"P-ATTY-PANELPRO" },

    // OPTIONAL: discounted PayPal plans for WNEU20 (create in PayPal and paste IDs)
    discounted:{
      panel:       { paypalPlanId:"P-ATTY-PANEL-WNEU20" },
      "panel-pro": { paypalPlanId:"P-ATTY-PANELPRO-WNEU20" }
    }
  },

  /* ======== BANK/PROCESSOR (CARD) ========
     If you prefer your bank’s gateway (or Stripe/Square) for subscriptions, set ENABLE_BANK_GATEWAY=true,
     then implement tokenization on the client and create the subscription on your server.
     Below are placeholders for your tokenization script URLs (leave blank until ready).
  */
  BANK:{
    TOKENIZER_SCRIPT_URL: "",     // e.g., https://js.stripe.com/v3 or your bank's JS SDK
    CREATE_SUB_ENDPOINT:  "/api/bank/create-subscription" // your server endpoint to create subs
  }
};
