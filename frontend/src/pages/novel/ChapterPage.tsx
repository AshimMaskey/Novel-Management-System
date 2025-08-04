import { useState } from "react";
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChapterQuery } from "@/features/chapter/chapterApi";
import Spinner from "@/components/ui/Spinner";
import getRelativeTime from "@/utils/convertTime";
import { Button } from "@/components/ui/button";
import {
  useCreateCommentMutation,
  useGetCommentsByChapterQuery,
} from "@/features/comment/commentApi";
import CommentCard from "./component/Comment";
import type { ApiError } from "@/types/error";
import toast from "react-hot-toast";

export default function ChapterPage() {
  const { novelId, chapterNumber } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetChapterQuery({
    novelId: novelId ? novelId : "",
    chapterNumber: chapterNumber ? parseInt(chapterNumber) : 1,
  });
  const {
    data: commentData,
    isLoading: isLoadingComment,
    error: errorComment,
    isError: isCommentError,
  } = useGetCommentsByChapterQuery(data?.chapter._id ?? "");

  const noComments =
    isCommentError &&
    "status" in errorComment &&
    (errorComment.status === 404 || errorComment.status === "FETCH_ERROR");

  const [createComment, { isLoading: isCommenting }] =
    useCreateCommentMutation();

  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createComment({
        novelId: novelId ? novelId : "",
        chapterId: data ? data.chapter._id : "",
        spoiler: false,
        content: newComment,
      }).unwrap();
      toast.success("Comment posted successfully!");
      setNewComment("");
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError);
      toast.error(apiError.data.message ?? "An error occurred!");
    }
  };

  if (errorComment) {
    console.log(errorComment);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen containerBox mt-12">
        <Spinner />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return (
      <div className="min-h-screen containerBox mt-12">
        <h1 className="text-2xl">No chapter available!</h1>
      </div>
    );
  }

  const handleClick = (chapterNumber: number) => {
    navigate(`/chapter/${novelId}/${chapterNumber}`);
  };

  return (
    <div className="min-h-screen containerBox mt-12">
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Chapter {data?.chapter.chapterNumber}: {data?.chapter.title}
          </h1>
          <p className="text-gray-400">
            Posted on {getRelativeTime(data?.chapter.createdAt ?? "2025")}
          </p>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: data?.chapter.content ?? "" }}
          className="rounded-lg bg-card text-2xl p-4 space-y-4"
        />

        <div className="flex px-4 justify-between my-8">
          <Button
            onClick={() =>
              handleClick(data?.previousChapter?.chapterNumber ?? 1)
            }
            disabled={data?.previousChapter === null}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={() => handleClick(data?.nextChapter?.chapterNumber ?? 1)}
            disabled={data?.nextChapter === null}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> Comments
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-white dark:bg-card dark:text-white p-3 rounded-lg border resize-none"
              rows={4}
              placeholder="Leave your thoughts..."
            ></textarea>
            <Button
              disabled={isCommenting}
              className="bg-green-600 mt-3 ml-1 hover:bg-green-700 duration-300"
            >
              {isCommenting ? "Posing Comment..." : "Post Comment"}
            </Button>
          </form>
          {isLoadingComment ? <Spinner /> : null}

          {isLoadingComment ? (
            <Spinner />
          ) : noComments ? (
            <p className="text-gray-400 ml-2">No comments yet. Be the first!</p>
          ) : commentData?.length === 0 ? (
            <p className="text-gray-400 ml-2">No comments yet. Be the first!</p>
          ) : (
            <ul className="space-y-4">
              {commentData?.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
