import { useEffect, useState } from "react";
import { fetchAllProducts, type Product } from "../../hooks/fetchAllProducts";
import { Link } from "react-router-dom";
import AddToCartButton from "../Buttons/AddToCartButton";

const favoriteProductId = "gid://shopify/Product/8961455030435";

export default function Favorite() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts()
      .then((data) => {
        const fav = data.find((p) => p.id === favoriteProductId) || null;
        setProduct(fav);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Laster produkt…</p>;
  if (!product) return <p>Kunne ikke hente produkt</p>;

  const imageUrl = product.images.edges[0]?.node.url;
  const variant = product.variants.edges[0]?.node;
  const price = variant?.priceV2;

  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center mx-auto p-5 md:py-0 px-5 my-5 flex-1">
      <h2 className="text-2xl m-5">Vår favoritt</h2>

      <div className="flex flex-col md:flex-row">
        {/* Produktbilde */}
        <Link
          to={`/produkt/${product.handle}`}
          className="flex-1 w-full aspect-[3/4] rounded overflow-hidden"
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
        </Link>
        
        <div className="self-center xs:h-full flex flex-col my-3 xs:justify-between lg:mx-10">
          <div className="ms-2 mb-5">
            <Link
              to={`/produkt/${product.handle}`}
              className="text-xl xxxs:text-md md:text-md xs:text-lg lg:text-2xl"
            >
              {product.title}
            </Link>

            {price && (
              <h2 className="text-xl lg:text-2xl">
                {Math.round(Number(price.amount))} {price.currencyCode}
              </h2>
            )}    
          </div>

          <div className="flex flex-col gap-2 max-w-[200px]">
            <AddToCartButton 
            variantId={variant.id}
            productName={product.title}
            
            />

            <Link
              to={`/produkt/${product.handle}`}
              className="p-2 px-3 text-sm rounded border-2 border-gray-200 w-[195px] text-center"
            >
              Se detaljer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

