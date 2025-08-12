import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFetchGenreQuery } from "@/features/genre/genreApi";
import Spinner from "@/components/ui/Spinner";
import { useCreateNovelMutation } from "@/features/novel/novelApi";
import type { ApiError } from "@/types/error";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function CreateNovel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const { data, isLoading, error } = useFetchGenreQuery();
  const [createNovel, { isLoading: isCreatingNovel }] =
    useCreateNovelMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) {
    console.log("An error occurred", error);
  }

  const genres = data?.map((genre) => genre.name);

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setSelectedGenres([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a cover image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("genres", JSON.stringify(selectedGenres));

    try {
      await createNovel(formData).unwrap();
      handleCancel();
      toast.success("Novel created successfully!");
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError);
      toast.error(apiError?.data?.message ?? "An error occurred");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSizeMB = 10;

      if (!validTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG images are allowed.");
        e.target.value = "";
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`Image must be smaller than ${maxSizeMB} MB.`);
        e.target.value = "";
        return;
      }

      setImage(file);
    }
  };

  return (
    <div className="space-y-6 md:w-xl lg:w-2xl">
      <h1 className="text-2xl font-semibold text-gray-700">Create New Novel</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-card rounded-xl border"
      >
        <div>
          <Label className="mb-3 text-lg" htmlFor="title">
            Title
          </Label>
          <Input
            className="border-2 p-5 border-border"
            id="title"
            placeholder="Enter novel title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-3 text-lg" htmlFor="description">
            Description
          </Label>
          <Textarea
            className="border-2 p-5 border-border"
            id="description"
            placeholder="Enter novel description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>

        <div>
          <Label className="mb-3 text-lg" htmlFor="image">
            Cover Image
          </Label>
          <Input
            ref={fileInputRef}
            className="border-2 border-border"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <Label className="mb-3 text-lg">Genres</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {genres?.map((genre) => (
              <Badge
                key={genre}
                className={`cursor-pointer ${
                  selectedGenres.includes(genre)
                    ? "bg-purple-600 text-white"
                    : "bg-muted text-muted-foreground"
                } text-sm`}
                onClick={() => handleGenreToggle(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 w-full">
          <Button type="button" onClick={handleCancel} variant="outline">
            Clear
          </Button>
          {isCreatingNovel ? (
            <Button disabled>
              <Loader2 className="animate-spin mr-2" />
              Creating...
            </Button>
          ) : (
            <Button type="submit">Create Novel</Button>
          )}
        </div>
      </form>
    </div>
  );
}
