import Spinner from "@/components/ui/Spinner";
import { useFetchNovelsByAuthorQuery } from "@/features/novel/novelApi";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Reviews = () => {
  const authorId = useSelector(
    (state: RootState) => state.auth.user?._id ?? "jptId"
  );
  const { data, isLoading, error } = useFetchNovelsByAuthorQuery(authorId);
  if (isLoading) return <Spinner />;
  if (error) {
    console.log(error);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Reviews</h1>
      <section>
        {!data || data.length === 0 ? (
          <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
            No novels available. Click{" "}
            <span className="font-medium text-green-600">
              <Link to={"/author/create"}>Add</Link>
            </span>{" "}
            to create one.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.map((novel) => (
              <div
                key={novel._id}
                className="rounded-xl shadow hover:shadow-md transition p-3 bg-card"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-md mb-4">
                  <img
                    src={novel.image}
                    alt={novel.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{novel.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{novel.status}</p>

                <div className="flex items-center justify-between text-sm">
                  <Link
                    to={`/author/reviews/${novel._id}`}
                    className="text-primary hover:underline"
                  >
                    Read Reviews →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Reviews;
