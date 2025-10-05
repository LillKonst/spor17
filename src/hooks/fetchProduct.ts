import { shopifyFetch } from "./api";

export interface Product {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
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
        handle
        title
        descriptionHtml
        images(first: 10) {   # hent opptil 10 bilder, eller 4 hvis du alltid har 4
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
