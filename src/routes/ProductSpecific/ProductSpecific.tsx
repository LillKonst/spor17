import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../hooks/fetchProduct";
import type { Product } from "../../hooks/fetchProduct";


export default function ProductSpecific() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!handle) return;
    fetchProduct(handle).then(setProduct);
  }, [handle]);

  if (!product) return <p>Produktet finnes ikke eller laster...</p>;
  
  return (
    <div>
      <h1>{product.title}</h1>
      <img
        src={product.images.edges[0]?.node.url}
        alt={product.images.edges[0]?.node.altText || product.title}
        width={200}
      />
      <p>{product.description}</p>
      <p>
        Pris: {Math.round(Number(product.variants.edges[0].node.priceV2.amount))}{" "}
        {product.variants.edges[0].node.priceV2.currencyCode}
      </p>
    </div>
  );
}
