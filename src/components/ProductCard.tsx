import Link from "next/link";
import { formatINR, PRICES_CHECKED_ON, type Product } from "@/data/products";
import { ExternalIcon, ProductFigure } from "./ui";

const siteName = (p: Product) => new URL(p.priceSource ?? p.officialUrl).hostname.replace(/^www\./, "");

/** Price line: official-website starting price with its source, or a neutral fallback. */
export function PriceTag({ product, className = "" }: { product: Product; className?: string }) {
  if (product.price === null) {
    return <p className={`text-[13px] text-muted ${className}`}>Price not listed online · ask in store</p>;
  }
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${className}`}>
      <span className="text-[1.05rem] font-semibold tracking-tight">
        <span className="text-[12px] font-normal text-muted">From </span>
        {formatINR(product.price)}
      </span>
      <span className="text-[11.5px] text-muted">
        on {siteName(product)} · {PRICES_CHECKED_ON}
      </span>
    </p>
  );
}

/** Editorial product card: photo, brand, model, verified highlights, price, links. */
export function ProductCard({
  product,
  sizes = "(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw",
  aspect = "aspect-[4/5]",
  index,
}: {
  product: Product;
  sizes?: string;
  aspect?: string;
  index?: number;
}) {
  return (
    <article className="group flex h-full flex-col">
      <ProductFigure image={product.image} sizes={sizes} className={`${aspect} rounded-[3px]`} />
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="eyebrow">{product.brand}</p>
        {typeof index === "number" && (
          <span className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <h3 className="mt-1.5 text-[1.25rem] font-semibold leading-snug tracking-tight sm:text-[1.35rem]">{product.model}</h3>
      <PriceTag product={product} className="mt-2" />
      <ul className="mt-3 space-y-1.5 text-[14px] text-ink-2">
        {product.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex gap-2.5">
            <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-saffron" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-[14px]">
        <a
          href={product.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1.5 font-medium"
        >
          Official specs
          <ExternalIcon />
          <span className="sr-only">for {product.model} (opens the {product.brand} website in a new tab)</span>
        </a>
        <Link href="/stores" className="link-underline text-muted hover:text-ink">
          Ask in store
        </Link>
      </div>
    </article>
  );
}
