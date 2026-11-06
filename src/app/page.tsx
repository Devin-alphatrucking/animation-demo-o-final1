import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { brands } from "@/data/brands";
import { budgetBands, categories, getProduct, inBudget, PRICES_CHECKED_ON, products, productsByBrand, type Product } from "@/data/products";
import { storeRegions } from "@/data/stores";
import { LogoIntro } from "@/components/LogoIntro";
import { FeaturedEdit } from "@/components/FeaturedEdit";
import { StoreLocator } from "@/components/StoreLocator";
import { ArrowIcon, ButtonLink, Container, Credit, ExternalIcon, PhotoPlaceholder, SectionHeader } from "@/components/ui";

export const metadata = {
  alternates: { canonical: "/" },
};

const editIds = ["galaxy-s26-ultra", "iphone-18-pro", "iphone-duo", "oneplus-15", "vivo-x300-pro", "xiaomi-17-ultra"];

const categoryVisuals: Record<string, { src: string; w: number; h: number; tone: string; fit: "cover" | "contain"; alt: string }> = {
  flagship: { src: "/images/products/samsung-galaxy-s26-ultra.webp", w: 1200, h: 630, tone: "#9a98c8", fit: "cover", alt: "Galaxy S26 Ultra camera close-up" },
  foldables: { src: "/images/products/samsung-galaxy-z-flip8.webp", w: 1200, h: 630, tone: "#f4f4f4", fit: "cover", alt: "Galaxy Z Flip8 phones, one held open" },
  camera: { src: "/images/products/vivo-x300-pro-design.webp", w: 622, h: 852, tone: "#ffffff", fit: "contain", alt: "vivo X300 Pro in gold and white finishes" },
  performance: { src: "/images/products/oneplus-15.webp", w: 679, h: 1587, tone: "#ece7df", fit: "contain", alt: "OnePlus 15 from the back" },
  iphone: { src: "/images/products/apple-iphone-air.webp", w: 744, h: 790, tone: "#a9bdcc", fit: "cover", alt: "iPhone Air in Sky Blue" },
  everyday: { src: "/images/products/oppo-reno16.webp", w: 480, h: 600, tone: "#eef1f5", fit: "contain", alt: "OPPO Reno16 5G in white" },
};

