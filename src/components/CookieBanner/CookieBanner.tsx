import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Godta"
      declineButtonText="Avslå"
      enableDeclineButton
      cookieName="spor17-consent"
      onAccept={() => window.dispatchEvent(new Event("ga-consent-given"))}
      onDecline={() => window.dispatchEvent(new Event("ga-consent-denied"))}
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
