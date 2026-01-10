import { Link } from "react-router-dom";
import { useState } from "react";

interface LinkTreeProps {
  product: {
    title: string;
    productType: string;
    collection?: {
      title: string;
      handle: string;
    };
  };
}

export default function LinkTree({ product }: LinkTreeProps) {
  const [showAll, setShowAll] = useState(false);

   // Hele breadcrumb-stien
  const links = [
    { label: "Spor 17", to: "/" },
    { label: "Alle produkter", to: "/produkter" },
    { label: product.productType, to: `/produkter/${product.productType.toLowerCase()}` },
    product.collection && { label: product.collection.title, to: `/kolleksjon/${product.collection.handle}` },
    { label: product.title, to: "" } 
  ].filter(Boolean) as { label: string; to: string }[];

  // Mobilvisning: bare de to siste
  const mobileLinks = showAll ? links : links.slice(-2);
  return (
    <nav className="text-sm text-gray-500 px-5">
      <ul className="flex flex-wrap gap-2 items-center">
         {/* Desktop visning */}
        <li className="hidden sm:flex gap-2 items-center">
          {links.map((link, idx) => (
            <span key={idx} className="flex items-center gap-1">
              {link.to ? (
                <Link to={link.to} className="hover:underline">{link.label}</Link>
              ) : (
                <span className="text-gray-800 font-medium">{link.label}</span>
              )}
              {idx < links.length - 1 && <span>/</span>}
            </span>
          ))}
        </li>

          {/* Mobil visning */}
        <li className="flex sm:hidden flex-wrap gap-2 items-center">
          {/* Tydelig knapp for ... */}
          {!showAll && links.length > 2 && (
            <button
              onClick={() => setShowAll(true)}
              className="px-1 border-1 border-gray-400 rounded font-medium"

            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots text-gray-500" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
            </svg>
            </button>
          )}

          {mobileLinks.map((link, idx) => (
            <span key={idx} className="flex items-center gap-1 flex-wrap">
              {link.to ? (
                <Link to={link.to} className="hover:underline">{link.label}</Link>
              ) : (
                <span className="text-gray-800 font-medium">{link.label}</span>
              )}
              {idx < mobileLinks.length - 1 && <span>/</span>}
            </span>
          ))}
          </li>
      </ul>
    </nav>
  );
}
