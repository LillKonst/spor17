import { Link } from "react-router-dom";
import type { Product } from "../../hooks/fetchAllProducts";

import litenby from "../../images/litenby.svg";
import pakker from "../../images/pakker.svg";
import rødthus from "../../images/rødt-hus.svg";
import jenteundermisteltein from "../../images/jenteundermisteltein.svg";
import venterpånissen from "../../images/venterpånissen.svg";
import juletre from "../../images/juletre.svg";
import snømann from "../../images/snømann.svg";
import pepperkake from "../../images/pepperkake.svg";

interface ProductLinkProps {
  product: Product;
}

export default function BrowseLink({ product }: ProductLinkProps) {
  const productImages: Record<string, string> = {
  "gid://shopify/Product/8864308461731": litenby,
  "gid://shopify/Product/8864307413155": pakker,
  "gid://shopify/Product/8864308330659": rødthus,
  "gid://shopify/Product/8864308068515": jenteundermisteltein,
  "gid://shopify/Product/8864308199587": venterpånissen,
  "gid://shopify/Product/8864308756643": juletre,
  "gid://shopify/Product/8864309084323": snømann,
  "gid://shopify/Product/8864304300195": pepperkake,
  };

  const image = productImages[product.id];


  return (
     <li key={product.id}>
      <Link to={`/produkt/${product.handle}`}>
        <img 
          src={image} 
          alt={product.title} 
          className="w-20 h-20 md:w-24 md:h-24" 
        />
        </Link>
    </li>
  );
}