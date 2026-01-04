import type { Cart } from "./types";
import { shopifyFetch } from "../api";
import { getCart } from "./getCart";

export async function clearCart(cartId: string): Promise<Cart> {
  // 🔹 Først henter vi carten for å finne alle line IDs som må fjernes
  const cart = await getCart(cartId);
  const lineIds = cart.lines.map((line) => line.id);

  if (lineIds.length === 0) return cart; // allerede tom

  const query = `
    mutation clearCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { cartId, lineIds });

  // ✅ Type assertion slik at TypeScript vet hva `response` er
  const data = response as {
    cartLinesRemove: {
      cart: Cart;
      userErrors: { field: string[]; message: string }[];
    };
  };

  if (data.cartLinesRemove.userErrors?.length > 0) {
    console.error("Shopify error:", data.cartLinesRemove.userErrors);
  }

  return data.cartLinesRemove.cart;
}