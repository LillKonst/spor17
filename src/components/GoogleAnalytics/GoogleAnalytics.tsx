import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    // console.log("GoogleAnalytics mounted, cookie:", document.cookie);
    function initGA() {
  if (window.dataLayer) return;

  window.dataLayer = [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  
  script.onload = () => {
  // console.log("gtag loaded, now configuring GA");
  if (window.gtag) {
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  } else {
    console.warn("gtag is undefined after script load");
  }
};


  document.head.appendChild(script);
  // console.log("initGA called, script appended");
}


    

    // Last GA kun hvis bruker har gitt samtykke
    const hasConsent = document.cookie.includes("spor17-consent=true");
    if (hasConsent) initGA();

    // Lytt etter godkjenning fra CookieBanner
    window.addEventListener("ga-consent-given", initGA);

    return () => {
      window.removeEventListener("ga-consent-given", initGA);
    };
  }, [measurementId]);
  

  return null;
}
