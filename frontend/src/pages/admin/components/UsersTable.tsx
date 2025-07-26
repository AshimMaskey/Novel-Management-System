import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import getRelativeTime from "@/utils/convertTime";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { GetUser } from "@/types/auth";

type UserTableProps = {
  data: GetUser[];
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
};

export default function UsersTable({
  data,
  onDelete,
  isDeleting = false,
}: UserTableProps) {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<GetUser | null>(null);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleConfirmDelete = () => {
    if (selectedUser && onDelete) {
      onDelete(selectedUser._id);
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-4">
      <Table className="border-muted border-2">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-900">
            <TableHead>SN</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{getRelativeTime(user.createdAt)}</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={isDeleting}
                  onClick={() => setSelectedUser(user)}
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
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        title="Delete User"
        description={`Are you sure you want to delete "${selectedUser?.username}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
