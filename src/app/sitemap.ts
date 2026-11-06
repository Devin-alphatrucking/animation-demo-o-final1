import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { categories } from "@/data/products";
import { brands } from "@/data/brands";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl.replace(/\/$/, "");
  const paths = ["", "/phones", ...categories.map((c) => `/phones/${c.id}`), "/brands", ...brands.map((b) => `/brands/${b.id}`), "/accessories", "/stores", "/about", "/franchise", "/contact"];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
