import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}


export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    function initGA() {
      if (window.dataLayer) return;

      window.dataLayer = [];
      window.gtag = function (...args: unknown[]) {
        window.dataLayer!.push(args);
      };

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      window.gtag("js", new Date());
      window.gtag("config", measurementId);
    }

    // Hvis cookie finnes (uansett verdi)
    const cookie = document.cookie.includes("spor17-consent");
    if (cookie) initGA();

    // Hvis bruker trykker på godta-knappen
    window.addEventListener("ga-consent-given", initGA);

    return () => {
      window.removeEventListener("ga-consent-given", initGA);
    };
  }, [measurementId]);

  return null;
}
