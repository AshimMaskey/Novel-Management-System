import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { useSearchNovelsQuery } from "@/features/novel/novelApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(
    "Enter the title...."
  );

  const {
    data: novels = [],
    isLoading,
    error,
  } = useSearchNovelsQuery(query.length >= 3 ? query : "", {
    skip: query.trim().length < 3,
  });

  useEffect(() => {
    if (query.trim().length === 0) {
      setErrorMessage("Enter the title....");
    } else if (query.trim().length < 3) {
      setErrorMessage("Should be more than 2 characters.");
    } else {
      setErrorMessage(null);
    }
  }, [query]);

  if (error) {
    console.log(error);
  }

  return (
    <section className="containerBox mt-12">
      <h2 className="text-2xl font-bold mb-6">🔍 Search Novels</h2>

      <Input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 border-2 border-border"
      />

      {errorMessage && <p className="text-red-500 ml-2 mb-4">{errorMessage}</p>}

      {isLoading && <Spinner />}

      {novels.length === 0 && !isLoading && !errorMessage ? (
        <p className="text-muted-foreground">No results found.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {novels.map((novel) => (
            <Link
              key={novel._id}
              to={`/novel/${novel._id}`}
              className="block rounded shadow md:hover:scale-105 transition"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-md">
                <img
                  src={novel.image}
                  alt={novel.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mt-2">{novel.title}</h4>

              <p className="text-primary text-sm">Read Now →</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
