import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";

export default function AllProducts() {
  const { productType, handle } = useParams<{ productType?: string; handle?: string; }>();

  const title = handle
    ? "Barnebursdag"
    : productType
    ? productType.charAt(0).toUpperCase() + productType.slice(1)
    : "Alle produkter";

  const description = handle
    ? "Illustrerte produkter perfekt for barnebursdag."
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
