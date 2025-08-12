import Spinner from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useFetchRecommendedNovelsQuery } from "@/features/recommend/recommendApi";

export default function RecommendationSection() {
  const { data, isLoading, error } = useFetchRecommendedNovelsQuery();

  if (error) {
    console.log(error);
  }
  return (
    <section className="containerBox mt-14">
      <h3 className="text-2xl font-bold mb-6">✨ Recommended Novels</h3>

      <div className="flex overflow-x-auto space-x-4 snap-x snap-mandatory pb-2">
        {isLoading ? <Spinner /> : null}
        {}
        {data?.map((novel) => (
          <Link key={novel.title} to={`novel/${novel._id}`}>
            <div className="snap-start min-w-[200px] max-w-[200px] flex-shrink-0 rounded-lg bg-car shadow hover:shadow-md transition duration-300">
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-t-lg">
                <img
                  src={novel.image}
                  alt={novel.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 text-xs bg-primary">
                  {novel.status}
                </Badge>
              </div>
              <div className="p-2">
                <h4 className="text-sm font-semibold mb-1">{novel.title}</h4>
                <Link
                  to={`/novel/${novel._id}`}
                  className="text-primary text-xs"
                >
                  Read Now →
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
