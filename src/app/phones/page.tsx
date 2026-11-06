import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { PageHero } from "@/components/PageHero";
import { Catalogue } from "@/components/Catalogue";
import { ArrowIcon, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "All phones — search by brand and budget",
  description:
    "Browse smartphones from Apple, Samsung, OnePlus, vivo, OPPO, Xiaomi and Redmi. Filter by brand, budget and type, and compare official starting prices.",
  alternates: { canonical: "/phones" },
};

export default function PhonesPage() {
  return (
    <>
      <PageHero
        eyebrow="Phones"
        title={
          <>
            Every phone, <span className="serif-accent text-saffron">one place.</span>
          </>
        }
        intro={
          <p>
            {products.length} models from {brands.length} brands. Search by name, filter by brand or budget, and sort
            by price. Specs and starting prices come from each manufacturer&apos;s official India website.
          </p>
        }
      />
      <Container>
        <Catalogue items={products} />

        <aside className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[3px] bg-ink p-8 text-paper sm:flex-row sm:items-center lg:p-12">
          <div>
            <p className="eyebrow text-paper/60">Not listed here?</p>
            <p className="mt-2 max-w-xl text-[1.4rem] font-semibold tracking-tight lg:text-[1.9rem]">
              Stores may carry other models too. Ask the team about anything you don&apos;t see.
            </p>
          </div>
          <Link
            href="/stores"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-saffron px-6 text-[15px] font-medium text-white hover:bg-saffron-deep"
          >
            Find a Store <ArrowIcon />
          </Link>
        </aside>
      </Container>
    </>
  );
}
