import { Button } from "@/components/ui/button";
import { setUser } from "@/features/auth/authSlice";
import { useUpdateUserMutation } from "@/features/user/userApi";
import type { RootState } from "@/store/store";
import type { ApiError } from "@/types/error";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const JoinPage = () => {
  const [updateFunc, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const handleClick = async () => {
    try {
      const data = await updateFunc({
        role: "author",
      }).unwrap();
      if (data) {
        toast.success("Role updated to Author!");
        dispatch(setUser(data));
        navigate("/create");
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError);
      toast.error("Update failed!");
    }
  };

  return (
    <div>
      <div className="min-h-screen">
        <div className="containerBox mt-5 px-3 md:px-0">
          <h1 className="text-2xl font-bold mb-4">🖊️ Become an Author</h1>
          <p className="mb-4">
            Share your stories, ideas, and knowledge with the world.
          </p>
          <ul className="mb-6 list-disc list-inside text-sm text-gray-700 dark:text-gray-400">
            <li>Publish your own content</li>
            <li>Gain followers and visibility</li>
            <li>Get featured on the homepage</li>
          </ul>
          {role === "reader" ? (
            isLoading ? (
              <Button
                disabled
                className="bg-green-500 cursor-pointer hover:bg-green-600 duration-300 transition-all"
              >
                <Loader2 className="animate-spin" />
                updating...
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                className="bg-green-500 cursor-pointer hover:bg-green-600 duration-300 transition-all"
              >
                Become Author
              </Button>
            )
          ) : (
            <p className="text-green-600 font-medium">
              You’re now an author! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
