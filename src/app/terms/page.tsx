import type { Metadata } from "next";
import { LegalDocument, PageHeader } from "@/components/PageBlocks";
import { termsPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Draft terms of use for this insurance marketing website. Pending legal review before launch.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow={termsPage.eyebrow} title={termsPage.title} lede={termsPage.lede} />
      <LegalDocument updated={termsPage.updated} sections={termsPage.sections} />
    </>
  );
}
