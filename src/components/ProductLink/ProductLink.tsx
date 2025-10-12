import { Link } from "react-router-dom";
import type { Product } from "../../hooks/fetchAllProducts";

interface ProductLinkProps {
  product: Product;
}

export default function ProductLink({ product }: ProductLinkProps) {
  const image = product.images.edges[0]?.node;

  return (
    <li key={product.id} className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-2 md:p-4 bg-white flex flex-col shadow-lg">
            <Link to={`/product/${product.handle}`}>
            {product.images.edges[0] && (
              <img
                src={image.url}
                alt={image.altText || product.title}
                className="w-full rounded-lg -my-5 px-3"
              />
            )}
            <div className="-mt-5 xxs:-mt-10 md:-mt-5 mx-4 px-1 flex flex-col justify-center">
          <h2 className="text-md xs:text-xl">
            {product.title.slice(0, 10)}
            <br />
            {product.title.slice(10)}
          </h2>
          <h2 className="text-xl">{Math.round(Number(product.variants.edges[0].node.priceV2.amount))}{" "}
          {product.variants.edges[0].node.priceV2.currencyCode}</h2>
        </div>
        </Link>
          </li>
  );
}