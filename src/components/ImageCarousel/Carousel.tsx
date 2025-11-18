import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Zoom } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { ZoomIn } from "lucide-react";
import { mainImageMap } from "../../hooks/mainProductImage";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

interface ProductImage {
  url: string;
  altText: string | null;
}

interface ImageCarouselSwiperProps {
  productId: string;
  productHandle: string;
  images: ProductImage[];
}

export default function ImageCarouselSwiper({
  productId, productHandle,
  images,
}: ImageCarouselSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return <p>Ingen bilder tilgjengelig</p>;
  }

 // --- inne i komponenten, rett etter du har 'images' og 'productHandle' tilgjengelig ---
// 1) hent manuelt hovedbilde-URL (kan være undefined)
const manualMainImageUrl = mainImageMap[productId] ?? null;


// 2) DEBUG: logg for å se hva du får fra API og map
console.log("productHandle:", productHandle);
console.log("manualMainImageUrl:", manualMainImageUrl);
console.log("images urls:", images.map(i => i.url));

// 3) Prøv å finne et bilde i API-arrayet som matcher manualMainImageUrl (eksakt match på url)
const matchedByUrl = manualMainImageUrl ? images.find(img => img.url === manualMainImageUrl) : undefined;

// 4) Hvis matchedByUrl finnes, bruk den (første), ellers fallback til et fast index (f.eks index 3), ellers images[0]
const fallbackIndex = 3; // bytt til 4. bilde = index 3 hvis det er det som virket
const primaryFromImages: ProductImage | undefined = matchedByUrl ?? images[fallbackIndex] ?? images[0];

// 5) Bygg orderedImages: sett enten manualMainImageUrl (uavhengig av om den finnes i images), eller primaryFromImages
const orderedImages: ProductImage[] = [];

// Hvis du har en manuelt kontrollert URL og du ønsker at nettopp DEN url skal vises (selv om ikke i images),
// legg den først:
if (manualMainImageUrl) {
  orderedImages.push({ url: manualMainImageUrl, altText: "Hovedbilde" });
  // deretter alle shopify-images som ikke har samme url
  orderedImages.push(...images.filter(img => img.url !== manualMainImageUrl));
} else {
  // ingen manual URL: bruk primaryFromImages fra images (kan være images[3] eller images[0])
  // sørg for at primaryFromImages er første i listen, og resten følger uten duplikat
  orderedImages.push(primaryFromImages);
  orderedImages.push(...images.filter(img => img.url !== primaryFromImages.url));
}

// 6) Sikkerhetsfilter: fjern eventuelle falsy / tomme urler
const finalOrdered = orderedImages.filter(i => i && i.url) as ProductImage[];

// Bruk finalOrdered videre i Swiper


  return (
    <div className="flex flex-col items-center mx-5">
      {/* Hovedbilde */}
      <Swiper
        modules={[Navigation, Thumbs, Zoom]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        zoom={{ maxRatio: 3 }}
        spaceBetween={10}
        className="w-full max-w-lg rounded-lg overflow-hidden"
      >
        {finalOrdered.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="swiper-zoom-container relative"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={img.url}
                alt={img.altText || "Produktbilde"}
                className="w-full h-auto sm:h-[600px] object-contain p-5"
              />

              {hovered === i && window.innerWidth >= 640 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg flex items-center justify-center bg-black/50 text-white text-sm transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5 mr-2 opacity-80" />
                  <span className="text-sm">Dobbeltklikk for å zoome inn</span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className="mt-5 w-full max-w-lg"
        breakpoints={{
          400: { slidesPerView: 5 },
          640: { slidesPerView: 6 },
          1024: { slidesPerView: 7 },
        }}
      >
        {finalOrdered.map((img, i) => (
          <SwiperSlide
            key={i}
            className="cursor-pointer rounded-lg overflow-hidden border-2 border-gray-300"
          >
            <img
              src={img.url}
              alt={img.altText || "Thumbnail"}
              className="w-full h-full object-cover hover:opacity-80 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
