// src/data/productImages.ts
import litenby from "../images/by-produktbilde.jpg";
import pakker from "../images/pakker-produktbilde.jpg";
import rødthus from "../images/hus-produktbilde.jpg";
import jenteundermisteltein from "../images/jente-produktbilde.jpg";
import venterpånissen from "../images/venter-produktbilde.jpg";
import juletre from "../images/juletre-produktbilde.jpg";
import snømann from "../images/snømann-produktbilde.jpg";
import pepperkake from "../images/pepperkake-produktbilde.jpg";

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
