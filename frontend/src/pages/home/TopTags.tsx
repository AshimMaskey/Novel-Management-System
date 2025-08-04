import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/Spinner";
import { useFetchGenreQuery } from "@/features/genre/genreApi";
import { Link } from "react-router-dom";

const TopTags = () => {
  const { data, isLoading, error } = useFetchGenreQuery();
  if (error) {
    console.log(error);
  }
  return (
    <div className="containerBox mt-14">
      <h2 className="text-2xl font-bold mb-2">🏷️ Popular Tags</h2>
      {isLoading ? <Spinner /> : null}
      <Separator className="mb-4" />
      <div className="flex flex-wrap gap-4">
        {data?.map((tag, index) => (
          <Link key={index} to={`/browse?genre=${tag.name}`}>
            <div
              key={index}
              className="bg-card border border-border px-3 py-2 rounded-md hover:cursor-pointer text-blue-600 font-semibold text-sm"
            >
              {tag.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopTags;
