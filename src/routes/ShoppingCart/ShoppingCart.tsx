import { useEffect, useState } from "react";
import type { Cart } from "../../hooks/shopifyCart";
import { getCart, updateCartLine, clearCart } from "../../hooks/shopifyCart";
import CartItemList from "../../components/CartItemList/CartItemList";
import CallToActionButton from "../../components/Buttons/CallToActionButton";
import ClearCartButton from "../../components/Buttons/ClearCartButton";

export default function ShoppingCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    setLoading(true);
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

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
      const totalItems = updatedCart.lines.reduce((sum, line) => sum + line.quantity, 0);
      localStorage.setItem("cartCount", String(totalItems));
      window.dispatchEvent(new Event("cartCountUpdated"));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Laster handlekurv...</div>;
  if (!cart || cart.lines.length === 0) {
    localStorage.setItem("cartCount", "0");
    return <div>Handlekurven er tom</div>;
  }


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

  const totalAmount =
    (Number(cart.cost.amount) || 0) +
    (Number(cart.cost.totalTaxAmount?.amount) || 0) +
    (Number(cart.cost.totalDutyAmount?.amount) || 0);

  return (
     <div className="bg-white container p-10 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl mb-5">Handlekurv</h2>
        <ClearCartButton onConfirm={handleClearCart} />
      </div>
      

      <CartItemList lines={cart.lines} onUpdateQuantity={updateQuantity} />

      

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