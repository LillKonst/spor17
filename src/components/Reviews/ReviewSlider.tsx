interface Review {
  id: string;
  name: string;
  text: string;
}

interface ReviewSliderProps {
  reviews: Review[];
  title?: string;
  className?: string;
}

export default function ReviewSlider({ reviews, title, className }: ReviewSliderProps) {
  if (!reviews.length) return null;

  return (
    <section className={className}>
      {title && (
        <h2 className="text-2xl md:text-3xl mb-4 px-2 text-center">{title}</h2>
      )}

      <div className="overflow-x-auto">
        <ul className="flex gap-4 snap-x snap-mandatory overflow-x-auto pb-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="min-w-[75%] sm:min-w-[45%] lg:min-w-[32%] xl:min-w-[25%] snap-start bg-white p-5 rounded-lg shadow flex flex-col justify-start"
            >
              <p className="text-xl font-bold mb-2">{review.name}</p>
              <p className="text-base">{review.text}</p>
            </li>
          ))}
        </ul>

        {/* 🔹 Minimal indikator */}
        <div className="flex justify-center gap-1 mt-2">
          {reviews.slice(0, 5).map((_, i) => (
            <span key={i} className="h-1 w-6 bg-gray-300 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
