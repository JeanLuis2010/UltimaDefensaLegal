<script>
// ===== UltimaDefensaLegal.com configuration =====
// Population-based plans. Today only LATINO is active.
// No “Region” label anywhere. Buttons say “Pay / Pagar”.

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

  labels: {
    pay:       { en: "Pay",              es: "Pagar" },
    payBTC:    { en: "Pay with Bitcoin", es: "Pagar con Bitcoin" },
    plans:     { en: "Membership — 3 months", es: "Membresía — 3 meses" },
    plansSub:  { en: "No monthly option. After 3 months, you can extend easily.", es: "Sin opción mensual. Después de 3 meses puedes extender fácilmente." },
    howTitle:  { en: "How it works", es: "Cómo funciona" },
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
  },

  // ==========================
  // Populations (expandable)
  // ==========================
  populations: {
    LATINO: {
      active: true,
      displayName: { en: "Latino Community", es: "Comunidad Latina" },
      plans: {
        INDIVIDUAL_3MO: {
          name: { en: "Individual", es: "Individual" },
          term: { en: "/3 months",  es: "/3 meses" },
          price: 79.00,
          checkoutLinks: { US: "https://square.link/u/udl-ind-3mo" },
          cryptoLinks:    { US: "" },
          noteKey: "copy.individualNote"
        },
        FAMILY_3MO: {
          name: { en: "Family", es: "Familiar" },
          term: { en: "/3 months", es: "/3 meses" },
          price: 129.00,
          checkoutLinks: { US: "https://square.link/u/udl-fam-3mo" },
          cryptoLinks:    { US: "" },
          noteKey: "copy.familyNote"
        },
        EXTEND_3MO: {
          name: { en: "Extend 3 months", es: "Extender 3 meses" },
          term: { en: "/3 months", es: "/3 meses" },
          price: 69.00,
          checkoutLinks: { US: "https://square.link/u/udl-extend-3mo" },
          cryptoLinks:    { US: "" },
          noteKey: "copy.extendNote"
        }
      }
    },

    // Pre-wired populations (set active:true when ready)
    AFGHAN: {
      active: false,
      displayName: { en: "Afghan Community", es: "Comunidad Afgana" },
      plans: {
        INDIVIDUAL_3MO: {
          name:{ en:"Individual", es:"Individual" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 79.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.individualNote"
        },
        FAMILY_3MO: {
          name:{ en:"Family", es:"Familiar" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 129.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.familyNote"
        },
        EXTEND_3MO: {
          name:{ en:"Extend 3 months", es:"Extender 3 meses" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 69.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.extendNote"
        }
      }
    },

    HAITIAN: {
      active: false,
      displayName: { en: "Haitian Community", es: "Comunidad Haitiana" },
      plans: {
        INDIVIDUAL_3MO: {
          name:{ en:"Individual", es:"Individual" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 79.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.individualNote"
        },
        FAMILY_3MO: {
          name:{ en:"Family", es:"Familiar" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 129.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.familyNote"
        },
        EXTEND_3MO: {
          name:{ en:"Extend 3 months", es:"Extender 3 meses" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 69.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.extendNote"
        }
      }
    },

    ASIAN: {
      active: false,
      displayName: { en: "Asian Community", es: "Comunidad Asiática" },
      plans: {
        INDIVIDUAL_3MO: {
          name:{ en:"Individual", es:"Individual" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 79.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.individualNote"
        },
        FAMILY_3MO: {
          name:{ en:"Family", es:"Familiar" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 129.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.familyNote"
        },
        EXTEND_3MO: {
          name:{ en:"Extend 3 months", es:"Extender 3 meses" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 69.00, checkoutLinks:{ US:"" }, cryptoLinks:{ US:"" }, noteKey:"copy.extendNote"
        }
      }
    },

    AFRICAN: {
      active: false,
      displayName: { en: "African Community", es: "Comunidad Africana" },
      plans: {
        INDIVIDUAL_3MO: {
          name:{ en:"Individual", es:"Individual" }, term:{ en:"/3 months", es:"/3 meses" },
          price: 79.00,
