/**
 * Brands shown on the site. Brand names are set as plain text in the site's own
 * typeface — no manufacturer logos are reproduced, because logo usage permission
 * has not been confirmed. Swap in official logo files here once the business has
 * authorised-reseller artwork.
 */
export type Brand = {
  id: string;
  name: string;
  officialSite: string;
  note: string;
};

export const brands: Brand[] = [
  { id: "apple", name: "Apple", officialSite: "https://www.apple.com/in/", note: "iPhone 17e through to the foldable iPhone Duo" },
  { id: "samsung", name: "Samsung", officialSite: "https://www.samsung.com/in/", note: "Galaxy S26 series and Galaxy Z foldables" },
  { id: "oneplus", name: "OnePlus", officialSite: "https://www.oneplus.in/", note: "OnePlus 15 series and the Nord range" },
  { id: "vivo", name: "vivo", officialSite: "https://www.vivo.com/in/", note: "X, V and T series, with ZEISS optics" },
  { id: "oppo", name: "OPPO", officialSite: "https://www.oppo.com/in/", note: "Find X, Reno, K and A series" },
  { id: "xiaomi", name: "Xiaomi", officialSite: "https://www.mi.com/in/", note: "Xiaomi 17 series, co-engineered with Leica" },
  { id: "redmi", name: "Redmi", officialSite: "https://www.mi.com/in/", note: "Redmi Note 17 and Redmi 17 series" },
];

export const getBrand = (id: string) => brands.find((b) => b.id === id);
