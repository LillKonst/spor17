import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../hooks/fetchAllProducts";
import type { Product } from "../../hooks/fetchAllProducts";
import ProductLink from "../ProductLink/ProductLink";

{/* TODO: Legg til filtere når flere kolleksjoner lanseres */}

interface ProductListProps {
  productType?: string;
  // artist?: string | null;
  // collection?: string | null;
}
// export default function ProductList({ productType, artist, collection }: ProductListProps) {
export default function ProductList({ productType }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  async function loadProducts() {
    try {
      const data = await fetchAllProducts();

      let filtered = data;

      if (productType) {
        filtered = filtered.filter(
          (p) => p.productType?.toLowerCase() === productType.toLowerCase()
        );
      }
      
      {/* TODO: Legg til filtere når flere kolleksjoner lanseres */}

      // if (collection) {
      //   filtered = filtered.filter((p) =>
      //     p.collections.edges.some(
      //       (c) => c.node.handle === collection
      //     )
      //   );
      // }

      // if (artist) {
      //   filtered = filtered.filter((p) =>
      //   p.tags?.includes(artist)
      //   );
      // }

      setProducts(filtered);
    } catch (err) {
      console.error(err);
      setError("Kunne ikke hente produkter");
    } finally {
      setLoading(false);
    }
  }

  loadProducts();
}, [productType]); // legg til "artist, collections"


  if (loading) return <p>Laster produkter...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="py-5 px-4 sm:px-6 md:px-8 lg:px-16">
      <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductLink key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}