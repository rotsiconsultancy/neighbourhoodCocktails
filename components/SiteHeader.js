import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/#events", label: "Events" },
  { href: "/#experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" }
];

export function SiteHeader() {
  return (
    <nav className="site-header">
      <Link className="brand" href="/" aria-label="The Neighbourhood Cocktails home">
        <Image
          className="brand-logo"
          // src="/images/green-cream.jpg"
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
      <Link className="nav-cta" href="/booking">
        Plan Your Event
      </Link>
    </nav>
  );
}
