import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Pencil, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useState, type FormEvent } from "react";
import { useUpdateNovelMutation } from "@/features/novel/novelApi";
import type { ApiError } from "@/types/error";
import type { NovelType } from "@/types/novel";

interface EditNovelModalProps {
  novel: NovelType;
  availableGenres: string[];
}

const EditNovelModal = ({ novel, availableGenres }: EditNovelModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: novel.title,
    description: novel.description ?? "",
    genres: novel.genres ?? [],
    status: novel.status ?? "ongoing",
    image: null as File | null,
    preview: novel.image,
  });

  const [updateNovel, { isLoading }] = useUpdateNovelMutation();

  const handleGenreToggle = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = new FormData();
      if (formData.image) {
        data.append("image", formData.image);
      }

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("genres", JSON.stringify(formData.genres));
      data.append("status", formData.status);

      await updateNovel({ id: novel._id, formData: data }).unwrap();

      toast.success("Novel updated successfully");
      setShowModal(false);
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || "Failed to update novel");
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="ghost" size="icon">
        <Pencil size={16} />
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Novel</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-4">
              <div>
                <Label>Cover Image</Label>
                {formData.preview && (
                  <div className="relative w-fit">
                    <img
                      src={formData.preview}
                      alt="cover"
                      className="w-24 h-32 object-cover rounded-md border my-1"
                    />
                    {formData.image && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            image: null,
                            preview: novel.image,
                          }))
                        }
                        className="absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                      >
                        <X size={14} className="text-red-500" />
                      </button>
                    )}
                  </div>
                )}
                <Input
                  className="border-2 border-border"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  className="border-2 border-border"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="border-2 border-border"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div>
                <Label>Genres</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableGenres.map((genre) => {
                    const isSelected = formData.genres.includes(genre);
                    return (
                      <Badge
                        key={genre}
                        onClick={() => handleGenreToggle(genre)}
                        className={`cursor-pointer ${
                          isSelected
                            ? "bg-purple-600 text-white"
                            : "bg-muted text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {genre}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Status</Label>
                <RadioGroup
                  value={formData.status}
                  onValueChange={handleStatusChange}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ongoing" id="ongoing" />
                    <Label htmlFor="ongoing">Ongoing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="completed" />
                    <Label htmlFor="completed">Completed</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="animate-spin mr-2" />
                  Updating...
                </Button>
              ) : (
                <Button type="submit">Save Changes</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditNovelModal;
