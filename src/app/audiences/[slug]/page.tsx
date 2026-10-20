import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { CountBand, PageHeader } from "@/components/PageBlocks";
import { audienceVisuals } from "@/content/visuals";
import { audiences, getAudience } from "@/content/site";

type AudiencePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return audiences.map((audience) => ({ slug: audience.slug }));
}

export async function generateMetadata({ params }: AudiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) return {};

  return {
    title: `${audience.name} Prospect Lists`,
    description: audience.metaDescription,
    alternates: { canonical: `/audiences/${audience.slug}` },
  };
}

export default async function AudiencePage({ params }: AudiencePageProps) {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) notFound();
  const visual = audienceVisuals[audience.slug];

  return (
    <>
      <PageHeader eyebrow="Audience" title={`${audience.name} Prospects`} lede={audience.lede} />
      <article className="container-site py-10 md:py-14">
        {visual ? (
          <div className="audience-banner">
            <img src={visual.photo} alt={visual.alt} />
          </div>
        ) : null}

        <div className="mt-8 max-w-3xl space-y-4 text-lg leading-8 text-ink">
          {audience.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight text-navy">What you can select</h2>
        <ol className="pitch-points mt-4">
          {audience.benefits.map((benefit, index) => (
            <li key={benefit.title}>
              <span>0{index + 1}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-2xl font-bold tracking-tight text-navy">Questions</h2>
        <div className="mt-2 max-w-3xl">
          <FaqList items={audience.faqs} />
        </div>

        <CountBand
          title={`See the ${audience.name} count for your market`}
          lede="Send the territory and the channel. A count is not an order."
          href={`/contact?interest=${encodeURIComponent(audience.interest)}#quote`}
        />

        <h2 className="mt-12 text-sm font-bold tracking-[0.14em] text-teal uppercase">Other audiences</h2>
        <ul className="audience-rows mt-4">
          {audiences
            .filter((item) => item.slug !== audience.slug)
            .map((item) => {
              const itemVisual = audienceVisuals[item.slug];
              return (
                <li key={item.slug}>
                  <Link href={`/audiences/${item.slug}`}>
                    <span className="audience-media">
                      {itemVisual ? <img src={itemVisual.photo} alt={itemVisual.alt} /> : null}
                    </span>
                    <span className="audience-copy">
                      <h3>{item.name}</h3>
                      <p>{item.summary}</p>
                    </span>
                    <span className="audience-more">View audience</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </article>
    </>
  );
}
