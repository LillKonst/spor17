import { shopifyFetch } from "./api";

export interface ProductVariant {
  id: string;
  title: string;
  priceV2: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
  image?: { url: string; altText: string | null };
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  productType: string;
  collections: {
    edges: {
      node: {
        handle: string;
        title: string;
      };
    }[];
  };
  descriptionHtml: string;
  tags: string[];
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: { edges: { node: ProductVariant }[] };
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
        productType
        collections(first: 1) {
          edges {
            node {
              handle
              title
            }
          }
        }
        descriptionHtml
        tags
        images(first: 10) {   # hent opptil 10 bilder, eller 4 hvis du alltid har 4
          edges {
          node {
          url
          altText
          }
          }
        }
        variants(first: 10) {
          edges {
            node {
            id
            title
              priceV2 {
                amount
                currencyCode
              }
                selectedOptions {
                name
                value
              }
                image {
        url
        altText
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
