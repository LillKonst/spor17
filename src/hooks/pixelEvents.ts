// src/utils/pixelEvents.ts

export const trackPageView = () => {
  window.fbq?.("track", "PageView");
};

export const trackAddToCart = (productId: string, price: number) => {
  window.fbq?.("track", "AddToCart", {
    content_ids: [productId],
    content_type: "product",
    value: price,
    currency: "NOK",
  });
};

export const trackCheckoutRedirect = (cartValue: number) => {
  window.fbq?.("track", "InitiateCheckout", {
    value: cartValue,
    currency: "NOK",
  });
};
