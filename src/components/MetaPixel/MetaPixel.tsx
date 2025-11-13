// src/components/MetaPixel/MetaPixel.tsx
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

// Typing for Meta Pixel queue-funksjon
interface FbqFunction {
  (...args: unknown[]): void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    const consent = document.cookie.includes("spor17-consent=true");

    if (consent && !window.fbq) {
      // Init Meta Pixel
      const initPixel = () => {
        const n: FbqFunction = function (...args: unknown[]) {
          (n.queue = n.queue || []).push(args);
        };
        n.queue = [];
        n.loaded = true;
        n.version = "2.0";

        window.fbq = n;
        window._fbq = n;

        const t = document.createElement("script");
        t.async = true;
        t.src = "https://connect.facebook.net/en_US/fbevents.js";
        const s = document.getElementsByTagName("script")[0];
        s?.parentNode?.insertBefore(t, s);
      };

      initPixel();

      window.fbq!("init", pixelId);
      window.fbq!("track", "PageView");
    }
  }, [pixelId]);

  return null;
}
