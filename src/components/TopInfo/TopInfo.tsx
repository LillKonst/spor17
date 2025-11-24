// export default function TopInfo () {
//   return (
//       <ul className="flex flex-wrap gap-2 mx-2 my-2">
//           <li className="text-xs px-3 py-2 rounded-2xl border-2 border-gray-200 ">10 kort per pakke - 1 motiv</li>
//           <li className="text-xs px-3 py-2 rounded-2xl border-2 border-gray-200">norsk design</li>
//           <li className="text-xs px-3 py-2 rounded-2xl border-2 border-gray-200">rask levering</li>
//           <li className="text-xs px-3 py-2 rounded-2xl border-2 border-gray-200">Pris: 249 kr + frakt 39 kr</li>
//         </ul>
//   );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TopInfoSlider() {
  const items = [
    "10 kort per pakke - 1 motiv",
    "norsk design",
    "rask levering",
    "Pris: 249 kr + frakt 39 kr"
  ];

  return (
    <div className="my-4">

      {/* --- MOBILE: Swiper Slider --- */}
      <div className="block md:hidden">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          className="w-full"
        >
          {items.map((text, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
              <div className="px-3 py-2 text-xs rounded-2xl border-2 border-gray-200 w-fit">
                {text}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      <ul className="hidden md:flex gap-2 flex-wrap lg:px-12">
        {items.map((text, idx) => (
          <li
            key={idx}
            className="px-3 py-2 text-xs rounded-2xl border-2 border-gray-200 w-fit"
          >
            {text}
          </li>
        ))}
      </ul>

    </div>
  );
}
