// src/components/GoogleAnalytics/GoogleAnalytics.tsx
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
  function initGA() {
     if (!window.dataLayer) {
      window.dataLayer = [];

      window.gtag = function (...args: unknown[]) {
        window.dataLayer!.push(args);
      };

      window.gtag("js", new Date());
      window.gtag("config", measurementId);

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }
  }

  const cookie = document.cookie.includes("spor17-consent=1");
  if (cookie) initGA();

  window.addEventListener("ga-consent-given", initGA);

  return () => {
    window.removeEventListener("ga-consent-given", initGA);
  };
}, [measurementId]);


  return null;
}
