import type { Metadata } from "next";
import Image from "next/image";
import { business } from "@/config/business";
import { brands } from "@/data/brands";
import { PageHero } from "@/components/PageHero";
import { DemoEnquiryForm } from "@/components/DemoEnquiryForm";
import { Container, Credit, SampleTag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Franchise",
  description: `Interested in running a multi-brand mobile store with ${business.legalName}? Register your interest.`,
  alternates: { canonical: "/franchise" },
};

const steps = [
  { t: "Register interest", d: "Share your name, city and a little about your background using the form below." },
  { t: "Introductory conversation", d: "Where there is a fit, a conversation about your plans and preferred location." },
  { t: "Programme details", d: "Requirements, investment and terms are shared directly — they are not published here." },
];

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="Franchise"
        title={
          <>
            Grow with {business.name}. <span className="serif-accent text-saffron">Open a store.</span>
          </>
        }
        intro={
          <p>
            For people who want to run a multi-brand mobile phone store under the {business.name} name, bringing{" "}
            {brands.length} leading smartphone brands to their neighbourhood.
          </p>
        }
      />
      <Container>
        <figure className="lg:ml-auto lg:w-[62%]">
          <div className="reveal-mask relative aspect-[4/3] overflow-hidden rounded-[3px] bg-white">
            <Image
              src="/images/lifestyle/apple-trade-in-hands.webp"
              alt="One hand passing over a used iPhone while another offers a new iPhone 18 Pro in its box"
              fill
              preload
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <Credit className="mt-2.5">Image: Apple India</Credit>
        </figure>

        <section aria-labelledby="how-title" className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rule-tick" />
            <h2 id="how-title" className="display mt-6 text-[2.2rem] lg:text-[3rem]">
              How it <span className="serif-accent">starts</span>
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-3 lg:col-span-8">
            {steps.map((s, i) => (
              <li key={s.t} className="reveal bg-card p-6" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <p className="font-mono text-[12px] text-saffron">0{i + 1}</p>
                <h3 className="mt-3 text-[1.2rem] font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="terms-title" className="mt-16 rounded-[3px] border border-line bg-paper-2 p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="terms-title" className="text-[1.1rem] font-semibold tracking-tight">
              Investment, eligibility and terms
            </h2>
            <SampleTag>Not yet published</SampleTag>
          </div>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-2">
            Franchise fees, investment ranges, space requirements, support and returns have not been published. This
            section will be updated with figures confirmed by {business.legalName}. No numbers are estimated here.
          </p>
        </section>

        <section id="enquire" aria-labelledby="enquire-title" className="mt-24 grid scroll-mt-28 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rule-tick" />
            <h2 id="enquire-title" className="display mt-6 text-[2.2rem] lg:text-[3rem]">
              Register your <span className="serif-accent">interest</span>
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-2">
              This form is a preview. Once the business connects an enquiry channel, submissions will go straight to the
              franchise team.
            </p>
          </div>
          <div className="lg:col-span-8">
            <DemoEnquiryForm kind="franchise" />
          </div>
        </section>
      </Container>
    </>
  );
}
