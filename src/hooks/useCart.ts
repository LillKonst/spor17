// import { useState } from "react";
// import type { Cart } from "./cart/types";
// import { addToCart } from "./cart/addToCart";
// import { getCart } from "./cart/getCart";
// import { createCart } from "./cart/createCart";
// import { clearCart } from "./cart/clearCart";
// import { updateCartLine } from "./cart/updateCartLine";
// import { normalizeCart } from "./cart/normalizeCart";

// export function useCart() {
//   const [cart, setCart] = useState<Cart | null>(null);

//   const addItem = async (variantId: string, quantity: number) => {
//     const cartId = localStorage.getItem("cartId");
//     let updatedCart: Cart;

//     if (cartId) {
//       updatedCart = await addToCart(cartId, variantId, quantity);
//     } else {
//       updatedCart = await createCart(variantId, quantity);
//       localStorage.setItem("cartId", updatedCart.id);
//     }

//     setCart(updatedCart);
//     return updatedCart;
//   };

//   const removeAllItems = async () => {
//     const cartId = localStorage.getItem("cartId");
//     if (!cartId) return;
//     const updatedCart = await clearCart(cartId);
//     setCart(updatedCart);
//   };

//   const changeQuantity = async (lineId: string, quantity: number): Promise<Cart> => {
//   const cartId = localStorage.getItem("cartId");
//   if (!cartId) {
//     // Returner en tom cart i stedet for void
//     return normalizeCart(null);
//   }
//   const updatedCart = await updateCartLine(cartId, lineId, quantity);
//   setCart(updatedCart);
//   return updatedCart;
// };

//   const fetchCart = async () => {
//     const cartId = localStorage.getItem("cartId");
//     if (!cartId) return null;
//     const fetchedCart = await getCart(cartId);
//     setCart(fetchedCart);
//     return fetchedCart;
//   };

//   return { cart, addItem, removeAllItems, changeQuantity, fetchCart };
// }


// import { useState } from "react";
// import type { Cart } from "./cart/types";
// import { addToCart } from "./cart/addToCart";
// import { getCart } from "./cart/getCart";
// import { createCart } from "./cart/createCart";
// import { clearCart } from "./cart/clearCart";
// import { updateCartLine } from "./cart/updateCartLine";
// import { normalizeCart } from "./cart/normalizeCart";

// export function useCart() {
//   const [cart, setCart] = useState<Cart>(normalizeCart(null)); // alltid en cart

//   const addItem = async (variantId: string, quantity: number): Promise<Cart> => {
//     const cartId = localStorage.getItem("cartId");
//     let updatedCart: Cart;

//     if (cartId) {
//       updatedCart = await addToCart(cartId, variantId, quantity);
//     } else {
//       updatedCart = await createCart(variantId, quantity);
//       localStorage.setItem("cartId", updatedCart.id);
//     }

//     setCart(normalizeCart(updatedCart));
//     return normalizeCart(updatedCart);
//   };

//   const fetchCart = async (): Promise<Cart> => {
//     const cartId = localStorage.getItem("cartId");
//     if (!cartId) return normalizeCart(null);

//     const fetchedCart = await getCart(cartId);
//     setCart(normalizeCart(fetchedCart));
//     return normalizeCart(fetchedCart);
//   };

//   const removeAllItems = async (): Promise<Cart> => {
//     const cartId = localStorage.getItem("cartId");
//     if (!cartId) return normalizeCart(null);

//     const updatedCart = await clearCart(cartId);
//     setCart(normalizeCart(updatedCart));
//     return normalizeCart(updatedCart);
//   };

//   const changeQuantity = async (lineId: string, quantity: number): Promise<Cart> => {
//     const cartId = localStorage.getItem("cartId");
//     if (!cartId) return normalizeCart(null);

//     const updatedCart = await updateCartLine(cartId, lineId, quantity);
//     setCart(normalizeCart(updatedCart));
//     return normalizeCart(updatedCart);
//   };

//   return { cart, addItem, fetchCart, removeAllItems, changeQuantity };
// }


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
