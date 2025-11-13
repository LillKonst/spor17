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
    const consent = document.cookie.includes("spor17-consent=true");

    if (consent && !window.dataLayer) {
      // Opprett dataLayer
      window.dataLayer = [];
      window.gtag = function (...args: unknown[]) {
        window.dataLayer!.push(args);
      };

      window.gtag("js", new Date());
      window.gtag("config", measurementId);

      // Last inn Google Analytics-skriptet
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }
  }, [measurementId]);

  return null;
}
