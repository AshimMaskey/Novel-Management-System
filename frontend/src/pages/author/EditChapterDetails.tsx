import { useState, useRef, useEffect } from "react";
import { Bold, Italic, Loader2, Underline } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useGetChapterQuery,
  useUpdateChapterMutation,
} from "@/features/chapter/chapterApi";
import Spinner from "@/components/ui/Spinner";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import type { ApiError } from "@/types/error";

interface Chapter {
  title: string;
  chapterNumber: number;
  content: string;
  novelId: string;
}

const EditChapterDetails = () => {
  const { novelId, chapterNumber } = useParams();
  const { data, isLoading, error } = useGetChapterQuery({
    novelId: novelId ?? "",
    chapterNumber: chapterNumber ? parseInt(chapterNumber) : 1,
  });
  const [updateChapter, { isLoading: isUpdating }] = useUpdateChapterMutation();

  const [chapter, setChapter] = useState<Chapter>({
    title: "",
    chapterNumber: 1,
    content: "",
    novelId: novelId ?? "jptId",
  });

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.chapter) {
      setChapter({
        title: data.chapter.title,
        chapterNumber: data.chapter.chapterNumber,
        content: data.chapter.content,
        novelId: novelId ?? "jptId",
      });

      if (editorRef.current) {
        editorRef.current.innerHTML = data.chapter.content;
      }
    }
  }, [data, novelId]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setChapter((prev) => ({
        ...prev,
        content: editorRef.current!.innerHTML,
      }));
    }
  };

  const handleSave = async () => {
    try {
      await updateChapter({
        chapterId: data?.chapter._id ?? "",
        ...chapter,
      }).unwrap();
      toast.success("Chapter updated successfully!");
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError);
      toast.error(apiError?.data?.message ?? "An error occurred");
    }
  };

  if (isLoading) return <Spinner />;
  if (error) {
    console.error(error);
    toast.error("An error occurred!");
    return null;
  }

  return (
    <div className="w-md md:w-lg lg:w-5xl">
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Chapter
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Number
              </label>
              <input
                type="number"
                value={chapter.chapterNumber}
                onChange={(e) =>
                  setChapter((prev) => ({
                    ...prev,
                    chapterNumber: parseInt(e.target.value) || 1,
                  }))
                }
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Title
              </label>
              <input
                type="text"
                value={chapter.title}
                onChange={(e) =>
                  setChapter((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Enter chapter title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-1">
              <button
                onClick={() => execCommand("bold")}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Bold"
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => execCommand("italic")}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Italic"
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => execCommand("underline")}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Underline"
              >
                <Underline size={16} />
              </button>
              <div className="w-px bg-gray-300 mx-2" />
            </div>

            <div
              ref={editorRef}
              contentEditable
              onInput={handleContentChange}
              className="min-h-[300px] p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              style={{ wordWrap: "break-word" }}
              suppressContentEditableWarning={true}
            >
              <p>Start writing your chapter content here...</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                setChapter({
                  title: "",
                  chapterNumber: 1,
                  content: "",
                  novelId: novelId ?? "jptId",
                });
                if (editorRef.current) {
                  editorRef.current.innerHTML =
                    "<p>Start writing your chapter content here...</p>";
                }
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear
            </button>

            {isUpdating ? (
              <Button disabled>
                <Loader2 className="animate-spin mr-2" />
                Updating...
              </Button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!chapter.title.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Update Chapter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChapterDetails;
