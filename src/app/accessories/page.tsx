import type { Metadata } from "next";
import Image from "next/image";
import { accessoryGroups } from "@/data/accessories";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, Credit } from "@/components/ui";

export const metadata: Metadata = {
  title: "Accessories",
  description: "Cases, chargers, power banks, earbuds, smartwatches and mobile photography kits to go with your phone.",
  alternates: { canonical: "/accessories" },
};

export default function AccessoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessories"
        title={
          <>
            The finishing <span className="serif-accent text-saffron">touches.</span>
          </>
        }
        intro={<p>Protect it, power it, listen with it. The accessory range varies by store — ask the team what&apos;s on the shelf.</p>}
      />
      <Container>
        <div className="grid gap-5 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <div className="reveal-mask relative aspect-[4/3] overflow-hidden rounded-[3px] bg-[#f2f2f2]">
              <Image
                src="/images/lifestyle/apple-iphone-accessories.webp"
                alt="iPhones with a MagSafe charger, a wallet and a fabric case"
                fill
                preload
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
            <Credit className="mt-2.5">Image: Apple India</Credit>
          </figure>
          <figure className="lg:col-span-5">
            <div className="reveal-mask relative aspect-[4/3] overflow-hidden rounded-[3px] bg-[#2a2420] lg:aspect-auto lg:h-[calc(100%-1.75rem)]" style={{ ["--reveal-delay" as string]: "150ms" }}>
              <Image
                src="/images/lifestyle/vivo-x300-pro-photography-kit.webp"
                alt="vivo X300 Pro photography kit with telephoto extender, grip and filter rings"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[45%_60%]"
              />
            </div>
            <Credit className="mt-2.5">Image: vivo India</Credit>
          </figure>
        </div>

        <div className="mt-20 border-t border-line lg:mt-28">
          {accessoryGroups.map((g, i) => (
            <section
              key={g.id}
              aria-labelledby={`acc-${g.id}`}
              className="reveal grid gap-4 border-b border-line py-8 lg:grid-cols-12 lg:py-10"
            >
              <p className="font-mono text-[12px] text-saffron lg:col-span-1">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`acc-${g.id}`} className="display text-[2rem] lg:col-span-4 lg:text-[2.8rem]">
                {g.name}
              </h2>
              <ul className="flex flex-wrap content-start gap-2 lg:col-span-7">
                {g.items.map((it) => (
                  <li key={it} className="rounded-full border border-line-strong px-4 py-2 text-[14px] text-ink-2">
                    {it}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[15px] text-ink-2">
            Not sure what fits your phone? Bring it in and the team can help you choose.
          </p>
          <ButtonLink href="/stores">Find a Store</ButtonLink>
        </div>
      </Container>
    </>
  );
}
