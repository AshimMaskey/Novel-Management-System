type Bookmark = {
  title: string;
  image: string;
  link: string;
  author: string;
};

const bookmarks: Bookmark[] = [
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

const BookmarksPage = () => {
  return (
    <section className="containerBox mt-14">
      <h2 className="text-2xl font-bold mb-6">🔖 Bookmarked Novels</h2>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">You have no bookmarks yet.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {bookmarks.map((book) => (
            <div
              key={book.title}
              className="rounded-xl shadow hover:shadow-md transition"
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
              <a
                href={book.link}
                className="text-primary text-sm hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default BookmarksPage;
