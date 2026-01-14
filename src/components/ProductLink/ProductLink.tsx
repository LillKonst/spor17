import { Link } from "react-router-dom";
import type { Product } from "../../hooks/fetchAllProducts";
import ColorVariantsMini from "../ColorVariants/ColorVariantsMini";


interface ProductLinkProps {
  product: Product;
  
}

export default function ProductLink({ product }: ProductLinkProps) {
  const imageUrl = product.images.edges[0]?.node.url;


  return (
    <div key={product.id} className="transition-transform ease-out duration-200 hover:scale-102 rounded bg-white flex flex-col shadow">
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
            <div className=" mx-4 py-5 flex flex-col justify-center h-[100px] xs:h-[120px] ">
          <h2 className="text-lg xxxs:text-xl xs:text-xl">
            {product.title}
          </h2>
          <div className="flex justify-between"><h2 className="font-bold text-lg xxxs:text-2xl xs:text-xl">{Math.round(Number(product.variants.edges[0].node.priceV2.amount))}{" "}
          {product.variants.edges[0].node.priceV2.currencyCode}</h2>
          <ColorVariantsMini
            variants={product.variants.edges.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,         
            priceV2: edge.node.priceV2,
            selectedOptions: edge.node.selectedOptions,
            }))}
          />
        </div>
        </div>
        </Link>
      </div>
  );
}