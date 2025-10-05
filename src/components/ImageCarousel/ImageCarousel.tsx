import { useState } from "react";

interface ProductImage {
  url: string;
  altText: string | null;
}

export default function ImageCarousel({ images }: { images: ProductImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p>Ingen bilder tilgjengelig</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md h-full">
        <img
          src={images[selectedIndex].url}
          alt={images[selectedIndex].altText || "Produktbilde"}
          className="p-5"
        />
      </div>

 
      <div className="flex gap-3 mt-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`border-2 rounded-lg overflow-hidden w-5 h-5 xxxs:w-10 xxxs:h-10 xs:w-20 xs:h-20 flex-shrink-0 ${
              selectedIndex === index ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <img
              src={img.url}
              alt={img.altText || "Produkt thumbnail"}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
