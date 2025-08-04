import { Star, BookOpen, MessageSquare, Eye, Bookmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "react-router-dom";
import { useFetchNovelByIdQuery } from "@/features/novel/novelApi";
import Spinner from "@/components/ui/Spinner";
import getRelativeTime from "@/utils/convertTime";
import { useGetAllChaptersQuery } from "@/features/chapter/chapterApi";
import { useFetchReviewByNovelIdQuery } from "@/features/review/reviewApi";
import ReviewDialog from "./ReviewDialog";
import { useToggleBookmarkMutation } from "@/features/bookmark/bookmarkApi";
import type { ApiError } from "@/types/error";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function NovelPage() {
  const { id } = useParams();
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const bookmarks = userInfo?.bookmarks;
  const isBookmarked = useMemo(
    () => bookmarks?.includes(id ?? ""),
    [bookmarks, id]
  );
  const [localBookmarked, setLocalBookmarked] = useState<boolean>(
    isBookmarked ?? false
  );

  useEffect(() => {
    setLocalBookmarked(isBookmarked ?? false);
  }, [isBookmarked]);

  const { data, isLoading, error } = useFetchNovelByIdQuery(id ?? "");
  const [toggleBookmark, { isLoading: isToggling }] =
    useToggleBookmarkMutation();

  const {
    data: chapters,
    isLoading: isLoadingChapter,
    error: chapterError,
  } = useGetAllChaptersQuery(id ?? "");

  const {
    data: reviews,
    isLoading: isLoadingReview,
    error: reviewError,
  } = useFetchReviewByNovelIdQuery(id ?? "");

  const handleToggle = async () => {
    if (!userInfo?._id) {
      toast.error("You need to login to bookmark");
      return;
    }
    try {
      const data = await toggleBookmark(id ?? "").unwrap();
      toast.success(data.message ?? "No reply");
      setLocalBookmarked((prev) => !prev);
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.data.message ?? "An error occurred!");
    }
  };

  if (isLoading || isLoadingChapter || isLoadingReview) {
    return (
      <div className="containerBox min-h-screen mt-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div className="containerBox text-2xl font-bold min-h-screen mt-12">
        <h1>
          Some <span className="text-destructive">Error</span> occurred
        </h1>
      </div>
    );
  }
  if (chapterError) {
    console.log(chapterError);
  }
  if (reviewError) {
    console.log(reviewError);
  }
  return (
    <div className="min-h-screen mt-12 containerBox">
      <div className="absolute"></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            <div className="w-64 h-80 bg-gray-600 rounded-lg shadow-2xl overflow-hidden">
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <img
                  src={data?.image}
                  alt=""
                  className="w-full border border-border h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {data?.title}
            </h1>

            <p className="text-lg italic text-gray-600 mb-6">
              By: {data?.author.username}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleToggle}
                disabled={isToggling}
                className={`${
                  isToggling
                    ? "bg-primary/50 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                } text-white px-8 py-3 cursor-pointer rounded-lg font-semibold flex items-center gap-2`}
              >
                <Bookmark className="w-5 h-5 animate-pulse" />
                {isToggling
                  ? "Processing..."
                  : localBookmarked
                  ? "Bookmarked"
                  : "Add To Bookmark"}
              </button>

              <Link to={`/chapter/${id}/1`}>
                <button className="bg-gray-700 cursor-pointer hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Start Reading
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {data?.genres.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className=" text-sm">
                  PUBLICATION: {getRelativeTime(data?.createdAt ?? "2025")},
                  <span className="uppercase"> {data?.status}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-orange-500" />
                <span className="text-orange-500 font-semibold">
                  {data?.averageRating}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-5 h-5" />
                <span>{data?.reviewCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-5 h-5" />
                <span>{data?.views}</span>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full mt-6">
              <TabsList className="bg-card border rounded-lg p-1 flex space-x-2">
                <TabsTrigger
                  value="description"
                  className=" cursor-pointer data-[state=active]:text-white data-[state=active]:bg-primary px-4 py-2 rounded"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="chapters"
                  className=" cursor-pointer data-[state=active]:text-white data-[state=active]:bg-primary px-4 py-2 rounded"
                >
                  Chapters
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className=" cursor-pointer data-[state=active]:text-white data-[state=active]:bg-primary px-4 py-2 rounded"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <div className="bg-card border dark:bg-card rounded-lg p-6">
                  <h1 className="text-lg font-bold uppercase">
                    Novel Description:
                  </h1>
                  <p className="pt-2">{data?.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="chapters" className="mt-4">
                <div className="bg-card border dark:bg-card rounded-lg p-6 ">
                  <h1 className="text-lg font-bold uppercase">
                    List of Chapters:
                  </h1>
                  {chapters && chapters.length > 0 ? (
                    <ul className="space-y-2">
                      {chapters?.map((chapter) => (
                        <Link to={`/chapter/${id}/${chapter.chapterNumber}`}>
                          <li
                            key={chapter._id}
                            className="border-b hover:text-primary border-gray-700 py-4 cursor-pointer"
                          >
                            Chapter {chapter.chapterNumber}: {chapter.title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <p className="pt-2">No chapters available!</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-4">
                <div className="bg-card border dark:bg-card rounded-lg p-6">
                  <div className="flex justify-between items-center gap-3">
                    <h1 className="text-lg font-bold uppercase">
                      User Reviews:
                    </h1>
                    <div className="flex gap-3 items-center">
                      <ReviewDialog novelId={id ?? ""} />
                    </div>
                  </div>
                  {reviews && reviews.length > 0 ? (
                    <ul className="space-y-4">
                      {reviews?.map((review, idx) => (
                        <li key={idx} className="border-b border-gray-700 py-2">
                          <p className="text-md">{review.review} </p>
                          <p className=" flex items-center italic gap-2 text-gray-500 mt-1">
                            — {review.user.username}{" "}
                            <Star className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-500">
                              {review.rating}/5
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="pt-2">No Reviews available!</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
