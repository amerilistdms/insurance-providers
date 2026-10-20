import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { PageHeader } from "@/components/PageBlocks";
import { buttonClass } from "@/components/button-styles";
import { company, cta, faqPage, homeFaqs } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqPage.lede,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow={faqPage.eyebrow} title={faqPage.title} lede={faqPage.lede} />
      <div className="container-site py-12 md:py-16">
        <div className="faq-layout">
          <FaqList items={homeFaqs} />
          <aside className="contact-panel">
            <p className="contact-panel-kicker">Talk with AmeriList</p>
            <h2>Ask about a count</h2>
            <p>Call or email, or send the audience and the market from the form.</p>
            <a className="contact-panel-phone" href={company.phoneHref}>
              {company.phoneDisplay}
            </a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <Link href={cta.quoteHref} className={`${buttonClass.primary} mt-5`}>
              {cta.quote}
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
