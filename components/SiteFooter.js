import Image from "next/image";
import Link from "next/link";
import { SiSubstack } from "react-icons/si";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
// import { BiSubstack } from "react-icons/bi";
// import { FaSubstack } from "react-icons/fa";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" aria-label="The Neighbourhood Cocktails home">
          <Image
            className="brand-logo"
            src="/images/green-cream.jpg"
            width={304}
            height={128}
            alt="The Neighbourhood Cocktails"
          />
        </Link>
        <p>Cocktail-led experiences for weddings, brands, teams, and private celebrations.</p>
      </div>
      <nav className="footer-links" aria-label="Footer links">
        <Link href="https://www.instagram.com/neighbourhood_cocktails" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={20} style={{ verticalAlign: "middle", marginRight: 4 }} aria-label="Instagram"/>
          {/* Instagram */}
        </Link>
        <Link href="https://www.linkedin.com/company/the-neighbourhood-cocktails" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={20} style={{ verticalAlign: "middle", marginRight: 4 }}  aria-label="LinkedIn"/>
          {/* LinkedIn */}
        </Link>
        <Link href="https://substack.com/@theneighbourhoodc" target="_blank" rel="noopener noreferrer">
          <SiSubstack size={20} style={{ verticalAlign: "middle", marginRight: 4 }} aria-label="Substack"/>
          {/* Substack */}
        </Link>
        <Link href="/booking" aria-label="Book a cocktail experience">
          Book
        </Link>
      </nav>
      <p className="footer-meta">&copy; {currentYear}. Neighbourhood Cocktails. All rights reserved.</p>
      <p className="footer-meta">Built by <Link href="https://www.instagram.com/rotsilabs" target="_blank" rel="noopener noreferrer">ROTSI LABS</Link>.</p>
    </footer>
  );
}
