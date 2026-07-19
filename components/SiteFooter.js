import Link from "next/link";
import { SiSubstack } from "react-icons/si";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { getSiteSettings } from "@/sanity/lib/content";

export async function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const settings = await getSiteSettings();
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-logos">
          <Link className="footer-logo-link" href="/" aria-label="The Neighbourhood Cocktails home">
            <img
              className="footer-brand-logo"
              src={settings.primaryLogo}
              width={600}
              height={300}
              alt="The Neighbourhood Cocktails"
            />
          </Link>

          <Link className="footer-logo-link" href={settings.partnerUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Qurative">
            <img
              className="footer-partner-logo"
              src={settings.partnerLogo}
              width={600}
              height={400}
              alt="Qurative"
            />
          </Link>
        </div>

        <div className="footer-about">
          <p>{settings.tagline}</p>
          <address className="footer-address">
            {settings.addressLines.map((line) => <span key={line}>{line}<br /></span>)}
            <a href={settings.directionsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
          </address>
        </div>

        <div className="footer-discovery">
          <p className="footer-label">Plan your event</p>
          <nav aria-label="Event planning services">
            <Link href="/mobile-bar-hire-westlands-kilimani">Westlands &amp; Kilimani mobile bar</Link>
            <Link href="/wedding-mobile-bar-nairobi">Wedding mobile bar</Link>
            <Link href="/corporate-cocktail-catering-nairobi">Corporate cocktail catering</Link>
            <Link href="/private-party-bartenders-nairobi">Private party bartenders</Link>
            <Link href="/cocktail-masterclass-nairobi">Cocktail masterclasses</Link>
            <Link href="/mocktail-bar-events-nairobi">Mocktail bar for events</Link>
            <Link href="/brand-activation-bar-service">Brand activation bar service</Link>
            <Link href="/event-drinks-packages">Event drinks packages</Link>
          </nav>
        </div>

        <div className="footer-links">
          <p className="footer-label">Explore</p>
          <nav aria-label="Footer links">
            <Link href="/services">Services</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/booking">Book our services</Link>
          </nav>
          <div className="footer-social-block">
            <p className="footer-label">Follow us</p>
            <nav className="footer-social" aria-label="Social links">
              <Link href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram aria-hidden="true" />
              </Link>
              <Link href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin aria-hidden="true" />
              </Link>
              <Link href={settings.substackUrl} target="_blank" rel="noopener noreferrer" aria-label="Substack">
                <SiSubstack aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear}. Neighbourhood Cocktails. All rights reserved.</p>
        <p>Built by <Link href="https://malaikastudios.rotsi.co.ke" target="_blank" rel="noopener noreferrer">Malaika Studios</Link>.</p>
      </div>
    </footer>
  );
}
