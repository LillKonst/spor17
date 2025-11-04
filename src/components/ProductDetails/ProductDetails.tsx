import type { Product } from "../../hooks/fetchProduct";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const price = product.variants.edges[0].node.priceV2;

  return (
    <div className="flex flex-col p-3 md:p-5 gap-5">
      <div className="flex justify-between flex-col xl:flex-row">
        <h1 className="text-2xl">{product.title}</h1>
        <h2 className="text-2xl">
          {Math.round(Number(price.amount))} {price.currencyCode}
        </h2>
      </div>
      <p className="text-xl text-customRed">Åpningstilbud! Få 20% ved kjøp av 2 eller flere julekortpakker. 20% trekkes fra i kassen.</p>
      <div
        className="font-Garamond text-lg mt-4 text-gray-700 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        >
      </div>
    </div>
  );
}