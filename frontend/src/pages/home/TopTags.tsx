import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const tags = ["Adventure", "Mystery", "Romance", "Fantasy", "Action"];

const TopTags = () => {
  return (
    <div className="containerBox mt-14">
      <h2 className="text-2xl font-bold mb-2">🏷️ Popular Tags</h2>
      <Separator className="mb-4" />
      <div className="flex flex-wrap gap-4">
        {tags.map((tag, index) => (
          <Link to={`/browse?genre=${tag}`}>
            <div
              key={index}
              className="bg-card px-3 py-2 rounded-md hover:cursor-pointer text-blue-600 font-semibold text-sm"
            >
              {tag}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopTags;
