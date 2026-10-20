import Link from "next/link";
import { company, cta, footer, legalNav, mainNav } from "@/content/site";
import { buttonClass } from "@/components/button-styles";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-bar">
        <div className="footer-copy">
          <div className="footer-logo-chip">
            <Logo />
          </div>
          <p className="eyebrow">{footer.eyebrow}</p>
          <p>{company.about}</p>
          <p className="footer-note">{company.disclaimer}</p>
          <p className="footer-ready">{footer.ready}</p>
        </div>
        <div className="footer-actions">
          <a className="footer-phone" href={company.phoneHref}>
            {company.phoneDisplay}
          </a>
          <Link href={cta.quoteHref} className={buttonClass.primary}>
            {cta.quote}
          </Link>
          <Link href="/contact" className={buttonClass.ghostOnNavy}>
            Contact Us
          </Link>
        </div>
      </div>
      <div className="footer-legal">
        <p>
          © {new Date().getFullYear()} {company.legalName}
        </p>
        <nav aria-label="Footer">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
