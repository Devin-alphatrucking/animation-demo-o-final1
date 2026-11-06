import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";
import { brandPriceRange as priceRange, formatINR, productsByBrand } from "@/data/products";
import { PageHero } from "@/components/PageHero";
import { ArrowIcon, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Brands",
  description: "Shop phones by brand: Apple, Samsung, OnePlus, vivo, OPPO, Xiaomi and Redmi.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brands"
        title={
          <>
            Shop by <span className="serif-accent text-saffron">brand.</span>
          </>
        }
        intro={<p>Pick a brand to see every model we feature from it, with official starting prices and specs.</p>}
      />
      <Container>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => {
            const list = productsByBrand(b.id);
            const lead = list[0];
            const range = priceRange(b.id);
            return (
              <li key={b.id} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
                <Link href={`/brands/${b.id}`} className="group block h-full overflow-hidden rounded-[3px] border border-line bg-card transition-colors hover:border-ink">
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: lead.image.tone }}>
                    <Image
                      src={lead.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      style={{ objectPosition: lead.image.position }}
                      className={`transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] group-hover:scale-[1.04] ${
                        lead.image.fit === "contain" ? "object-contain p-[7%]" : "object-cover"
                      }`}
                    />
                  </div>
                  <div className="flex items-end justify-between gap-4 p-5 lg:p-6">
                    <div>
                      <h2 className="display text-[2rem] lg:text-[2.4rem]">{b.name}</h2>
                      <p className="mt-2 text-[14px] text-muted">{b.note}</p>
                      <p className="mt-3 text-[13.5px]">
                        <span className="font-semibold">{list.length} models</span>
                        {range && (
                          <span className="text-muted">
                            {" "}
                            · {formatINR(range.min)} – {formatINR(range.max)}
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-saffron group-hover:bg-saffron group-hover:text-white">
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
