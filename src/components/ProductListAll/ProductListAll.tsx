import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../hooks/fetchAllProducts";
import type { Product } from "../../hooks/fetchAllProducts";
import ProductLink from "../ProductLink/ProductLink";

export default function ProductListAll() {
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
    <div className="bg-white rounded-lg py-5 px-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className="text-2xl p-5 ">JULEKORT - DEN ENKLE SERIEN</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductLink key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}