import type { Cart, ShopifyCart } from "./types";
import { shopifyFetch } from "../api";
import { normalizeCart } from "./normalizeCart";

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {
      cartLinesUpdate(
        cartId: $cartId,
        lines: [{ id: $lineId, quantity: $quantity }]
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
    cartLinesUpdate: { cart: ShopifyCart };
  }

  const data = await shopifyFetch<Response>(query, { cartId, lineId, quantity });
  return normalizeCart(data.cartLinesUpdate.cart);
}