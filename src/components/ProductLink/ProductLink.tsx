import { Link } from "react-router-dom";
import type { Product } from "../../hooks/fetchAllProducts";
import { productImages } from "../../hooks/productImage";

interface ProductLinkProps {
  product: Product;
}

export default function ProductLink({ product }: ProductLinkProps) {
  const imageUrl = productImages[product.id]?.main;

  return (
    <li key={product.id} className="transition-transform ease-out duration-200 hover:scale-102 rounded bg-white flex flex-col shadow">
            <Link to={`/produkt/${product.handle}`}>
            <div className="w-full aspect-[3/4] rounded-lg overflow-hidden">
            {imageUrl && (
            <img
              src={imageUrl}
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          )}
            </div>
            <div className=" mx-4 py-5 flex flex-col justify-center">
          <h2 className="text-lg xxxs:text-2xl">
            {product.title.slice(0, 10)}
            <br />
            {product.title.slice(10)}
          </h2>
          <h2 className="font-bold text-lg xxxs:text-2xl">{Math.round(Number(product.variants.edges[0].node.priceV2.amount))}{" "}
          {product.variants.edges[0].node.priceV2.currencyCode}</h2>
        </div>
        </Link>
          </li>
  );
}