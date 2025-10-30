import { useState } from "react";
import { addToCart, getCart, createCart, type Cart } from "./shopifyCart";

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);

  const addItem = async (variantId: string, quantity: number): Promise<Cart> => {
    const currentCartId = localStorage.getItem("cartId");
    let updatedCart: Cart;

    if (currentCartId) {
      updatedCart = await addToCart(currentCartId, variantId, quantity);
    } else {
      updatedCart = await createCart(variantId, quantity);
      localStorage.setItem("cartId", updatedCart.id);
    }

    setCart(updatedCart);
    return updatedCart;
  };

  const fetchCart = async (): Promise<Cart | null> => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return null;

    const fetchedCart = await getCart(cartId);
    setCart(fetchedCart);
    return fetchedCart; // ✅ returner cart slik at vi kan bruke den videre
  };

  return { cart, addItem, fetchCart };
}
