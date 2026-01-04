import MainImg from "../../components/MainImg/MainImg";
// import PopularProducts from "../../components/PopularProducts/PopularProducts";
import InfoBox from "../../components/InfoBox/InfoBox";
import Reviews from "../../components/Reviews/Reviews";
// import TopInfo from "../../components/TopInfo/TopInfo";
// import Favorite from "../../components/Favorite/Favorite";
// import InstagramFeed from "../../components/InstagramFeed/InstagramFeed";
// import InstagramSection from "../../components/InstagramFeed/InstagramSection";
// import WriteCardDisplay from "../../images/IMG_1075-200kb.jpg";
import ProductSlider from "../../components/ProductSlider/ProductSlider";

import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../hooks/fetchAllProducts";
import type { Product } from "../../hooks/fetchAllProducts"; 

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Kunne ikke hente produkter");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const birthdayCards = products.filter(
    p => p.tags?.some(tag => tag.toLowerCase() === "barnebursdag")
  );


  if (loading) return <p>Laster produkter...</p>;
  if (error) return <p>{error}</p>;
  
  return(
    <div className="z-10 lg:px-5">
      {/* <TopInfo /> */}
      <MainImg />
      <ProductSlider
        title="Nyheter - Bursdagskort"
        products={birthdayCards}
        className="ml-5"
      />
   
      {/* <div id="populære-kort">
        <PopularProducts/>
      </div> */}
      
      <div id="vår-favoritt" className="flex flex-col md:flex-row md:gap-5 md:mx-5">
        <InfoBox />
        {/* <Favorite /> */}
      </div>
     
      <div className="bg-white sm:p-5 my-10 rounded-lg flex flex-col gap-5 lg:flex-row w-full lg:px-20 self-center justify-center items-center lg:max-w-[1200px] mx-auto">
      {/* <div className="w-full relative md:max-w-[450px]">
        <img src={WriteCardDisplay} alt="2 pakker med kort" className="w-full md:rounded"/>
        <div className="absolute top-[15%] left-[4%] right-[43%]">
          <h3 className="font-bold text-[1vh] xxxs:text-[2vh] xs:text-[3vh] sm:text-2xl">
          Skriv noen varme ord til de du er glad i  
        </h3>
        </div>
        
      </div> */}
      <Reviews />
    </div>
 
    </div>
  );
}