import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageBlocks";
import { company, contactPage, interestOptions } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call AmeriList or request a market count for the insurance audience you want to reach.",
  alternates: { canonical: "/contact" },
};

type ContactPageProps = {
  searchParams: Promise<{ interest?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const requested = Array.isArray(params.interest) ? params.interest[0] : params.interest;
  const interest = interestOptions.includes(requested as (typeof interestOptions)[number]) ? requested : "";

  return (
    <>
      <PageHeader eyebrow={contactPage.eyebrow} title={contactPage.title} lede={contactPage.lede} />
      <div className="bg-[#f4f8fb]">
        <div className="container-site grid items-start gap-6 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(12,61,102,0.08)] sm:p-8">
            <LeadForm key={interest || "general"} defaultInterest={interest} />
          </div>
          <aside className="contact-panel">
            <p className="contact-panel-kicker">Office</p>
            <h2>{company.legalName}</h2>
            <p>{company.about}</p>
            <a className="contact-panel-phone" href={company.phoneHref}>
              {company.phoneDisplay}
            </a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <address>
              {company.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </aside>
        </div>
      </div>
    </>
  );
}
