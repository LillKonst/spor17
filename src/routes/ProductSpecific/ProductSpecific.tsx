import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../hooks/fetchProduct";
import type { Product } from "../../hooks/fetchProduct";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import CallToActionButton from "../../components/Buttons/CallToActionButton";
// import ImageCarouselSwiper from "../../components/ImageCarousel/Carousel";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import InfoBox from "../../components/InfoBox/InfoBox";
// import ProductSlider from "../../components/ProductSlider/ProductSlider";
// import { fetchAllProducts } from "../../hooks/fetchAllProducts";


export default function ProductSpecific() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  // const [allProducts, setAllProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchAllProducts().then(data => {
  //     setAllProducts(data);
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    if (!handle) return;
    fetchProduct(handle).then(setProduct);
  }, [handle]);

  if (!product) return <p>Produktet finnes ikke eller laster...</p>;

  const variantId = product.variants.edges[0].node.id;
  const price = product.variants.edges[0].node.priceV2;
  
  return (
    <div className="">
    <div className="py-5 flex flex-col lg:flex-row gap-5 items-center m-3 p-3 pb-12 md:py-5 md:px-5 lg:px-10 justify-center">
      <div className="mx-5">
        <ImageCarousel
          productId={product.id}
          productHandle={product.handle}
          images={product.images.edges.map(edge => edge.node)}
        />
      </div>

      <div className="mt-5 flex flex-col items-start self-start gap-1">
      <h1 className="text-2xl ms-3">{product.title}</h1>
      <h2 className="text-xl md:text-2xl font-bold mb-5 ms-3">
          {Math.round(Number(price.amount))} {price.currencyCode}
        </h2>
        <CallToActionButton
          type="addToCart"
          variantId={variantId}
          className="text-black bg-customGreen hover:bg-customHover mx-2"
          productName={product.title}
        />
        <p className="my-3 text-sm px-3">Merk: Vi er en liten, ny bedrift og er foreløpig ikke MVA-registrert. Prisene du ser er derfor endelige, uten tillegg av merverdiavgift.</p>
        <div className="self-start"><InfoBox /></div>
        </div>
        </div>
      <div className="flex flex-col xs:p-5 gap-5">
        <ProductDetails product={product} />
        <div className="xs:px-10">
        
      
      </div>
      {/* <div>
        {!loading && <ProductSlider products={allProducts} />}
      </div> */}
       {/* <ImageCarouselSwiper
          productId={product.id}
          productHandle={product.handle} 
          images={product.images.edges.map(edge => edge.node)} 
        /> */}
    </div>
    </div>
  );
}
