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
    <div className="xxxs:mx-5 py-5 px-4 sm:px-6 md:px-8 lg:px-16">
      <h1 className="text-xl p-2 xs:text-2xl sm:p-5 ">JULEKORT - DEN ENKLE SERIEN</h1>
      <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductLink key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}