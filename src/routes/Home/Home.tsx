import MainImg from "../../components/MainImg/MainImg";
// import InfoBox from "../../components/InfoBox/InfoBox";
import Reviews from "../../components/Reviews/Reviews";
// import TopInfo from "../../components/TopInfo/TopInfo";
// import Favorite from "../../components/Favorite/Favorite";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../hooks/fetchAllProducts";
import type { Product } from "../../hooks/fetchAllProducts"; 
import WriteCard from "../../components/WriteCard/WriteCard";
// import InfoBox from "../../components/InfoBox/InfoBox";

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
     
      {/* <div className="w-full flex justify-center">
      <div id="vår-favoritt" className="flex flex-col md:flex-row lg:mx-5 lg:h-[350px] lg:w-[1000px] mx-auto">
        <Favorite />
        <InfoBox />
    
      </div>
</div> */}
      <WriteCard />


      
      
     
      <Reviews />
    <h2>Her kommer en Om Spor 17 seksjon</h2>
 
    </div>
  );
}