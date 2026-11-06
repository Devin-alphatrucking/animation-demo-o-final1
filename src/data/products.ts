/**
 * Smartphone catalogue.
 *
 * Sources (all checked 6 Nov 2026 — see PRICES_CHECKED_ON):
 * - Model names and highlights: each manufacturer's official India product page
 *   (`officialUrl`). Highlights are quoted facts only.
 * - `price`: the starting price shown on the manufacturer's OWN India website or
 *   online store for the base variant, excluding bank/exchange offers
 *   (`priceSource`). It is NOT an OM Telecom store price. `null` = the official
 *   site did not list a price, so the model is excluded from budget filters.
 * - Images: manufacturer photography — see docs/ASSET_MANIFEST.md.
 * - Inclusion here does NOT mean the device is in stock at any store.
 */
export const PRICES_CHECKED_ON = "6 Nov 2026";

export type CategoryId = "flagship" | "foldables" | "camera" | "performance" | "iphone" | "everyday";

export type ProductImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** "cover" for photographic scenes, "contain" for cut-out product shots */
  fit: "cover" | "contain";
  /** background colour behind contain-fit cut-outs and while loading */
  tone: string;
  /** optional object-position for cover crops */
  position?: string;
};

export type Product = {
  id: string;
  brandId: string;
  brand: string;
  model: string;
  summary: string;
  highlights: string[];
  categories: CategoryId[];
  image: ProductImage;
  officialUrl: string;
  /** Starting price in INR from the official brand website, or null */
  price: number | null;
  priceSource: string | null;
};

const NEUTRAL = "#f1eee8";
const img = (
  file: string,
  width: number,
  height: number,
  alt: string,
  fit: "cover" | "contain",
  tone = NEUTRAL,
  position?: string,
): ProductImage => ({ src: `/images/${file}.webp`, width, height, alt, fit, tone, position });

const APPLE_BUY = (slug: string) => `https://www.apple.com/in/shop/buy-iphone/${slug}`;
const SAMSUNG_BUY = (slug: string) => `https://www.samsung.com/in/smartphones/${slug}/buy/`;
const ONEPLUS_STORE = "https://www.oneplus.in/store/phone";
const VIVO_STORE = "https://shop.vivo.com/in/";
const OPPO_LIST = "https://www.oppo.com/in/smartphones/";
const MI_HOME = "https://www.mi.com/in/";

