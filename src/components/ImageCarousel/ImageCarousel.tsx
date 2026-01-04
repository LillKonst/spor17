// import { useCallback, useEffect, useRef, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface ProductImage {
//   url: string;
//   altText: string | null;
// }

// interface ImageCarouselProps {
//   productId: string;
//   productHandle: string;
//   images: ProductImage[];
// }

// export default function ImageCarousel({ productId, productHandle, images }: ImageCarouselProps) {
//   const [mainRef, mainApi] = useEmblaCarousel({ loop: false });
//   const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: "trimSnaps", dragFree: true });

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});

//   const onSelect = useCallback(() => {
//     if (!mainApi) return;
//     const index = mainApi.selectedScrollSnap();
//     setSelectedIndex(index);
//     if (thumbsApi) thumbsApi.scrollTo(index);
//   }, [mainApi, thumbsApi]);

//   useEffect(() => {
//     if (!mainApi) return;
//     mainApi.on("select", onSelect);
//     onSelect();
//   }, [mainApi, onSelect]);

//   const scrollPrev = () => mainApi?.scrollPrev();
//   const scrollNext = () => mainApi?.scrollNext();
//   const onThumbClick = (index: number) => mainApi?.scrollTo(index);

//   if (!images || images.length === 0) return <p>Ingen bilder tilgjengelig</p>;

//   return (
//     <div className="flex flex-col items-center justify-center">
//       {/* Main carousel */}
//       <div className="relative w-full max-w-lg overflow-hidden mx-5" ref={mainRef}>
//         <div className="flex">
//           {images.map((img, i) => (
//             <div className="flex-shrink-0 w-full px-5 h-[350px]" key={i}>
//               <img
//                 ref={(el) => { imgRefs.current[i] = el ?? null; }}
//                 src={img.url}
//                 alt={img.altText || "Produktbilde"}
//                 className="w-full h-auto object-contain"
//                 draggable={false}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Navigation arrows */}
//         <button
//           onClick={scrollPrev}
//           className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2"
//         >
//           <ChevronLeft />
//         </button>
//         <button
//           onClick={scrollNext}
//           className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       {/* Thumbnails */}
//       <div className="mt-4 w-full max-w-lg" ref={thumbsRef}>
//         <div className="flex gap-2">
//           {images.map((img, i) => (
//             <div
//               key={i}
//               onClick={() => onThumbClick(i)}
//               className={`cursor-pointer border-2 rounded overflow-hidden ${
//                 selectedIndex === i ? "border-black" : "border-gray-300"
//               }`}
//             >
//               <img
//                 src={img.url}
//                 alt={img.altText || "Thumbnail"}
//                 className="w-20 h-20 object-cover"
//                 draggable={false}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mainImageMap } from "../../hooks/mainProductImage";

interface ProductImage {
  url: string;
  altText: string | null;
}

interface ImageCarouselProps {
  productId: string;
  productHandle: string;
  images: ProductImage[]; // forventet: edges -> node er allerede map'et før komponenten receives
}

const ZOOM_SCALE = 2.5; // endre hvis du vil ha sterkere/weaker zoom

