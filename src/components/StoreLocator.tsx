"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { StoreRegion } from "@/data/stores";
import { ExternalIcon, SampleTag } from "./ui";

const TBC = "To be confirmed";

export function StoreLocator({ regions }: { regions: StoreRegion[] }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  // Allow deep links such as /stores#region-2
  useEffect(() => {
    const idx = regions.findIndex((r) => `#${r.id}` === window.location.hash);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the URL hash after mount
    if (idx >= 0) setActive(idx);
  }, [regions]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % regions.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + regions.length) % regions.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = regions.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const region = regions[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Store regions"
        onKeyDown={onKeyDown}
        className="no-scrollbar relative -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        {regions.map((r, i) => {
          const selected = i === active;
          return (
            <button
              key={r.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-tab-${r.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative shrink-0 rounded-full border px-5 py-2.5 text-[14px] transition-colors duration-300 ${
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-ink-2 hover:border-ink hover:text-ink"
              }`}
            >
              {r.label}
              <span aria-hidden className={`ml-2 font-mono text-[11px] ${selected ? "text-paper/60" : "text-muted"}`}>
                {r.stores.length}
              </span>
              <span className="sr-only">, {r.stores.length} {r.stores.length === 1 ? "store" : "stores"}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${region.id}`}
        tabIndex={0}
        className="mt-8 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2"
      >
        {region.stores.map((s, i) => (
          <article
            key={s.id}
            className="hero-rise flex flex-col bg-card p-6 lg:p-8"
            style={{ ["--d" as string]: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{s.area}</p>
                <h3 className="mt-2 text-[1.35rem] font-semibold tracking-tight">{s.name}</h3>
              </div>
              {s.sample && <SampleTag>Sample listing</SampleTag>}
            </div>
            <dl className="mt-6 grid grid-cols-[88px_1fr] gap-x-4 gap-y-3 text-[14px]">
              <dt className="text-muted">Address</dt>
              <dd className={s.address ? "" : "text-muted"}>{s.address ?? TBC}</dd>
              <dt className="text-muted">Hours</dt>
              <dd className={s.hours ? "" : "text-muted"}>{s.hours ?? TBC}</dd>
              <dt className="text-muted">Phone</dt>
              <dd>
                {s.phone ? (
                  <a className="link-underline" href={`tel:${s.phone.replace(/\s/g, "")}`}>
                    {s.phone}
                  </a>
                ) : (
                  <span className="text-muted">{TBC}</span>
                )}
              </dd>
            </dl>
            <div className="mt-auto pt-6">
              {s.mapUrl ? (
                <a
                  href={s.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium link-underline"
                >
                  Open in Maps <ExternalIcon />
                </a>
              ) : (
                <p className="text-[13px] text-muted">Map link will be added once the address is verified.</p>
              )}
            </div>
          </article>
        ))}
        {region.stores.length % 2 === 1 && <div aria-hidden className="hidden bg-card sm:block" />}
      </div>
    </div>
  );
}
