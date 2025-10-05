import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../hooks/fetchProduct";
import type { Product } from "../../hooks/fetchProduct";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
// import { AddToCartButton } from "../../components/Buttons/CallToActionButton";
import { useCart } from "../../hooks/useCart";


export default function ProductSpecific() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addItem } = useCart();


  useEffect(() => {
    if (!handle) return;
    fetchProduct(handle).then(setProduct);
  }, [handle]);

  if (!product) return <p>Produktet finnes ikke eller laster...</p>;

  const variantId = product.variants.edges[0].node.id;
  
  return (
    <div className="flex flex-col lg:flex-row gap-5 bg-white rounded-lg py-5 px-5 lg:px-10 justify-center">
      <div>
        <ImageCarousel
          images={product.images.edges.map(edge => edge.node)}
        />
      </div>
      <div className="flex flex-col xs:p-10 gap-5">
        <div className="flex justify-between flex-col xl:flex-row">
          <h1 className="text-2xl">{product.title}</h1>
          <h2 className="text-2xl">
            {Math.round(Number(product.variants.edges[0].node.priceV2.amount))}{" "}
            {product.variants.edges[0].node.priceV2.currencyCode}
          </h2>
        </div>
       
        <div
          className="font-Garamond text-lg mt-4 text-gray-700 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        ></div>


        {/* <button className="bg-background mt-12 p-2 px-5 rounded-lg w-fit" onClick={() => addItem(product.variants.edges[0].node.id, 1)}>Legg i handlekurv</button> */}
        {/* <AddToCartButton variantId={product.variants.edges[0].node.id} /> */}
         <button
          className="bg-background mt-12 p-2 px-5 rounded-lg w-fit"
          onClick={() => addItem(variantId, 1)}
        >
          Legg i handlekurv
        </button>
      
      
      </div>
      
    </div>
  );
}
