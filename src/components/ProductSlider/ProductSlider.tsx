import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductLink from "../ProductLink/ProductLink";
import type { Product } from "../../hooks/fetchAllProducts";

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  return (
    <div className="bg-white p-5 rounded-lg my-10 ">
      <h2 className="text-3xl m-2 p-2 ">Våre Julekort</h2>
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1400: { slidesPerView: 4 },
      }}
      className="w-full pb-10"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductLink product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
     <style>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
