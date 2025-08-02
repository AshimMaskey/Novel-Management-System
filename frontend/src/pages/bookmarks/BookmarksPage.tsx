import Spinner from "@/components/ui/Spinner";
import { useGetBookmarksQuery } from "@/features/bookmark/bookmarkApi";
import { Link } from "react-router-dom";

const BookmarksPage = () => {
  const { data: data, isLoading, error } = useGetBookmarksQuery();
  if (isLoading) {
    return (
      <section className="containerBox mt-12">
        <h2 className="text-2xl font-bold mb-6">🔖 Bookmarked Novels</h2>
        <Spinner />
      </section>
    );
  }
  if (error) {
    console.log(error);
  }
  return (
    <section className="containerBox mt-12">
      <h2 className="text-2xl font-bold mb-6">🔖 Bookmarked Novels</h2>

      {data && data?.length === 0 ? (
        <p className="text-gray-500">You have no bookmarks yet.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {data?.map((bookmark) => (
            <div
              key={bookmark.title}
              className="rounded-xl shadow hover:shadow-md transition"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-md mb-4">
                <img
                  src={bookmark.image}
                  alt={bookmark.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{bookmark.title}</h3>

              <Link
                to={`/novel/${bookmark._id}`}
                className="text-primary text-sm hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default BookmarksPage;
