import { FaWhatsapp } from "react-icons/fa";

const whatsappUrl =
  "https://wa.me/254791672981?text=Hello%20The%20Neighbourhood%20Cocktails%2C%20I%27d%20like%20to%20plan%20an%20event.";

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with The Neighbourhood Cocktails on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
