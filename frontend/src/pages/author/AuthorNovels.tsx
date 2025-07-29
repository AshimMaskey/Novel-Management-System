import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import Spinner from "@/components/ui/Spinner";
import {
  useDeleteNovelMutation,
  useFetchNovelsByAuthorQuery,
} from "@/features/novel/novelApi";
import type { RootState } from "@/store/store";
import type { ApiError } from "@/types/error";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditNovelModal from "./components/EditNovelModal";
import { useFetchGenreQuery } from "@/features/genre/genreApi";

const AuthorNovels = () => {
  const [selectedNovelId, setSelectedNovelId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteNovel] = useDeleteNovelMutation();
  const authorId = useSelector(
    (state: RootState) => state.auth.user?._id ?? "jptId"
  );
  const { data, error, isLoading } = useFetchNovelsByAuthorQuery(authorId);
  const {
    data: genreData,
    error: genreError,
    isLoading: genreLoading,
  } = useFetchGenreQuery();

  if (isLoading || genreLoading) return <Spinner />;
  if (error || genreError) {
    const apiError = error as ApiError;
    const apiError2 = error as ApiError;
    // toast.error(apiError?.data?.message ?? "An error occurred!");
    console.log(apiError);
    console.log(apiError2);
  }
  const genres = genreData?.map((genre) => genre.name) || [];

  const handleDeleteNovel = async () => {
    if (!selectedNovelId) return;
    try {
      await deleteNovel(selectedNovelId).unwrap();
      toast.success("Novel deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the novel.");
    } finally {
      setSelectedNovelId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">My Novels</h1>
      <section>
        {error || data?.length === 0 ? (
          <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
            No novels available. Click{" "}
            <span className="font-medium text-green-600">
              <Link to={"/author/create"}>Add</Link>
            </span>{" "}
            to create one.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data?.map((novel) => (
              <div
                key={novel._id}
                className="rounded-xl shadow hover:shadow-md transition p-3 bg-card"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-md mb-4">
                  <img
                    src={novel.image}
                    alt={novel.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{novel.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{novel.status}</p>
                <div className="flex items-center justify-between text-sm">
                  <a href="" className="text-primary hover:underline">
                    Read More →
                  </a>
                  <div className="flex gap-2 items-center">
                    <EditNovelModal novel={novel} availableGenres={genres} />
                    <button
                      onClick={() => {
                        setSelectedNovelId(novel._id);
                        setIsConfirmOpen(true);
                      }}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Delete this novel?"
        description="This action will permanently delete the novel."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteNovel}
      />
    </div>
  );
};

export default AuthorNovels;
