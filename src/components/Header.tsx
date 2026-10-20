"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { cta, company, mainNav } from "@/content/site";
import { buttonClass } from "@/components/button-styles";
import { Logo } from "@/components/Logo";

function isActive(pathname: string, href: string) {
  if (href === "/#audiences") return pathname === "/" || pathname.startsWith("/audiences");
  const path = href.split("#")[0] || "/";
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setOpen(false);
    const hash = href.split("#")[1];
    if (!hash || pathname !== "/") return;
    const target = document.getElementById(hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const quoteHref = pathname === "/" ? "/#quote" : cta.quoteHref;

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "nav-open" : ""}`}>
      <Logo />
      <nav id="site-nav" aria-label="Primary" className="header-nav">
        {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              onClick={(event) => onNavClick(event, item.href)}
            >
              {item.label}
            </Link>
          ))}
          <Link href={quoteHref} className="header-nav-quote" onClick={(event) => onNavClick(event, quoteHref)}>
            {cta.quote}
          </Link>
      </nav>
      <div className="header-actions">
        <a className="header-phone" href={company.phoneHref}>
          {company.phoneDisplay}
        </a>
        <Link href={quoteHref} className={`${buttonClass.primary} header-quote`} onClick={(event) => onNavClick(event, quoteHref)}>
          <span className="btn-label-full">{cta.quote}</span>
          <span className="btn-label-short">{cta.quoteShort}</span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
