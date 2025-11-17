// src/components/MetaPixel/MetaPixel.tsx
import { useEffect } from "react";

type FbqFunction = ((...args: unknown[]) => void) & {
  queue?: unknown[]; 
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

interface MetaPixelProps {
  pixelId: string;
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    function initPixel() {
      // Hvis fbq allerede finnes, er den initialisert
      if (window.fbq) return;

      // Lag en funksjon med korrekt type
      const fbq = ((...args: unknown[]) => {
        // push args til køen (queue) — opprett køen ved behov
        fbq.queue = fbq.queue || [];
        fbq.queue.push(args);
      }) as FbqFunction;

      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = fbq.queue || [];

      // Sett globalt
      window.fbq = fbq;
      window._fbq = fbq;

      // Last scriptet
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      // Trygge kall (optional chaining)
      window.fbq?.("init", pixelId);
      window.fbq?.("track", "PageView");
    }

    // Last kun hvis brukeren har gitt samtykke eksplisitt
    const hasConsent = document.cookie.includes("spor17-consent=true");
    if (hasConsent) initPixel();

    // Lytt etter at banneret sender event når brukeren godtar
    window.addEventListener("ga-consent-given", initPixel);

    return () => {
      window.removeEventListener("ga-consent-given", initPixel);
    };
  }, [pixelId]);

  return null;
}