export const products: Product[] = [
  // ───────────── Apple ─────────────
  {
    id: "iphone-duo", brandId: "apple", brand: "Apple", model: "iPhone Duo",
    summary: "Apple's foldable iPhone, with the largest iPhone display yet.",
    highlights: ["Thin, foldable design", "48MP Dual Fusion camera system", "A20 Pro chip"],
    categories: ["foldables", "iphone", "flagship"],
    image: img("products/apple-iphone-duo", 744, 790, "iPhone Duo in Star White, partly unfolded, showing its dual camera and inner display", "cover", "#ebe6df"),
    officialUrl: "https://www.apple.com/in/iphone-duo/", price: 299900, priceSource: APPLE_BUY("iphone-duo"),
  },
  {
    id: "iphone-18-pro", brandId: "apple", brand: "Apple", model: "iPhone 18 Pro",
    summary: "Apple's newest Pro iPhone, built around the A20 Pro chip.",
    highlights: ["A20 Pro chip", "48MP Main camera with variable aperture", "Next-generation vapour chamber"],
    categories: ["flagship", "camera", "performance", "iphone"],
    image: img("lifestyle/apple-iphone-18-pro-camera-macro", 744, 1488, "Close-up of the iPhone 18 Pro camera lenses in a Burgundy finish", "cover", "#3a1f22"),
    officialUrl: "https://www.apple.com/in/iphone-18-pro/", price: 164900, priceSource: APPLE_BUY("iphone-18-pro"),
  },
  {
    id: "iphone-air", brandId: "apple", brand: "Apple", model: "iPhone Air",
    summary: "Apple's thinnest, lightest iPhone, with the A19 Pro chip.",
    highlights: ["A19 Pro chip", "Center Stage front camera", "Ceramic Shield front and back"],
    categories: ["iphone"],
    image: img("products/apple-iphone-air", 744, 790, "iPhone Air in Sky Blue seen at an angle, showing its single camera plateau", "cover", "#a9bdcc"),
    officialUrl: "https://www.apple.com/in/iphone-air/", price: 149900, priceSource: APPLE_BUY("iphone-air"),
  },
  {
    id: "iphone-17", brandId: "apple", brand: "Apple", model: "iPhone 17",
    summary: "The standard iPhone 17, with a ProMotion display and the A19 chip.",
    highlights: ["A19 chip", '15.93 cm (6.3") ProMotion display', "Center Stage front camera"],
    categories: ["iphone"],
    image: img("products/apple-iphone-17", 1200, 630, "iPhone 17 shown in five colours, fanned out side by side", "contain", "#ffffff"),
    officialUrl: "https://www.apple.com/in/iphone-17/", price: 99900, priceSource: APPLE_BUY("iphone-17"),
  },
  {
    id: "iphone-17e", brandId: "apple", brand: "Apple", model: "iPhone 17e",
    summary: "The most affordable iPhone 17 model, with the A19 chip.",
    highlights: ["A19 chip", "48MP camera", "Ceramic Shield 2"],
    categories: ["iphone", "everyday"],
    image: img("products/apple-iphone-17e", 1200, 630, "iPhone 17e in soft pink lying on top of a black iPhone 17e", "contain", "#ffffff"),
    officialUrl: "https://www.apple.com/in/iphone-17e/", price: 79900, priceSource: APPLE_BUY("iphone-17e"),
  },

  // ───────────── Samsung ─────────────
  {
    id: "galaxy-z-fold8", brandId: "samsung", brand: "Samsung", model: "Galaxy Z Fold8",
    summary: "Samsung's book-style foldable, with an all-new shape.",
    highlights: ["Content-friendly main screen", "Dual 50 MP camera", "Galaxy AI"],
    categories: ["foldables", "flagship"],
    image: img("products/samsung-galaxy-z-fold8", 1200, 630, "A hand holding the folded Galaxy Z Fold8 in front of large FOLD lettering", "cover", "#8f8db8"),
    officialUrl: "https://www.samsung.com/in/smartphones/galaxy-z-fold8/", price: 179999, priceSource: SAMSUNG_BUY("galaxy-z-fold8"),
  },
  {
    id: "galaxy-s26-ultra", brandId: "samsung", brand: "Samsung", model: "Galaxy S26 Ultra",
    summary: "Samsung's top Galaxy S model, with a built-in Privacy Display and Galaxy AI.",
    highlights: ["Built-in Privacy Display", "Snapdragon processor customised for Galaxy", "Galaxy AI"],
    categories: ["flagship", "camera", "performance"],
    image: img("products/samsung-galaxy-s26-ultra", 1200, 630, "Close-up of the Galaxy S26 Ultra rear camera array in a violet finish", "cover", "#9a98c8"),
    officialUrl: "https://www.samsung.com/in/smartphones/galaxy-s26-ultra/", price: 154999, priceSource: SAMSUNG_BUY("galaxy-s26-ultra"),
  },
  {
    id: "galaxy-z-flip8", brandId: "samsung", brand: "Samsung", model: "Galaxy Z Flip8",
    summary: "Samsung's compact flip phone, with a customisable FlexWindow.",
    highlights: ["Customisable FlexWindow", "Hands-free selfie camera", "Thinnest and lightest Flip yet, per Samsung"],
    categories: ["foldables"],
    image: img("products/samsung-galaxy-z-flip8", 1200, 630, "Three Galaxy Z Flip8 phones in silver, black and pink, one held open in a hand", "cover", "#f4f4f4"),
    officialUrl: "https://www.samsung.com/in/smartphones/galaxy-z-flip8/", price: 124999, priceSource: SAMSUNG_BUY("galaxy-z-flip8"),
  },
  {
    id: "galaxy-s26", brandId: "samsung", brand: "Samsung", model: "Galaxy S26",
    summary: "The compact Galaxy S26, with a processor customised for Galaxy AI.",
    highlights: ["Customised processor for Galaxy AI", "15.93 cm display", "Also available as the larger S26+"],
    categories: ["flagship"],
    image: img("products/samsung-galaxy-s26", 1200, 630, "Two Galaxy S26 phones in a cobalt violet finish, showing the triple camera", "cover", "#797ca5"),
    officialUrl: "https://www.samsung.com/in/smartphones/galaxy-s26/", price: 102999, priceSource: SAMSUNG_BUY("galaxy-s26"),
  },

  // ───────────── OnePlus ─────────────
  {
    id: "oneplus-15", brandId: "oneplus", brand: "OnePlus", model: "OnePlus 15",
    summary: "A performance flagship powered by Snapdragon 8 Elite Gen 5.",
    highlights: ["Snapdragon 8 Elite Gen 5", "165Hz 1.5K display", "7300 mAh battery", "Triple 50MP camera"],
    categories: ["flagship", "performance"],
    image: img("products/oneplus-15", 679, 1587, "OnePlus 15 seen from the back in a sand finish with its triple camera module", "contain", "#ece7df"),
    officialUrl: "https://www.oneplus.in/15", price: 84999, priceSource: ONEPLUS_STORE,
  },
  {
    id: "oneplus-15r", brandId: "oneplus", brand: "OnePlus", model: "OnePlus 15R",
    summary: "A gaming-focused OnePlus with a large battery.",
    highlights: ["Snapdragon 8 Gen 5", "7400 mAh battery", "OxygenOS 16"],
    categories: ["performance"],
    image: img("products/oneplus-15r", 1024, 806, "A hand lifting a green OnePlus 15R out of shallow water", "cover", "#8ea990", "40% 40%"),
    officialUrl: "https://www.oneplus.in/15r", price: 59999, priceSource: ONEPLUS_STORE,
  },
  {
    id: "oneplus-nord-6", brandId: "oneplus", brand: "OnePlus", model: "OnePlus Nord 6",
    summary: "An all-rounder Nord with a 9000 mAh battery.",
    highlights: ["Snapdragon 8 Series processor", "9000 mAh battery", "50MP Sony main camera", "165 FPS gaming"],
    categories: ["performance", "everyday"],
    image: img("products/oneplus-nord-6", 1470, 1222, "OnePlus Nord 6 in black, seen from the back at an angle", "contain"),
    officialUrl: "https://www.oneplus.in/nord-6", price: 44999, priceSource: ONEPLUS_STORE,
  },
  {
    id: "oneplus-nord-ce6", brandId: "oneplus", brand: "OnePlus", model: "OnePlus Nord CE6",
    summary: "A tough, long-lasting Nord with a 1.5K AMOLED display.",
    highlights: ["Snapdragon 7s Gen 4", "8000 mAh battery", "144Hz 1.5K AMOLED", "IP66 / IP68 / IP69 / IP69K"],
    categories: ["everyday"],
    image: img("products/oneplus-nord-ce6", 540, 1480, "OnePlus Nord CE6 in light blue, seen from the back", "contain"),
    officialUrl: "https://www.oneplus.in/nord-ce6", price: 34999, priceSource: ONEPLUS_STORE,
  },
  {
    id: "oneplus-nord-ce6-lite", brandId: "oneplus", brand: "OnePlus", model: "OnePlus Nord CE6 Lite",
    summary: "The most affordable Nord CE6, with a 144Hz display.",
    highlights: ["MediaTek Dimensity 7400 Apex", "7000 mAh battery", "144Hz display"],
    categories: ["everyday"],
    image: img("products/oneplus-nord-ce6-lite", 1197, 706, "OnePlus Nord CE6 Lite in light green, angled against a green background", "cover", "#4d6d40"),
    officialUrl: "https://www.oneplus.in/nord-ce6-lite", price: 26999, priceSource: ONEPLUS_STORE,
  },

  // ───────────── vivo ─────────────
  {
    id: "vivo-x-fold6", brandId: "vivo", brand: "vivo", model: "vivo X Fold6",
    summary: "vivo's book-style foldable, built for multitasking.",
    highlights: ["Foldable design", "Battery equivalent to 6900 mAh", "AI features"],
    categories: ["foldables", "flagship"],
    image: img("products/vivo-x-fold6", 1600, 655, "Two vivo X Fold6 phones in black and teal, showing the large circular camera", "contain"),
    officialUrl: "https://www.vivo.com/in/products/x-fold6", price: 219999, priceSource: VIVO_STORE,
  },
  {
    id: "vivo-x300-pro", brandId: "vivo", brand: "vivo", model: "vivo X300 Pro",
    summary: "A camera-first flagship with ZEISS optics and vivo's own imaging chip.",
    highlights: ["200MP ZEISS APO telephoto camera", "Pro Imaging Chip VS1", "OriginOS"],
    categories: ["camera", "flagship"],
    image: img("products/vivo-x300-pro", 2000, 1125, "vivo X300 Pro in Phantom Black lying flat, showing its large circular camera module", "contain", "#e9e6e1"),
    officialUrl: "https://www.vivo.com/in/products/x300-pro", price: null, priceSource: null,
  },
  {
    id: "vivo-x300-fe", brandId: "vivo", brand: "vivo", model: "vivo X300 FE",
    summary: "A compact X-series phone with a ZEISS telephoto camera.",
    highlights: ["ZEISS Super Telephoto camera", "Snapdragon chipset", "ZEISS Master Color display"],
    categories: ["camera"],
    image: img("products/vivo-x300-fe", 1600, 807, "vivo X300 FE in green lying flat, display facing up", "contain"),
    officialUrl: "https://www.vivo.com/in/products/x300-fe", price: 89999, priceSource: VIVO_STORE,
  },
  {
    id: "vivo-v80", brandId: "vivo", brand: "vivo", model: "vivo V80",
    summary: "A portrait-focused V-series phone with a ZEISS telephoto.",
    highlights: ["50MP ZEISS Super Telephoto camera", "7200 mAh BlueVolt battery", "Flagship glass design"],
    categories: ["camera", "everyday"],
    image: img("products/vivo-v80", 1600, 783, "vivo V80 phones in orange, grey and green under the vivo V80 wordmark", "contain", "#ffffff"),
    officialUrl: "https://www.vivo.com/in/products/v80", price: 62999, priceSource: VIVO_STORE,
  },
  {
    id: "vivo-t5x", brandId: "vivo", brand: "vivo", model: "vivo T5x 5G",
    summary: "A rugged, long-lasting T-series 5G phone.",
    highlights: ["7200 mAh battery", "Dimensity 7400-Turbo", "50MP Sony camera", "IP68 & IP69+ protection"],
    categories: ["everyday"],
    image: img("products/vivo-t5x", 900, 900, "Close-up of the vivo T5x camera in green against a black background", "cover", "#101010"),
    officialUrl: "https://www.vivo.com/in/products/t5x", price: 27999, priceSource: VIVO_STORE,
  },

  // ───────────── OPPO ─────────────
  {
    id: "oppo-find-x10-pro-max", brandId: "oppo", brand: "OPPO", model: "OPPO Find X10 Pro Max",
    summary: "OPPO's top camera flagship with three 200MP cameras.",
    highlights: ["Three 200MP cameras", "MediaTek Dimensity 9600 Pro", "8000 mAh battery"],
    categories: ["flagship", "camera"],
    image: img("products/oppo-find-x10-pro-max", 480, 600, "OPPO Find X10 Pro Max in white, back and front", "contain"),
    officialUrl: "https://www.oppo.com/in/smartphones/series-find-x/find-x10-pro-max/", price: 199999, priceSource: OPPO_LIST,
  },
  {
    id: "oppo-find-x10", brandId: "oppo", brand: "OPPO", model: "OPPO Find X10",
    summary: "A flagship with 200MP main and telephoto cameras.",
    highlights: ["200MP main and telephoto cameras", "MediaTek Dimensity 9600M", "8000 mAh battery", "144Hz display"],
    categories: ["flagship", "camera"],
    image: img("products/oppo-find-x10", 480, 600, "OPPO Find X10 in pale blue, back and front", "contain"),
    officialUrl: "https://www.oppo.com/in/smartphones/series-find-x/find-x10/", price: 139999, priceSource: OPPO_LIST,
  },
  {
    id: "oppo-reno16", brandId: "oppo", brand: "OPPO", model: "OPPO Reno16 5G",
    summary: "A design-led Reno with a 3.5x telephoto and a large battery.",
    highlights: ["50MP 3.5x telephoto", "6700 mAh battery", "ColorOS 16"],
    categories: ["camera"],
    image: img("products/oppo-reno16", 480, 600, "OPPO Reno16 5G in white, back and front, with its 3D planet-pattern design", "contain", "#eef1f5"),
    officialUrl: "https://www.oppo.com/in/smartphones/series-reno/reno16/", price: 65999, priceSource: OPPO_LIST,
  },
  {
    id: "oppo-reno16c", brandId: "oppo", brand: "OPPO", model: "OPPO Reno16c 5G",
    summary: "The Reno16 design and telephoto at a lower price.",
    highlights: ["50MP 3.5x telephoto", "120Hz AMOLED display", "7000 mAh battery"],
    categories: ["camera", "everyday"],
    image: img("products/oppo-reno16c", 480, 600, "OPPO Reno16c 5G in white, back and front", "contain"),
    officialUrl: "https://www.oppo.com/in/smartphones/series-reno/reno16-c/", price: 52999, priceSource: OPPO_LIST,
  },
  {
    id: "oppo-k14", brandId: "oppo", brand: "OPPO", model: "OPPO K14 5G",
    summary: "A tough performance phone with a 7000 mAh battery.",
    highlights: ["7000 mAh battery", "45W SUPERVOOC", "IP69", "50MP camera"],
    categories: ["everyday", "performance"],
    image: img("products/oppo-k14", 480, 600, "OPPO K14 5G in purple, back and front", "contain"),
    officialUrl: "https://www.oppo.com/in/smartphones/series-k/k14-5g/", price: 25999, priceSource: OPPO_LIST,
  },
  {
    id: "oppo-a6x", brandId: "oppo", brand: "OPPO", model: "OPPO A6x 5G",
    summary: "An affordable 5G phone built to last.",
    highlights: ["MediaTek Dimensity 6300", "Large battery", "48-month Fluency Protection"],
    categories: ["everyday"],
    image: img("products/oppo-a6x", 480, 600, "OPPO A6x 5G in light blue, back and front", "contain"),
    officialUrl: "https://www.oppo.com/in/smartphones/series-a/a6x-5g/", price: 19999, priceSource: OPPO_LIST,
  },

  // ───────────── Xiaomi ─────────────
  {
    id: "xiaomi-17-ultra", brandId: "xiaomi", brand: "Xiaomi", model: "Xiaomi 17 Ultra",
    summary: "Co-engineered with Leica, with a 1-inch main sensor and an optical zoom telephoto.",
    highlights: ["Leica 1-inch Light Fusion 1050L sensor", "200MP 75–100mm optical zoom telephoto", "3500 nits peak brightness"],
    categories: ["camera", "flagship"],
    image: img("products/xiaomi-17-ultra", 1600, 1600, "Xiaomi 17 Ultra in black, front and back, with its large circular Leica camera module", "contain", "#ffffff"),
    officialUrl: "https://www.mi.com/in/product/xiaomi-17-ultra", price: 139999, priceSource: "https://www.mi.com/in/product/xiaomi-17-ultra/buy/",
  },
  {
    id: "xiaomi-17t", brandId: "xiaomi", brand: "Xiaomi", model: "Xiaomi 17T",
    summary: "A Leica telephoto phone with long-range AI zoom.",
    highlights: ["Leica 5x telephoto", "Up to 120x AI Ultra Zoom", "Leica Live Moment"],
    categories: ["camera"],
    image: img("products/xiaomi-17t", 1600, 1600, "Xiaomi 17T in light blue, front and back, with a feature summary on screen", "contain", "#ffffff"),
    officialUrl: "https://www.mi.com/in/product/xiaomi-17t", price: 69999, priceSource: MI_HOME,
  },

  // ───────────── Redmi ─────────────
  {
    id: "redmi-note-17-pro-max", brandId: "redmi", brand: "Redmi", model: "Redmi Note 17 Pro Max 5G",
    summary: "The biggest-battery Redmi Note, rated for up to 3 days of use.",
    highlights: ["10000 mAh battery", "100W HyperCharge", "IP66 / IP68 / IP69 / IP69K"],
    categories: ["everyday", "performance"],
    image: img("products/redmi-note-17-pro-max", 1600, 1600, "Redmi Note 17 Pro Max 5G in green, front and back, with a feature summary on screen", "contain", "#ffffff"),
    officialUrl: "https://www.mi.com/in/product/redmi-note-17-pro-max-5g", price: 49999, priceSource: MI_HOME,
  },
  {
    id: "redmi-note-17-pro", brandId: "redmi", brand: "Redmi", model: "Redmi Note 17 Pro 5G",
    summary: "A rugged everyday Redmi with fast charging and multi-level water resistance.",
    highlights: ["67W HyperCharge", "IP66 / IP68 / IP69 / IP69K rated"],
    categories: ["everyday"],
    image: img("products/redmi-note-17-pro", 1600, 1600, "Redmi Note 17 Pro 5G in black, back and front, with a feature summary on screen", "contain", "#ffffff"),
    officialUrl: "https://www.mi.com/in/product/redmi-note-17-pro-5g", price: 39999, priceSource: MI_HOME,
  },
  {
    id: "redmi-note-17", brandId: "redmi", brand: "Redmi", model: "Redmi Note 17 5G",
    summary: "A big-battery Redmi Note for everyday use.",
    highlights: ["8000 mAh battery", "45W fast charging"],
    categories: ["everyday"],
    image: img("products/redmi-note-17", 1600, 1600, "Redmi Note 17 5G in lavender, front and back, with a feature summary on screen", "contain", "#ffffff"),
    officialUrl: "https://www.mi.com/in/product/redmi-note-17-5g", price: 27999, priceSource: MI_HOME,
  },
  {
    id: "redmi-17", brandId: "redmi", brand: "Redmi", model: "Redmi 17 5G",
    summary: "An affordable 5G Redmi with a 7900 mAh battery.",
    highlights: ["Snapdragon 4 Gen 5", "7900 mAh battery", "45W charging"],
    categories: ["everyday"],
    image: img("products/redmi-17", 1600, 1600, "Redmi 17 5G in coral, front and back, with a feature summary on screen", "contain", "#ffffff"),
    officialUrl: "https://www.mi.com/in/product/redmi-17-5g", price: 23999, priceSource: MI_HOME,
  },
  {
    id: "redmi-a7-pro", brandId: "redmi", brand: "Redmi", model: "Redmi A7 Pro 5G",
    summary: "An entry-level 5G Redmi with a large 120Hz screen.",
    highlights: ['6.9" 120Hz display', "6300 mAh battery", "32MP AI dual camera", "IP52 splash resistance"],
    categories: ["everyday"],
    image: img("products/redmi-a7-pro", 1600, 1600, "Redmi A7 Pro 5G in orange, front and back", "contain", "#ffffff"),
    officialUrl: "https://www.mi.com/in/product/redmi-a7-pro-5g", price: 15499, priceSource: MI_HOME,
  },
];

