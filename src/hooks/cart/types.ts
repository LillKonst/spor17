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

export interface ShopifyCartLine {
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


export interface ShopifyCart {
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