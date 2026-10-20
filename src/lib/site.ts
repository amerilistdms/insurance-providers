export const siteConfig = {
  name: "AmeriList",
  description:
    "AmeriList helps insurance agents, agencies, and marketers reach prospects with email lists, direct mail, and phone data.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  themeColor: "#12263f",
} as const;

export const indexingEnabled = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/** Public flag only. The server also requires LEAD_WEBHOOK_URL before anything is sent. */
export const leadsEnabled = process.env.NEXT_PUBLIC_LEADS_ENABLED === "true";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
