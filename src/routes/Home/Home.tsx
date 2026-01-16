import MainImg from "../../components/MainImg/MainImg";
import Reviews from "../../components/Reviews/Reviews";
// import Favorite from "../../components/Favorite/Favorite";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../hooks/fetchAllProducts";
import type { Product } from "../../hooks/fetchAllProducts"; 
import WriteCard from "../../components/WriteCard/WriteCard";
import HomeAbout from "../../components/HomeAbout/HomeAbout";

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
      <MainImg />
      <ProductSlider
        title="Ny serie - Bursdagsglede"
        products={birthdayCards}
        className="ml-5"
      />
    
      {/* <Favorite />      */}
      
      <div className="xs:px-10">
        
      </div>
      <div className="flex flex-col items-center md:px-10">
        <WriteCard />
        <Reviews />
        <HomeAbout /> 
      </div>
    </div>
  );
}