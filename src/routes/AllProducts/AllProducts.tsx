import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../hooks/fetchAllProducts";
import type { Product } from "../../hooks/fetchAllProducts";

export default function AllProducts() {
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


  return(
    <div className="">
      <h1 className="text-2xl p-5 ">JULEKORT - DEN ENKLE SERIEN</h1>
 
        <ul className="grid grid-cols-4 gap-5">
        {products.map((product) => (
          
          <li key={product.id} className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-4 bg-white flex flex-col shadow-lg">
            <Link to={`/product/${product.handle}`}>
            {product.images.edges[0] && (
              <img
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText || product.title}
                className="w-full rounded-lg"
              />
            )}
            <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-md">{product.title}</p>
          <p className="text-lg font-semibold">{Math.round(Number(product.variants.edges[0].node.priceV2.amount))}{" "}
  {product.variants.edges[0].node.priceV2.currencyCode}</p>
        </div>
        </Link>
          </li>
          
        ))}
      </ul>
    </div>

  );
}