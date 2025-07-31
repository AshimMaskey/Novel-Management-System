import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="containerBox relative mt-14 rounded-2xl overflow-hidden">
      {/* img */}
      <img
        src="https://i.pinimg.com/736x/44/e2/45/44e2456a9da4b9b2c8c20d1618cc904b.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75"
      />

      {/* overlayy */}
      <div className="relative z-10 text-white text-center py-20 px-4 backdrop-blur-sm bg-black/20">
        <h2 className="text-4xl font-bold mb-4">
          Discover and Read Amazing Novels
        </h2>
        <p className="text-lg mb-6">
          Explore thousands of stories from aspiring and established authors.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/browse">
            <Button variant="default">Start Reading</Button>
          </Link>
          <Link to="/join">
            {" "}
            <Button
              variant="ghost"
              className="text-white border-white border hover:bg-white hover:text-primary"
            >
              Become an Author
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
