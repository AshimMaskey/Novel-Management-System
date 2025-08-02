import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { useFetchNovelsByAuthorQuery } from "@/features/novel/novelApi";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChapterCount from "./components/ChapterCount";

export default function ManageChapter() {
  const authorId = useSelector(
    (state: RootState) => state.auth.user?._id ?? "jptId"
  );

  const { data, isLoading, error } = useFetchNovelsByAuthorQuery(authorId);

  if (isLoading) return <Spinner />;

  if (error) {
    console.log(error);
    return (
      <div className="text-red-500 bg-red-50 p-4 rounded border border-red-200">
        Failed to load novels. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Manage Chapter</h1>

      {!data || data.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
          No novels available. Click{" "}
          <span className="font-medium text-green-600">
            <Link to={"/author/create"}>Add</Link>
          </span>{" "}
          to create one.
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border p-4 shadow-sm">
          <div className="min-w-[700px]">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="px-4 py-2">NOVELS</th>
                  <th className="px-4 py-2">STATUS</th>
                  <th className="px-4 py-2">CHAPTERS</th>
                  <th className="px-4 py-2">VIEWS</th>
                  <th className="px-4 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((novel) => (
                  <tr key={novel._id} className="border-b hover:bg-muted/20">
                    <td className="flex items-center gap-3 px-4 py-2">
                      <img
                        src={novel.image}
                        alt={novel.title}
                        className="h-15 w-[50px] rounded object-cover"
                      />
                      <span>{novel.title}</span>
                    </td>
                    <td className="px-4 py-2">{novel.status}</td>
                    <td className="px-4 py-2">
                      <ChapterCount novelId={novel._id} />
                    </td>
                    <td className="px-4 py-2">{novel.views}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        <Link to={`/author/chapters/manage/${novel._id}`}>
                          {" "}
                          <Button
                            className="text-xs px-4 py-1 h-8"
                            variant="outline"
                          >
                            Manage
                          </Button>
                        </Link>
                        <Link to={`/author/chapters/${novel._id}`}>
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
      )}
    </div>
  );
}