export type Category = { id: CategoryId; name: string; blurb: string };

export const categories: Category[] = [
  { id: "flagship", name: "Flagships", blurb: "The top model from each brand, side by side." },
  { id: "foldables", name: "Foldables", blurb: "Book-style and flip phones that fold away." },
  { id: "camera", name: "Camera phones", blurb: "Large sensors, long telephotos and lens partnerships." },
  { id: "performance", name: "Performance", blurb: "Fast chips and big batteries for gaming and heavy use." },
  { id: "iphone", name: "iPhone", blurb: "The current iPhone line-up, from 17e to Duo." },
  { id: "everyday", name: "Everyday", blurb: "Dependable phones with big batteries and tough builds." },
];

/** Budget bands used by the price filter (INR, inclusive min, exclusive max). */
export type BudgetBand = { id: string; label: string; short: string; min: number; max: number };

export const budgetBands: BudgetBand[] = [
  { id: "under-20k", label: "Under ₹20,000", short: "< ₹20K", min: 0, max: 20000 },
  { id: "20k-35k", label: "₹20,000 – ₹35,000", short: "₹20–35K", min: 20000, max: 35000 },
  { id: "35k-60k", label: "₹35,000 – ₹60,000", short: "₹35–60K", min: 35000, max: 60000 },
  { id: "60k-1l", label: "₹60,000 – ₹1 lakh", short: "₹60K–1L", min: 60000, max: 100000 },
  { id: "above-1l", label: "Above ₹1 lakh", short: "₹1L+", min: 100000, max: Infinity },
];

export const inBudget = (p: Product, b: BudgetBand) => p.price !== null && p.price >= b.min && p.price < b.max;

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
export const formatINR = (n: number) => `₹${inr.format(n)}`;

export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const productsIn = (id: CategoryId) => products.filter((p) => p.categories.includes(id));
export const productsByBrand = (brandId: string) => products.filter((p) => p.brandId === brandId);
export const getProduct = (id: string) => products.find((p) => p.id === id);

export function brandPriceRange(brandId: string) {
  const prices = productsByBrand(brandId)
    .map((p) => p.price)
    .filter((n): n is number => n !== null);
  if (!prices.length) return null;
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
