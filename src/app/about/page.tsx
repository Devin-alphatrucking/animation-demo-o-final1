import type { Metadata } from "next";
import Image from "next/image";
import { business } from "@/config/business";
import { brands } from "@/data/brands";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, Credit, PhotoPlaceholder, SampleTag } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: `${business.legalName} — a multi-brand smartphone retailer. ${business.tagline}.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Many brands, one visit",
    text: `Phones from ${brands.length} brands under one roof, so you can compare without going from shop to shop.`,
  },
  {
    title: "Try before you decide",
    text: "We think the best way to choose a phone is to hold it, use it and compare it in person.",
  },
  {
    title: "Clear, honest information",
    text: "Specs come from the manufacturers. Prices and availability are confirmed with you in store.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            {business.tagline.split(",")[0]},{" "}
            <span className="serif-accent text-saffron">{business.tagline.split(",")[1]?.trim()}.</span>
          </>
        }
        intro={<p>{business.description}</p>}
      />
      <Container>
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="flex items-center justify-center rounded-[3px] bg-white p-10 lg:col-span-5">
            <Image
              src={business.logo.src}
              width={business.logo.width}
              height={business.logo.height}
              alt={business.logo.alt}
              sizes="(min-width: 1024px) 34vw, 80vw"
              className="reveal h-auto w-full max-w-[420px]"
            />
          </div>
          <figure className="lg:col-span-7">
            <div className="reveal-mask relative aspect-[16/10] overflow-hidden rounded-[3px] bg-[#9a98c8]">
              <Image
                src="/images/products/samsung-galaxy-z-fold8.webp"
                alt="A hand holding the Galaxy Z Fold8"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
            <Credit className="mt-2.5">Image: Samsung India</Credit>
          </figure>
        </div>

        <section aria-labelledby="story-title" className="mt-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rule-tick" />
            <h2 id="story-title" className="display mt-6 text-[2.2rem] lg:text-[3rem]">
              Our <span className="serif-accent">story</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SampleTag>Awaiting business details</SampleTag>
            <p className="mt-5 text-[1.35rem] leading-snug tracking-tight text-ink lg:text-[1.6rem]">
              This space is for the {business.legalName} story — when and where the business started, who runs it and
              how it has grown.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Founding year, store count, milestones and awards will be added once they are confirmed by the business.
              Nothing here has been invented.
            </p>
          </div>
        </section>

        <section aria-labelledby="principles-title" className="mt-24 border-t border-line pt-12">
          <h2 id="principles-title" className="eyebrow">
            How we want to help
          </h2>
          <ol className="mt-8 grid gap-10 sm:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <p className="font-mono text-[12px] text-saffron">0{i + 1}</p>
                <h3 className="mt-2 text-[1.4rem] font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-24 grid gap-5 sm:grid-cols-2">
          <PhotoPlaceholder label="Founders or leadership team" className="aspect-[4/3] rounded-[3px]" />
          <PhotoPlaceholder label="First OM Telecom store" className="aspect-[4/3] rounded-[3px]" />
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <ButtonLink href="/stores">Find a Store</ButtonLink>
          <ButtonLink href="/franchise" variant="outline">
            Franchise
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
