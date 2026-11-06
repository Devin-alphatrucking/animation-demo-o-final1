# OM Telecom LLP — showcase website

A frontend-only showcase site for a multi-brand Indian mobile phone retailer. Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4 and TypeScript.

- Research and design rationale: [`docs/RESEARCH_AND_DESIGN.md`](docs/RESEARCH_AND_DESIGN.md)
- Image sources and usage status: [`docs/ASSET_MANIFEST.md`](docs/ASSET_MANIFEST.md)

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs, Open Graph tags, the sitemap and robots.txt are correct.

## Routes

`/` · `/phones` (search, brand, budget, type and sort filters; shareable URLs such as `/phones?brand=vivo&budget=20k-35k`) · `/phones/[flagship|foldables|camera|performance|iphone|everyday]` · `/brands` · `/brands/[apple|samsung|oneplus|vivo|oppo|xiaomi|redmi]` · `/accessories` · `/stores` · `/about` · `/franchise` · `/contact`

## What is not real yet — replace before launch

Everything below is centralised. Nothing fictional is shown as fact; placeholders are labelled on screen.

| What | Where | Current state |
| --- | --- | --- |
| Phone, WhatsApp, email, franchise email, head office | `src/config/business.ts` → `contact` | `null`, so the site shows "To be confirmed" / "pending" |
| Social profiles, legal/policy pages | `business.social`, `business.legal` | Empty, so nothing is shown |
| Store branches (name, address, hours, phone, map link) | `src/data/stores.ts` | **Sample** entries with `sample: true` and "Region 1–3" tabs |
| Prices | `src/data/products.ts` → `price`, `priceSource` | Official **brand-website** starting prices checked 6 Nov 2026, labelled as such on every card. These are not OM Telecom store prices; replace them or re-check before launch |
| Company story, founding year, milestones | `src/app/about/page.tsx` | Labelled "Awaiting business details" |
| Franchise investment, eligibility, terms | `src/app/franchise/page.tsx` | Labelled "Not yet published" |
| Enquiry forms | `src/components/DemoEnquiryForm.tsx` | **Demo**: validates, but sends and stores nothing |
| Store, staff and founder photos | search `PhotoPlaceholder` | Labelled placeholders |
| Manufacturer image usage rights | `docs/ASSET_MANIFEST.md` | **Not verified**: confirm with brands or distributors |
| Announcement text | `business.announcement` | Mentions new models only; no offers |

The featured line-up and specs were checked against the official India websites on 6 Nov 2026. Review them again whenever the range changes.
