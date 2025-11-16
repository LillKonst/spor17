// src/types/instagram.ts
export interface InstagramPost {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}