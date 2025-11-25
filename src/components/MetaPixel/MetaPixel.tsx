// // src/components/MetaPixel/MetaPixel.tsx
// import { useEffect } from "react";

// type FbqFunction = ((...args: unknown[]) => void) & {
//   queue?: unknown[]; 
//   loaded?: boolean;
//   version?: string;
// };

// declare global {
//   interface Window {
//     fbq?: FbqFunction;
//     _fbq?: FbqFunction;
//   }
// }

// interface MetaPixelProps {
//   pixelId: string;
// }

// export default function MetaPixel({ pixelId }: MetaPixelProps) {
//   useEffect(() => {
//   function initPixel() {
//     if (window.fbq) return;

//     const fbq: FbqFunction = function (...args: unknown[]) {
//       (fbq.queue = fbq.queue || []).push(args);
//     };
//     fbq.loaded = true;
//     fbq.version = "2.0";
//     fbq.queue = [];

//     window.fbq = fbq;
//     window._fbq = fbq;

//     const script = document.createElement("script");
//     script.async = true;
//     script.src = "https://connect.facebook.net/en_US/fbevents.js";

//     script.onload = () => {
//       if (window.fbq) {
//         window.fbq("init", pixelId);
//         window.fbq("track", "PageView");
//       } else {
//         console.warn("fbq is undefined after script load");
//       }
//     };

//     document.head.appendChild(script);
//   }

//   const consent = document.cookie.includes("spor17-consent=true");
//   if (consent) initPixel();
//   window.addEventListener("ga-consent-given", initPixel);

//   return () => {
//     window.removeEventListener("ga-consent-given", initPixel);
//   };
// }, [pixelId]);


//   return null;
// }


// src/components/MetaPixel/MetaPixel.tsx
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

interface FbqFunction {
  (...args: unknown[]): void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
}

interface MetaPixelProps {
  pixelId: string;
  debug?: boolean;
}

export default function MetaPixel({ pixelId, debug = false }: MetaPixelProps) {
  useEffect(() => {
    if (!pixelId) return;

    const PIXEL_SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js";

    const log = (...args: unknown[]) => debug && console.debug("[MetaPixel]", ...args);

    /** Opprett fbq placeholder for TypeScript */
    const createFbqPlaceholder = (): FbqFunction => {
      const fbqFn: FbqFunction = (...args: unknown[]) => {
        fbqFn.queue = fbqFn.queue || [];
        fbqFn.queue.push(args);
      };
      fbqFn.queue = [];
      fbqFn.loaded = true;
      fbqFn.version = "2.0";

      window.fbq = fbqFn;
      window._fbq = fbqFn;

      return fbqFn;
    };

    /** Init Pixel og send PageView */
    const initPixel = () => {
      if (!window.fbq) createFbqPlaceholder();

      try {
        // Init med Pixel ID
        window.fbq?.("init", pixelId);

        // PageView
        window.fbq?.("track", "PageView");

        log("Pixel initialized and PageView tracked for", pixelId);
      } catch (err) {
        console.warn("[MetaPixel] init failed:", err);
      }
    };

    /** Oppdater consent */
    const updateConsent = () => {
      const hasConsent = document.cookie.includes("spor17-consent=true");

      if (!window.fbq) createFbqPlaceholder();

      if (hasConsent) {
        // Bruk nytt consent API
        window.fbq?.("consent", "grant", {
          ad_storage: "granted",
          analytics_storage: "granted",
        });
        initPixel();
        log("Consent granted and pixel fired");
      } else {
        window.fbq?.("consent", "revoke", {
          ad_storage: "denied",
          analytics_storage: "denied",
        });
        log("Consent denied");
      }
    };

    /** Last inn script hvis det ikke finnes */
    const loadPixelScript = () => {
      if (document.querySelector(`script[src="${PIXEL_SCRIPT_SRC}"]`)) {
        log("Pixel script already exists");
        return;
      }

      const script = document.createElement("script");
      script.src = PIXEL_SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        log("Pixel script loaded");
        updateConsent();
      };
      script.onerror = (e) => console.error("[MetaPixel] failed to load script:", e);

      document.head.appendChild(script);
      log("Pixel script appended to head");
    };

    // Init på mount
    loadPixelScript();

    // Lytt etter cookie-samtykke
    window.addEventListener("ga-consent-given", updateConsent);
    window.addEventListener("ga-consent-denied", updateConsent);

    return () => {
      window.removeEventListener("ga-consent-given", updateConsent);
      window.removeEventListener("ga-consent-denied", updateConsent);
    };
  }, [pixelId, debug]);

  return null;
}
