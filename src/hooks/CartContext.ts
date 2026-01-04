// import { createContext } from "react";
// import type { Cart } from "./cart/types";

// export interface CartContextType {
//   cart: Cart | null;
//   addItem: (variantId: string, quantity: number) => Promise<Cart>;
//   changeQuantity: (lineId: string, quantity: number) => Promise<Cart>;
//   removeAllItems?: () => Promise<void>;
//   fetchCart?: () => Promise<Cart | null>;
// }

// export const CartContext = createContext<CartContextType>({
//   cart: null,
//   addItem: async () => { throw new Error("CartProvider not initialized"); },
//   changeQuantity: async () => { throw new Error("CartProvider not initialized"); },
// });


// hooks/cartContext.ts
import { createContext } from "react";
import type { Cart } from "./cart/types";

export interface CartContextType {
  cart: Cart;
  addItem: (variantId: string, quantity?: number) => Promise<Cart>;
  changeQuantity: (lineId: string, quantity: number) => Promise<Cart>;
  removeAllItems: () => Promise<Cart>;
}

export const CartContext = createContext<CartContextType>({
  cart: {
    id: "",
    createdAt: "",
    updatedAt: "",
    checkoutUrl: "",
    lines: [],
    cost: { amount: "0", currencyCode: "NOK" },
  },
  addItem: async () => {
    throw new Error("addItem not implemented");
  },
  changeQuantity: async () => {
    throw new Error("changeQuantity not implemented");
  },
  removeAllItems: async () => {
    throw new Error("removeAllItems not implemented");
  },
});
