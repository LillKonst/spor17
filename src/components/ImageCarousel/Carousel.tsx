import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Zoom } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { ZoomIn } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

interface ProductImage {
  url: string;
  altText: string | null;
}

export default function ImageCarouselSwiper({ images }: { images: ProductImage[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return <p>Ingen bilder tilgjengelig</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* 🔹 Hovedbilde-slider */}
      <Swiper
        modules={[Navigation, Thumbs, Zoom]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        zoom={{ maxRatio: 3 }}
        spaceBetween={10}
        className="w-full max-w-lg rounded-lg overflow-hidden"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="swiper-zoom-container relative" onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>
            <img
              src={img.url}
              alt={img.altText || "Produktbilde"}
              className="w-full h-auto object-contain p-5"
            />

            {hovered === i && (
                <div className="absolute left-6 top-85 w-60 h-20 inset-0 rounded-2xl flex flex-col items-center justify-center bg-black/30 text-white text-sm transition-opacity duration-300">
                  <ZoomIn className="w-6 h-6 mb-2 opacity-80" />
                  <span>Doobeltklikk for å zoome inn</span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔹 Thumbnail-slider */}
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
        {images.map((img, i) => (
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

      {/* 🔹 Styling */}
      <style>{`
        /* Pilene lengre ut */
        .swiper-button-prev {
          left: -30px;
          color: black;
        }
        .swiper-button-next {
          right: -30px;
          color: black;
        }

        /* Thumbnail aktiv kant til customGreen */
        .swiper-slide-thumb-active {
          border-color: #22c55e; /* Tailwind green-500 */
        }
      `}</style>
    </div>
  );
}
