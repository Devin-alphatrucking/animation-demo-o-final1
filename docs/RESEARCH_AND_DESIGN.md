# Competitor research and design direction

Research done 6 November 2026 by fetching each homepage. Observations are what was actually returned; stylesheets weren't visible through the fetch, so colours and fonts aren't reported from it.

## 1. Observations (facts)

| Site | Result | What we saw |
| --- | --- | --- |
| **Mehul Telecom** (primary reference) | Loaded (WordPress) | Nav: Home, About, Gallery, Our Store, an **Investor** menu (annual reports, SME IPO, grievance redressal), Contact. Hero is a rotating banner slider (Apple, Oppo, Realme, Samsung, Vivo). Repeated "Iconic Brands" logo wall. Image-only category tiles (iPhone, Samsung, Vivo, smartwatch, buds, neckband, speaker, covers). No prices. Store info on a separate page. No franchise section. Contact uses a phone link and email; no WhatsApp. Trust signals: "since 1999", an awards slider, a store-count graphic. |
| **KORE Mobiles** | Loaded | Nav: Stores, About, Contact, Investors, plus a header phone CTA and "Get In Touch". Hero leads with a founding year and a store count. Hero CTAs: Explore Stores, About, **Franchise Inquiry**, Customer Inquiry. No product grid on the homepage. Separate `/locations` store page and `/inquiry/franchise` route. Icon "pillars" (genuine products, EMI and bank offers, personal guidance) and a note that offers vary by store. |
| **PhoneWale** | Loaded (WooCommerce) | E-commerce header: Track Order, WhatsApp chat, "Store near me", search, cart. Category mega-menu (Mobiles, Accessories, Laptops, TVs, Audio, Wearables). "No Cost EMI" and offers blocks. Store locator on a subdomain. "Become Partner" footer link. Store-count claim, payment-method logos. |
| **Reliance Digital** | Loaded, thin markup | Utility header (Orders, Contact, Find a store, Cart). Stacked promotional banners with no text in the markup. |
| **Sangeetha Mobiles** | Redirected to sangeetha.com, rendered client-side | Only the page title came back, so nothing could be assessed. |
| **Croma** | **Inaccessible** | HTTP 403. |
| **Poojara Telecom** | **Inaccessible** | DNS lookup failed. |

Not attempted: Poorvika, Vijay Sales and Mi Stores. Five sites returned usable content, which met the minimum.

### Patterns across the sites

- Regional chains (Mehul, KORE) are **business-first**: they lead with how long they've traded and how many stores they have, and include investor and franchise routes. Big-box sites (PhoneWale, Reliance) are **promotion-first**, with banner carousels, EMI and offers.
- Product presentation is mostly **brand banners plus logo walls**. None of the regional sites present products in an editorial way.
- **Franchise** pitches exist only as a CTA and inquiry route. None of the sites tell a story around them.
- **Store locators** always live on a separate page or subdomain, and are rarely previewed on the homepage.
- WhatsApp shows up mainly on the e-commerce site. Phone CTAs are common.

## 2. Design recommendations (our decisions)

| Insight | Decision for OM Telecom |
| --- | --- |
| Competitors look interchangeable: carousels, logo walls, promo banners | Use an **editorial, art-directed** layout: big type, asymmetric photo compositions and a numbered section system (01–06). No carousel hero. |
| Promotion-led messaging needs verified offers, which we don't have | Lead with the **in-store experience**: "The right phone, *in your hand* first." No discounts, EMI or price claims. |
| Logo walls add noise and need permission for each brand's marks | Show brands as **text in our own typeface** (a marquee and a ruled index). Link to the official sites. |
| Store info is hidden on sub-pages | **Preview the store locator on the homepage** (tabs and cards), with the full page at `/stores`. |
| Franchise is just a button elsewhere | Give franchise a **full navy band** and its own page, with a clear process. Investment terms are explicitly marked "not yet published". |
| Product pages copy spec sheets | **"The Edit"**: a numbered index that drives a large photo on desktop and becomes a swipeable rail on mobile. Specs are quoted from official pages, each with an "Official specs" link. |

### Visual system

- **Colour.** Warm paper `#F6F3EE` / `#EFEAE2`, ink `#15171C`. The saffron accent `#EE5A0C` and navy `#16245A` are sampled from the supplied logo; the logo's blue is kept for the logo itself. Paper keeps the photography in front; saffron is used sparingly for ticks, active states, italic accents and primary hover.
- **Type.** Geist Sans for UI and display (tight −0.035em tracking), *Instrument Serif italic* for single accent phrases, Geist Mono for eyebrows, indices and photo credits.
- **Layout.** A 12-column grid up to 1440px. 16/24/40px gutters. Hairline rules with a saffron "tick" open each section. Corners are 3px rather than oversized rounded cards. No glassmorphism and no decorative gradients; the only gradient is a scrim for legible captions on photos.
- **Image treatment.** Cut-outs sit on a tone sampled from the image (`tone` in `products.ts`). Scenes are cover-cropped. Every manufacturer image carries a mono "Image: Brand India" credit.
- **Motion.** A CSS-only logo intro (about 1.5s, once per session, homepage only, never blocks clicks). Hero rise and unveil. IntersectionObserver reveals with fade-up text and wipe-off image overlays. Crossfades on the featured list. All of it is disabled under `prefers-reduced-motion`, and content stays visible without JS. No animation library.

## 3. Architecture

```
src/
  config/business.ts        ← name, tagline, logo, contact (null = hidden), social, legal, announcement
  data/products.ts          ← 11 phones, 6 categories, verified highlights, official URLs, price: null
  data/brands.ts            ← 7 brands (text only), official sites
  data/stores.ts            ← SAMPLE regions/stores (sample: true)
  data/accessories.ts       ← generic accessory types
  data/navigation.ts
  components/               ← SiteHeader*, AnnouncementBar*, FeaturedEdit*, StoreLocator*, DemoEnquiryForm*,
                               RevealObserver*, SiteFooter, PageHero, ProductCard, LogoIntro, ui.tsx   (* = client)
  app/                      ← /, /phones, /phones/[category] (static params), /accessories, /stores,
                               /about, /franchise, /contact, not-found, sitemap.ts, robots.ts, icon.png
```

Pages are Server Components. Client code is limited to the menu, the announcement dismiss, tabs, the featured list, the demo form and one global reveal observer.
