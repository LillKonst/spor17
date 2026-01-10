import { useContext, useState } from "react";
import CTAButton from "./CTAButton";
import { CartContext } from "../../hooks/cartContext";

export default function CheckoutButton() {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

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

      // ✅ RIKTIG: gå til checkout for EKSISTERENDE cart
      window.location.href = cart.checkoutUrl;
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
