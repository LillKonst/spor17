import { useContext } from "react";
import { CartContext } from "../hooks/CartContext";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart må brukes innenfor CartProvider");
  return context;
}
