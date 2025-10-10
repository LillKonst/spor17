import { useEffect, useState } from "react";
import type { Cart } from "../../hooks/shopifyCart";
import { getCart, updateCartLine } from "../../hooks/shopifyCart";

export default function ShoppingCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    setLoading(true);
    // 🔹 Når handlekurv lastes inn første gang
getCart(cartId)
  .then((data) => {
    setCart(data);

    // Beregn total antall varer
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
      const updateQuantity = async (lineId: string, quantity: number) => {
  if (!cart) return;

  // ✅ Ikke tillat negative antall
  if (quantity < 1) return;

  // ✅ Optimistisk oppdatering i React før API-kall
  const updatedLines = cart.lines.map(line =>
    line.id === lineId ? { ...line, quantity } : line
  );

  setCart({ ...cart, lines: updatedLines });

  try {
    // Send endringen til Shopify, men behold UI snappy
    const updatedCart = await updateCartLine(cart.id, lineId, quantity);
    setCart(updatedCart);

    // Beregn totalantall
    const totalItems = updatedCart.lines.reduce((sum, l) => sum + l.quantity, 0);
    localStorage.setItem("cartCount", String(totalItems));
    window.dispatchEvent(new Event("cartCountUpdated"));
  } catch (err) {
    console.error(err);
  }
};

    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Laster handlekurv...</div>;
  if (!cart || cart.lines.length === 0) { 
    localStorage.setItem("cartCount", "0");
    return <div>Handlekurven er tom</div>;
  }


   const totalAmount =
  (Number(cart.cost.amount) || 0) +
  (Number(cart.cost.totalTaxAmount?.amount) || 0) +
  (Number(cart.cost.totalDutyAmount?.amount) || 0);

  return (
    <div className="bg-white container p-10 rounded-lg">
       <h2 className="text-2xl mb-5">Handlekurv</h2>
        <ul>
          {cart.lines?.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex flex-col md:flex-row items-center space-x-4 p-4 rounded shadow-sm">
                {line.image && (
                  <img src={line.image} alt={line.title} className="w-54 h-54 object-cover rounded" />
                  )}
                  <div className="flex-1">
                      <p className="font-semibold">{line.title}</p>
                        <p>
                          Pris: {Math.round(Number(line.price.amount))} {line.price.currencyCode}
                                   </p>
                                <p>Antall: {line.quantity}</p>
                     <div className="space-x-2 mt-2">
                                  <button
                              className="px-2 py-1 bg-gray-200 rounded"
                                    onClick={() => updateQuantity(line.id, line.quantity + 1)}
                                      >
                       +
                                     </button>
                                                 <button
                                     className="px-2 py-1 bg-gray-200 rounded"
                                             onClick={() => updateQuantity(line.id, line.quantity - 1)}
                                       >
                             -
                             </button>
    </div>
  </div>
              </li>
             ))}
            </ul>
          ) : (
            <p>Handlekurven er tom</p>
          )}
        </ul>

    <p className="text-xl">
      Total (inkl. tax og duty): {totalAmount} {cart.cost.currencyCode}
    </p>
    {cart.checkoutUrl && (
  <button
    onClick={() => window.location.href = cart.checkoutUrl}
    className="bg-black text-white px-6 py-3 rounded-lg mt-4"
  >
    Gå til betaling
  </button>
)}


    </div>
  );
}