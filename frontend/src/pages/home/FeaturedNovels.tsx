import Spinner from "@/components/ui/Spinner";
import { useFetchRandomNovelsQuery } from "@/features/novel/novelApi";
import { Link } from "react-router-dom";

export function FeaturedNovels() {
  const { data, isLoading, error } = useFetchRandomNovelsQuery();
  if (error) {
    console.log(error);
  }
  return (
    <section className="containerBox mt-14">
      <h3 className="text-2xl font-bold mb-6">📚 Featured Novels</h3>

      <div className="flex overflow-x-auto space-x-4 snap-x snap-mandatory pb-2">
        {isLoading ? <Spinner /> : null}
        {}
        {data?.map((novel) => (
          <div
            key={novel.title}
            className="snap-start min-w-[200px] max-w-[200px] flex-shrink-0 rounded-lg bg-car shadow hover:shadow-md transition duration-300"
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-t-lg">
              <img
                src={novel.image}
                alt={novel.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h4 className="text-sm font-semibold mb-1">{novel.title}</h4>
              <Link to={`/novel/${novel._id}`} className="text-primary text-xs">
                Read Now →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
