import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  url: string;
  altText: string | null;
}

export interface ImageCarouselProps {
  images: ProductImage[];
}

const ZOOM_SCALE = 2.5;

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: false });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: "trimSnaps", dragFree: true });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});
  const pointerDownRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef<Record<number, { x: number; y: number }>>({});
  const activePointerIdRef = useRef<number | null>(null);
  const activeImgIndexRef = useRef<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  // Zoom / pan logikk beholdes uendret
  const handleDoubleClick = useCallback((e: React.MouseEvent, idx: number) => {
    const img = imgRefs.current[idx];
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;
    img.style.transformOrigin = `${originX}% ${originY}%`;

    if (img.classList.contains("is-zoomed")) {
      img.classList.remove("is-zoomed");
      translateRef.current[idx] = { x: 0, y: 0 };
      img.style.transform = "";
    } else {
      Object.values(imgRefs.current).forEach((other) => {
        if (other && other !== img) {
          other.classList.remove("is-zoomed");
          other.style.transform = "";
          const key = Number(Object.keys(imgRefs.current).find(k => imgRefs.current[+k] === other));
          if (!Number.isNaN(key)) translateRef.current[key] = { x: 0, y: 0 };
        }
      });
      img.classList.add("is-zoomed");
      translateRef.current[idx] = { x: 0, y: 0 };
      img.style.transform = `translate(0px, 0px) scale(${ZOOM_SCALE})`;
    }
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent, idx: number) => {
    const img = imgRefs.current[idx];
    if (!img || !img.classList.contains("is-zoomed")) return;
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);

    pointerDownRef.current = true;
    activePointerIdRef.current = e.pointerId;
    activeImgIndexRef.current = idx;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };

    translateRef.current[idx] = translateRef.current[idx] ?? { x: 0, y: 0 };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointerDownRef.current) return;
    const idx = activeImgIndexRef.current;
    if (idx === null || activePointerIdRef.current !== e.pointerId) return;
    const img = imgRefs.current[idx];
    if (!img) return;

    e.stopPropagation();
    e.preventDefault();
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const base = translateRef.current[idx] ?? { x: 0, y: 0 };
    img.style.transform = `translate(${base.x + dx}px, ${base.y + dy}px) scale(${ZOOM_SCALE})`;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!pointerDownRef.current) return;
    const idx = activeImgIndexRef.current;
    if (idx === null || activePointerIdRef.current !== e.pointerId) return;
    const img = imgRefs.current[idx];
    if (!img) return;

    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const prev = translateRef.current[idx] ?? { x: 0, y: 0 };
    translateRef.current[idx] = { x: prev.x + dx, y: prev.y + dy };

    pointerDownRef.current = false;
    activePointerIdRef.current = null;
    activeImgIndexRef.current = null;
  }, []);

  useEffect(() => {
    Object.values(imgRefs.current).forEach((img) => {
      if (!img) return;
      img.classList.remove("is-zoomed");
      img.style.transform = "";
    });
    translateRef.current = {};
  }, [selectedIndex]);

  if (!images || images.length === 0) return <p>Ingen bilder tilgjengelig</p>;

  return (
    <div className="flex flex-col items-center">
      {/* MAIN */}
      <div className="relative w-full max-w-lg overflow-hidden h-[500px]" ref={mainRef}>
        <div className="flex h-full">
          {images.map((img, i) => (
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
                  onDoubleClick={(e) => handleDoubleClick(e, i)}
                  onPointerDown={(e) => handlePointerDown(e, i)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                />

                {hoveredIndex === i && (
                  <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 
                                  px-3 py-2 rounded-lg bg-black/50 text-white text-sm 
                                  items-center justify-center transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 opacity-80" viewBox="0 0 24 24" fill="currentColor">
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
          {images.map((img, i) => (
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
