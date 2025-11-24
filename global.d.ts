declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/bundle';
declare module "swiper/css/thumbs";
declare module "swiper/css/zoom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

declare module '*.JPG' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}


