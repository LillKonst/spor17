// components/Buttons/AddToCartButton.tsx
import { useState } from "react";
import { useContext } from "react";
import AddedToCartModal from "../AddToCartModal/AddToCartModal";
import { cartContext } from "../../hooks/CartContext";


interface AddToCartButtonProps {
  variantId: string;
  productName?: string;
  className?: string;
  quantity?: number;
}

export default function AddToCartButton({
  variantId,
  productName,
  className,
  quantity = 1,
}: AddToCartButtonProps) {
  const { addItem } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const updatedCart = await addItem(variantId, quantity);

      // 🔹 Meta Pixel
      const consent = document.cookie.includes("spor17-consent=true");
      if (consent && window.fbq) {
        window.fbq("track", "AddToCart", {
          content_name: productName,
          content_ids: [variantId],
          content_type: "product",
        });
      }

      // 🔹 Google Ads
      if (consent && window.gtag) {
        const cartValue =
          updatedCart.lines.reduce(
            (sum, line) => sum + Number(line.price.amount) * line.quantity,
            0
          ) || 1.0;

        window.gtag("event", "conversion", {
          send_to: "AW-XXXXXXX/XXXXXXXX", // Bytt til din ID
          value: cartValue,
          currency: updatedCart.cost.currencyCode,
        });
      }

      // 🔹 Oppdater antall i localStorage (til header eller cart count)
      const totalItems = updatedCart.lines.reduce(
        (sum, line) => sum + line.quantity,
        0
      );
      localStorage.setItem("cartCount", String(totalItems));
      window.dispatchEvent(new Event("cartCountUpdated"));

      // 🔹 Vis modal
      setShowModal(true);
    } catch (err) {
      console.error("Kunne ikke legge til i handlekurv", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`bg-ctaPink hover:bg-customPink text-customWhite text-xl p-3 px-4 rounded w-fit ${className || ""}`}
      >
        {loading ? "Legger til..." : "Legg i handlekurv"}
      </button>

      <AddedToCartModal
        show={showModal}
        productName={productName || "Produktet"}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
