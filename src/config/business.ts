/**
 * Central business configuration.
 *
 * VERIFIED: name, legal suffix, tagline and logo come from the official logo
 * artwork supplied by the business owner (public/images/brand/om-telecom-logo.webp).
 *
 * NOT VERIFIED: every contact field below is intentionally `null`. The UI
 * hides or labels anything that is null, so nothing fictional is shown.
 * Fill these in once the business confirms them.
 */
export type BusinessConfig = {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  copyrightYear: number;
  description: string;
  siteUrl: string;
  logo: { src: string; width: number; height: number; alt: string };
  contact: {
    phone: string | null; // e.g. "+91 98xxxxxxx"
    whatsapp: string | null; // digits only incl. country code, e.g. "9198xxxxxxxx"
    email: string | null;
    franchiseEmail: string | null;
    headOfficeAddress: string | null;
  };
  social: { label: string; href: string }[]; // add only verified profiles
  legal: { label: string; href: string }[]; // add only supplied policies
  announcement: { id: string; text: string; href?: string; linkLabel?: string } | null;
};

export const business: BusinessConfig = {
  name: "OM Telecom",
  legalName: "OM Telecom LLP",
  shortName: "OM Telecom",
  tagline: "Connecting you, everyday",
  copyrightYear: 2026,
  description:
    "OM Telecom LLP is a multi-brand mobile phone retailer. Explore smartphones from Apple, Samsung, OnePlus, vivo, OPPO, Xiaomi and Redmi, find accessories, and visit a store to try devices in person.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: {
    src: "/images/brand/om-telecom-logo.webp",
    width: 1100,
    height: 839,
    alt: "OM Telecom LLP — Connecting you, everyday",
  },
  contact: {
    phone: null,
    whatsapp: null,
    email: null,
    franchiseEmail: null,
    headOfficeAddress: null,
  },
  social: [],
  legal: [],
  announcement: {
    id: "lineup-2026",
    text: "New in the line-up: iPhone 18 Pro, Galaxy Z Fold8, OnePlus 15 and Xiaomi 17 Ultra.",
    href: "/phones",
    linkLabel: "See the phones",
  },
};

export const hasDirectContact = Boolean(
  business.contact.phone || business.contact.whatsapp || business.contact.email,
);
