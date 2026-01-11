// import { useEffect } from "react";
// import { CartContext } from "../../hooks/cartContext";
// import { useCart } from "../../hooks/useCart";
// import type { ReactNode, ReactElement } from "react";

// interface CartProviderProps {
//   children: ReactNode;
// }

// export function CartProvider({ children }: CartProviderProps): ReactElement {
//   const { cart, fetchCart, addItem, changeQuantity, removeAllItems } = useCart();

//   // Hent cart når provider mountes
//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   return (
//     <CartContext.Provider value={{ cart, addItem, changeQuantity, removeAllItems, fetchCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

import { cartContext } from "../../hooks/CartContext";
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
  }, []);

  return (
    <cartContext.Provider value={cartApi}>
      {children}
    </cartContext.Provider>
  );
}
