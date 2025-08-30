<script>
// ===== UltimaDefensaLegal.com configuration =====
// 3-month terms only. No “Region” shown. Buttons say “Pay / Pagar”.

window.UDL_CONFIG = {
  hero: {
    headline: {
      en: "Legal protection, in your language.",
      es: "Protección legal, en tu idioma."
    },
    paragraph: {
      en: "Bilingual (EN/ES) legal help for real-life issues. Attorneys in our network commit to at least one free or reduced consultation for active members.",
      es: "Ayuda legal bilingüe (EN/ES) para situaciones reales. Los abogados de nuestra red se comprometen a ofrecer al menos una consulta gratuita o con descuento para miembros activos."
    },
    ctaPrimary:  { en: "How it works", es: "Cómo funciona" },
    ctaSecondary:{ en: "View plans",   es: "Ver planes" }
  },

  // Pricing — 3-month terms only (USD)
  display: {
    INDIVIDUAL_3MO: {
      name: { en: "Individual", es: "Individual" },
      term: { en: "/3 months",  es: "/3 meses" },
      price: 79.00
    },
    FAMILY_3MO: {
      name: { en: "Family", es: "Familiar" },
      term: { en: "/3 months", es: "/3 meses" },
      price: 129.00
    },
    EXTEND_3MO: {
      name: { en: "Extend 3 months", es: "Extender 3 meses" },
      term: { en: "/3 months", es: "/3 meses" },
      price: 69.00
    }
  },

  // Square Checkout Links (primary). Replace with real URLs.
  checkoutLinks: {
    INDIVIDUAL_3MO: { US: "https://square.link/u/udl-ind-3mo" },
    FAMILY_3MO:     { US: "https://square.link/u/udl-fam-3mo" },
    EXTEND_3MO:     { US: "https://square.link/u/udl-extend-3mo" }
  },

  // Optional Bitcoin links (auto-hidden if blank)
  cryptoLinks: {
    INDIVIDUAL_3MO: { US: "" },
    FAMILY_3MO:     { US: "" },
    EXTEND_3MO:     { US: "" }
  },

  // UI labels (EN/ES)
  labels: {
    pay:       { en: "Pay",              es: "Pagar" },
    payBTC:    { en: "Pay with Bitcoin", es: "Pagar con Bitcoin" },
    howTitle:  { en: "How it works",     es: "Cómo funciona" },
    plans:     { en: "Membership — 3 months", es: "Membresía — 3 meses" },
    plansSub:  { en: "No monthly option. After 3 months, you can extend easily.", es: "Sin opción mensual. Después de 3 meses, puedes extender fácilmente." },
    guaranteeTitle: { en: "Our promise", es: "Nuestro compromiso" },
    guaranteeCopy: {
      en: "Participating attorneys agree to at least one free or reduced consultation for active members. We focus on practical help and clear communication—English or Spanish.",
      es: "Los abogados participantes aceptan ofrecer al menos una consulta gratuita o con descuento a miembros activos. Nos enfocamos en ayuda práctica y comunicación clara—en inglés o español."
    },
    copy: {
      individualNote: { en: "Single adult coverage for common legal needs.", es: "Cobertura para un adulto en necesidades legales comunes." },
      familyNote:     { en: "Husband and wife coverage.", es: "Cobertura para esposo y esposa." },
      extendNote:     { en: "Already a member? Extend now—no re-signup.", es: "¿Ya eres miembro? Extiende ahora—sin volver a registrarte." }
    }
  }
};
</script>
