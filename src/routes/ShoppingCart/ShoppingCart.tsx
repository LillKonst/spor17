import { useContext, useState } from "react";
import { cartContext } from "../../hooks/CartContext";
import CartItemList from "../../components/CartItemList/CartItemList";
import CheckoutButton from "../../components/Buttons/CheckoutButton";
import ClearCartButton from "../../components/Buttons/ClearCartButton";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const { cart, changeQuantity, removeAllItems } = useContext(cartContext);
  const [loadingLine, setLoadingLine] = useState<string | null>(null);

  // 🔹 Oppdater antall på enkeltlinje
  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    setLoadingLine(lineId);

    try {
      await changeQuantity(lineId, quantity); // context oppdaterer cart
    } catch (err) {
      console.error("Feil ved oppdatering av antall:", err);
    } finally {
      setLoadingLine(null);
    }
  };

  // 🔹 Tøm handlekurv
  const handleClearCart = async () => {
    if (!cart) return;
    try {
      await removeAllItems(); // context oppdaterer cart
    } catch (err) {
      console.error("Kunne ikke tømme handlekurven", err);
    }
  };

  // 🔹 Vis tom handlekurv
  if (!cart || cart.lines.length === 0) {
    return (
      <div className="h-screen flex flex-col gap-5 mx-5">
        <h2>Handlekurven er tom</h2>
        <Link
          to="/produkter"
          className="bg-customPink py-2 px-3 rounded w-fit"
        >
          Fortsett å handle
        </Link>
      </div>
    );
  }

  // 🔹 Kalkuler totalbeløp
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
        <p className="text-sm xxs:text-md sm:text-xl">
          Total (inkl. tax og duty): {totalAmount} {cart.cost.currencyCode}
        </p>
        {cart.checkoutUrl && (
          <CheckoutButton />

        )}
      </div>
    </div>
  );
}
