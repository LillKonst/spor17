import InfoBoxHome from "../../components/InfoBoxHome/InfoBoxHome";
import MainImg from "../../components/MainImg/MainImg";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { fetchAllProducts, type Product } from "../../hooks/fetchAllProducts";
import { useState, useEffect } from "react";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Kunne ikke laste produkter");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="text-center py-8">Laster produkter...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return(
    <div>
      <MainImg />
      <ProductSlider products={products} />
      <InfoBoxHome />
    </div>
  );
}