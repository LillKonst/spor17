// // components/Buttons/CheckoutButton.tsx
// import { useState } from "react";
// import CTAButton from "./CTAButton";
// import { useCart } from "../../hooks/useCart";

// export default function CheckoutButton() {
//   const { cart } = useCart();
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async () => {
//     if (!cart?.checkoutUrl) {
//       alert("Fant ikke checkout. Prøv å oppdatere siden.");
//       return;
//     }

//     setLoading(true);

//     const consent = document.cookie.includes("spor17-consent=true");

//     // 🔹 Meta Pixel
//     if (consent && window.fbq) {
//       window.fbq("track", "InitiateCheckout");
//     }

//     // 🔹 Google Ads
//     if (consent && window.gtag) {
//       const value =
//         cart.lines.reduce(
//           (sum, line) =>
//             sum + Number(line.price.amount) * line.quantity,
//           0
//         ) || 1.0;

//       window.gtag("event", "conversion", {
//         send_to: "AW-XXXXXXX/XXXXXXXX",
//         value,
//         currency: cart.cost.currencyCode,
//       });
//     }

//     setTimeout(() => {
//       window.location.href = cart.checkoutUrl;
//     }, 500);
//   };

//   return (
//     <CTAButton
//       label="Gå til kassen"
//       onClick={handleCheckout}
//       loading={loading}
//     />
//   );
// }


import { useState } from "react";
import CTAButton from "./CTAButton";
import { useCart } from "../../hooks/useCart";
import { createCart } from "../../hooks/cart/createCart";

export default function CheckoutButton() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!cart || cart.lines.length === 0) {
      alert("Handlekurven er tom.");
      return;
    }

    setLoading(true);

    try {
      // 🔹 Lag Shopify-cart ved checkout
      const shopifyCart = await createCart(
        cart.lines.map(line => ({
          variantId: line.merchandiseId,
          quantity: line.quantity
        }))
      );

      const checkoutUrl = shopifyCart.checkoutUrl;
      if (!checkoutUrl) throw new Error("Fant ikke checkout-URL.");

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

      // Naviger til Shopify checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Kunne ikke gå til checkout:", err);
      alert("Noe gikk galt. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CTAButton
      label="Gå til kassen"
      onClick={handleCheckout}
      loading={loading}
    />
  );
}
