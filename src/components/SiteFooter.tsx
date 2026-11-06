import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { brands } from "@/data/brands";
import { categories } from "@/data/products";
import { storeRegions, hasVerifiedStores } from "@/data/stores";
import { Container, ExternalIcon } from "./ui";

export function SiteFooter() {
  const { contact } = business;
  return (
    <footer className="border-t border-line bg-paper-2">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-3">
            <Image
              src={business.logo.src}
              width={business.logo.width}
              height={business.logo.height}
              alt={business.logo.alt}
              sizes="220px"
              className="h-auto w-[180px] lg:w-[220px]"
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-2">
              A multi-brand smartphone retailer. Explore the latest phones online, then try them in person at an OM
              Telecom store.
            </p>
          </div>

          <FooterCol title="Phones" className="lg:col-span-2 lg:col-start-5">
            {categories.map((c) => (
              <FooterLink key={c.id} href={`/phones/${c.id}`}>
                {c.name}
              </FooterLink>
            ))}
            <FooterLink href="/accessories">Accessories</FooterLink>
          </FooterCol>

          <FooterCol title="Brands" className="lg:col-span-2">
            {brands.map((b) => (
              <FooterLink key={b.id} href={`/brands/${b.id}`}>
                {b.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company" className="lg:col-span-2">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/stores">Our Stores</FooterLink>
            <FooterLink href="/franchise">Franchise</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Stores" className="lg:col-span-2">
            {hasVerifiedStores ? (
              storeRegions.map((r) => (
                <FooterLink key={r.id} href={`/stores#${r.id}`}>
                  {r.label}
                </FooterLink>
              ))
            ) : (
              <li className="text-[14px] text-muted">Locations coming soon</li>
            )}
          </FooterCol>
        </div>

        <div className="mt-14 grid gap-6 border-t border-line pt-8 text-[13px] text-muted lg:grid-cols-12">
          <div className="lg:col-span-5">
            {contact.phone || contact.email ? (
              <p className="flex flex-wrap gap-x-6 gap-y-2 text-ink-2">
                {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>}
                {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
              </p>
            ) : (
              <p>Contact details will be published here once confirmed.</p>
            )}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-4">
            {business.social.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-ink">
                {s.label} <ExternalIcon />
              </a>
            ))}
            {business.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="lg:col-span-3 lg:text-right">
            © {business.copyrightYear} {business.legalName}
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-[12px] leading-relaxed text-muted">
          Product names, images and trademarks belong to their respective manufacturers and are shown for
          identification. Featured devices are not a statement of stock; availability and pricing are confirmed in store.
        </p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title} className={className}>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-underline text-[14.5px] text-ink-2 hover:text-ink">
        {children}
      </Link>
    </li>
  );
}
