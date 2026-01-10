import type { InstagramPost } from "../../types/instagram";

interface InstagramFeedProps {
  posts: InstagramPost[];
}

export default function InstagramFeed({ posts }: InstagramFeedProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map(post => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          {post.media_type === "VIDEO" ? (
            <video
              src={post.media_url}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={post.media_url}
              alt={post.caption || "Instagram post"}
              className="w-full h-full object-cover"
            />
          )}
        </a>
      ))}
    </div>
  );
}
