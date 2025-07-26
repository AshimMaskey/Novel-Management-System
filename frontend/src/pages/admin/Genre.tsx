import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import GenreTable from "./components/GenreTable";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { GenreType } from "@/types/genre";
import type { ApiError } from "@/types/error";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useEditGenreMutation,
  useFetchGenreQuery,
} from "@/features/genre/genreApi";

const Genre = () => {
  const { isLoading, error, data, refetch } = useFetchGenreQuery();
  const [addGenre, { isLoading: isAdding }] = useCreateGenreMutation();
  const [editGenre, { isLoading: isEditing }] = useEditGenreMutation();
  const [deleteGenre, { isLoading: isDeleting }] = useDeleteGenreMutation();

  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const [genreName, setGenreName] = useState("");
  const [editingGenre, setEditingGenre] = useState<GenreType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setGenreList(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error("An error occurred while fetching genres");
    }
  }, [error]);

  const handleAddGenre = async () => {
    if (!genreName.trim()) {
      toast.error("Genre name cannot be empty");
      return;
    }
    try {
      await addGenre({ name: genreName }).unwrap();
      toast.success("Genre added successfully");
      setGenreName("");
      refetch();
      setIsDialogOpen(false);
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(apiError?.data?.message ?? "Something went wrong");
    }
  };

  const openEditDialog = (genre: GenreType) => {
    setEditingGenre(genre);
    setGenreName(genre.name);
    setIsDialogOpen(true);
  };

  const handleUpdateGenre = async () => {
    if (!genreName.trim() || !editingGenre) {
      toast.error("Genre name cannot be empty");
      return;
    }
    try {
      await editGenre({
        id: editingGenre._id,
        genreName: { name: genreName },
      }).unwrap();
      toast.success("Genre updated successfully");
      setGenreName("");
      setEditingGenre(null);
      refetch();
      setIsDialogOpen(false);
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(apiError?.data?.message ?? "Failed to update genre");
    }
  };

  const handleDeleteGenre = async (id: string) => {
    try {
      await deleteGenre(id).unwrap();
      toast.success("Genre deleted successfully");
      refetch();
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(apiError?.data?.message ?? "Failed to delete genre");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">Genre</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 duration-200 transition-all">
              {editingGenre ? "Edit Genre" : "Add"}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingGenre ? "Edit Genre" : "Add Genre"}
              </DialogTitle>
            </DialogHeader>

            <Input
              className="border-2 mb-4"
              id="name"
              placeholder="Enter genre name"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
            />

            <DialogFooter className="sm:justify-start">
              {editingGenre ? (
                <Button onClick={handleUpdateGenre} disabled={isEditing}>
                  {isEditing ? "Updating..." : "Update"}
                </Button>
              ) : (
                <Button onClick={handleAddGenre} disabled={isAdding}>
                  {isAdding ? "Adding..." : "Add"}
                </Button>
              )}

              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingGenre(null);
                    setGenreName("");
                  }}
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {genreList.length > 0 ? (
        <GenreTable
          data={genreList}
          itemsPerPage={5}
          onEdit={openEditDialog}
          onDelete={handleDeleteGenre}
          isDeleting={isDeleting}
        />
      ) : (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
          No genres available. Click{" "}
          <span className="font-medium text-green-600">Add</span> to create one.
        </div>
      )}
    </div>
  );
};

export default Genre;
