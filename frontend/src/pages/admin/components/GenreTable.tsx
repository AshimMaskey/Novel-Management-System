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
import type { GenreType } from "@/types/genre";
import getRelativeTime from "@/utils/convertTime";
import { Pencil, Trash } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type PaginatedTableProps = {
  data: GenreType[];
  itemsPerPage?: number;
  onEdit?: (genre: GenreType) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
};

export default function GenreTable({
  data,
  itemsPerPage = 5,
  onEdit,
  onDelete,
  isDeleting = false,
}: PaginatedTableProps) {
  const [page, setPage] = useState(1);
  const [genreToDelete, setGenreToDelete] = useState<GenreType | null>(null);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleConfirmDelete = () => {
    if (genreToDelete && onDelete) {
      onDelete(genreToDelete._id);
      setGenreToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <Table className="border-muted border-2">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-900">
            <TableHead>SN</TableHead>
            <TableHead>Genre Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((genre, index) => (
            <TableRow key={genre._id}>
              <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{genre.name}</TableCell>
              <TableCell>{getRelativeTime(genre.createdAt)}</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit?.(genre)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setGenreToDelete(genre)}
                  disabled={isDeleting}
                >
                  <Trash className="size-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

      <ConfirmDialog
        open={!!genreToDelete}
        onOpenChange={(open) => !open && setGenreToDelete(null)}
        title="Delete Genre"
        description={`Are you sure you want to delete "${genreToDelete?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
