// src/hooks/fetchAllProducts.ts
import { shopifyFetch } from "./api";

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
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
            description
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
  console.log("Produkter fra API:", data);
  return data.products.edges.map(edge => edge.node);
}
