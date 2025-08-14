import { useState, useRef } from "react";
import { Bold, Italic, Loader2, Underline } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCreateChapterMutation } from "@/features/chapter/chapterApi";
import toast from "react-hot-toast";
import type { ApiError } from "@/types/error";
import { Button } from "@/components/ui/button";

interface Chapter {
  title: string;
  chapterNumber: number;
  content: string;
  novelId: string;
}

const ChapterCreator = () => {
  const { id: novelId } = useParams();
  const [createChapter, { isLoading }] = useCreateChapterMutation();

  const [chapter, setChapter] = useState<Chapter>({
    title: "",
    chapterNumber: 1,
    content: "",
    novelId: novelId ?? "jptId",
  });

  const editorRef = useRef<HTMLDivElement>(null);

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
      await createChapter(chapter).unwrap();
      toast.success("Chapter created successfully!");
      setChapter({
        title: "",
        chapterNumber: 1,
        content: "",
        novelId: novelId ?? "jptId",
      });
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message ?? "Error while creating chapter");
    }
  };

  return (
    <div className="w-md md:w-lg lg:w-5xl">
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Chapter
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="border border-gray-300 rounded-lg">
            {/* Toolbar */}
            <div className="bg-card rounded-2xl border-b border-gray-300 p-2 flex gap-1">
              <button
                onClick={() => execCommand("bold")}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                title="Bold"
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => execCommand("italic")}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                title="Italic"
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => execCommand("underline")}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                title="Underline"
              >
                <Underline size={16} />
              </button>
              <div className="w-px bg-gray-300 mx-2" />
            </div>

            {/* Editor */}
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

          {/* Actions */}
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
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            {isLoading ? (
              <Button disabled>
                <Loader2 className="animate-spin mr-2" />
                Creating...
              </Button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!chapter.title.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Save Chapter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterCreator;
