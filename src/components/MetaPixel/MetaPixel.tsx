import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

interface MetaPixelProps {
  pixelId: string;
}

interface FbqFunction {
  (...args: unknown[]): void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    function initPixel() {
      if (window.fbq) return;

      const fbq: FbqFunction = function (...args: unknown[]) {
        (fbq.queue = fbq.queue || []).push(args);
      };
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];

      window.fbq = fbq;
      window._fbq = fbq;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    }

    // Last Pixel hvis cookie allerede finnes
    const consent = document.cookie.includes("spor17-consent=1");
    if (consent) initPixel();

    // Last Pixel umiddelbart når bruker klikker “Godta”
    window.addEventListener("ga-consent-given", initPixel);

    return () => {
      window.removeEventListener("ga-consent-given", initPixel);
    };
  }, [pixelId]);

  return null;
}
