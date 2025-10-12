import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../hooks/fetchProduct";
import type { Product } from "../../hooks/fetchProduct";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import CallToActionButton from "../../components/Buttons/CallToActionButton";



export default function ProductSpecific() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!handle) return;
    fetchProduct(handle).then(setProduct);
  }, [handle]);

  if (!product) return <p>Produktet finnes ikke eller laster...</p>;

  const variantId = product.variants.edges[0].node.id;
  
  return (
    <div className="flex flex-col lg:flex-row gap-5 bg-white rounded-lg p-3 md:py-5 md:px-5 lg:px-10 justify-center">
      <div>
        <ImageCarousel
          images={product.images.edges.map(edge => edge.node)}
        />
      </div>
      <div className="flex flex-col xs:p-10 gap-5">
        <ProductDetails product={product} />
        <div className="xs:px-10">
        <CallToActionButton type="addToCart" variantId={variantId} className="text-white bg-green-500 hover:bg-green-600" />
      </div>
      </div>
    </div>
  );
}
