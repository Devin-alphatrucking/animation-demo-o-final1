import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/data/brands";
import { brandPriceRange as priceRange, formatINR, productsByBrand } from "@/data/products";
import { PageHero } from "@/components/PageHero";
import { Catalogue } from "@/components/Catalogue";
import { Container, ExternalIcon } from "@/components/ui";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.id }));
}

export async function generateMetadata({ params }: PageProps<"/brands/[brand]">): Promise<Metadata> {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) return {};
  const n = productsByBrand(b.id).length;
  return {
    title: `${b.name} phones`,
    description: `All ${n} ${b.name} phones we feature — ${b.note}. Filter by budget and compare official starting prices.`,
    alternates: { canonical: `/brands/${b.id}` },
  };
}

export default async function BrandPage({ params }: PageProps<"/brands/[brand]">) {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) notFound();
  const list = productsByBrand(b.id);
  const range = priceRange(b.id);

  return (
    <>
      <PageHero
        eyebrow={b.name}
        crumbs={[{ label: "Brands", href: "/brands" }]}
        title={
          <>
            {b.name}
            <span className="text-saffron">.</span>
          </>
        }
        intro={
          <div>
            <p>{b.note}.</p>
            <p className="mt-3 text-[15px] text-muted">
              {list.length} models{range && ` · official prices from ${formatINR(range.min)} to ${formatINR(range.max)}`}
            </p>
            <a
              href={b.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium"
            >
              Official {b.name} website <ExternalIcon />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        }
      >
        <nav aria-label="Other brands" className="mt-10">
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {brands.map((o) => (
              <li key={o.id} className="shrink-0">
                <Link
                  href={`/brands/${o.id}`}
                  aria-current={o.id === b.id ? "page" : undefined}
                  className={`inline-flex h-9 items-center rounded-full border px-4 text-[14px] transition-colors ${
                    o.id === b.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line-strong text-ink-2 hover:border-ink hover:text-ink"
                  }`}
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>
      <Container>
        <Catalogue items={list} lockedBrand={b.id} />
      </Container>
    </>
  );
}
