import { Separator } from "@/components/ui/separator";

const tags = [
  "ISEKAI",
  "ANIME",
  "NARUTO",
  "MARVEL",
  "YAOI",
  "ONEPIECE",
  "HARRYPOTTER",
  "YURI",
  "MHA",
  "DC",
  "POKEMON",
  "BNHA",
  "GAME OF THRONES",
  "DANMACHI",
];

const TopTags = () => {
  return (
    <div className="containerBox mt-14">
      <h2 className="text-2xl font-bold mb-2">🏷️ Popular Tags</h2>
      <Separator className="mb-4" />
      <div className="flex flex-wrap gap-4">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-card px-3 py-2 rounded-md hover:cursor-pointer text-blue-600 font-semibold text-sm"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTags;
