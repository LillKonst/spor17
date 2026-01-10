// src/hooks/fetchAllProducts.ts
import { shopifyFetch } from "./api";

export interface Product {
  id: string;
  handle: string;
  title: string;
  productType: string;
  description: string;
   collections?: {
    edges: {
      node: {
        handle: string;
        title: string;
      };
    }[];
  };
  tags: string[];
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

interface ProductsResponse {
  products: {
    edges: { node: Product }[];
  };
}

export async function fetchAllProducts(): Promise<Product[]> {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            productType
            description
            tags
            collections(first: 20) {
              edges {
                node {
                  handle
                  title
               }
              }
            }
            images(first: 4) {
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
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      } 
    }
  `;

  const data = await shopifyFetch<ProductsResponse>(query);
  return data.products.edges.map(edge => edge.node);
}
