import type { Metadata } from "next";
import { CountBand, PageHeader } from "@/components/PageBlocks";
import { aboutPage, company } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.lede,
  alternates: { canonical: "/about" },
};

const facts = [
  { label: "Since", title: company.since, body: "Helping marketers reach targeted prospects." },
  { label: "Channels", title: "Email, mail, phone", body: "One count, built for the channel the campaign uses." },
  { label: "Office", title: "New City, NY", body: company.addressLines.join(", ") },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={aboutPage.eyebrow} title={aboutPage.title} lede={aboutPage.lede} />
      <div className="container-site max-w-5xl py-12 md:py-16">
        <div className="about-photos">
          <img src="/images/consult.jpg" alt="Two marketers celebrating a campaign result" />
          <img src="/images/park.jpg" alt="Two women on a park bench looking at a phone" />
        </div>
        <ul className="about-facts">
          {facts.map((fact) => (
            <li key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.title}</strong>
              <p>{fact.body}</p>
            </li>
          ))}
        </ul>
        {aboutPage.sections.map((section) => (
          <section key={section.heading} className="border-t border-line py-8 first:border-t-0 first:pt-0">
            <h2 className="text-2xl font-bold tracking-tight text-navy">{section.heading}</h2>
            <div className="mt-3 max-w-3xl space-y-3 text-base leading-7 text-ink">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
        <CountBand
          title="See what’s available in your market"
          lede="Send the audience, the territory, and the channel. A count is not an order."
        />
      </div>
    </>
  );
}
