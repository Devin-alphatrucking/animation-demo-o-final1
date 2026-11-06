import type { Metadata } from "next";
import { storeRegions, hasVerifiedStores } from "@/data/stores";
import { PageHero } from "@/components/PageHero";
import { StoreLocator } from "@/components/StoreLocator";
import { Container, PhotoPlaceholder, SampleTag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Stores",
  description: "Find an OM Telecom store near you to see, compare and try smartphones in person.",
  alternates: { canonical: "/stores" },
};

export default function StoresPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Stores"
        title={
          <>
            Find a store <span className="serif-accent text-saffron">near you.</span>
          </>
        }
        intro={
          <p>
            Choose a region to see store details. Visit to see the phones in person, compare them and ask questions.
          </p>
        }
      />
      <Container>
        {!hasVerifiedStores && (
          <div role="note" className="mb-10 flex flex-col gap-3 rounded-[3px] border border-saffron/30 bg-saffron/5 p-5 sm:flex-row sm:items-center">
            <SampleTag>Sample data</SampleTag>
            <p className="text-[14px] text-ink-2">
              Store locations have not been confirmed yet. The listings below are placeholders showing how branches will
              appear — they are not real addresses.
            </p>
          </div>
        )}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <StoreLocator regions={storeRegions} />
          </div>
          <div className="grid gap-5 lg:col-span-4">
            <PhotoPlaceholder label="Store interior" className="aspect-[4/3] rounded-[3px] lg:aspect-auto" />
            <PhotoPlaceholder label="Phone display counter" className="aspect-[4/3] rounded-[3px] lg:aspect-auto" />
          </div>
        </div>

        <section aria-labelledby="visit-title" className="mt-24 grid gap-10 border-t border-line pt-12 lg:grid-cols-12">
          <h2 id="visit-title" className="display text-[2.2rem] lg:col-span-4 lg:text-[3rem]">
            When you <span className="serif-accent">visit</span>
          </h2>
          <ol className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {[
              ["Bring your shortlist", "Note the models you're considering so you can compare them side by side."],
              ["Try the cameras", "Take a few photos and videos in store to see the difference for yourself."],
              ["Ask about the details", "Check current price and availability with the store team before you buy."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <p className="font-mono text-[12px] text-saffron">0{i + 1}</p>
                <h3 className="mt-2 text-[1.2rem] font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </>
  );
}
