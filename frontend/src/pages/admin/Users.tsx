import Spinner from "@/components/ui/Spinner";
import {
  useFetchUsersQuery,
  useDeleteUserMutation,
} from "@/features/user/userApi";
import type { ApiError } from "@/types/error";
import toast from "react-hot-toast";
import UsersTable from "./components/UsersTable";

const Users = () => {
  const { data = [], isLoading, error, refetch } = useFetchUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
      refetch();
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(apiError.data?.message || "Failed to delete user");
    }
  };

  if (error) {
    const apiError = error as ApiError;
    toast.error(apiError.data?.message || "An error occurred");
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">Users</h1>
      </div>
      {data.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-center text-gray-500">
          No users available.
        </div>
      ) : (
        <UsersTable
          data={data}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Users;
