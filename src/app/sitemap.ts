import type { MetadataRoute } from "next";
import { audiences } from "@/content/site";
import { siteConfig } from "@/lib/site";

const routes = ["", "/about", "/faq", "/contact", "/privacy", "/terms", ...audiences.map((audience) => `/audiences/${audience.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-20");
  return routes.map((route) => ({
    url: `${siteConfig.url}${route || "/"}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
