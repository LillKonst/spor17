import { useEffect, useState } from "react";
import { fetchAllProducts, type Product } from "../../hooks/fetchAllProducts";
import { Link } from "react-router-dom";
import CallToActionButton from "../Buttons/CallToActionButton";
import { productImages } from "../../hooks/productImage";

const favoriteProductId = "gid://shopify/Product/8864308461731";

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

  const displayImage = productImages[product.id]?.main;
  const variant = product.variants.edges[0]?.node;
  const price = variant?.priceV2;

  return (
    <div className="flex flex-col gap-3 items-center mx-auto p-5">
      <h2 className="xxxs:text-lg sm:text-2xl m-5">Vår favoritt</h2>

      <div className="w-full xs:w-[380px] flex flex-col xxxs:flex-row gap-3">
        {/* Produktbilde */}
        <Link
          to={`/produkt/${product.handle}`}
          className="flex-1 w-full aspect-[3/4] rounded overflow-hidden"
        >
          {displayImage && (
            <img
              src={displayImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
        </Link>

        {/* Info + CTA */}
        <div className="flex flex-1 xs:flex-2 flex-col justify-between my-3">
          <div className="ms-3">
            <Link
              to={`/produkt/${product.handle}`}
              className="md:text-md xs:text-lg"
            >
              {product.title}
            </Link>

            {price && (
              <h2 className="text-lg md:text-xl">
                {Math.round(Number(price.amount))} {price.currencyCode}
              </h2>
            )}
          </div>



          <div className="flex flex-col gap-2 max-w-[140px]">
            <CallToActionButton
              type="addToCart"
              variantId={variant?.id}
              productName={product.title}
              className="text-black bg-customGreen hover:bg-customHover mx-2 text-sm w-full"
            />

            <Link
              to={`/produkt/${product.handle}`}
              className="p-2 px-3 mx-2 text-sm rounded border-2 border-gray-200 w-full text-center"
            >
              Se detaljer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

