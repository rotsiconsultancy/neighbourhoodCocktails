"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaInstagram, FaLinkedin, FaTimes } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const navItems = [
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/feedback", label: "Feedback" },
];

const socialItems = [
  {
    href: "https://www.instagram.com/neighbourhood_cocktails",
    label: "Instagram",
    Icon: FaInstagram
  },
  {
    href: "https://www.linkedin.com/company/the-neighbourhood-cocktails",
    label: "LinkedIn",
    Icon: FaLinkedin
  },
  {
    href: "https://substack.com/@theneighbourhoodc",
    label: "Substack",
    Icon: SiSubstack
  }
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={`site-header${isMenuOpen ? " is-open" : ""}`}>
      <Link className="brand" href="/" aria-label="The Neighbourhood Cocktails home">
        <Image
          className="brand-logo"
          src="/images/logo.svg"
          width={350}
          height={128}
          alt="The Neighbourhood Cocktails"
          priority
        />
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <nav className="social-links desktop-social-links" aria-label="Social links">
          {socialItems.map(({ href, label, Icon }) => (
            <Link key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/booking">
          Book Our Services
        </Link>
      </div>

      <div className="mobile-header-actions">
        <nav className="social-links" aria-label="Social links">
          {socialItems.map(({ href, label, Icon }) => (
            <Link key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link className="mobile-menu-cta" href="/booking" onClick={closeMenu}>
          Book Our Services
        </Link>
      </nav>
    </header>
  );
}
