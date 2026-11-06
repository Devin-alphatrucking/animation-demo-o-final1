import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { ProductImage } from "@/data/products";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M4 1.5h6.5V8M10.5 1.5 1.5 10.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

type ButtonProps = ComponentProps<typeof Link> & { variant?: "solid" | "outline" | "accent" | "light" };

export function ButtonLink({ variant = "solid", className = "", children, ...rest }: ButtonProps) {
  const styles = {
    solid: "bg-ink text-paper hover:bg-saffron",
    accent: "bg-saffron text-white hover:bg-saffron-deep",
    outline: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
    light: "bg-paper text-ink hover:bg-white",
  }[variant];
  return (
    <Link
      {...rest}
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition-colors duration-300 ${styles} ${className}`}
    >
      {children}
      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  action,
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`}>
      <div className="rule-tick" />
      <div className="mt-5 flex items-center gap-3">
        {index && <span className="eyebrow text-saffron">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 className="display text-[2.4rem] sm:text-[3.2rem] lg:col-span-7 lg:text-[4.2rem]">{title}</h2>
        {(intro || action) && (
          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:pb-2">
            {intro && <p className="max-w-md text-[16px] leading-relaxed text-ink-2">{intro}</p>}
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

export function SampleTag({ children = "Sample", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-saffron/40 bg-saffron/8 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-saffron-deep ${className}`}
    >
      <span aria-hidden className="h-1 w-1 rounded-full bg-saffron" />
      {children}
    </span>
  );
}

/**
 * Neutral stand-in for photography the business must supply (its own stores,
 * staff, events). Deliberately plain and clearly labelled — never a fake photo.
 */
export function PhotoPlaceholder({
  label,
  note = "Replace with OM Telecom's own photography",
  className = "",
}: {
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <figure
      role="img"
      aria-label={`Placeholder: ${label}. ${note}.`}
      className={`flex flex-col justify-between overflow-hidden bg-paper-2 p-5 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in srgb, var(--color-line) 55%, transparent) 14px 15px)",
      }}
    >
      <SampleTag>Photo placeholder</SampleTag>
      <figcaption className="max-w-[28ch]">
        <span className="block text-[15px] font-medium text-ink">{label}</span>
        <span className="mt-1 block text-[13px] text-muted">{note}</span>
      </figcaption>
    </figure>
  );
}

/** Product photography with consistent framing for cut-outs vs scenes. */
export function ProductFigure({
  image,
  sizes,
  className = "",
  preload = false,
  zoom = true,
}: {
  image: ProductImage;
  sizes: string;
  className?: string;
  preload?: boolean;
  zoom?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: image.tone }}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        style={{ objectPosition: image.position }}
        className={`${
          image.fit === "contain" ? "object-contain p-[8%]" : "object-cover"
        } ${zoom ? "transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" : ""}`}
      />
    </div>
  );
}

export function Credit({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted ${className}`}>{children}</p>;
}
