import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../hooks/fetchAllProducts";
import type { Product } from "../../hooks/fetchAllProducts";
import { Link } from "react-router-dom";
import CallToActionButton from "../Buttons/CallToActionButton";

export default function PopularProducts () {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const popularProductIds = [
    "gid://shopify/Product/8864308199587",
    "gid://shopify/Product/8864309084323",
    "gid://shopify/Product/8864304300195"
  ];

   useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllProducts();
        const filtered = data.filter(product => popularProductIds.includes(product.id));
        setProducts(filtered);
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
    <div className="bg-white w-full p-5">
      <h2 className="text-2xl m-5">Populære Kort</h2>
      <ul className="flex flex-col gap-5">
         {products.map(product => {
          const image = product.images.edges[1]?.node;
          const priceNode = product.variants.edges[0]?.node.priceV2;
          const variantId = product.variants.edges[0]?.node.id;

          return (
            <li key={product.id} className="m-3">
              <div className="flex gap-3">
                <Link to={`/produkt/${product.handle}`} className="flex-1 w-full aspect-[3/5] rounded overflow-hidden">
                  {image && (
                    <img
                      src={image.url}
                      alt={image.altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>
                <div className="flex flex-2 flex-col justify-between my-3">
                  <div>
                    <Link to={`/produkt/${product.handle}`} className="md:text-md xs:text-lg">
                    {product.title.slice(0, 10)}
                    <br />
                    {product.title.slice(10)}
                  </Link>
                  {priceNode && (
                    <h2 className="text-lg md:text-xl">
                      {Math.round(Number(priceNode.amount))} {priceNode.currencyCode}
                    </h2>
                  )}
                  </div>
                  <CallToActionButton type="addToCart"
                    variantId={variantId}
                    className="text-black bg-customGreen hover:bg-customHover mx-2 text-sm"
                    productName={product.title}/>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}