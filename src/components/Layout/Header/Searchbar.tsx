import { useState, useRef, useEffect } from "react";
import { shopifyFetch } from "../../../hooks/api";
import { Link } from "react-router-dom";
import { mainImageMap } from "../../../hooks/mainProductImage";

interface Product {
  id: string;
  handle: string;
  title: string;
  images: { edges: { node: { url: string; altText: string | null } }[] };
}

interface PredictiveSearchResponse {
  predictiveSearch: {
    products: Product[];
  };
}

interface SearchbarProps {
  onSelectResult?: () => void;
}

async function fetchPredictiveSearch(query: string): Promise<Product[]> {
  if (!query.trim()) return [];

  const gql = `
    query predictiveSearch($query: String!) {
      predictiveSearch(query: $query, types: [PRODUCT], limit: 10) {
        products {
          id
          handle
          title
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<PredictiveSearchResponse>(gql, { query });
  return data.predictiveSearch.products;
}

export default function Searchbar({ onSelectResult }: SearchbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopRef = useRef<HTMLDivElement | null>(null);
  

  const abortRef = useRef<AbortController | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- SEARCH LOGIC ---------------- */

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    try {
      const products = await fetchPredictiveSearch(value);
      if (!controller.signal.aborted) {
        setResults(products);
        setIsOpen(products.length > 0);
      }
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
      abortRef.current = null;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && results.length === 1) {
      window.location.href = `/produkt/${results[0].handle}`;
    }
  }

  /* ---------------- CLICK OUTSIDE ---------------- */

  useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    const target = e.target as Node;

    const clickedDesktop =
      desktopRef.current && desktopRef.current.contains(target);

    const clickedMobile =
      overlayRef.current && overlayRef.current.contains(target);

    if (!clickedDesktop && !clickedMobile) {
      setIsOpen(false);
      setMobileOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  /* ---------------- RENDER ---------------- */

  return (
    <>
      {/* 🔍 FLEX-ITEM (påvirker header) */}
      <div className="relative">
        {/* Mobil ikon */}
        <button
          onClick={() => setMobileOpen(true)}
          className={`lg:hidden p-2 text-gray-700 ${
            mobileOpen ? "hidden" : ""
          }`}
          aria-label="Åpne søk"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>

        {/* Desktop search */}
        <div ref={desktopRef} className="hidden lg:block w-[300px]">
          <div className="bg-white rounded-lg p-2 flex items-center gap-2 border border-gray-300">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Hva ser du etter?"
              className="flex-1 outline-none"
            />
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-40">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/produkt/${product.handle}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50"
                >
                  {mainImageMap[product.id] && (
                    <img
                      src={mainImageMap[product.id]}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <span>{product.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔥 OVERLAY (påvirker IKKE header layout) */}
      {mobileOpen && (
        <div
  ref={overlayRef}
  className="
    absolute
    top-[30px]
    left-0
    right-0
    z-70
    bg-white
    px-5
    flex flex-col
  "
>

          {/* Header search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 mt-3 h-[60px]">
            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Hva ser du etter?"
              className="flex-1 outline-none"
            />
            <button
              onClick={() => {
                setMobileOpen(false);
                setIsOpen(false);
                setSearchTerm("");
                setResults([]);
              }}
              aria-label="Lukk søk"
            >
              ✕
            </button>
          </div>

          {/* Resultater */}
          {isOpen && results.length > 0 && (
            <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/produkt/${product.handle}`}
                  onClick={() => {
                    setMobileOpen(false);
                    setIsOpen(false);
                    onSelectResult?.();
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50"
                >
                  {mainImageMap[product.id] && (
                    <img
                      src={mainImageMap[product.id]}
                      alt={product.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                  )}
                  <span className="text-lg">{product.title}</span>
                </Link>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="mt-2 text-sm text-gray-500">Søker…</div>
          )}
        </div>
      )}
    </>
  );
}
