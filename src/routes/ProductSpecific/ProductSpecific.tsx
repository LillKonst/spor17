import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../hooks/fetchProduct";
import type { Product } from "../../hooks/fetchProduct";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import CallToActionButton from "../../components/Buttons/CallToActionButton";
import ImageCarouselSwiper from "../../components/ImageCarousel/Carousel";
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
  
  return (
    <div className="flex flex-col lg:flex-row gap-5 bg-white rounded-lg p-3 pb-12 md:py-5 md:px-5 lg:px-10 justify-center">
      <div className="">
        <ImageCarouselSwiper
          productId={product.id}
          productHandle={product.handle} 
          images={product.images.edges.map(edge => edge.node)} 
        />
      </div>
      <div className="flex flex-col xs:p-5 gap-5">
        <ProductDetails product={product} />
        <div className="xs:px-10">
          <p className="my-3 text-sm px-3">Merk: Vi er en liten, ny bedrift og er foreløpig ikke MVA-registrert. Prisene du ser er derfor endelige, uten tillegg av merverdiavgift.</p>
        <CallToActionButton
          type="addToCart"
          variantId={variantId}
          className="text-black bg-customGreen hover:bg-customHover mx-2"
          productName={product.title}
        />
      </div>
      </div>
      {/* <div>
        {!loading && <ProductSlider products={allProducts} />}
      </div> */}
    </div>
  );
}
