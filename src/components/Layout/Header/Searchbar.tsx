import { useState, useRef, useEffect } from "react";
import { shopifyFetch } from "../../../hooks/api";
import { Link } from "react-router-dom";

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

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
      setResults([]);
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    try {
      const products = await fetchPredictiveSearch(value);
      if (!controller.signal.aborted) {
        setResults(products);
        setIsOpen(products.length > 0);
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        console.error(err);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
      abortRef.current = null;
    }
  }

  // 🔒 Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter" && results.length === 1) {
    const product = results[0];
    if (product) {
      // naviger til produktet
      window.location.href = `/product/${product.handle}`;
    }
  }
}


  return (
    <div ref={containerRef} className="relative w-full max-w-md mt-2">
      {/* 🔍 Input */}
      <div className="lg:mx-5 bg-white rounded-lg p-2 flex items-center gap-2 border border-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="text-gray-500"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>

        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Hva ser du etter?"
          className="flex-1 outline-none text-black placeholder-grey-800 font-CourierPrime"
        />
      </div>

      {/* 🔽 Resultater */}
      {isOpen && (
  <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
    {results.map((product) => (
      <Link
        key={product.id}
        to={`/product/${product.handle}`}
        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition"
      >
        {product.images?.edges[0]?.node?.url && (
          <img
            src={product.images.edges[0].node.url}
            alt={product.images.edges[0].node.altText || product.title}
            className="w-10 h-10 object-cover rounded"
          />
        )}
        <span className="text-gray-800">{product.title}</span>
      </Link>
    ))}
  </div>
)}

      {/* ⏳ Søker-indikator */}
      {isLoading && searchTerm.trim() && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white text-gray-500 text-sm p-3 rounded-lg border">
          Søker...
        </div>
      )}
    </div>
  );
}
