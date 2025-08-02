import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import {
  useDeleteChapterMutation,
  useGetAllChaptersQuery,
} from "@/features/chapter/chapterApi";
import getRelativeTime from "@/utils/convertTime";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const EditChapter = () => {
  const { id: novelId } = useParams();
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const { data, isLoading, error } = useGetAllChaptersQuery(novelId ?? "jptid");
  const [deleteChapter, { isLoading: isDeleting }] = useDeleteChapterMutation();
  if (isLoading) return <Spinner />;

  if (error) {
    console.log(error);
  }

  const handleDelete = async (novelId: string) => {
    try {
      await deleteChapter(novelId).unwrap();
      setSelectedChapter(null);
      toast.success("Chapter Deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Chapter deleting failed!");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Manage Chapter</h1>

      {!data || data.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
          No chapters available. Click{" "}
          <span className="font-medium text-green-600">
            <Link to={"/author/chapters"}>Add</Link>
          </span>{" "}
          to create one.
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border p-4 shadow-sm">
          <div className="min-w-[700px]">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="px-4 py-2">CH. NO.</th>
                  <th className="px-4 py-2">CH. TITLE</th>
                  <th className="px-4 py-2">CREATED AT</th>
                  <th className="px-4 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((chapter) => (
                  <tr key={chapter._id} className="border-b hover:bg-muted/20">
                    <td className="px-4 py-2">{chapter.chapterNumber}</td>
                    <td className="px-4 py-2">{chapter.title}</td>
                    <td className="px-4 py-2">
                      {getRelativeTime(chapter.createdAt)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/author/chapters/edit/${chapter.novel}/${chapter.chapterNumber}`}
                        >
                          {" "}
                          <Button
                            className="text-xs px-4 py-1 h-8"
                            variant="outline"
                          >
                            Edit
                          </Button>
                        </Link>
                        {selectedChapter === chapter._id && isDeleting ? (
                          <Button
                            className="text-xs py-1 h-8"
                            variant="destructive"
                            disabled
                          >
                            <Loader2 className="animate-spin" />
                            Deleting.
                          </Button>
                        ) : (
                          <Button
                            className="text-xs px-4 py-1 h-8"
                            variant="destructive"
                            onClick={() => {
                              setSelectedChapter(chapter._id);
                              handleDelete(chapter._id);
                            }}
                          >
                            Delete
                          </Button>
                        )}
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
};

export default EditChapter;
