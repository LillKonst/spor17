import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import AddedToCartModal from "../AddToCartModal/AddToCartModal";

interface CallToActionProps {
  variantId?: string;
  type: "addToCart" | "checkout";
  text?: string;
  className?: string;
  productName?: string;
}

export default function CallToActionButton({
  variantId,
  type,
  text,
  className,
  productName,
}: CallToActionProps) {
  const { cart, addItem, fetchCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (type === "addToCart" && variantId) {
      setLoading(true);
      try {
        const updatedCart = await addItem(variantId, 1);

        const totalItems = updatedCart.lines.reduce(
          (sum, line) => sum + line.quantity,
          0
        );

        localStorage.setItem("cartCount", String(totalItems));
        window.dispatchEvent(new Event("cartCountUpdated"));

        setShowModal(true);
      } catch (err) {
        console.error("Kunne ikke legge til i handlekurv", err);
      } finally {
        setLoading(false);
      }
    }

    // ✅ Gå til kassen via Shopify checkout URL
    if (type === "checkout") {
      setLoading(true);
      try {
        await fetchCart(); // sørg for at cart er oppdatert
        const currentCartId = localStorage.getItem("cartId");

        if (!currentCartId) {
          alert("Handlekurven er tom.");
          return;
        }

        // hent cart-data fra localStorage om nødvendig
        const fetchedCart = await fetchCart();
        const checkoutUrl =
          fetchedCart?.checkoutUrl || cart?.checkoutUrl;

        if (!checkoutUrl) {
          alert("Fant ikke checkout-URL. Prøv å oppdatere siden.");
          return;
        }

        window.location.href = checkoutUrl; // ✅ Shopify checkout
      } catch (err) {
        console.error("Feil ved navigering til checkout:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const buttonText = loading
    ? type === "addToCart"
      ? "Legger til..."
      : "Laster..."
    : text || (type === "addToCart" ? "Legg i handlekurv" : "Gå til kassen");

  return (
    <div>
      <button
        className={`bg-background p-2 px-5 rounded-lg w-fit ${className || ""}`}
        onClick={handleClick}
        disabled={loading}
      >
        {buttonText}
      </button>

      <AddedToCartModal
        show={showModal}
        productName={productName || "Produktet"}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
