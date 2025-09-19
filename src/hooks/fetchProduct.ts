import { shopifyFetch } from "./api";

export interface Product {
  id: string;
  title: string;
  description: string;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: { edges: { node: { priceV2: { amount: string; currencyCode: string } } }[] };
}

interface ProductResponse {
  productByHandle: Product | null;
}

export async function fetchProduct(handle: string): Promise<Product | null> {
  const query = `
    query($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ProductResponse>(query, { handle });
  return data.productByHandle;
}
