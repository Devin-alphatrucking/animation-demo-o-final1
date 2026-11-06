"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { brands } from "@/data/brands";
import {
  budgetBands,
  categories,
  formatINR,
  inBudget,
  PRICES_CHECKED_ON,
  type Product,
} from "@/data/products";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

/**
 * Filterable phone catalogue: search, brand, budget, category and sort.
 * State is mirrored into the URL (?q=&brand=&budget=&type=&sort=) so filtered
 * views can be shared and the back button works. Purely client-side.
 */
export function Catalogue({ items, lockedBrand }: { items: Product[]; lockedBrand?: string }) {
  const uid = useId();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState<string>("all");
  const [budget, setBudget] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [ready, setReady] = useState(false);

  // Read initial filters from the URL once on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- hydrating filter state from the URL after mount */
    setQ(p.get("q") ?? "");
    if (!lockedBrand && p.get("brand") && brands.some((b) => b.id === p.get("brand"))) setBrand(p.get("brand")!);
    if (p.get("budget") && budgetBands.some((b) => b.id === p.get("budget"))) setBudget(p.get("budget")!);
    if (p.get("type") && categories.some((c) => c.id === p.get("type"))) setType(p.get("type")!);
    const s = p.get("sort") as Sort | null;
    if (s && ["featured", "price-asc", "price-desc", "name"].includes(s)) setSort(s);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [lockedBrand]);

  // Mirror filters into the URL
  useEffect(() => {
    if (!ready) return;
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (!lockedBrand && brand !== "all") p.set("brand", brand);
    if (budget !== "all") p.set("budget", budget);
    if (type !== "all") p.set("type", type);
    if (sort !== "featured") p.set("sort", sort);
    const qs = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [q, brand, budget, type, sort, ready, lockedBrand]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const band = budgetBands.find((b) => b.id === budget);
    const list = items.filter(
      (p) =>
        (lockedBrand || brand === "all" || p.brandId === brand) &&
        (!band || inBudget(p, band)) &&
        (type === "all" || p.categories.includes(type as Product["categories"][number])) &&
        (!term || `${p.brand} ${p.model} ${p.highlights.join(" ")}`.toLowerCase().includes(term)),
    );
    const priced = (p: Product, dir: 1 | -1) => (p.price === null ? Infinity : p.price * dir);
    if (sort === "price-asc") list.sort((a, b) => priced(a, 1) - priced(b, 1));
    if (sort === "price-desc") list.sort((a, b) => priced(a, -1) - priced(b, -1));
    if (sort === "name") list.sort((a, b) => a.model.localeCompare(b.model));
    return list;
  }, [items, q, brand, budget, type, sort, lockedBrand]);

  const brandCount = (id: string) => items.filter((p) => p.brandId === id).length;
  const budgetCount = (id: string) => {
    const b = budgetBands.find((x) => x.id === id)!;
    return items.filter((p) => (lockedBrand || brand === "all" || p.brandId === brand) && inBudget(p, b)).length;
  };
  const activeFilters = [q.trim(), !lockedBrand && brand !== "all", budget !== "all", type !== "all"].filter(Boolean).length;
  const reset = () => {
    setQ("");
    if (!lockedBrand) setBrand("all");
    setBudget("all");
    setType("all");
    setSort("featured");
  };

  const priced = results.filter((p) => p.price !== null).map((p) => p.price!) ;
  const range = priced.length ? `${formatINR(Math.min(...priced))} – ${formatINR(Math.max(...priced))}` : null;

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="sticky top-16 z-30 -mx-4 border-y border-line bg-paper/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-[72px] lg:-mx-10 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative md:w-[340px]">
              <label htmlFor={`${uid}-q`} className="sr-only">
                Search phones
              </label>
              <svg aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                id={`${uid}-q`}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search model, chip, camera…"
                className="h-11 w-full rounded-full border border-line-strong bg-card pl-11 pr-4 text-[15px] outline-none transition-colors placeholder:text-muted/80 focus:border-ink"
              />
            </div>
            <div className="flex gap-3 md:ml-auto">
              <label className="sr-only" htmlFor={`${uid}-type`}>
                Phone type
              </label>
              <select
                id={`${uid}-type`}
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-card px-4 text-[14px] outline-none focus:border-ink md:flex-none"
              >
                <option value="all">All types</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor={`${uid}-sort`}>
                Sort by
              </label>
              <select
                id={`${uid}-sort`}
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-card px-4 text-[14px] outline-none focus:border-ink md:flex-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>

          {!lockedBrand && (
            <ChipRow label="Brand">
              <Chip on={brand === "all"} onClick={() => setBrand("all")}>
                All brands
              </Chip>
              {brands.map((b) => (
                <Chip key={b.id} on={brand === b.id} onClick={() => setBrand(b.id)} count={brandCount(b.id)}>
                  {b.name}
                </Chip>
              ))}
            </ChipRow>
          )}

          <ChipRow label="Budget">
            <Chip on={budget === "all"} onClick={() => setBudget("all")}>
              Any price
            </Chip>
            {budgetBands.map((b) => (
              <Chip key={b.id} on={budget === b.id} onClick={() => setBudget(b.id)} count={budgetCount(b.id)}>
                {b.label}
              </Chip>
            ))}
          </ChipRow>
        </div>
      </div>

      {/* ── Results summary ── */}
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3" aria-live="polite">
        <p className="text-[15px]">
          <span className="font-semibold">{results.length}</span> {results.length === 1 ? "phone" : "phones"}
          {range && <span className="text-muted"> · {range}</span>}
        </p>
        {activeFilters > 0 && (
          <button type="button" onClick={reset} className="link-underline text-[14px] font-medium">
            Clear filters ({activeFilters})
          </button>
        )}
      </div>

      {/* ── Grid ── */}
      {results.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-12 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-[3px] border border-dashed border-line-strong p-10 text-center">
          <p className="text-[1.2rem] font-semibold tracking-tight">No phones match these filters.</p>
          <p className="mt-2 text-[15px] text-muted">Try a different budget or brand, or clear the search.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-[14px] font-medium text-paper hover:bg-saffron"
          >
            Clear filters
          </button>
        </div>
      )}

      <p className="mt-12 max-w-3xl text-[12.5px] leading-relaxed text-muted">
        Prices are the starting prices listed on each manufacturer&apos;s official India website on {PRICES_CHECKED_ON},
        for the base storage variant and before bank or exchange offers. They are shown for reference and are not OM
        Telecom store prices — please confirm price and availability in store. Models without a listed price are
        hidden when a budget is selected.
      </p>
    </div>
  );
}

function ChipRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-3">
      <span className="eyebrow hidden w-14 shrink-0 sm:block">{label}</span>
      <div className="no-scrollbar relative -mr-4 flex flex-1 gap-2 overflow-x-auto pr-4 sm:mr-0 sm:flex-wrap sm:overflow-visible sm:pr-0">
        {children}
      </div>
    </div>
  );
}

function Chip({
  on,
  onClick,
  count,
  children,
}: {
  on: boolean;
  onClick: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      disabled={count === 0 && !on}
      className={`relative inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-[13.5px] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
        on ? "border-ink bg-ink text-paper" : "border-line-strong bg-card text-ink-2 hover:border-ink hover:text-ink"
      }`}
    >
      {children}
      {typeof count === "number" && (
        <span aria-hidden className={`font-mono text-[10.5px] ${on ? "text-paper/60" : "text-muted"}`}>
          {count}
        </span>
      )}
      {typeof count === "number" && <span className="sr-only">, {count} phones</span>}
    </button>
  );
}
