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

      const fbqFunction: FbqFunction = function (...args: unknown[]) {
        (fbqFunction.queue = fbqFunction.queue || []).push(args);
      };
      fbqFunction.queue = [];
      fbqFunction.loaded = true;
      fbqFunction.version = "2.0";

      window.fbq = fbqFunction;
      window._fbq = fbqFunction;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.onload = () => {
        window.fbq?.("init", pixelId);
        window.fbq?.("track", "PageView");
      };

      document.head.appendChild(script);
    }

    const hasConsent = document.cookie.includes("spor17-consent=true");
    if (hasConsent) initPixel();

    window.addEventListener("ga-consent-given", initPixel);

    return () => {
      window.removeEventListener("ga-consent-given", initPixel);
    };
  }, [pixelId]);

  return null;
}
