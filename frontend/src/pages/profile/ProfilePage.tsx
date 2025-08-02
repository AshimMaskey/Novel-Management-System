import profileCover from "@/assets/profileCover.jfif";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CiUser } from "react-icons/ci";
import EditModal from "./components/EditModal";
import { useLogoutMutation } from "@/features/auth/authApi";
import toast from "react-hot-toast";
import type { ApiError } from "@/types/error";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/features/auth/authSlice";
import type { RootState } from "@/store/store";

const ProfilePage = () => {
  const User = useSelector((state: RootState) => state.auth.user);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const response = await logout().unwrap();
      toast.success(response.message);
      dispatch(clearUser());
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message);
    }
  };
  return (
    <>
      <div className="w-full">
        <div className="containerBox relative h-80">
          <img
            className="w-full rounded-b-2xl h-full object-cover"
            src={profileCover}
            alt="profileCover"
          />
          <Avatar className="size-48 absolute left-1/2 -translate-x-1/2 -bottom-22 shadow-lg border-4 border-white">
            <AvatarImage
              className="object-cover  transition-transform duration-300 hover:scale-110 cursor-pointer"
              src={User?.profileImg}
              alt="userprofile"
            />
            <AvatarFallback>
              <CiUser className="text-4xl text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="flex justify-between text-lg mt-5">
            <EditModal user={User} />
            <div>
              <Button variant={"outline"}>
                <CiUser />
                <span className="ml-1 hidden sm:flex">Followers</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="containerBox pb-5 flex flex-col items-center mt-26">
          <div className="flex flex-col gap-y-2.5">
            <h1 className="font-semibold text-2xl">
              {User?.fullName}{" "}
              <span className="text-md italic font-extralight">
                ({User?.role})
              </span>
            </h1>
            <h3 className="text-md font-extralight">
              <span className="font-extrabold">Username:</span> {User?.username}
            </h3>
            <h3 className="text-md font-extralight">
              <span className="font-extrabold">Email:</span> {User?.email}
            </h3>
            <h3 className="text-md font-extralight">
              <span className="font-extrabold">Bio: </span>
              {User?.bio}
            </h3>
            {isLoading ? (
              <Button disabled variant={"destructive"}>
                <Loader2 className="animate-spin" />
                Logging out..
              </Button>
            ) : (
              <Button onClick={handleClick} variant={"destructive"}>
                Log Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
