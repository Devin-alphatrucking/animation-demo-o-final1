import type { Metadata } from "next";
import Link from "next/link";
import { business, hasDirectContact } from "@/config/business";
import { PageHero } from "@/components/PageHero";
import { DemoEnquiryForm } from "@/components/DemoEnquiryForm";
import { ArrowIcon, Container, SampleTag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${business.legalName}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact } = business;
  const rows: { label: string; value: string | null; href?: string }[] = [
    { label: "Phone", value: contact.phone, href: contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : undefined },
    { label: "WhatsApp", value: contact.whatsapp ? `+${contact.whatsapp}` : null, href: contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : undefined },
    { label: "Email", value: contact.email, href: contact.email ? `mailto:${contact.email}` : undefined },
    { label: "Head office", value: contact.headOfficeAddress },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="serif-accent text-saffron">talk.</span>
          </>
        }
        intro={<p>The quickest way to get help choosing a phone is to visit a store. For anything else, reach us below.</p>}
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {!hasDirectContact && <SampleTag>Contact details pending</SampleTag>}
            <dl className="mt-6 border-t border-line">
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[120px_1fr] gap-4 border-b border-line py-5">
                  <dt className="eyebrow pt-1">{r.label}</dt>
                  <dd className="text-[1.1rem]">
                    {r.value ? (
                      r.href ? (
                        <a href={r.href} className="link-underline font-medium" target={r.href.startsWith("http") ? "_blank" : undefined} rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                          {r.value}
                        </a>
                      ) : (
                        r.value
                      )
                    ) : (
                      <span className="text-muted">To be confirmed</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 grid gap-3">
              <Link href="/stores" className="group flex items-center justify-between rounded-[3px] bg-ink p-5 text-paper transition-colors hover:bg-saffron">
                <span>
                  <span className="block text-[1.1rem] font-semibold">Visit a store</span>
                  <span className="text-[14px] text-paper/70">See and compare phones in person</span>
                </span>
                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/franchise#enquire" className="group flex items-center justify-between rounded-[3px] border border-line-strong p-5 transition-colors hover:border-ink">
                <span>
                  <span className="block text-[1.1rem] font-semibold">Franchise enquiries</span>
                  <span className="text-[14px] text-muted">Register your interest</span>
                </span>
                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <DemoEnquiryForm kind="general" />
          </div>
        </div>
      </Container>
    </>
  );
}
