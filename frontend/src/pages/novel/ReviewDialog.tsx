import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { PenBox, Star } from "lucide-react";
import { useCreateReviewMutation } from "@/features/review/reviewApi";
import toast from "react-hot-toast";
import type { ApiError } from "@/types/error";

export default function ReviewDialog({ novelId }: { novelId: string }) {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(0);

  const handleSubmitReview = async () => {
    try {
      await createReview({
        id: novelId,
        formData: { review: reviewText, rating },
      }).unwrap();
      toast.success("Review Created!");
      setIsDialogOpen(false);
      setReviewText("");
      setRating(0);
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.data.message ?? "And error occurred!");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PenBox className=" cursor-pointer size-5" />
          <span>Write Review</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <Textarea
          placeholder="Share your thoughts..."
          className="mb-4 border-2 border-border"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1;
            return (
              <Star
                key={starValue}
                className={`w-6 h-6 cursor-pointer ${
                  starValue <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setRating(starValue)}
                fill={starValue <= rating ? "currentColor" : "none"}
              />
            );
          })}
        </div>

        <DialogFooter className="sm:justify-start">
          <Button onClick={handleSubmitReview} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>

          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsDialogOpen(false);
                setReviewText("");
                setRating(0);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
