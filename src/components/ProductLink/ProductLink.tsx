import { Link } from "react-router-dom";
import type { Product } from "../../hooks/fetchAllProducts";

interface ProductLinkProps {
  product: Product;
}

export default function ProductLink({ product }: ProductLinkProps) {
  const image = product.images.edges[0]?.node;

  return (
    <li key={product.id} className="transition-transform ease-out duration-200 hover:scale-102 rounded bg-white flex flex-col shadow-lg">
            <Link to={`/produkt/${product.handle}`}>
            <div className="w-full aspect-[5/3.5] rounded-lg overflow-hidden">
            {product.images.edges[0] && (
              <img
                src={image.url}
                alt={image.altText || product.title}
                className="w-full h-full object-cover"
              />
            )}
            </div>
            <div className=" mx-4 py-5 flex flex-col justify-center">
          <h2 className="md:text-md xs:text-lg">
            {product.title.slice(0, 10)}
            <br />
            {product.title.slice(10)}
          </h2>
          <h2 className="text-lg md:text-xl">{Math.round(Number(product.variants.edges[0].node.priceV2.amount))}{" "}
          {product.variants.edges[0].node.priceV2.currencyCode}</h2>
        </div>
        </Link>
          </li>
  );
}