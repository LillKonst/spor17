import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../hooks/fetchProduct";
import type { Product } from "../../hooks/fetchProduct";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import AddToCartButton from "../../components/Buttons/AddToCartButton";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import LinkTree from "../../components/LinkTree/LinkTree";
import Reviews from "../../components/Reviews/Reviews";
// import ColorVariants from "../../components/notInUse/ColorVariants/ColorVariants";

export interface ProductVariant {
  id: string;
  title: string;
  selectedOptions: { name: string; value: string }[];
}


export default function ProductSpecific() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  // const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);


  useEffect(() => {
    if (!handle) return;
    fetchProduct(handle).then(setProduct);
  }, [handle]);

  if (!product) return <p>Produktet finnes ikke eller laster...</p>;

  const variantId = product.variants.edges[0].node.id;
  const price = product.variants.edges[0].node.priceV2;
  const collection = product.collections.edges[0]?.node;


  return (
    <div className="">
      <LinkTree
        product={{
        title: product.title,
        productType: product.productType,
        collection,
        }}
      />

    <div className="flex flex-col lg:flex-row gap-5 items-center my-3 pb-12 md:py-5 md:px-5 lg:px-10 justify-center">
      <div className="">
        <ImageCarousel
          productId={product.id}
          productHandle={product.handle}
          images={product.images.edges.map(edge => edge.node)}
        />
      </div>

      <div className="mt-5 flex flex-col items-start self-start gap-1">
        <h3 className="ms-3 flex flex-wrap gap-2 text-md">
          {product.productType && (
            <span className="">
              {product.productType}
            </span>
          )}

          -

          {product.collections.edges[0] && (
            <span className=""> 
              {product.collections.edges[0].node.title}
            </span>
          )}
        </h3>
        
      
      <h1 className="text-2xl ms-3">{product.title}</h1>
      <h3>
  {product.productType?.toLowerCase() === "kort" && (
    <>
      {product.tags
        .filter(tag => ["enkle kort", "doble kort"].includes(tag.toLowerCase()))
        .map(tag => (
          <span
            key={tag}
            className="ms-3"
          >
            {tag}
          </span>
        ))}
    </>
  )}
</h3>
      <h2 className="text-2xl md:text-2xl mb-5 ms-3">
          {Math.round(Number(price.amount))} {price.currencyCode}
        </h2>

        {/* <ColorVariants
  variants={product.variants.edges.map(edge => edge.node)}
  selectedVariantId={selectedVariant?.id}
  onSelectVariant={setSelectedVariant}
/> */}
        {/* <div>fargevalg</div>
        <div>str valg</div> */}
        
        <AddToCartButton
            variantId={variantId}
            productName={product.title}
          />
        <div className="m-5">
        <ul className="mx-5 list-disc">
            <li>Frakt fra 39 kr</li>
            <li>Levering vanligvis 4-6 dager</li>
            <li>Åpent kjøp 30 dager</li>
          </ul>
        </div>
        <div>
          
        </div>
        <p className="my-3 text-sm px-3">Merk: Vi er en liten, ny bedrift og er foreløpig ikke MVA-registrert. Prisene du ser er derfor endelige, uten tillegg av merverdiavgift.</p>
        </div>
        </div>
      <div className="flex flex-col xs:p-5 gap-5">
        <ProductDetails product={product} />
        <div className="xs:px-10">

<div>
  <Reviews />
</div>
        
      {/* <div>produkt slider</div> */}
      </div>
      {/* <div>
        {!loading && <ProductSlider products={allProducts} />}
      </div> */}
       {/* <ImageCarouselSwiper
          productId={product.id}
          productHandle={product.handle} 
          images={product.images.edges.map(edge => edge.node)} 
        /> */}
        
          {/* <h3 className="text-sm text-gray-500 ms-3 mb-1 flex flex-wrap gap-2">
          {product.tags.map((tag, idx) => (
            <span 
              key={idx} 
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </h3> */}
    </div>
    </div>
  );
}
