import { useState, useEffect } from "react";
import { CartContext } from "../../hooks/CartContext";
import type { Cart } from "../../hooks/shopifyCart";
import { createCart, addToCart, getCart, updateCartLine } from "../../hooks/shopifyCart";
import type { ReactNode, ReactElement } from "react";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps): ReactElement {
  const [cart, setCart] = useState<Cart | null>(null);

  const updateItemQuantity = async (lineId: string, quantity: number) => {
  if (!cart) return;
  const updated = await updateCartLine(cart.id, lineId, quantity);
  setCart(updated);
};


  // Her henter vi cart fra localStorage når komponenten mountes
  useEffect(() => {
    const storedId = localStorage.getItem("cartId");
    if (storedId) {
      getCart(storedId).then((cart) => setCart(cart));
    }
  }, []);

  const addItem = async (variantId: string, quantity: number) => {
    if (!cart) {
      const newCart = await createCart(variantId, quantity);
      setCart(newCart);
      localStorage.setItem("cartId", newCart.id);
    } else {
      const updated = await addToCart(cart.id, variantId, quantity);
      setCart(updated);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateItemQuantity }}>
  {children}
</CartContext.Provider>

  );
}
