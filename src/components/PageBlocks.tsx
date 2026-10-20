import Link from "next/link";
import { cta, type LegalSection } from "@/content/site";
import { RichText } from "@/components/RichText";
import { buttonClass } from "@/components/button-styles";

export function PageHeader({
  eyebrow,
  title,
  lede,
  tone = "mist",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  tone?: "mist" | "navy";
}) {
  const navy = tone === "navy";

  return (
    <header className={navy ? "bg-navy text-white" : "page-hero"}>
      <div className="container-site py-10 md:py-14">
        <p className={navy ? "eyebrow" : "eyebrow dark"}>{eyebrow}</p>
        <h1 className={`mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-[44px] ${navy ? "text-white" : "text-navy"}`}>
          {title}
        </h1>
        <p className={`mt-4 max-w-2xl text-lg leading-8 ${navy ? "text-white/75" : "text-muted"}`}>{lede}</p>
      </div>
    </header>
  );
}

export function DraftNotice() {
  return (
    <div className="mb-8 rounded-xl border border-line bg-[#e7f3fa] px-4 py-3 text-sm leading-6 text-navy">
      <p className="font-semibold">Draft for legal and compliance review</p>
      <p className="mt-1">
        This page is placeholder language for internal review. It is not final policy, legal advice, or approved compliance copy.
      </p>
    </div>
  );
}

export function CountBand({ title, lede, href = cta.quoteHref }: { title: string; lede: string; href?: string }) {
  return (
    <div className="count-band">
      <div>
        <h2>{title}</h2>
        <p>{lede}</p>
      </div>
      <Link href={href} className={buttonClass.primary}>
        {cta.quote}
      </Link>
    </div>
  );
}

export function LegalDocument({
  updated,
  sections,
}: {
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="container-site max-w-3xl py-12 md:py-16">
      <DraftNotice />
      <p className="text-sm font-medium text-muted">{updated}</p>
      <div className="mt-8 space-y-9">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold tracking-tight text-navy">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-base leading-7 text-ink">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
            {section.list ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-ink">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