export default function Home() {
  const edit = editIds.map((id) => getProduct(id)).filter(Boolean) as Product[];

  return (
    <>
      <LogoIntro />

      {/* ───────────── Hero ───────────── */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden pb-10 pt-8 lg:pb-16 lg:pt-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <p className="eyebrow hero-rise flex items-center gap-3" style={{ ["--d" as string]: "0ms" }}>
                <span className="h-px w-8 bg-saffron" aria-hidden />
                Multi-brand smartphone retail
              </p>
              <h1
                id="hero-title"
                className="display hero-rise mt-6 text-[3.1rem] sm:text-[4.6rem] lg:text-[6.2rem] xl:text-[7rem]"
                style={{ ["--d" as string]: "80ms" }}
              >
                The right phone,
                <br />
                <span className="serif-accent text-saffron">in your hand</span> first.
              </h1>
            </div>
            <div className="hero-rise lg:col-span-4 lg:pb-3" style={{ ["--d" as string]: "200ms" }}>
              <p className="max-w-md text-[17px] leading-relaxed text-ink-2">
                Compare the latest from Apple, Samsung, OnePlus, vivo, OPPO and Xiaomi — then visit an OM Telecom
                store to try them in person before you decide.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/phones">Explore Phones</ButtonLink>
                <ButtonLink href="/stores" variant="outline">
                  Find a Store
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
            <figure className="lg:col-span-9">
              <div className="hero-unveil relative aspect-[4/3] overflow-hidden rounded-[3px] bg-[#2a2420] sm:aspect-[16/9] lg:aspect-[16/8]" style={{ ["--d" as string]: "250ms" }}>
                <Image
                  src="/images/lifestyle/vivo-x300-pro-photography-kit.webp"
                  alt="vivo X300 Pro in Cloud White beside its photography kit: telephoto extender, grip, filter rings and lens caps on a warm-lit table"
                  fill
                  preload
                  sizes="(min-width: 1440px) 1050px, (min-width: 1024px) 72vw, 100vw"
                  className="object-cover object-[50%_60%]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/55 to-transparent p-5 pt-16 text-white lg:p-7">
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/70">In focus</p>
                    <p className="mt-1 text-[1.15rem] font-semibold tracking-tight lg:text-[1.35rem]">vivo X300 Pro · Photography Kit</p>
                  </div>
                  <Link
                    href="/phones/camera"
                    className="hidden shrink-0 items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[13px] backdrop-blur-md transition hover:bg-white hover:text-ink sm:inline-flex"
                  >
                    Camera phones <ArrowIcon />
                  </Link>
                </div>
              </div>
              <Credit className="mt-2.5">Image: vivo India, official product page</Credit>
            </figure>

            <div className="grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1 lg:grid-rows-[1fr_auto] lg:gap-5">
              <Link href="/phones/foldables" className="group hero-unveil relative block overflow-hidden rounded-[3px] bg-[#ebe6df]" style={{ ["--d" as string]: "420ms" }}>
                <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full">
                  <Image
                    src="/images/products/apple-iphone-duo.webp"
                    alt="iPhone Duo in Star White, partly unfolded"
                    fill
                    preload
                    sizes="(min-width: 1024px) 24vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]"
                  />
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[12px] font-medium backdrop-blur">
                  New · iPhone Duo
                </span>
              </Link>
              <dl className="hero-rise grid content-end gap-4 border-t border-line pt-4 text-[13px]" style={{ ["--d" as string]: "500ms" }}>
                <Stat label="Brands" value={brands.length} />
                <Stat label="Featured models" value={products.length} />
                <Stat label="Ways to browse" value={categories.length} />
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── Brand marquee ───────────── */}
      <section aria-label="Brands" className="marquee-wrap overflow-hidden border-y border-line bg-paper-2 py-5">
        <div className="marquee flex w-max">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1 || undefined}>
              {[...brands, ...brands].map((b, i) => (
                <li key={`${b.id}-${i}`} className="flex items-center">
                  <Link
                    href={`/brands/${b.id}`}
                    tabIndex={dup === 1 || i >= brands.length ? -1 : undefined}
                    className="px-7 text-[1.6rem] font-semibold tracking-[-0.03em] text-ink/70 transition-colors hover:text-saffron lg:px-10 lg:text-[2rem]"
                  >
                    {b.name}
                  </Link>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-saffron" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ───────────── 01 The Edit ───────────── */}
      <section aria-labelledby="edit-title" className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="The Edit"
            title={
              <span id="edit-title">
                This season&apos;s <span className="serif-accent">flagships</span>, side by side.
              </span>
            }
            intro="A short list of the phones people are asking about. Specs are quoted from each manufacturer's official India page."
            action={
              <Link href="/phones" className="link-underline inline-flex w-fit items-center gap-2 text-[15px] font-medium">
                See all phones <ArrowIcon />
              </Link>
            }
          />
          <div className="mt-12 lg:mt-16">
            <FeaturedEdit items={edit} />
          </div>
        </Container>
      </section>

      {/* ───────────── Campaign band ───────────── */}
      <section aria-labelledby="pro-title" className="relative bg-black text-white">
        <div className="relative mx-auto max-w-[1600px]">
          <div className="reveal-mask relative aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/7]" style={{ ["--mask-bg" as string]: "#000" }}>
            <Image
              src="/images/products/apple-iphone-18-pro-campaign.webp"
              alt="iPhone 18 Pro in Burgundy lying in front of large chrome PRO lettering"
              fill
              sizes="(min-width: 1600px) 1600px, 100vw"
              className="object-cover object-[50%_58%] sm:object-center"
            />
          </div>
          <div className="absolute inset-x-0 top-0 p-6 sm:p-10 lg:p-14">
            <p className="reveal font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">Apple · iPhone 18 Pro</p>
            <h2 id="pro-title" className="reveal display mt-3 max-w-xl text-[2.2rem] sm:text-[3.2rem] lg:text-[4rem]" style={{ ["--reveal-delay" as string]: "100ms" }}>
              Pro, <span className="serif-accent">up close.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 px-6 pb-8 sm:absolute sm:right-0 sm:top-0 sm:items-end sm:p-10 lg:p-14">
            <p className="max-w-sm text-[15px] text-white/75 sm:text-right">
              A20 Pro chip and a 48MP Main camera with variable aperture — see how it compares with other flagships.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/phones/flagship" variant="light">
                Compare flagships
              </ButtonLink>
              <a
                href="https://www.apple.com/in/iphone-18-pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-5 text-[14px] transition hover:border-white"
              >
                apple.com/in <ExternalIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
        <Credit className="mx-auto max-w-[1600px] px-6 pb-4 text-white/45 sm:px-10 lg:px-14">Image: Apple India, official iPhone page</Credit>
      </section>

      {/* ───────────── 02 Shop by budget ───────────── */}
      <section aria-labelledby="budget-title" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="Shop by budget"
            title={
              <span id="budget-title">
                Start with what you <span className="serif-accent">want to spend.</span>
              </span>
            }
            intro={`Pick a price range to see matching phones. Prices are official brand-website starting prices, checked ${PRICES_CHECKED_ON}.`}
          />
          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[3px] border border-line bg-line min-[480px]:grid-cols-2 lg:mt-16 lg:grid-cols-5">
            {budgetBands.map((band, i) => {
              const list = products.filter((p) => inBudget(p, band));
              const thumbs = list.filter((p) => p.image.fit === "contain").slice(0, 3);
              return (
                <li
                  key={band.id}
                  className={`reveal ${i === 4 ? "min-[480px]:col-span-2 lg:col-span-1" : ""}`}
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                >
                  <Link href={`/phones?budget=${band.id}`} className="group flex h-full flex-col bg-card p-5 transition-colors hover:bg-paper lg:p-6">
                    <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-3 text-[1.9rem] font-semibold leading-none tracking-[-0.04em] lg:text-[2.1rem]">{band.short}</span>
                    <span className="mt-2 text-[13.5px] text-muted">{band.label}</span>
                    <span aria-hidden className="mt-6 flex h-24 items-end gap-1">
                      {thumbs.map((p) => (
                        <span key={p.id} className="relative h-full flex-1">
                          <Image src={p.image.src} alt="" fill sizes="80px" className="object-contain object-bottom transition-transform duration-500 group-hover:-translate-y-1" />
                        </span>
                      ))}
                    </span>
                    <span className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[14px]">
                      <span>
                        <span className="font-semibold">{list.length}</span> {list.length === 1 ? "phone" : "phones"}
                      </span>
                      <ArrowIcon className="transition-transform group-hover:translate-x-1 group-hover:text-saffron" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ───────────── 03 Categories ───────────── */}
      <section aria-labelledby="cat-title" className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            index="03"
            eyebrow="Browse by need"
            title={
              <span id="cat-title">
                Start with how you <span className="serif-accent">use</span> your phone.
              </span>
            }
            intro="Six simple ways into the range — from book-style foldables to tough everyday phones with all-day batteries."
          />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 lg:mt-16 lg:grid-cols-12 lg:gap-x-5 lg:gap-y-12">
            {categories.map((c, i) => {
              const v = categoryVisuals[c.id];
              const big = i === 0 || i === 3;
              return (
                <li
                  key={c.id}
                  className={`reveal ${big ? "col-span-2 lg:col-span-6" : "col-span-1 lg:col-span-3"}`}
                  style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}
                >
                  <Link href={`/phones/${c.id}`} className="group block">
                    <div
                      className={`relative overflow-hidden rounded-[3px] ${big ? "aspect-[16/10] lg:aspect-[16/11]" : "aspect-[4/5] lg:aspect-[3/4.4]"}`}
                      style={{ backgroundColor: v.tone }}
                    >
                      <Image
                        src={v.src}
                        alt={v.alt}
                        fill
                        sizes={big ? "(min-width: 1024px) 48vw, 100vw" : "(min-width: 1024px) 24vw, 50vw"}
                        className={`transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] group-hover:scale-[1.05] ${
                          v.fit === "contain" ? "object-contain p-[10%]" : "object-cover"
                        }`}
                      />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</p>
                        <h3 className="mt-1 text-[1.25rem] font-semibold tracking-tight lg:text-[1.4rem]">{c.name}</h3>
                        <p className="mt-1 hidden max-w-xs text-[14px] text-ink-2 sm:block">{c.blurb}</p>
                      </div>
                      <span className="mt-6 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-saffron group-hover:bg-saffron group-hover:text-white">
                        <ArrowIcon />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ───────────── 04 Brands ───────────── */}
      <section aria-labelledby="brands-title" className="bg-paper-2 py-20 lg:py-28">
        <Container>
          <SectionHeader
            index="04"
            eyebrow="Brands"
            title={
              <span id="brands-title">
                Seven brands. <span className="serif-accent">One counter.</span>
              </span>
            }
            intro="Compare across brands in one visit instead of hopping between brand stores."
          />
          <ul className="mt-12 border-t border-ink/15 lg:mt-16">
            {brands.map((b, i) => (
              <li key={b.id} className="reveal border-b border-ink/15" style={{ ["--reveal-delay" as string]: `${i * 40}ms` }}>
                <div className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-5 lg:grid-cols-12 lg:py-6">
                  <Link
                    href={`/brands/${b.id}`}
                    className="col-start-1 row-start-1 text-[2rem] font-semibold tracking-[-0.035em] transition-colors group-hover:text-saffron lg:col-span-4 lg:col-start-auto lg:row-start-auto lg:text-[3rem]"
                  >
                    {b.name}
                  </Link>
                  <p className="col-span-2 row-start-2 text-[14px] text-muted lg:col-span-5 lg:row-start-auto lg:text-[15px]">
                    <span className="font-medium text-ink-2">{productsByBrand(b.id).length} models</span> · {b.note}
                  </p>
                  <div className="col-start-2 row-start-1 flex items-center justify-end gap-5 text-[14px] lg:col-span-3 lg:col-start-auto lg:row-start-auto">
                    <a
                      href={b.officialSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden items-center gap-1.5 text-muted hover:text-ink sm:inline-flex"
                    >
                      Official site <ExternalIcon />
                      <span className="sr-only">for {b.name} (opens in a new tab)</span>
                    </a>
                    <Link
                      href={`/brands/${b.id}`}
                      aria-label={`View ${b.name} phones`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 transition-colors group-hover:border-saffron group-hover:bg-saffron group-hover:text-white"
                    >
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] text-muted">
            Brand names are trademarks of their owners and are shown for identification only.
          </p>
        </Container>
      </section>

      {/* ───────────── 05 In-store experience ───────────── */}
      <section aria-labelledby="exp-title" className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="rule-tick" />
                <div className="mt-5 flex items-center gap-3">
                  <span className="eyebrow text-saffron">05</span>
                  <span className="eyebrow">In store</span>
                </div>
                <h2 id="exp-title" className="display reveal mt-5 text-[2.4rem] sm:text-[3.2rem] lg:text-[3.6rem]">
                  Specs on a screen only <span className="serif-accent">go so far.</span>
                </h2>
                <p className="reveal mt-6 max-w-sm text-[16px] leading-relaxed text-ink-2">
                  Weight, grip, screen brightness, how the camera feels in your hand — some things you have to try.
                  That&apos;s what our stores are for.
                </p>
                <div className="reveal mt-8">
                  <ButtonLink href="/stores">Find your nearest store</ButtonLink>
                </div>
              </div>
            </div>

            <ol className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:col-span-8">
              <ExperienceStep
                n="01"
                title="Hold it before you choose"
                text="Pick up the phones on your shortlist and feel the size, weight and finish for yourself."
                credit="Image: Apple India"
              >
                <Image src="/images/lifestyle/apple-unboxing-hands.webp" alt="One hand holding an iPhone while another holds a new iPhone 18 Pro in its box" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-[50%_30%]" />
              </ExperienceStep>
              <ExperienceStep
                n="02"
                title="Compare side by side"
                text="Try the cameras, the displays and the speakers next to each other instead of reading spec sheets."
                credit="Image: Samsung India"
                offset
              >
                <Image src="/images/products/samsung-galaxy-z-flip8.webp" alt="Three Galaxy Z Flip8 phones side by side in silver, black and pink" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-[40%_50%]" />
              </ExperienceStep>
              <ExperienceStep
                n="03"
                title="Complete the setup"
                text="Find a case, charger, cable or earbuds that suit the phone you've picked."
                credit="Image: Apple India"
              >
                <Image src="/images/lifestyle/apple-iphone-accessories.webp" alt="iPhones with a MagSafe charger, a leather-style wallet and a fabric case" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </ExperienceStep>
              <ExperienceStep n="04" title="Talk it through" text="Ask the store team your questions and take your time to decide." offset>
                <PhotoPlaceholder label="OM Telecom store team" className="absolute inset-0" />
              </ExperienceStep>
            </ol>
          </div>
        </Container>
      </section>

      {/* ───────────── 06 Stores ───────────── */}
      <section aria-labelledby="stores-title" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <Container>
          <SectionHeader
            index="06"
            eyebrow="Our stores"
            title={
              <span id="stores-title">
                Come in and <span className="serif-accent">try it.</span>
              </span>
            }
            intro="Branch addresses, hours and phone numbers are being confirmed. The listings below are placeholders until then."
            action={
              <Link href="/stores" className="link-underline inline-flex w-fit items-center gap-2 text-[15px] font-medium">
                All stores <ArrowIcon />
              </Link>
            }
          />
          <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8">
              <StoreLocator regions={storeRegions} />
            </div>
            <PhotoPlaceholder
              label="Storefront photograph"
              className="reveal aspect-[4/3] rounded-[3px] lg:col-span-4 lg:aspect-auto"
            />
          </div>
        </Container>
      </section>

      {/* ───────────── 07 Franchise ───────────── */}
      <section aria-labelledby="fr-title" className="bg-navy text-white">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-saffron">07</span>
                <span className="eyebrow text-white/60">Franchise</span>
              </div>
              <h2 id="fr-title" className="display reveal mt-5 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.6rem]">
                Grow with {business.name}.{" "}
                <span className="serif-accent text-saffron">Open a store.</span>
              </h2>
              <p className="reveal mt-6 max-w-lg text-[17px] leading-relaxed text-white/75">
                We&apos;re open to conversations with people who want to run a multi-brand mobile store under the{" "}
                {business.name} name. Register your interest and tell us a little about yourself and your city.
              </p>
              <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/franchise" variant="accent">
                  Learn more
                </ButtonLink>
                <Link
                  href="/franchise#enquire"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-[15px] font-medium transition-colors hover:border-white hover:bg-white hover:text-navy"
                >
                  Enquire now
                </Link>
              </div>
            </div>
            <figure className="lg:col-span-5 lg:col-start-8">
              <div className="reveal-mask relative aspect-[4/3] overflow-hidden rounded-[3px] bg-white" style={{ ["--mask-bg" as string]: "var(--color-navy)" }}>
                <Image
                  src="/images/lifestyle/apple-trade-in-hands.webp"
                  alt="One hand passing over a used iPhone while another hand offers a new iPhone 18 Pro in its box"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <Credit className="mt-2.5 text-white/45">Image: Apple India</Credit>
            </figure>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between border-b border-line pb-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-[1.5rem] font-semibold tracking-tight">{String(value).padStart(2, "0")}</dd>
    </div>
  );
}

function ExperienceStep({
  n,
  title,
  text,
  credit,
  offset = false,
  children,
}: {
  n: string;
  title: string;
  text: string;
  credit?: string;
  offset?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={`reveal ${offset ? "sm:mt-24" : ""}`}>
      <div className="reveal-mask relative aspect-[4/5] overflow-hidden rounded-[3px] bg-paper-2">{children}</div>
      {credit && <Credit className="mt-2.5">{credit}</Credit>}
      <div className="mt-4 flex gap-4">
        <span className="font-mono text-[12px] text-saffron">{n}</span>
        <div>
          <h3 className="text-[1.3rem] font-semibold tracking-tight">{title}</h3>
          <p className="mt-1.5 max-w-sm text-[15px] leading-relaxed text-ink-2">{text}</p>
        </div>
      </div>
    </li>
  );
}
