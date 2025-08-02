import { useState } from "react";
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChapterQuery } from "@/features/chapter/chapterApi";
import Spinner from "@/components/ui/Spinner";
import getRelativeTime from "@/utils/convertTime";
import { Button } from "@/components/ui/button";

export default function ChapterPage() {
  const { novelId, chapterNumber } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetChapterQuery({
    novelId: novelId ? novelId : "",
    chapterNumber: chapterNumber ? parseInt(chapterNumber) : 1,
  });

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    setComments([...comments, newComment]);
    setNewComment("");
  };
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
          className="rounded-lg px-4 space-y-4"
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

        <div className="bg-card border-2 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> Comments
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 rounded-lg border-2 resize-none"
              rows={4}
              placeholder="Leave your thoughts..."
            ></textarea>
            <Button className="bg-green-600 hover:bg-green-700 duration-300">
              Post Comment
            </Button>
          </form>

          {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet. Be the first!</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment, index) => (
                <li key={index} className="flex gap-3 border-2 p-4 rounded-lg">
                  <div className="flex-shrink-0">
                    <img
                      src="https://api.dicebear.com/7.x/thumbs/svg?seed=User"
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">User{index + 1}</p>
                    <p className="text-sm mt-1">{comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
