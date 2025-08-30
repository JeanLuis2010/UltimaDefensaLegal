/* pricing-config.js
   Ultima Defensa Legal — Region-based membership pricing (EN/ES)
   Paste this entire file into your repo. No other edits needed.
*/

(function () {
  // Expose a single global configuration object
  const CFG = {
    defaultLang: "es",
    currency: "USD",     // shown as $ by renderer
    // Plan catalog (names/terms are bilingual; price is set per-region below)
    plans: {
      INDIVIDUAL_3MO: {
        code: "INDIVIDUAL_3MO",
        name: { en: "Individual", es: "Individual" },
        term: { en: "/3 months", es: "/3 meses" },
        description: {
          en: "Member access + at least one free or discounted attorney consultation.",
          es: "Acceso para miembro + al menos una consulta gratuita o con descuento con un abogado."
        }
      },
      FAMILY_3MO: {
        code: "FAMILY_3MO",
        name: { en: "Family (2 adults)", es: "Familiar (2 adultos)" },
        term: { en: "/3 months", es: "/3 meses" },
        description: {
          en: "Covers two adults in the same household. Includes the same benefits.",
          es: "Cubre a dos adultos en el mismo hogar. Incluye los mismos beneficios."
        }
      },
      EXTEND_3MO: {
        code: "EXTEND_3MO",
        name: { en: "Extend 3 months", es: "Extender 3 meses" },
        term: { en: "", es: "" },
        description: {
          en: "Add 3 more months to your current membership.",
          es: "Agrega 3 meses más a tu membresía actual."
        }
      }
    },

    /* Pricing by state. Values are in CENTS.
       Region overrides will fall back to DEFAULT when not specified.
       You can add more states or new groups any time.
    */
    pricingByState: {
      DEFAULT: { INDIVIDUAL_3MO: 7900, FAMILY_3MO: 12900, EXTEND_3MO: 7900 },

      // Higher-cost states
      CA:       { INDIVIDUAL_3MO: 9900, FAMILY_3MO: 15900, EXTEND_3MO: 9900 }, // California
      NY:       { INDIVIDUAL_3MO: 9900, FAMILY_3MO: 15900, EXTEND_3MO: 9900 }, // New York

      // Lower-cost states
      TX:       { INDIVIDUAL_3MO: 6900, FAMILY_3MO: 10900, EXTEND_3MO: 6900 }, // Texas
      FL:       { INDIVIDUAL_3MO: 6900, FAMILY_3MO: 10900, EXTEND_3MO: 6900 }  // Florida
    },

    /* Checkout links — no processor branding here.
       Region-pricing will pick the link for the selected plan and append region info.
       You can swap these URLs to any flow (Stripe, Square, custom, etc.) without changing pages.
    */
    checkoutLinks: {
      DEFAULT: {
        INDIVIDUAL_3MO: "subscribe.html?plan=INDIVIDUAL_3MO",
        FAMILY_3MO:     "subscribe.html?plan=FAMILY_3MO",
        EXTEND_3MO:     "subscribe.html?plan=EXTEND_3MO"
      }
    },

    /* Optional: active “population” (for copy/marketing variations later).
       Kept minimal so it doesn’t affect pricing logic.
    */
    populations: {
      LATINO: {
        active: true,
        name: { en: "Latino Community", es: "Comunidad Latina" }
      }
    }
  };

  // Helper API used by region-pricing.js (safe even if not used)
  CFG.getPricesForState = function (stateCode) {
    const S = (stateCode || "").toUpperCase();
    return Object.assign({}, CFG.pricingByState.DEFAULT, CFG.pricingByState[S] || {});
  };

  CFG.getPlan = function (planCode) {
    return CFG.plans[planCode] || null;
  };

  CFG.getCheckoutLink = function (planCode) {
    const map = CFG.checkoutLinks.DEFAULT || {};
    return map[planCode] || "#";
  };

  // Publish
  window.UDL_CONFIG = CFG;
})();
