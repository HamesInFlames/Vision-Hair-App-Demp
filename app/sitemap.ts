import type { MetadataRoute } from "next";
import { barbers } from "@/data/barbers";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/barbers",
    "/services",
    "/shop",
    "/classes",
    "/gallery",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const barberRoutes: MetadataRoute.Sitemap = barbers.map((b) => ({
    url: `${site.url}/barbers/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...barberRoutes, ...productRoutes];
}
