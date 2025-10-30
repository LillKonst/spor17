import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductImage {
  url: string;
  altText: string | null;
}

export default function ImageCarouselSwiper({ images }: { images: ProductImage[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (!images || images.length === 0) {
    return <p>Ingen bilder tilgjengelig</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* 🔹 Hovedbilde-slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        className="w-full max-w-lg rounded-lg overflow-hidden"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img.url}
              alt={img.altText || "Produktbilde"}
              className="w-full h-auto object-contain p-5"
            />
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
