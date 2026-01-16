import { cartContext } from "../../hooks/cartContext";
import type { CartContextType } from "../../hooks/cartContext";
import { useCart } from "../../hooks/useCart";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const cartApi = useCart();

  useEffect(() => {
    cartApi.fetchCart();
  }, [cartApi]); // ✅ legg til cartApi som dependency

  const contextValue: CartContextType = {
    cart: cartApi.cart,
    addItem: cartApi.addItem,
    changeQuantity: cartApi.changeQuantity,
    removeAllItems: cartApi.removeAllItems,
  };

  return (
    <cartContext.Provider value={contextValue}>
      {children}
    </cartContext.Provider>
  );
}
