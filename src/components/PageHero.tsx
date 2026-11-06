import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./ui";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: { label: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="pb-12 pt-10 lg:pb-16 lg:pt-16">
      <Container>
        <nav aria-label="Breadcrumb" className="hero-rise">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 text-ink" aria-current="page">
              <span aria-hidden className="text-muted">
                /
              </span>
              {eyebrow}
            </li>
          </ol>
        </nav>
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h1
            className="display hero-rise text-[2.9rem] sm:text-[4.2rem] lg:col-span-8 lg:text-[5.6rem]"
            style={{ ["--d" as string]: "80ms" }}
          >
            {title}
          </h1>
          {intro && (
            <div
              className="hero-rise text-[17px] leading-relaxed text-ink-2 lg:col-span-4 lg:pb-3"
              style={{ ["--d" as string]: "180ms" }}
            >
              {intro}
            </div>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
