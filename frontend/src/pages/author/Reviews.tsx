type Novel = {
  title: string;
  image: string;
  link: string;
  author: string;
};

const novels: Novel[] = [
  {
    title: "The Lost Kingdom",
    image:
      "https://i.pinimg.com/1200x/29/d4/eb/29d4ebbfa7a2e4e9c287010448ccfb7a.jpg",
    link: "/novels/4",
    author: "Aiden Frost",
  },
  {
    title: "The Lost Kingdom",
    image:
      "https://i.pinimg.com/1200x/29/d4/eb/29d4ebbfa7a2e4e9c287010448ccfb7a.jpg",
    link: "/novels/4",
    author: "Aiden Frost",
  },
  {
    title: "The Lost Kingdom",
    image:
      "https://i.pinimg.com/1200x/83/3c/f6/833cf6900ba01ff842d0b0032087da40.jpg",
    link: "/novels/4",
    author: "Aiden Frost",
  },
  {
    title: "The Lost Kingdom",
    image:
      "https://i.pinimg.com/1200x/b6/d7/f6/b6d7f67ec40e70595728afcb3cae65b5.jpg",
    link: "/novels/4",
    author: "Aiden Frost",
  },
  {
    title: "Midnight Reverie",
    image:
      "https://i.pinimg.com/1200x/29/d4/eb/29d4ebbfa7a2e4e9c287010448ccfb7a.jpg",
    link: "/novels/5",
    author: "Luna Hart",
  },
  {
    title: "Midnight Reverie",
    image:
      "https://i.pinimg.com/1200x/29/d4/eb/29d4ebbfa7a2e4e9c287010448ccfb7a.jpg",
    link: "/novels/5",
    author: "Luna Hart",
  },
  {
    title: "Midnight Reverie",
    image:
      "https://i.pinimg.com/1200x/29/d4/eb/29d4ebbfa7a2e4e9c287010448ccfb7a.jpg",
    link: "/novels/5",
    author: "Luna Hart",
  },
];

const Reviews = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Reviews</h1>
      <section>
        {novels.length === 0 ? (
          <p className="text-gray-500">You haven't written any novel yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {novels.map((book, idx) => (
              <div
                key={`${book.title}-${idx}`}
                className="rounded-xl shadow hover:shadow-md transition p-3 bg-card"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-md mb-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-2">by {book.author}</p>

                {/* Flex row: More → and icons */}
                <div className="flex items-center justify-between text-sm">
                  <a href={book.link} className="text-primary hover:underline">
                    Read Reviews →
                  </a>
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
