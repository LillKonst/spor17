import InstagramFeed from "./InstagramFeed";
import type { InstagramPost } from "../../types/instagram";

const mockPosts: InstagramPost[] = [
  {
    id: "1",
    media_url: "https://via.placeholder.com/300",
    caption: "Fint bilde!",
    permalink: "https://instagram.com/p/1",
    media_type: "IMAGE",
  },
  {
    id: "2",
    media_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "Kort video",
    permalink: "https://instagram.com/p/2",
    media_type: "VIDEO",
  },
];

export default function InstagramSection() {
  return (
    <div className="p-5 bg-white rounded-lg my-10">
      <h2 className="text-2xl font-bold mb-4">Følg oss på Instagram</h2>
      <InstagramFeed posts={mockPosts} />
    </div>
  );
}



