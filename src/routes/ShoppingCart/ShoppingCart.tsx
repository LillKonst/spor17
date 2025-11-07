import { useEffect, useState } from "react";
import type { Cart } from "../../hooks/shopifyCart";
import { getCart, updateCartLine, clearCart } from "../../hooks/shopifyCart";
import CartItemList from "../../components/CartItemList/CartItemList";
import CallToActionButton from "../../components/Buttons/CallToActionButton";
import ClearCartButton from "../../components/Buttons/ClearCartButton";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true); // kun for initial load
  const [loadingLine, setLoadingLine] = useState<string | null>(null); // for enkeltprodukt

  // 🔹 Hent handlekurv første gang
  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      setLoading(false);
      return;
    }

    getCart(cartId)
      .then((data) => {
        setCart(data);
        const totalItems = data.lines.reduce((sum, line) => sum + line.quantity, 0);
        localStorage.setItem("cartCount", String(totalItems));
        window.dispatchEvent(new Event("cartCountUpdated"));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Oppdater antall uten å reloade hele handlekurven
  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    setLoadingLine(lineId);

    // Optimistisk oppdatering (visuelt direkte)
    setCart((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        lines: prev.lines.map((line) =>
          line.id === lineId ? { ...line, quantity } : line
        ),
      };
    });

    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);

      const totalItems = updatedCart.lines.reduce(
        (sum, line) => sum + line.quantity,
        0
      );
      localStorage.setItem("cartCount", String(totalItems));
      window.dispatchEvent(new Event("cartCountUpdated"));
    } catch (err) {
      console.error("Feil ved oppdatering av antall:", err);
    } finally {
      setLoadingLine(null);
    }
  };

  // 🔹 Tøm handlekurv
  const handleClearCart = async () => {
    if (!cart) return;
    setLoading(true);
    try {
      await clearCart(cart.id);
      setCart({ ...cart, lines: [] });
      localStorage.setItem("cartCount", "0");
      window.dispatchEvent(new Event("cartCountUpdated"));
    } catch (err) {
      console.error("Kunne ikke tømme handlekurven", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Vis kun loader under initial lasting
  if (loading && !cart) {
    return <div>Laster handlekurv...</div>;
  }

  if (!cart || cart.lines.length === 0) {
    localStorage.setItem("cartCount", "0");
    return <div className="h-screen flex flex-col gap-5 mx-5"><h2>Handlekurven er tom</h2><Link to="/produkter" className="bg-customGreen py-2 px-3 rounded w-fit">Fortsett å handle</Link></div>;
  }

  const totalAmount =
    (Number(cart.cost.amount) || 0) +
    (Number(cart.cost.totalTaxAmount?.amount) || 0) +
    (Number(cart.cost.totalDutyAmount?.amount) || 0);

  return (
    <div className="bg-white mx-auto p-3 xxs:p-5 md:p-10 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl mb-5">Handlekurv</h2>
        <ClearCartButton onConfirm={handleClearCart} />
      </div>

      <CartItemList
        lines={cart.lines}
        onUpdateQuantity={updateQuantity}
        loadingLineId={loadingLine}
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <p className="text-xl">
          Total (inkl. tax og duty): {totalAmount} {cart.cost.currencyCode}
        </p>
        {cart.checkoutUrl && (
          <CallToActionButton type="checkout" text="Gå til kassen" />
        )}
      </div>
    </div>
  );
}
