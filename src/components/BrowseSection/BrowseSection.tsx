import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../hooks/fetchAllProducts";
import type { Product } from "../../hooks/fetchAllProducts";
import BrowseLink from "./BrowseLink";
import { Link } from "react-router-dom";



export default function BrowseSection() {
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

  if (loading) return <p>Laster produkter...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="m-2 flex flex-col justify-center items-center">
      <h2 className="text-2xl m-5">Utforsk våre motiver</h2>
      <ul className="flex flex-wrap gap-4 justify-center items-center">
        {products.map((product) => (
          <BrowseLink key={product.id} product={product} />
        ))}
        <Link to="/produkter" className="bg-customGreen p-3 py-2 rounded m-5">Se alle julekort</Link>
      </ul>

    </div>
  );
}