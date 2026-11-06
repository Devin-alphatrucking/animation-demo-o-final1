"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import { PriceTag, ProductCard } from "./ProductCard";
import { ExternalIcon } from "./ui";

/**
 * "The Edit": an editorial index of featured phones.
 * Desktop — a numbered list drives a large crossfading photograph.
 * Mobile — a swipeable rail of product cards.
 */
export function FeaturedEdit({ items }: { items: Product[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-12">
        <ol className="col-span-5 border-t border-line" aria-label="Featured smartphones">
          {items.map((p, i) => {
            const on = i === active;
            return (
              <li key={p.id} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`edit-detail-${p.id}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-baseline gap-6 py-5 text-left"
                >
                  <span className={`font-mono text-[12px] transition-colors ${on ? "text-saffron" : "text-muted"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block text-[1.9rem] font-semibold leading-tight tracking-[-0.03em] transition-colors duration-300 xl:text-[2.2rem] ${
                        on ? "text-ink" : "text-ink/35 group-hover:text-ink/70"
                      }`}
                    >
                      {p.model}
                    </span>
                  </span>
                  <span className="eyebrow">{p.brand}</span>
                </button>
                <div
                  id={`edit-detail-${p.id}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-quint)] ${
                    on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pl-[3.1rem]">
                      <p className="max-w-md text-[15px] leading-relaxed text-ink-2">{p.summary}</p>
                      <PriceTag product={p} className="mt-3" />
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {p.highlights.map((h) => (
                          <li key={h} className="rounded-full border border-line-strong px-3 py-1 text-[12.5px] text-ink-2">
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex gap-5 text-[14px]">
                        <a
                          href={p.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={on ? 0 : -1}
                          className="link-underline inline-flex items-center gap-1.5 font-medium"
                        >
                          Official specs <ExternalIcon />
                          <span className="sr-only">for {p.model} (opens in a new tab)</span>
                        </a>
                        <Link href="/stores" tabIndex={on ? 0 : -1} className="link-underline text-muted hover:text-ink">
                          Ask in store
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="col-span-7">
          <div className="sticky top-28">
            <div
              className="relative aspect-[5/4] overflow-hidden rounded-[3px] transition-colors duration-700"
              style={{ backgroundColor: current.image.tone }}
            >
              {items.map((p, i) => (
                <Image
                  key={p.id}
                  src={p.image.src}
                  alt={i === active ? p.image.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="(min-width: 1440px) 780px, 55vw"
                  style={{ objectPosition: p.image.position }}
                  className={`transition-[opacity,transform] duration-700 ease-[var(--ease-out-quint)] ${
                    p.image.fit === "contain" ? "object-contain p-[9%]" : "object-cover"
                  } ${i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                {current.model} · Image: {current.brand === "Redmi" ? "Xiaomi" : current.brand} India
              </p>
              <p className="font-mono text-[10.5px] text-muted">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="lg:hidden">
        <ul
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6"
          aria-label="Featured smartphones"
        >
          {items.map((p, i) => (
            <li key={p.id} className="relative w-[80%] shrink-0 snap-start sm:w-[44%]">
              <ProductCard product={p} index={i} sizes="(min-width: 640px) 44vw, 80vw" />
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">Swipe to see more →</p>
      </div>
    </>
  );
}