export default function ImageCarousel({
  productId,
  images,
}: ImageCarouselProps) {
  // --- finalOrdered (samme logikk som Swiper)
  const manualMainImageUrl = mainImageMap[productId] ?? null;
  const matchedByUrl = manualMainImageUrl
    ? images.find((img) => img.url === manualMainImageUrl)
    : undefined;
  const fallbackIndex = 3;
  const primaryFromImages: ProductImage =
    (matchedByUrl ?? images[fallbackIndex] ?? images[0]) as ProductImage;

  const orderedImages: ProductImage[] = [];
  if (manualMainImageUrl) {
    orderedImages.push({ url: manualMainImageUrl, altText: "Hovedbilde" });
    orderedImages.push(...images.filter((img) => img.url !== manualMainImageUrl));
  } else {
    orderedImages.push(primaryFromImages);
    orderedImages.push(...images.filter((img) => img.url !== primaryFromImages.url));
  }
  const finalOrdered = orderedImages.filter((i) => i && i.url) as ProductImage[];

  // Embla hooks
  const [mainRef, mainApi] = useEmblaCarousel({ loop: false });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: "trimSnaps", dragFree: true });

  // state + refs
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});
  // pointer pan refs
  const pointerDownRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef<Record<number, { x: number; y: number }>>({}); // store translate per image
  const activePointerIdRef = useRef<number | null>(null);
  const activeImgIndexRef = useRef<number | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  // sync selected index between main and thumbs
  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const idx = mainApi.selectedScrollSnap();
    setSelectedIndex(idx);
    thumbsApi?.scrollTo(idx);
  }, [mainApi, thumbsApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect);
    onSelect();
  }, [mainApi, onSelect]);

  const scrollPrev = () => mainApi?.scrollPrev();
  const scrollNext = () => mainApi?.scrollNext();
  const onThumbClick = (index: number) => mainApi?.scrollTo(index);

  // DOUBLECLICK: toggle zoom focused on click pos
  const handleDoubleClick = useCallback((e: React.MouseEvent, idx: number) => {
    const img = imgRefs.current[idx];
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;
    img.style.transformOrigin = `${originX}% ${originY}%`;

    // toggle zoom
    if (img.classList.contains("is-zoomed")) {
      img.classList.remove("is-zoomed");
      // reset translate stored
      translateRef.current[idx] = { x: 0, y: 0 };
      img.style.transform = ""; // remove transform
    } else {
      // unzoom any other
      Object.values(imgRefs.current).forEach((other) => {
        if (other && other !== img) {
          other.classList.remove("is-zoomed");
          other.style.transform = "";
          const key = Number(Object.keys(imgRefs.current).find(k => imgRefs.current[+k] === other));
          if (!Number.isNaN(key)) translateRef.current[key] = { x: 0, y: 0 };
        }
      });
      img.classList.add("is-zoomed");
      // initial translate 0 + scale
      translateRef.current[idx] = { x: 0, y: 0 };
      img.style.transform = `translate(0px, 0px) scale(${ZOOM_SCALE})`;
    }
  }, []);

  // POINTER HANDLERS attached per-img to allow panning when zoomed
  const handlePointerDown = useCallback((e: React.PointerEvent, idx: number) => {
    const img = imgRefs.current[idx];
    if (!img) return;
    if (!img.classList.contains("is-zoomed")) return; // only pan when zoomed

    // stop embla from interpreting swipe: stop propagation and prevent default
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);

    pointerDownRef.current = true;
    activePointerIdRef.current = e.pointerId;
    activeImgIndexRef.current = idx;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };

    // read existing translate
    const current = translateRef.current[idx] ?? { x: 0, y: 0 };
    translateRef.current[idx] = { x: current.x, y: current.y };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointerDownRef.current) return;
    const idx = activeImgIndexRef.current;
    if (idx === null) return;
    const img = imgRefs.current[idx];
    if (!img) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    e.stopPropagation();
    e.preventDefault();

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const base = translateRef.current[idx] ?? { x: 0, y: 0 };
    const tx = base.x + dx;
    const ty = base.y + dy;

    // set transform combine translate + scale
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${ZOOM_SCALE})`;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!pointerDownRef.current) return;
    const idx = activeImgIndexRef.current;
    if (idx === null) return;
    const img = imgRefs.current[idx];
    if (!img) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);

    // commit translate: compute final based on movement
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const prev = translateRef.current[idx] ?? { x: 0, y: 0 };
    translateRef.current[idx] = { x: prev.x + dx, y: prev.y + dy };

    pointerDownRef.current = false;
    activePointerIdRef.current = null;
    activeImgIndexRef.current = null;
  }, []);

  // When slide changes, clear any zoom/pan on other images
  useEffect(() => {
    Object.values(imgRefs.current).forEach((img) => {
      if (!img) return;
      img.classList.remove("is-zoomed");
      img.style.transform = "";
    });
    translateRef.current = {};
  }, [selectedIndex]);

  if (!finalOrdered || finalOrdered.length === 0) return <p>Ingen bilder tilgjengelig</p>;

  return (
    <div className="flex flex-col items-center">
      {/* MAIN */}
      <div className="relative w-full max-w-lg overflow-hidden h-[500px]" ref={mainRef}>
        <div className="flex h-full">
          {finalOrdered.map((img, i) => (
            <div className="flex-shrink-0 w-full h-[500px] flex items-center justify-center" key={i}>
  <div
    className="relative w-full h-full flex items-center justify-center"
    onMouseEnter={() => setHoveredIndex(i)}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    <img
      ref={(el) => { imgRefs.current[i] = el ?? null; }}
      src={img.url}
      alt={img.altText ?? "Produktbilde"}
      className="max-h-full max-w-full object-contain aspect-[4/5] cursor-zoom-in touch-none"
      draggable={false}
      onDoubleClick={(e: React.MouseEvent<HTMLImageElement>) => handleDoubleClick(e, i)}
      onPointerDown={(e) => handlePointerDown(e, i)}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />

    {/* Zoom-note (kun desktop) */}
    {hoveredIndex === i && (
      <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 
                      px-3 py-2 rounded-lg bg-black/50 text-white text-sm 
                      items-center justify-center transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2 opacity-80"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
        </svg>
        <span>Dobbeltklikk for å zoome</span>
      </div>
    )}
  </div>
</div>

          ))}
        </div>

        {/* Arrows */}
        <button onClick={scrollPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2">
          <ChevronLeft />
        </button>
        <button onClick={scrollNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2">
          <ChevronRight />
        </button>

      </div>

      {/* THUMBS */}
      <div className="mt-4 w-full max-w-lg" ref={thumbsRef}>
        <div className="flex gap-2 overflow-x-auto px-1 py-1 justify-center">
          {finalOrdered.map((img, i) => (
            <div
              key={i}
              onClick={() => onThumbClick(i)}
             
              className={`flex items-center justify-center cursor-pointer rounded overflow-hidden border-2 ${selectedIndex === i ? "border-black" : "border-gray-300"}`}
            >
              <img src={img.url} alt={img.altText ?? "Thumbnail"} className="w-20 h-20 object-cover" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
