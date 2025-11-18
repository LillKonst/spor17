// src/data/productImages.ts
import litenby from "../images/kort-bilde-by.jpg";
import pakker from "../images/kort-bilde-pakker.jpg";
import rødthus from "../images/kort-bilde-hus.jpg";
import jenteundermisteltein from "../images/kort-bilde-jente.jpg";
import venterpånissen from "../images/kort-bilde-venter.jpg";
import juletre from "../images/kort-bilde-juletre.jpg";
import snømann from "../images/kort-bilde-snømann.jpg";
import pepperkake from "../images/kort-bilde-pepperkake.jpg";

export interface ProductImageData {
  main: string;    
  others: string[];  
}

export const productImages: Record<string, ProductImageData> = {
  "gid://shopify/Product/8864308461731": {
    main: litenby,
    others: [], // her kan du legge til andre bilder senere
  },
  "gid://shopify/Product/8864307413155": {
    main: pakker,
    others: [],
  },
  "gid://shopify/Product/8864308330659": {
    main: rødthus,
    others: [],
  },
  "gid://shopify/Product/8864308068515": {
    main: jenteundermisteltein,
    others: [],
  },
  "gid://shopify/Product/8864308199587": {
    main: venterpånissen,
    others: [],
  },
  "gid://shopify/Product/8864308756643": {
    main: juletre,
    others: [],
  },
  "gid://shopify/Product/8864309084323": {
    main: snømann,
    others: [],
  },
  "gid://shopify/Product/8864304300195": {
    main: pepperkake,
    others: [],
  },
};
