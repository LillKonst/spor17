import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";

export default function AllProducts() {
  const { productType, handle } = useParams<{ productType?: string; handle?: string; }>();
  console.log("🧭 AllProducts params", { productType, handle });

  const title = handle
    ? "Bursdagsglede"
    : productType
    ? productType.charAt(0).toUpperCase() + productType.slice(1)
    : "Alle produkter";

  const description = handle
    ? "Illustrerte bursdagskort med dyr og fantasifigurer som passer perfekt for barn. Gjør feiringen magisk!"
    : productType
    ? "Morsomme kort når du ønsker å gi en hilsen."
    : "Utforsk hele utvalget vårt.";

  return (
    <div className="mx-5">
      <div className="mb-6 lg:mx-5">
        <h1 className="text-2xl">{title}</h1>
        <p>{description}</p>
      </div>

      <ProductList productType={productType} collectionHandle={handle} />
    </div>
  );
}
