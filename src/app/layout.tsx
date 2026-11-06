import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { business } from "@/config/business";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.legalName} — Smartphones, accessories and stores`,
    template: `%s · ${business.name}`,
  },
  description: business.description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: business.legalName,
    locale: "en_IN",
    title: `${business.legalName} — ${business.tagline}`,
    description: business.description,
    images: [{ url: "/images/brand/og-image.png", width: 1200, height: 630, alt: business.logo.alt }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
};

/**
 * Runs before paint:
 *  - marks JS as available so scroll-reveal styles only apply when they can resolve
 *  - plays the logo intro only on the first homepage view of the session
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname!=='/'||sessionStorage.getItem('om-intro')){d.classList.add('intro-seen')}else{sessionStorage.setItem('om-intro','1')}}catch(e){d.classList.add('intro-seen')}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[200] rounded bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main" className="flex-1 [&>div:last-child]:pb-24 lg:[&>div:last-child]:pb-32">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
