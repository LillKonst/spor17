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

    const src = "https://connect.facebook.net/en_US/fbevents.js";

    const log = (...args: unknown[]) => {
      if (debug) console.debug("[MetaPixel]", ...args);
    };

    /** Oppretter en fbq placeholder som følger TS-interfacet */
    const createFbqPlaceholder = (): FbqFunction => {
      const fbqFn: FbqFunction = (...args: unknown[]): void => {
        if (!fbqFn.queue) fbqFn.queue = [];
        fbqFn.queue.push(args);
      };

      fbqFn.queue = [];
      fbqFn.loaded = true;
      fbqFn.version = "2.0";

      window.fbq = fbqFn;
      window._fbq = fbqFn;

      return fbqFn;
    };

    /** Kall init og PageView */
    const doInit = () => {
      try {
        if (!window.fbq) createFbqPlaceholder();
        window.fbq?.("init", pixelId);
        window.fbq?.("track", "PageView");
        log("Pixel init + PageView fired for", pixelId);
      } catch (err) {
        console.warn("[MetaPixel] Failed to init:", err);
      }
    };

    /** Last pixel kun hvis samtykke */
    const initPixelIfConsented = () => {
      const hasConsent = document.cookie.includes("spor17-consent=true");
      if (!hasConsent) {
        log("No consent. Pixel not loaded.");
        return;
      }

      const existingScript = document.querySelector(
        `script[src="${src}"]`
      ) as HTMLScriptElement | null;

      if (!existingScript) {
        createFbqPlaceholder();
        const script = document.createElement("script");
        script.async = true;
        script.src = src;
        script.onload = doInit;
        script.onerror = (e) => console.error("[MetaPixel] load error:", e);
        document.head.appendChild(script);
        log("Inserted fbevents.js");
      } else if (typeof window.fbq === "function") {
        doInit();
      } else {
        existingScript.addEventListener("load", doInit);
      }
    };

    // Init hvis allerede godkjent
    initPixelIfConsented();

    // Lytt på cookiebanner-event
    window.addEventListener("ga-consent-given", initPixelIfConsented);

    return () => {
      window.removeEventListener("ga-consent-given", initPixelIfConsented);
    };
  }, [pixelId, debug]);

  return null;
}
