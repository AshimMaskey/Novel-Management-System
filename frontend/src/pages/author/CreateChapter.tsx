import React, { useState, useRef } from "react";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

interface Chapter {
  title: string;
  chapterNumber: number;
  content: string;
}

const ChapterCreator: React.FC = () => {
  const [chapter, setChapter] = useState<Chapter>({
    title: "",
    chapterNumber: 1,
    content: "",
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

  const handleSave = () => {
    console.log("Chapter saved:", chapter);
    alert("Chapter saved! Check console for data.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Chapter
        </h1>

        {/* Chapter Info */}
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
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Toolbar */}
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
            <button
              onClick={() => execCommand("insertUnorderedList")}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Bullet List"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => execCommand("insertOrderedList")}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Numbered List"
            >
              <ListOrdered size={16} />
            </button>
            <div className="w-px bg-gray-300 mx-2" />
            <select
              onChange={(e) => execCommand("formatBlock", e.target.value)}
              className="px-2 py-1 text-sm border-0 bg-transparent hover:bg-gray-200 rounded"
            >
              <option value="div">Normal</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
            </select>
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
              setChapter({ title: "", chapterNumber: 1, content: "" });
              if (editorRef.current) {
                editorRef.current.innerHTML =
                  "<p>Start writing your chapter content here...</p>";
              }
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            disabled={!chapter.title.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Save Chapter
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-2">
            <span className="text-sm text-gray-600">
              Chapter {chapter.chapterNumber}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {chapter.title || "Untitled Chapter"}
          </h3>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: chapter.content || "<p>No content yet...</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterCreator;
