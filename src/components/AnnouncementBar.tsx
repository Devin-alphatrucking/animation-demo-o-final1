"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/config/business";

const KEY = "om-announcement-dismissed";

export function AnnouncementBar() {
  const a = business.announcement;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a per-viewer preference after mount
      if (a && localStorage.getItem(KEY) === a.id) setHidden(true);
    } catch {}
  }, [a]);

  if (!a || hidden) return null;

  return (
    <div className="bg-ink text-[13px] text-paper/90">
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-10">
        <span aria-hidden className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-saffron sm:block" />
        <p className="min-w-0 flex-1 truncate">
          {a.text}{" "}
          {a.href && (
            <Link href={a.href} className="link-underline whitespace-nowrap font-medium text-paper">
              {a.linkLabel ?? "Learn more"} →
            </Link>
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setHidden(true);
            try {
              localStorage.setItem(KEY, a.id);
            } catch {}
          }}
          className="-mr-2 grid h-8 w-8 shrink-0 place-items-center rounded-full text-paper/70 transition hover:bg-white/10 hover:text-paper"
          aria-label="Dismiss announcement"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
