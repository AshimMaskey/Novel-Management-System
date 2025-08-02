import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card1, CardContent } from "@/components/ui/card1";
import { Button } from "@/components/ui/button";
import { useFetchNovelsQuery } from "@/features/novel/novelApi";
import Spinner from "@/components/ui/Spinner";

const itemsPerPage = 8;

const BrowsePage = () => {
  const { data, isLoading, error } = useFetchNovelsQuery();
  console.log(data);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genreFilter = searchParams.get("genre");

  const filteredNovels = useMemo(() => {
    if (!genreFilter) return data;
    return data?.filter((novel) => novel.genres.includes(genreFilter));
  }, [genreFilter, data]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((filteredNovels?.length || 0) / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleNovels = filteredNovels?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="containerBox min-h-screen mt-12">
        <h1 className="text-2xl font-bold mb-6">
          📚 Browse Novels {genreFilter && `– ${genreFilter}`}
        </h1>
        <Spinner />
      </div>
    );
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className="containerBox min-h-screen mt-12">
      <h1 className="text-2xl font-bold mb-6">
        📚 Browse Novels {genreFilter && `– ${genreFilter}`}
      </h1>

      {error || visibleNovels?.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No novels found for genre "{genreFilter}".
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleNovels?.map((novel, index) => (
              <Link to={`/novel/${novel._id}`}>
                <Card1 key={novel._id} className="bg-card">
                  <div className="relative">
                    <img
                      src={novel.image}
                      alt={novel.title}
                      className="w-full h-64 object-cover rounded-t-md"
                    />
                    <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 text-xs font-bold rounded">
                      {index + 1}
                    </div>
                    <Badge className="absolute top-2 right-2 text-xs bg-primary">
                      {novel.status}
                    </Badge>
                  </div>
                  <CardContent className="px-4 pb-4">
                    <h2 className="text-base font-bold line-clamp-1">
                      {novel.title}
                    </h2>
                    <div className="mt-3 overflow-x-auto whitespace-nowrap hide-scrollbar">
                      {novel.genres.map((genre, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="inline-block bg-gray-700 text-white text-xs px-2 py-0.5 mr-2"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card1>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 items-center mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowsePage;
