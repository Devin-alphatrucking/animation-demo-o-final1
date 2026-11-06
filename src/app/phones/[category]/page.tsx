import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory, productsIn } from "@/data/products";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { ArrowIcon, Container } from "@/components/ui";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/phones/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: `${c.name} — Phones`,
    description: `${c.blurb} Explore ${c.name.toLowerCase()} from leading brands and try them in an OM Telecom store.`,
    alternates: { canonical: `/phones/${c.id}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/phones/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const list = productsIn(c.id);
  const others = categories.filter((x) => x.id !== c.id);

  return (
    <>
      <PageHero
        eyebrow={c.name}
        crumbs={[{ label: "Phones", href: "/phones" }]}
        title={
          <>
            {c.name.split(" ")[0]}
            {c.name.includes(" ") && <span className="serif-accent text-saffron"> {c.name.split(" ").slice(1).join(" ")}</span>}
            <span className="text-saffron">.</span>
          </>
        }
        intro={<p>{c.blurb}</p>}
      />
      <Container>
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {list.length} featured {list.length === 1 ? "model" : "models"}
        </p>
        <ul className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.id} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
              <ProductCard product={p} index={i} />
            </li>
          ))}
        </ul>

        <nav aria-label="Other categories" className="mt-24 border-t border-line pt-10">
          <p className="eyebrow">Keep browsing</p>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/phones/${o.id}`} className="group flex h-full items-center justify-between gap-4 bg-paper p-5 transition-colors hover:bg-card">
                  <span className="text-[1.05rem] font-semibold tracking-tight">{o.name}</span>
                  <ArrowIcon className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-saffron" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}
