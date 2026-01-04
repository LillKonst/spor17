import type { Cart, ShopifyCart } from "./types";
import { shopifyFetch } from "../api";
import { normalizeCart } from "./normalizeCart";

export async function getCart(cartId: string): Promise<Cart> {
  const query = `
    query cart($id: ID!) {
      cart(id: $id) {
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
  `;

  interface Response {
    cart: ShopifyCart;
  }

  const data = await shopifyFetch<Response>(query, { id: cartId });

  // Hvis cart mangler, returner en tom cart
  if (!data.cart) {
    console.warn("Cart not found for id:", cartId);
    return normalizeCart(null);
  }

  return normalizeCart(data.cart);
}