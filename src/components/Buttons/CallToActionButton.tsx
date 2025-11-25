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
  const [showToast, setShowToast] = useState(false);

  const handleClick = async () => {
    if (type === "addToCart" && variantId) {
      setLoading(true);
      try {
        const updatedCart = await addItem(variantId, 1);

        const consent = document.cookie.includes("spor17-consent=true");

        if (consent && window.fbq) {
          window.fbq("track", "AddToCart", {
            content_name: productName,
            content_ids: [variantId],
            content_type: "product",
          });
        }

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

    if (type === "checkout") {
      setLoading(true);
      try {
        const fetchedCart = await fetchCart();
        const currentCartId = localStorage.getItem("cartId");

        if (!currentCartId) {
          alert("Handlekurven er tom.");
          return;
        }

        const checkoutUrl = fetchedCart?.checkoutUrl || cart?.checkoutUrl;

        if (!checkoutUrl) {
          alert("Fant ikke checkout-URL. Prøv å oppdatere siden.");
          return;
        }

        const consent = document.cookie.includes("spor17-consent=true");

        // 🔹 Meta Pixel InitiateCheckout
        if (consent && window.fbq) {
          window.fbq("track", "InitiateCheckout");
        }

        // 🔹 Google Ads conversion med totalverdi
        if (consent && window.gtag) {
          const cartValue =
          fetchedCart?.lines.reduce((sum, line) => {
          const price = Number(line.price || 0);
          return sum + line.quantity * price;
          }, 0) || 1.0;


          window.gtag("event", "conversion", {
            send_to: "AW-17729664837/GoUcCJ70778bEMXulIZC",
            value: cartValue,
            currency: "NOK",
          });
        }

        // 🔹 Vis toast
        setShowToast(true);

        // Naviger etter 1,5 sekunder
        setTimeout(() => {
          window.location.href = checkoutUrl;
        }, 1500);
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
    <div className="relative">
      <button
        className={`bg-customGreen hover:bg-customHover p-2 px-3 rounded w-fit ${
          className || ""
        }`}
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

      {/* 🔹 Toast for checkout */}
      {showToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-customGreen text-black px-5 py-3 rounded shadow-lg transition-opacity duration-300">
          Tar deg med til en sikker betalingsside...
        </div>
      )}
    </div>
  );
}
