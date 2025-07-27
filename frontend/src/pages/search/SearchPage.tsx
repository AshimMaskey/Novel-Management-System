import { Input } from "@/components/ui/input";
import { useState } from "react";

type Novel = {
  title: string;
  image: string;
  link: string;
};

const dummyNovels: Novel[] = [
  {
    title: "The Crimson Blade",
    image:
      "https://i.pinimg.com/1200x/8a/ec/68/8aec68f02a50382a4b6b2405f88480d9.jpg",
    link: "/novels/1",
  },
  {
    title: "Whispers in the Wind",
    image:
      "https://i.pinimg.com/1200x/56/80/d9/5680d98943ea93643240af57f29d0049.jpg",
    link: "/novels/2",
  },
  {
    title: "Echoes of the Past",
    image:
      "https://i.pinimg.com/736x/c0/6a/42/c06a4288d2496c00bf7ef07dbe55de15.jpg",
    link: "/novels/3",
  },
  // Add more novels
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredNovels = dummyNovels.filter((novel) =>
    novel.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="containerBox mt-14">
      <h2 className="text-2xl font-bold mb-6">🔍 Search Novels</h2>
      <Input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-8"
      />

      {filteredNovels.length === 0 ? (
        <p className="text-muted-foreground">No results found.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {filteredNovels.map((novel) => (
            <a
              key={novel.title}
              href={novel.link}
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
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
