import { createContext } from "react";
import type { Cart } from "./shopifyCart";

export interface CartContextValue {
  cart: Cart | null;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItemQuantity?: (lineId: string, quantity: number) => Promise<void>; // legg til denne
}

export const CartContext = createContext<CartContextValue | null>(null);
