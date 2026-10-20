import Link from "next/link";
import { BarChart3, Send, Users } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { LeadForm } from "@/components/LeadForm";
import { buttonClass } from "@/components/button-styles";
import { audienceVisuals } from "@/content/visuals";
import { audiences, cta, hero, homeFaqs, quoteSection, steps, trustBenefits, why, whyPoints } from "@/content/site";

const highlightIcons = [Send, Users, BarChart3];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="lede">{hero.lede}</p>
          <a className={buttonClass.primaryLg} href="#quote">
            {cta.quote}
          </a>
          <p className="fine">{hero.fine}</p>
        </div>
        <div className="hero-photo">
          <img src="/images/hero.jpg" alt="Marketing professional ready to talk through a campaign" />
        </div>
      </section>

      <section className="highlights" aria-label="Why insurance marketers use AmeriList">
        <div className="highlights-grid">
          {trustBenefits.map((item, index) => {
            const Icon = highlightIcons[index];
            return (
              <div key={item.title} className="highlight">
                <span className="highlight-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={2.2} />
                </span>
                <p className="highlight-label">{item.label}</p>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pitch">
        <div className="pitch-head">
          <div>
            <h2>{why.title}</h2>
            <p>{why.lede}</p>
          </div>
          <a className={buttonClass.primary} href="#audiences">
            {cta.explore}
          </a>
        </div>
        <ol className="pitch-points">
          {whyPoints.map((point, index) => (
            <li key={point.title}>
              <span>0{index + 1}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="audiences" className="audiences scroll-mt-24" aria-labelledby="audiences-heading">
        <div className="audiences-head">
          <h2 id="audiences-heading">Audiences Insurance Marketers Ask For</h2>
          <p>Prospect audiences for your campaigns. Availability depends on the market and the selects you need.</p>
        </div>
        <ul className="audience-rows">
          {audiences.map((audience) => {
            const visual = audienceVisuals[audience.slug];
            return (
              <li key={audience.slug}>
                <Link href={`/audiences/${audience.slug}`}>
                  <span className="audience-media">
                    <img src={visual.photo} alt={visual.alt} />
                  </span>
                  <span className="audience-copy">
                    <h3>{audience.name}</h3>
                    <p>{audience.summary}</p>
                  </span>
                  <span className="audience-more">View audience</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="how-it-works" className="count-steps scroll-mt-24" aria-labelledby="how-heading">
        <div className="count-steps-inner">
          <div className="count-steps-intro">
            <p className="count-kicker">How a count starts</p>
            <h2 id="how-heading">Three answers. One market count.</h2>
            <p>Tell us who, where, and how. We research the file and send back what is available before anything is ordered.</p>
            <a className={buttonClass.primary} href="#quote">
              {cta.quote}
            </a>
          </div>
          <ol className="count-steps-list">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="count-num">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="quote-band" aria-labelledby="quote-heading">
        <div className="section-head">
          <p className="eyebrow dark">{quoteSection.eyebrow}</p>
          <h2 id="quote-heading">{quoteSection.title}</h2>
          <p>{quoteSection.lede}</p>
        </div>
        <div className="quote-card">
          <LeadForm />
        </div>
      </section>

      <section className="faq-band" aria-labelledby="faq-heading">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow dark">FAQ</p>
            <h2 id="faq-heading" className="text-4xl font-bold tracking-tight text-navy">
              Before you request a count
            </h2>
            <Link href="/faq" className={`${buttonClass.secondary} mt-6`}>
              Read all questions
            </Link>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
