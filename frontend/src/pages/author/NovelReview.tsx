import Spinner from "@/components/ui/Spinner";
import {
  useDeleteReviewMutation,
  useFetchReviewByNovelIdQuery,
} from "@/features/review/reviewApi";
import getRelativeTime from "@/utils/convertTime";
import { Loader2, Star, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const NovelReview = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const { id } = useParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const anotherId = id ?? "jptID";
  const { data, isLoading, error } = useFetchReviewByNovelIdQuery(anotherId);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  if (isLoading) return <Spinner />;
  if (error) {
    console.log(error);
  }
  const handleClick = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while deleting review!");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Reviews</h1>
      {error || data?.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
          No<span className="text-destructive"> reviews</span> available for
          this Novel.
        </div>
      ) : (
        <div className="space-y-4">
          {data?.map((review) => (
            <div
              key={review._id}
              className=" border-2 border-border rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <img
                    src={review.user.profileImg}
                    alt={`${review.user.username}'s profile`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        {review.user.username}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm">({review.rating}/5)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {review.createdAt && (
                        <span>{getRelativeTime(review.createdAt)}</span>
                      )}
                      {selectedId === review._id && isDeleting ? (
                        <Loader2 className="animate-spin mr-2" />
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedId(review._id);
                            handleClick(review._id);
                          }}
                          className="hover:text-destructive cursor-pointer"
                        >
                          <Trash />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-0 sm:ml-15">
                <p className=" leading-relaxed text-sm sm:text-base">
                  {review.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NovelReview;
