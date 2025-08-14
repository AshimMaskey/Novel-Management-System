import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash } from "lucide-react";
import type { NovelType } from "@/types/novel";
import getRelativeTime from "@/utils/convertTime";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Link } from "react-router-dom";

type NovelTableProps = {
  data: NovelType[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

export default function NovelTable({
  data,
  onDelete,
  isDeleting,
}: NovelTableProps) {
  const [page, setPage] = useState(1);
  const [novelToDelete, setNovelToDelete] = useState<NovelType | null>(null);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const openDialogForNovel = (novel: NovelType) => {
    setNovelToDelete(novel);
  };

  const closeDialog = () => {
    setNovelToDelete(null);
  };

  const confirmDelete = () => {
    if (novelToDelete) {
      onDelete(novelToDelete._id);
      closeDialog();
    }
  };

  return (
    <div className="space-y-4">
      <Table className="border-muted border-2">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-900">
            <TableHead>SN</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((novel, index) => (
            <TableRow key={novel._id}>
              <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{novel.title}</TableCell>
              <TableCell>{novel.author.username}</TableCell>
              <TableCell>{novel.status}</TableCell>
              <TableCell>{novel.views}</TableCell>
              <TableCell>{getRelativeTime(novel.createdAt)}</TableCell>
              <TableCell>
                <Button size="icon" variant="ghost" disabled={isDeleting}>
                  <Link to={`/novel/${novel._id}`}>
                    <Eye className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openDialogForNovel(novel)}
                  disabled={isDeleting}
                >
                  <Trash className="size-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={!!novelToDelete}
        onOpenChange={(open) => !open && closeDialog()}
        title="Delete Novel"
        description={`Are you sure you want to delete "${novelToDelete?.title}"? `}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
      />

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>

        <span className="text-sm text-gray-500">
          Page {page} of {pageCount}
        </span>

        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
          disabled={page === pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
