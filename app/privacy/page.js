import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyChoicesButton } from "@/components/PrivacyChoicesButton";

export const metadata = {
  title: "Privacy Notice",
  description:
    "How The Neighbourhood Cocktails collects, uses, shares, and protects personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="privacy-page">
        <header className="privacy-hero">
          <p className="eyebrow">Your information</p>
          <h1>Privacy notice</h1>
          <p>
            This notice explains how The Neighbourhood Cocktails handles personal
            data when you visit our website, request a quote, contact us, or send
            feedback.
          </p>
          <p className="privacy-updated">Last updated: 29 July 2026</p>
        </header>

        <div className="privacy-layout">
          <nav className="privacy-nav" aria-label="Privacy notice sections">
            <p className="footer-label">On this page</p>
            <a href="#who-we-are">Who we are</a>
            <a href="#information">Information we collect</a>
            <a href="#uses">How we use it</a>
            <a href="#tracking">Meta Pixel and advertising</a>
            <a href="#sharing">Who receives information</a>
            <a href="#retention">Retention and security</a>
            <a href="#rights">Your rights</a>
            <a href="#contact">Contact us</a>
          </nav>

          <article className="privacy-content">
            <section id="who-we-are">
              <h2>Who we are</h2>
              <p>
                The Neighbourhood Cocktails provides mobile bar, cocktail,
                mocktail, bartending, event and masterclass services in Nairobi,
                Kenya. For the processing described in this notice, The
                Neighbourhood Cocktails is the organisation responsible for
                deciding how and why personal data is used.
              </p>
              <p>
                You can contact us at{" "}
                <a href="mailto:hello@neighbourhoodcocktails.com">
                  hello@neighbourhoodcocktails.com
                </a>{" "}
                or at Hackhouse Africa, 124 Manyani East Road, Nairobi, Kenya.
              </p>
            </section>

            <section id="information">
              <h2>Information we collect</h2>
              <p>Depending on how you interact with us, we may collect:</p>
              <ul>
                <li>
                  Your name, email address and any contact details you choose to
                  provide.
                </li>
                <li>
                  Event details including the proposed date, location, guest
                  count, event type, service style, drink preferences and special
                  requests.
                </li>
                <li>
                  Feedback, ratings, comments and communication preferences that
                  you submit.
                </li>
                <li>
                  Technical information such as IP address, browser and device
                  information, referring page, pages viewed, advertising
                  identifiers and actions taken on the website, where marketing
                  tracking is permitted.
                </li>
                <li>
                  Our correspondence with you and operational records relating to
                  an enquiry or booking.
                </li>
              </ul>
            </section>

            <section id="uses">
              <h2>How and why we use information</h2>
              <p>We use personal data to:</p>
              <ul>
                <li>Respond to enquiries and prepare requested quotes.</li>
                <li>Plan, administer and deliver event services.</li>
                <li>Send transactional confirmations and service communications.</li>
                <li>Record and respond to feedback.</li>
                <li>Protect the website, prevent misuse and resolve faults.</li>
                <li>Meet legal, accounting and regulatory obligations.</li>
                <li>
                  Measure advertising and build relevant audiences only where you
                  have accepted marketing tracking.
                </li>
              </ul>
              <p>
                We process information where it is necessary to take steps at your
                request, provide an agreed service, meet a legal obligation, pursue
                a legitimate operational interest that does not override your
                rights, or where you have given consent. You may withdraw consent
                without affecting processing that was lawful before withdrawal.
              </p>
            </section>

            <section id="tracking">
              <h2>Meta Pixel and advertising</h2>
              <p>
                If you accept marketing tracking, we load Meta Pixel. It records
                events such as page views, service or cocktail views, WhatsApp
                clicks and successful booking enquiries. These events help us
                measure advertising, understand the customer journey, create
                audiences and show more relevant advertising on Meta services
                such as Facebook and Instagram.
              </p>
              <p>
                For successful booking enquiries, our website may also send a
                matching event to Meta through the Conversions API. Where
                applicable, identifiers such as an email address are
                cryptographically hashed before transmission. Meta may still use
                the information to match the event to an account in accordance
                with its own terms and privacy policy.
              </p>
              <p>
                Marketing tracking is optional. If you reject it, the Meta Pixel
                will not be loaded by this website and your ability to browse,
                contact us, or submit a booking request will not be affected.
              </p>
              <PrivacyChoicesButton />
            </section>

            <section id="sharing">
              <h2>Who receives information</h2>
              <p>
                We share information only where needed with service providers that
                help operate the website and business, including:
              </p>
              <ul>
                <li>Our website hosting and infrastructure provider.</li>
                <li>Brevo, which supports email delivery and contact management.</li>
                <li>Sanity, which supports website content management.</li>
                <li>
                  Meta Platforms, only for consented advertising measurement and
                  audience services.
                </li>
                <li>
                  Professional advisers, regulators or public authorities where
                  disclosure is required or legally justified.
                </li>
              </ul>
              <p>
                Some providers may process information outside Kenya. Where
                personal data is transferred internationally, we take reasonable
                steps to use providers and safeguards appropriate to the
                information and applicable data protection requirements.
              </p>
            </section>

            <section id="retention">
              <h2>Retention and security</h2>
              <p>
                We retain personal data only for as long as reasonably necessary
                for the purpose for which it was collected, including handling an
                enquiry, delivering services, maintaining appropriate business
                records, resolving disputes and satisfying legal obligations.
                Retention periods vary according to the type of record and the
                reason it is held.
              </p>
              <p>
                We use reasonable organisational and technical safeguards designed
                to prevent unauthorised access, loss, alteration or disclosure.
                No internet transmission or storage system can be guaranteed to be
                completely secure.
              </p>
            </section>

            <section id="rights">
              <h2>Your rights</h2>
              <p>
                Subject to applicable law, you may ask to be informed about our
                use of your personal data, access it, correct inaccurate
                information, object to or restrict processing, request deletion,
                receive portable information where applicable, or withdraw
                consent.
              </p>
              <p>
                You may also object to direct marketing at any time. To exercise a
                right, contact us using the details below. We may need to verify
                your identity before completing a request.
              </p>
              <p>
                If you remain concerned about how your information has been
                handled, you may lodge a complaint with Kenya&apos;s{" "}
                <a
                  href="https://www.odpc.go.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Office of the Data Protection Commissioner
                </a>
                .
              </p>
            </section>

            <section id="contact">
              <h2>Contact us</h2>
              <p>
                Email:{" "}
                <a href="mailto:hello@neighbourhoodcocktails.com">
                  hello@neighbourhoodcocktails.com
                </a>
                <br />
                Address: The Neighbourhood Cocktails, Hackhouse Africa, 124
                Manyani East Road, Nairobi, Kenya
              </p>
              <p>
                We may update this notice when our services, providers or legal
                obligations change. The latest version will remain available on
                this page.
              </p>
              <Link className="btn secondary" href="/booking">
                Return to booking
              </Link>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

