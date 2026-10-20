import type { Metadata } from "next";
import { LegalDocument, PageHeader } from "@/components/PageBlocks";
import { privacyPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Draft privacy policy for count requests on the AmeriList insurance marketing website. Pending legal review before launch.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow={privacyPage.eyebrow} title={privacyPage.title} lede={privacyPage.lede} />
      <LegalDocument updated={privacyPage.updated} sections={privacyPage.sections} />
    </>
  );
}
