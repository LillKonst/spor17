import type { Product } from "../../hooks/fetchProduct";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  
  return (
    <div className="flex flex-col p-3 xxxs:p-5 gap-5">
      <div className="flex justify-between flex-col">
      <h2 className="text-2xl">Produktbeskrivelse:</h2>
      <div
        className="font-Garamond md:text-lg mt-4 text-gray-700 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        >
      </div>
      </div>
    </div>
  );
}