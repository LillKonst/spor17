import type { Cart, ShopifyCart } from "./types";
import { shopifyFetch } from "../api";
import { normalizeCart } from "./normalizeCart";

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $variantId: ID!, $quantity: Int!) {
      cartLinesAdd(
        cartId: $cartId,
        lines: [{ quantity: $quantity, merchandiseId: $variantId }]
      ) {
        cart {
          id
          checkoutUrl
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
  ... on ProductVariant {
    id
    title
    product {
      title
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
    priceV2 {
      amount
      currencyCode
    }
  }
}

              }
            }
          }
          cost {
  subtotalAmount { amount currencyCode }
  totalAmount { amount currencyCode }
}

        }
      }
    }
  `;

  interface Response {
    cartLinesAdd: { cart: ShopifyCart };
  }

  const data = await shopifyFetch<Response>(query, { cartId, variantId, quantity });
  return normalizeCart(data.cartLinesAdd.cart);
}