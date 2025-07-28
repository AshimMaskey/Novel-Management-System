import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Novel = {
  id: string;
  title: string;
  image: string;
  state: string;
  chapters: number;
  words: number;
  views: number;
  collections: number;
};

const novels: Novel[] = [
  {
    id: "1",
    title: "Alvin Zamora",
    image:
      "https://i.pinimg.com/736x/ec/9e/b3/ec9eb331afbd7125225c442a473c68b1.jpg",
    state: "New",
    chapters: 0,
    words: 0,
    views: 0,
    collections: 0,
  },
  {
    id: "1",
    title: "Alvin Zamora",
    image:
      "https://i.pinimg.com/736x/ec/9e/b3/ec9eb331afbd7125225c442a473c68b1.jpg",
    state: "New",
    chapters: 0,
    words: 0,
    views: 0,
    collections: 0,
  },
  {
    id: "1",
    title: "Alvin Zamora",
    image:
      "https://i.pinimg.com/736x/ec/9e/b3/ec9eb331afbd7125225c442a473c68b1.jpg",
    state: "New",
    chapters: 0,
    words: 0,
    views: 0,
    collections: 0,
  },
];

export default function ManageChapter() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Manage Chapter</h1>
      <div className="w-full overflow-x-auto rounded-xl border p-4 shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-muted-foreground border-b">
              <th className="px-4 py-2">NOVELS</th>
              <th className="px-4 py-2">STATE</th>
              <th className="px-4 py-2">CHAPTERS</th>
              <th className="px-4 py-2">VIEWS</th>
              <th className="px-4 py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {novels.map((novel) => (
              <tr key={novel.id} className="border-b hover:bg-muted/20">
                <td className="flex items-center gap-3 px-4 py-2">
                  <img
                    src={novel.image}
                    alt={novel.title}
                    className="h-15 w-[50px] rounded object-cover"
                  />
                  <span>{novel.title}</span>
                </td>
                <td className="px-4 py-2">{novel.state}</td>
                <td className="px-4 py-2">{novel.chapters}</td>
                <td className="px-4 py-2">{novel.views}</td>
                <td className=" px-4 py-2">
                  <div className="flex gap-2">
                    <Button className="text-xs px-4 py-1 h-8" variant="outline">
                      Manage
                    </Button>
                    <Link to={"/author/chapters/add"}>
                      <Button
                        className="text-xs px-4 py-1 h-8"
                        variant="default"
                      >
                        Add
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
