// import { useContext, useState } from "react";
// import CTAButton from "./CTAButton";
// import { cartContext } from "../../hooks/cartContext";
// import type { CartContextType } from "../../hooks/cartContext";

// export default function CheckoutButton() {
//   const { cart } = useContext<CartContextType>(cartContext);
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async () => {
//     if (!cart || cart.lines.length === 0 || !cart.checkoutUrl) {
//       alert("Handlekurven er tom.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const consent = document.cookie.includes("spor17-consent=true");

//       // 🔹 Meta Pixel
//       if (consent && window.fbq) {
//         window.fbq("track", "InitiateCheckout", {
//           value: cart.lines.reduce(
//             (sum, line) => sum + Number(line.price.amount) * line.quantity,
//             0
//           ),
//           currency: cart.cost.currencyCode,
//         });
//       }

//       // 🔹 Google Ads
//       if (consent && window.gtag) {
//         const value =
//           cart.lines.reduce(
//             (sum, line) => sum + Number(line.price.amount) * line.quantity,
//             0
//           ) || 1.0;

//         window.gtag("event", "conversion", {
//           send_to: "AW-XXXXXXX/XXXXXXXX",
//           value,
//           currency: cart.cost.currencyCode,
//         });
//       }

//       // ✅ RIKTIG: gå til checkout for EKSISTERENDE cart
//       window.location.href = cart.checkoutUrl;
//     } catch (err) {
//       console.error("Kunne ikke gå til checkout:", err);
//       alert("Noe gikk galt. Prøv igjen.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CTAButton
//       label="Gå til kassen"
//       onClick={handleCheckout}
//       loading={loading}
//     />
//   );
// }


import { useContext, useState } from "react";
import CTAButton from "./CTAButton";
import { cartContext } from "../../hooks/cartContext";
import type { CartContextType } from "../../hooks/cartContext";

export default function CheckoutButton() {
  const { cart } = useContext<CartContextType>(cartContext);
  const [loading, setLoading] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const handleCheckout = async () => {
    if (!cart || cart.lines.length === 0 || !cart.checkoutUrl) {
      alert("Handlekurven er tom.");
      return;
    }

    setLoading(true);

    try {
      const consent = document.cookie.includes("spor17-consent=true");

      // 🔹 Meta Pixel
      if (consent && window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          value: cart.lines.reduce(
            (sum, line) => sum + Number(line.price.amount) * line.quantity,
            0
          ),
          currency: cart.cost.currencyCode,
        });
      }

      // 🔹 Google Ads
      if (consent && window.gtag) {
        const value =
          cart.lines.reduce(
            (sum, line) => sum + Number(line.price.amount) * line.quantity,
            0
          ) || 1.0;

        window.gtag("event", "conversion", {
          send_to: "AW-XXXXXXX/XXXXXXXX",
          value,
          currency: cart.cost.currencyCode,
        });
      }

      // 🔔 Vis trygg melding før redirect
      setShowNotice(true);

      // ⏳ Kort pause før vi går til Shopify checkout
      setTimeout(() => {
        window.location.href = cart.checkoutUrl;
      }, 900);
    } catch (err) {
      console.error("Kunne ikke gå til checkout:", err);
      alert("Noe gikk galt. Prøv igjen.");
      setLoading(false);
    }
  };

  return (
    <>
      {showNotice && (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-customPink text-customBlack px-6 py-3 rounded-lg shadow-lg text-sm md:text-base z-50">
          🔒 Tar deg med til en sikker betalingsside
        </div>
      )}

      <CTAButton
        label="Gå til kassen"
        onClick={handleCheckout}
        loading={loading}
      />
    </>
  );
}
