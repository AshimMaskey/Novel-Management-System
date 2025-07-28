import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const genresList = [
  "Action",
  "Adventure",
  "Romance",
  "Fantasy",
  "Mystery",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Comedy",
  "Slice of Life",
];

export default function CreateNovel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setSelectedGenres([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, image, selectedGenres });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Create New Novel</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-6 p-6 bg-card rounded-xl border"
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImage(file);
            }}
          />
        </div>

        <div>
          <Label className="mb-3 text-lg">Genres</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {genresList.map((genre) => (
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
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create Novel</Button>
        </div>
      </form>
    </div>
  );
}
