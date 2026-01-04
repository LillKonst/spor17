import type { Cart, ShopifyCart } from "./types";

export function normalizeCart(raw: ShopifyCart | null): Cart {
  if (!raw) {
    // returner tom cart i stedet for null
    return {
      id: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      checkoutUrl: "",
      lines: [],
      cost: { amount: "0", currencyCode: "NOK" },
    };
  }
  
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