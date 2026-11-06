import Image from "next/image";
import { business } from "@/config/business";

/**
 * Short logo reveal shown on the first homepage view of a session.
 * Pure CSS: it never blocks clicks (pointer-events: none), fades itself out
 * after ~1.5s even if JavaScript hasn't loaded, and is removed entirely for
 * prefers-reduced-motion and repeat visits (see bootScript in layout.tsx).
 */
export function LogoIntro() {
  return (
    <div className="intro" aria-hidden>
      <div className="flex flex-col items-center">
        <div className="intro__mark">
          <Image
            src={business.logo.src}
            width={business.logo.width}
            height={business.logo.height}
            alt=""
            preload
            sizes="(min-width: 640px) 320px, 220px"
            className="h-auto w-[220px] sm:w-[320px]"
          />
        </div>
        <div className="mt-6 h-px w-40 overflow-hidden bg-line">
          <div className="intro__bar h-full w-full bg-saffron" />
        </div>
      </div>
    </div>
  );
}
