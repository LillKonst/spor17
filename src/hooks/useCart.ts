// useCart.ts
import { useState } from "react";
import type { Cart } from "./cart/types";
import { addToCart } from "./cart/addToCart";
import { createCart } from "./cart/createCart";
import { clearCart } from "./cart/clearCart";
import { updateCartLine } from "./cart/updateCartLine";
import { getCart } from "./cart/getCart";

const emptyCart: Cart = {
  id: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  checkoutUrl: "",
  lines: [],
  cost: { amount: "0", currencyCode: "NOK" },
};

export function useCart() {
  const [cart, setCart] = useState<Cart>(emptyCart); // <-- aldri null

  const addItem = async (variantId: string, quantity = 1): Promise<Cart> => {
    const cartId = localStorage.getItem("cartId");
    let updatedCart: Cart;

    if (cartId) {
  console.log("Adding to existing cart:", cartId, variantId, quantity);
  updatedCart = await addToCart(cartId, variantId, quantity);
} else {
  console.log("Creating new cart for variant:", variantId, quantity);
  updatedCart = await createCart(variantId, quantity);
  console.log("Created cart:", updatedCart.id);
  localStorage.setItem("cartId", updatedCart.id);
}
console.log("Updated cart:", updatedCart);


    setCart(updatedCart);
    return updatedCart;
  };

  const removeAllItems = async (): Promise<Cart> => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return emptyCart;

    const updatedCart = await clearCart(cartId);
    setCart(updatedCart);
    return updatedCart;
  };

  const changeQuantity = async (lineId: string, quantity: number): Promise<Cart> => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return emptyCart;

    const updatedCart = await updateCartLine(cartId, lineId, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  const fetchCart = async (): Promise<Cart> => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return emptyCart;

    const fetchedCart = await getCart(cartId);
    setCart(fetchedCart);
    return fetchedCart;
  };

  return { cart, addItem, removeAllItems, changeQuantity, fetchCart };
}
