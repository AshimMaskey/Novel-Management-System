type Novel = {
  title: string;
  image: string;
  link: string;
};

const novels: Novel[] = [
  {
    title: "The Crimson Blade",
    image:
      "https://i.pinimg.com/1200x/8a/ec/68/8aec68f02a50382a4b6b2405f88480d9.jpg",
    link: "/novels/1",
  },
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
  {
    title: "Echoes of the Past",
    image:
      "https://i.pinimg.com/736x/c0/6a/42/c06a4288d2496c00bf7ef07dbe55de15.jpg",
    link: "/novels/3",
  },
  {
    title: "Echoes of the Past",
    image:
      "https://i.pinimg.com/736x/c0/6a/42/c06a4288d2496c00bf7ef07dbe55de15.jpg",
    link: "/novels/3",
  },
];

export function FeaturedNovels() {
  return (
    <section className="containerBox mt-14">
      <h3 className="text-2xl font-bold mb-6">📖 Featured Novels</h3>

      {/* Scrollable Carousel */}
      <div className="flex overflow-x-auto space-x-4 snap-x snap-mandatory pb-2">
        {novels.map((novel) => (
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
              <a href={novel.link} className="text-indigo-600 text-xs">
                Read Now →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
