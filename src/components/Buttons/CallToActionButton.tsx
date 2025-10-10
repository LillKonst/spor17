import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

interface CallToActionProps {
  variantId?: string;     
  type: "addToCart" | "checkout"; 
  text?: string; 
  className?: string;      
}

export default function CallToActionButton({ variantId, type, text, className }: CallToActionProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (type === "addToCart" && variantId) {
      setLoading(true);
      try {
        await addItem(variantId, 1); // Antar at addItem kan være async
      } catch (err) {
        console.error("Kunne ikke legge til i handlekurv", err);
      } finally {
        setLoading(false);
      }
    } else if (type === "checkout") {
      navigate("/checkout");
    }
  };

  const buttonText = 
    loading
      ? type === "addToCart"
        ? "Legger til..."
        : "Laster..."
      : text || (type === "addToCart" ? "Legg i handlekurv" : "Gå til kassen");

  return (
    <button
      className={`bg-background mt-12 p-2 px-5 rounded-lg w-fit ${className || ""}`}
      onClick={handleClick}
      disabled={loading}
    >
      {buttonText}
    </button>
  );
}
