import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { TailChase } from "ldrs/react";

import getRelativeTime from "@/utils/convertTime";
import type { RootState } from "@/store/store";
import type { Comment as CommentType } from "@/types/comment";
import type { ApiError } from "@/types/error";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/features/comment/commentApi";

interface CommentItemProps {
  comment: CommentType;
}

const CommentCard = ({ comment }: CommentItemProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const isAuthor = comment.user._id === userId;

  const [deleteFunc, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();

  const [editOpen, setEditOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleDelete = async () => {
    try {
      await deleteFunc(comment._id).unwrap();
      toast.success("Comment deleted successfully!");
    } catch (error) {
      const apiError = error as ApiError;
      console.error(apiError);
      toast.error(apiError.data.message ?? "An error occurred while deleting!");
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateComment({
        id: comment._id,
        content: editedContent,
        spoiler: false,
      }).unwrap();
      toast.success("Comment updated!");
      setEditOpen(false);
    } catch (error) {
      const apiError = error as ApiError;
      console.error(apiError);
      toast.error(apiError.data.message ?? "Failed to update comment!");
    }
  };

  return (
    <div className="bg-white dark:bg-card border p-4 mx-1 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src={comment.user.profileImg}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">{comment.user.username}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Posted {getRelativeTime(comment.createdAt)}
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex items-center space-x-4">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <button className="text-blue-500 cursor-pointer hover:text-blue-700">
                  <Edit size={18} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit your comment</DialogTitle>
                </DialogHeader>
                <Textarea
                  rows={4}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full mt-3"
                />
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditOpen(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleEditSubmit} disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Save"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <button
              disabled={isDeleting}
              onClick={handleDelete}
              className="text-red-500 cursor-pointer hover:text-red-700"
            >
              {isDeleting ? (
                <TailChase size="20" speed="1.75" color="#1e9df1" />
              ) : (
                <Trash size={18} />
              )}
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {comment.content}
      </p>
    </div>
  );
};

export default CommentCard;
