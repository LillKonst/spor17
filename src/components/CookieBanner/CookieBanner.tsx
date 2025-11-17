import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

export default function CookieBanner() {
   const handleAccept = () => {
    // Trigger Google Analytics consent
    window.gtag?.('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    });
    window.gtag?.('event', 'page_view');

    // Trigger Meta Pixel eller andre scripts her hvis nødvendig
    window.dispatchEvent(new Event("ga-consent-given"));
  };

  const handleDecline = () => {
    window.gtag?.('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    });
    window.dispatchEvent(new Event("ga-consent-denied"));
  };
  return (
    <CookieConsent
      location="bottom"
      buttonText="Godta"
      declineButtonText="Avslå"
      enableDeclineButton
      cookieName="spor17-consent"
      onAccept={handleAccept}
      onDecline={handleDecline}
      style={{ background: "#F7F7F7", color: "#000000" }}
      buttonStyle={{ background: "#A5EB9F", color: "#000000", fontSize: "14px" }}
      declineButtonStyle={{ background: "#777", color: "#fff", fontSize: "14px" }}
    >
      Vi bruker informasjonskapsler for å forbedre brukeropplevelsen din og til
      annonsering via Meta Pixel.{" "}
        <Link to="/sikkerhet-personvern" className="underline text-black hover:pointer-coarse:">
    Les mer her
  </Link>
    </CookieConsent>
  );
}
