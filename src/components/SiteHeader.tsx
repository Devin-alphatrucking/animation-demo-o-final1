"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business } from "@/config/business";
import { findStoreCta, primaryNav } from "@/data/navigation";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState(64);

  // Close the menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape to close, focus trap and scroll lock while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const place = () => setMenuTop(Math.max(0, headerRef.current?.getBoundingClientRect().bottom ?? 64));
    place();
    window.addEventListener("resize", place);
    // Lock scroll on <html> (not <body>) so the sticky header keeps working
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
      }
      if (e.key === "Tab") {
        const f = [toggle, ...focusables()].filter(Boolean) as HTMLElement[];
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  return (
    <>
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        open
          ? "bg-paper shadow-[0_1px_0_var(--color-line)]"
          : scrolled
            ? "bg-paper/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : "bg-paper"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${business.legalName} — home`}>
          <Image
            src="/images/brand/om-mark.webp"
            width={1103}
            height={612}
            alt=""
            preload
            sizes="88px"
            className="h-10 w-auto lg:h-11"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight">Telecom</span>
            <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">LLP</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[14.5px] transition-colors ${
                      active ? "text-ink" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left bg-saffron transition-transform duration-500 ease-[var(--ease-out-quint)] ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={findStoreCta.href}
          className="group ml-auto hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-saffron sm:inline-flex lg:ml-2"
        >
          <PinIcon />
          {findStoreCta.label}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="relative -mr-2 ml-auto grid h-11 w-11 place-items-center rounded-full sm:ml-0 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[5.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[5.25px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

    </header>

      {/* Mobile menu — rendered outside <header> so the header's backdrop-filter
          can never become its containing block */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        style={{ paddingTop: menuTop }}
        className="fixed inset-0 z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col px-4 pb-10 pt-4 sm:px-6">
          <ul className="border-t border-line">
            {primaryNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li
                  key={item.href}
                  className="hero-rise border-b border-line"
                  style={{ ["--d" as string]: `${i * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className={`display text-[2rem] ${active ? "text-saffron" : ""}`}>{item.label}</span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={findStoreCta.href}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[15px] font-medium text-paper"
          >
            <PinIcon />
            {findStoreCta.label}
          </Link>
          <p className="mt-auto pt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {business.legalName} · {business.tagline}
          </p>
        </nav>
      </div>
    </>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 15s5-4.6 5-8.5A5 5 0 0 0 3 6.5C3 10.4 8 15 8 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="6.5" r="1.75" fill="currentColor" />
    </svg>
  );
}
