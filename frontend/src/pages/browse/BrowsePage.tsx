import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card1, CardContent } from "@/components/ui/card1";
import { Button } from "@/components/ui/button";
import { useFetchNovelsQuery } from "@/features/novel/novelApi";

const genreList = ["Action", "Adventure", "Fantasy", "Romance", "Mystery"];

function getRandomGenres() {
  const shuffled = [...genreList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * genreList.length) + 1);
}

const allNovels = new Array(50).fill(null).map((_, i) => ({
  id: i + 1,
  title: `Novel Title ${i + 1}`,
  subtitle: `Subtitle ${i + 1}`,
  rank: (i + 1).toString().padStart(2, "0"),
  status: i % 2 === 0 ? "ONGOING" : "COMPLETED",
  genres: getRandomGenres(),
  cover:
    "https://i.pinimg.com/736x/c0/6a/42/c06a4288d2496c00bf7ef07dbe55de15.jpg",
}));

const itemsPerPage = 8;

const BrowsePage = () => {
  const { data, isLoading, error } = useFetchNovelsQuery();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genreFilter = searchParams.get("genre");

  const filteredNovels = useMemo(() => {
    if (!genreFilter) return allNovels;
    return allNovels.filter((novel) => novel.genres.includes(genreFilter));
  }, [genreFilter]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredNovels.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleNovels = filteredNovels.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) return;
  if (error) {
    console.log(error);
  }

  return (
    <div className="containerBox min-h-screen mt-12">
      <h1 className="text-2xl font-bold mb-6">
        📚 Browse Novels {genreFilter && `– ${genreFilter}`}
      </h1>

      {error || visibleNovels.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No novels found for genre "{genreFilter}".
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleNovels.map((novel) => (
              <Card1 key={novel.id} className="bg-card">
                <div className="relative">
                  <img
                    src={novel.cover}
                    alt={novel.title}
                    className="w-full h-64 object-cover rounded-t-md"
                  />
                  <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 text-xs font-bold rounded">
                    {novel.rank}
                  </div>
                  <Badge className="absolute top-2 right-2 text-xs bg-primary">
                    {novel.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h2 className="text-base font-bold line-clamp-1">
                    {novel.subtitle}
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
