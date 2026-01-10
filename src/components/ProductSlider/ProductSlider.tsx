import ProductLink from "../ProductLink/ProductLink";
import type { Product } from "../../hooks/fetchAllProducts";

interface ProductSliderProps {
  products: Product[];
  title?: string;
  className?: string;
}

export default function ProductSlider({
  products,
  title,
  className,
}: ProductSliderProps) {
  if (!products.length) return null;

  return (
    <section className={className}>
      {title && (
        <h2 className="text-2xl md:text-3xl mb-4 px-2">
          {title}
        </h2>
      )}

      <div className="overflow-x-auto">
        <ul
          className="
            flex gap-4
            snap-x snap-mandatory
            overflow-x-auto
            pb-4
          "
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="
                min-w-[75%] xs:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]
                snap-start
              "
            >
              <ProductLink product={product} />
            </li>
          ))}
        </ul>

        {/* 🔹 Minimal indikator */}
        <div className="flex justify-center gap-1 mt-2">
          {products.slice(0, 5).map((_, i) => (
            <span
              key={i}
              className="h-1 w-6 bg-gray-300 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
