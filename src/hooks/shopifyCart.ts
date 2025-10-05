import { shopifyFetch } from "./api";

export interface CartLine {
  id: string;
  quantity: number;
  merchandiseId: string;
  title: string;
  image?: string;
  price: { amount: string; currencyCode: string };
}


export type CartCost = {
  amount: string;
  currencyCode: string;
  totalTaxAmount?: { amount: string; currencyCode: string };
  totalDutyAmount?: { amount: string; currencyCode: string };
};


export interface Cart {
  id: string;
  createdAt: string;
  updatedAt: string;
  checkoutUrl: string;
  lines: CartLine[];
  cost: CartCost;
}

// interface ShopifyMerchandise {
//   id: string;
//   title: string;
//   priceV2: { amount: string; currencyCode: string };
//   image?: { url: string };
// }

interface ShopifyCartLine {
  node: {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      priceV2: { amount: string; currencyCode: string };
      product: {
        title: string;
        images: {
          edges: { node: { url: string; altText: string | null } }[];
        };
      };
    };
  };
}


interface ShopifyCart {
  id: string;
  createdAt: string;
  updatedAt: string;
  checkoutUrl: string;
  lines: { edges: ShopifyCartLine[] };
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount?: { amount: string; currencyCode: string };
    totalDutyAmount?: { amount: string; currencyCode: string };
  };
}


function normalizeCart(raw: ShopifyCart): Cart {
  return {
    id: raw.id,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    checkoutUrl: raw.checkoutUrl,
    lines: raw.lines.edges.map((e) => ({
  id: e.node.id,
  quantity: e.node.quantity,
  merchandiseId: e.node.merchandise.id,
  title: e.node.merchandise.product.title,
  image: e.node.merchandise.product.images.edges[0]?.node.url,
  price: e.node.merchandise.priceV2,
})),

    cost: {
      amount: raw.cost.totalAmount.amount,
      currencyCode: raw.cost.totalAmount.currencyCode,
      totalTaxAmount: raw.cost.totalTaxAmount ?? { amount: "0", currencyCode: raw.cost.totalAmount.currencyCode },
      totalDutyAmount: raw.cost.totalDutyAmount ?? { amount: "0", currencyCode: raw.cost.totalAmount.currencyCode },
    },
  };
}



export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const query = `
    mutation cartCreate($variantId: ID!, $quantity: Int!) {
      cartCreate(
        input: {
          lines: [{ quantity: $quantity, merchandiseId: $variantId }]
        }
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
    cartCreate: { cart: ShopifyCart };
  }

  const data = await shopifyFetch<Response>(query, { variantId, quantity });
  return normalizeCart(data.cartCreate.cart);
}

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
  return normalizeCart(data.cart);
}

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
