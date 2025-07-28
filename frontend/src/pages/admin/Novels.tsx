import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NovelTable from "./components/NovelTable";
import {
  useFetchNovelsQuery,
  useDeleteNovelMutation,
} from "@/features/novel/novelApi";
import Spinner from "@/components/ui/Spinner";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { ApiError } from "@/types/error";

const Novels = () => {
  const { data = [], isLoading, error, refetch } = useFetchNovelsQuery();
  const [deleteNovel, { isLoading: isDeleting }] = useDeleteNovelMutation();

  useEffect(() => {
    if (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || "Error fetching novels");
    }
  }, [error]);

  const handleDelete = async (id: string) => {
    try {
      await deleteNovel(id).unwrap();
      toast.success("Novel deleted successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to delete novel");
      console.error(err);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">Novels</h1>
        <Link to="/author">
          <Button className="bg-green-500 hover:bg-green-600 duration-200 transition-all">
            Add
          </Button>
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
          No novels available. Click{" "}
          <span className="font-medium text-green-600">Add</span> to create one.
        </div>
      ) : (
        <NovelTable
          data={data}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Novels;
