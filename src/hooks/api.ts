// src/hooks/api.ts
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN!;

export interface ShopifyResponse<T> {
  data: T;
  errors?: { message: string }[];
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  console.log("Shopify Query:", query);
  console.log("Shopify Variables:", variables);
  
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await res.json()) as ShopifyResponse<T>;

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Shopify query failed");
  }

  return json.data;
}
