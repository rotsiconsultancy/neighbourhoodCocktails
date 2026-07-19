"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaInstagram, FaLinkedin, FaTimes } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/cocktails", label: "Our Cocktail Offerings" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/feedback", label: "Feedback" },
];

export function SiteHeaderClient({ settings }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const socialItems = [
    { href: settings.instagramUrl, label: "Instagram", Icon: FaInstagram },
    { href: settings.linkedinUrl, label: "LinkedIn", Icon: FaLinkedin },
    { href: settings.substackUrl, label: "Substack", Icon: SiSubstack },
  ].filter((item) => item.href);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return undefined;

    let frameId = 0;
    function updateHeader() {
      frameId = 0;
      const heroHeight = Math.max(hero.getBoundingClientRect().height, 1);
      const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.72), 0), 1);
      headerRef.current?.style.setProperty("--hero-scroll-progress", progress.toFixed(3));
      headerRef.current?.style.setProperty("--hero-scroll-position", `${12 + progress * 70}%`);
      setIsScrolled((current) => {
        const next = window.scrollY > 42;
        return current === next ? current : next;
      });
    }

    function handleScroll() {
      if (!frameId) frameId = window.requestAnimationFrame(updateHeader);
    }

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header ref={headerRef} className={`site-header${isMenuOpen ? " is-open" : ""}${isScrolled ? " is-scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="The Neighbourhood Cocktails home">
        <Image className="brand-logo" src={settings.primaryLogo} width={814} height={446} alt="The Neighbourhood Cocktails" priority unoptimized={settings.primaryLogo.startsWith("http")} />
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <nav className="social-links desktop-social-links" aria-label="Social links">
          {socialItems.map(({ href, label, Icon }) => <Link key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon aria-hidden="true" /></Link>)}
        </nav>
        <Link className="nav-cta" href="/booking">Book Our Services</Link>
      </div>
      <div className="mobile-header-actions">
        <nav className="social-links" aria-label="Social links">
          {socialItems.map(({ href, label, Icon }) => <Link key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon aria-hidden="true" /></Link>)}
        </nav>
        <button className="menu-toggle" type="button" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="mobile-menu" onClick={() => setIsMenuOpen((current) => !current)}>
          {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>
      <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</Link>)}
        <Link className="mobile-menu-cta" href="/booking" onClick={() => setIsMenuOpen(false)}>Book Our Services</Link>
      </nav>
    </header>
  );
}
