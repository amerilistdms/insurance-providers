import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { siteConfig } from "@/lib/site";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${company.name} | Prospect Data for Insurance Marketers` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
